#!/usr/bin/env python3
"""Check declared color pairs and build optional offline UI concept galleries.

Inputs are trusted, locally authored design files, not arbitrary user HTML.
This bounded helper is not a browser sanitizer, accessibility audit, or native UI runtime.
"""
import argparse
import base64
import hashlib
import html
from html.parser import HTMLParser
import json
import math
from pathlib import Path
import re
import sys
import tempfile

THRESHOLDS = {"text": 4.5, "large-text": 3.0, "nontext": 3.0}
IDENT = re.compile(r"^[A-Za-z][A-Za-z0-9_-]*$")
HEX = re.compile(r"^#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$")
INCLUDE = re.compile(r"<!--\s*include:\s*(\S+)\s*-->")
MAX_FRAGMENT_DEPTH = 32
MAX_FRAGMENT_READS = 512
MAX_FRAGMENT_BYTES = 2 * 1024 * 1024


class Invalid(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise Invalid(message)


def object_of(value, label):
    require(isinstance(value, dict), f"{label} must be an object")
    return value


def name(value, label):
    require(isinstance(value, str) and IDENT.fullmatch(value), f"invalid {label}: {value!r}")
    return value


def text(value, label):
    require(isinstance(value, str) and bool(value.strip()), f"{label} must be nonempty text")
    return value


def number(value, label, minimum=0, maximum=10000):
    require(type(value) in (int, float) and minimum <= value <= maximum and math.isfinite(value),
            f"invalid {label}: {value!r}")
    return value


def read_json(path):
    def unique_object(pairs):
        result = {}
        for key, value in pairs:
            require(key not in result, f"duplicate JSON key: {key!r}")
            result[key] = value
        return result
    try:
        return object_of(json.loads(Path(path).read_text(encoding="utf-8"), object_pairs_hook=unique_object), str(path))
    except (OSError, UnicodeError, ValueError) as exc:
        raise Invalid(f"cannot read {path}: {exc}") from exc


def color(value):
    require(isinstance(value, str) and HEX.fullmatch(value), f"unsupported color: {value!r}; use #rrggbb[aa]")
    return tuple(int(value[i:i + 2], 16) / 255 for i in (1, 3, 5)) + (int(value[7:9], 16) / 255 if len(value) == 9 else 1.0,)


def contrast(foreground, background):
    fg, bg = color(foreground), color(background)
    require(bg[3] == 1, "background must be opaque; specify its actual composited color")
    rgb = [fg[i] * fg[3] + bg[i] * (1 - fg[3]) for i in range(3)]
    def luminance(channels):
        linear = [v / 12.92 if v <= 0.04045 else ((v + .055) / 1.055) ** 2.4 for v in channels]
        return sum(v * w for v, w in zip(linear, (.2126, .7152, .0722)))
    a, b = luminance(rgb), luminance(bg[:3])
    return (max(a, b) + .05) / (min(a, b) + .05)


def load_tokens(path):
    data = read_json(path)
    primitives = object_of(data.get("primitives", {}), "primitives")
    resolved_primitives = {}

    def resolve(value):
        path = {}
        while isinstance(value, str) and value.startswith("{") and value.endswith("}"):
            key = name(value[1:-1], "primitive reference")
            require(key in primitives, f"missing primitive {key}")
            if key in resolved_primitives:
                value = resolved_primitives[key]
                break
            if key in path:
                raise Invalid(f"cyclic primitive reference: {' -> '.join([*path, key])}")
            path[key] = None
            value = primitives[key]
        color(value)
        normalized = value.lower()
        resolved_primitives.update(dict.fromkeys(path, normalized))
        return normalized

    for key in primitives:
        name(key, "primitive name")
        resolve(f"{{{key}}}")
    themes = object_of(data.get("themes"), "themes")
    require(bool(themes), "at least one theme is required")
    resolved = {}
    for theme, roles in themes.items():
        name(theme, "theme")
        object_of(roles, f"theme {theme}")
        require(bool(roles), f"theme {theme} has no roles")
        resolved[theme] = {name(role, "role"): resolve(value) for role, value in roles.items()}
    pairs = data.get("pairs")
    require(isinstance(pairs, list) and bool(pairs), "declare at least one foreground/background pair")
    report = []
    for pair in pairs:
        object_of(pair, "pair")
        fg, bg, use = name(pair.get("fg"), "foreground role"), name(pair.get("bg"), "background role"), pair.get("use")
        require(isinstance(use, str) and use in THRESHOLDS, f"unknown pair use: {use!r}")
        selected = pair.get("themes", list(resolved))
        require(isinstance(selected, list) and bool(selected) and all(isinstance(t, str) for t in selected), "pair themes must be a nonempty list of names")
        require(len(set(selected)) == len(selected), "pair themes must be unique")
        for theme in selected:
            require(theme in resolved, f"unknown pair theme: {theme!r}")
            require(fg in resolved[theme] and bg in resolved[theme], f"missing pair role in {theme}: {fg!r} on {bg!r}")
            ratio = contrast(resolved[theme][fg], resolved[theme][bg])
            report.append(dict(theme=theme, fg=fg, bg=bg, use=use, ratio=ratio,
                               required=THRESHOLDS[use], passed=ratio >= THRESHOLDS[use]))
    for group in ("space", "radius"):
        for key, value in object_of(data.get(group, {}), group).items():
            name(key, f"{group} name")
            number(value, group)
    for key, style in object_of(data.get("type", {}), "type").items():
        name(key, "type role")
        object_of(style, f"type {key}")
        family = text(style.get("family", "system-ui, sans-serif"), "font family")
        require(re.fullmatch(r"[A-Za-z0-9 ,_-]+", family), "use an unquoted system/local font-family stack")
        number(style.get("size"), "font size", 1, 256)
        number(style.get("line"), "unitless line height", .5, 5)
        number(style.get("weight", 400), "font weight", 1, 1000)
    data["themes"] = resolved
    return data, report


def local_path(root, parent, relative):
    require(isinstance(relative, str) and bool(relative), "local file path must be nonempty text")
    path = (parent / relative).resolve()
    require(path.is_relative_to(root), f"file escapes manifest directory: {relative}")
    require(path.is_file(), f"missing local file: {relative}")
    return path


class FragmentReader:
    def __init__(self, root, consumed):
        self.root = root
        self.consumed = consumed
        self.reads = 0
        self.remaining_bytes = MAX_FRAGMENT_BYTES

    def expand(self, path, stack=()):
        require(path not in stack, f"include cycle at {path}")
        require(len(stack) < MAX_FRAGMENT_DEPTH, f"fragment nesting exceeds {MAX_FRAGMENT_DEPTH} files")
        require(self.reads < MAX_FRAGMENT_READS, f"build exceeds {MAX_FRAGMENT_READS} fragment reads")
        self.reads += 1
        self.consumed.add(path)
        with path.open("rb") as source:
            raw = source.read(self.remaining_bytes + 1)
        require(len(raw) <= self.remaining_bytes, f"build exceeds {MAX_FRAGMENT_BYTES} bytes of fragment input")
        self.remaining_bytes -= len(raw)
        value = raw.decode("utf-8").replace("\r\n", "\n").replace("\r", "\n")
        return INCLUDE.sub(
            lambda match: self.expand(local_path(self.root, path.parent, match[1]), stack + (path,)),
            value,
        )


def safe_css(value):
    require(not re.search(r"@import|url\s*\(|expression\s*\(|</style", value, re.I), "CSS must be local and contain no imports, URLs, expressions, or closing style tags")
    return value


class Markup(HTMLParser):
    """Reject obvious active/external inputs; intentionally not a general sanitizer."""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.targets = [], [], []
        self.dialogs, self.openers = set(), []

    def handle_starttag(self, tag, attrs):
        require(tag in {"a", "abbr", "article", "aside", "b", "blockquote", "br", "button", "caption", "code", "dd", "details", "dialog", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "i", "input", "label", "legend", "li", "main", "nav", "ol", "option", "p", "pre", "progress", "section", "select", "small", "span", "strong", "summary", "table", "tbody", "td", "textarea", "th", "thead", "time", "tr", "ul"}, f"unsupported active/embedded tag: {tag}")
        names = [key for key, _ in attrs]
        require(len(names) == len(set(names)), "duplicate HTML attribute")
        for key, value in attrs:
            require(not key.startswith("on") and key not in {"src", "srcset", "srcdoc", "action", "formaction", "target", "contenteditable", "autofocus"}, f"unsupported HTML attribute: {key}")
            if key == "id":
                name(value, "HTML id")
                require(not value.startswith("gallery-"), "gallery- is a reserved ID prefix")
                self.ids.append(value)
            if key == "href":
                require(value and value.startswith("#"), "links must be local hash links")
                self.links.append(value[1:])
            if key == "style":
                safe_css(value or "")
            if key == "data-dialog-open":
                self.openers.append(name(value, "dialog target"))
            if key in {"data-goto", "data-state-to"}:
                self.targets.append((key, text(value, key)))
        if tag == "dialog":
            require(dict(attrs).get("id"), "dialog needs a unique id")
            self.dialogs.add(dict(attrs)["id"])
        if tag == "form":
            require(dict(attrs).get("method") == "dialog", "only native dialog forms are supported")

    handle_startendtag = handle_starttag

    def handle_comment(self, data):
        # Browsers can end these malformed comments before HTMLParser does.
        require(not data.startswith((">", "->")) and "--!>" not in data, "malformed HTML comment")


def token_css(data):
    result = []
    for theme, roles in data["themes"].items():
        values = [f"--color-{key}:{value}" for key, value in roles.items()]
        for group in ("space", "radius"):
            values.extend(f"--{group}-{key}:{value}px" for key, value in data.get(group, {}).items())
        for key, style in data.get("type", {}).items():
            values.append(f"--type-{key}:{style.get('weight', 400)} {style['size']}px/{style['line']} {style.get('family', 'system-ui, sans-serif')}")
        result.append(f'[data-theme="{theme}"] .specimen' + "{" + ";".join(values) + "}")
    return "\n".join(result)


def escaped(value):
    return html.escape(str(value), quote=True)


def build(manifest, output):
    manifest = Path(manifest).resolve()
    root, data = manifest.parent, read_json(manifest)
    title, language = text(data.get("title"), "title"), data.get("language", "en")
    require(isinstance(language, str) and re.fullmatch(r"[A-Za-z0-9-]+", language), "invalid document language")
    token_path = local_path(root, root, data.get("tokens"))
    consumed = {manifest, token_path}
    fragments = FragmentReader(root, consumed)
    tokens, report = load_tokens(token_path)
    require(all(row["passed"] for row in report), "declared contrast pair failed; inspect check output")
    widths = data.get("widths", [360, 840])
    require(isinstance(widths, list) and bool(widths), "widths must be a nonempty list")
    for width in widths:
        require(type(width) is int and 240 <= width <= 3840, "widths must be integer CSS pixels between 240 and 3840")
    require(len(set(widths)) == len(widths), "duplicate widths")
    styles = data.get("css", [])
    require(isinstance(styles, list), "css must be a list of local files")
    css = "\n".join(safe_css(fragments.expand(local_path(root, root, entry))) for entry in styles)
    screens = data.get("screens")
    require(isinstance(screens, list) and bool(screens), "screens must be a nonempty list")
    entries, ids, links, targets, screen_ids = [], [], [], [], set()
    for screen in screens:
        object_of(screen, "screen")
        sid = name(screen.get("id"), "screen id")
        require(sid not in screen_ids, f"duplicate screen id {sid}")
        screen_ids.add(sid)
        text(screen.get("title"), "screen title")
        text(screen.get("purpose"), "screen purpose")
        kind = screen.get("kind", "feature")
        require(kind in {"feature", "component", "shell", "system"}, "unknown screen kind")
        states = screen.get("states")
        require(isinstance(states, list) and bool(states), f"{sid} needs states")
        for state in states:
            object_of(state, "state")
            route = sid + "/" + name(state.get("id"), "state id")
            require(route not in [e["route"] for e in entries], f"duplicate route {route}")
            label, trigger = text(state.get("label"), "state label"), text(state.get("trigger"), "state trigger")
            markup = fragments.expand(local_path(root, root, state.get("html")))
            parser = Markup()
            parser.feed(markup)
            require(all(target in parser.dialogs for target in parser.openers), f"dialog target missing from {route}")
            ids.extend(parser.ids)
            links.extend((route, set(parser.ids) - parser.dialogs, link) for link in parser.links)
            targets.extend((route, key, value) for key, value in parser.targets)
            entries.append(dict(route=route, title=screen["title"], label=label, purpose=screen["purpose"], trigger=trigger, kind=kind, markup=markup))
    require(len(ids) == len(set(ids)), "duplicate HTML ids across gallery states")
    authored = css + "\n" + "\n".join(entry["markup"] for entry in entries)
    for variable in re.findall(r"var\(\s*--color-([A-Za-z][A-Za-z0-9_-]*)", authored):
        require(all(variable in roles for roles in tokens["themes"].values()), f"color role {variable} used in markup/CSS is missing from a theme")
    for group in ("space", "radius", "type"):
        for variable in re.findall(r"var\(\s*--" + group + r"-([A-Za-z][A-Za-z0-9_-]*)", authored):
            require(variable in tokens.get(group, {}), f"undefined {group} token {variable}")
    routes = {e["route"] for e in entries}
    for origin, key, value in targets:
        target = value if key == "data-goto" else origin.split("/")[0] + "/" + value
        require(target in routes, f"invalid navigation target {target}")
    for origin, local_ids, link in links:
        require(link in routes or link in local_ids, f"invalid local link #{link} in {origin}; cross-state links must use screen/state routes and dialogs need data-dialog-open")
    theme_names = list(tokens["themes"])
    configuration = json.dumps(dict(routes=[e["route"] for e in entries], themes=theme_names, widths=widths)).replace("<", "\\u003c").replace("&", "\\u0026")
    options = "".join(f'<option value="{e["route"]}">{escaped(e["title"])} — {escaped(e["label"])}</option>' for e in entries)
    states_html = "".join(f'<section class="gallery-state" data-route="{e["route"]}" hidden><h2>{escaped(e["title"])} — {escaped(e["label"])}</h2><p>{escaped(e["kind"])} · {escaped(e["purpose"])}</p><p>Trigger: {escaped(e["trigger"])}</p><div class="gallery-frame"><div class="specimen">{e["markup"]}</div></div></section>' for e in entries)
    pairs_html = "".join(f'<tr><td>{escaped(r["theme"])}</td><td>{escaped(r["fg"])} / {escaped(r["bg"])}</td><td>{r["use"]}</td><td>{r["ratio"]:.4f}:1</td><td>{r["required"]}:1</td></tr>' for r in report)
    roles_html = "".join(f'<tr><td>{escaped(theme)}</td><td>{escaped(role)}</td><td><span style="display:inline-block;width:2rem;height:1rem;background:{value}"></span> {value}</td></tr>' for theme, roles in tokens["themes"].items() for role, value in roles.items())
    scales_html = "".join(f'<p>{escaped(group)} / {escaped(key)}: {value}px</p>' for group in ("space", "radius") for key, value in tokens.get(group, {}).items())
    typography = "".join(f'<p style="font:{style.get("weight", 400)} {style["size"]}px/{style["line"]} {escaped(style.get("family", "system-ui, sans-serif"))}">{escaped(key)} — Sample text 0123456789</p>' for key, style in tokens.get("type", {}).items())
    template = (Path(__file__).resolve().parent.parent / "assets/prototype/viewer.html").read_text(encoding="utf-8")
    viewer_scripts = re.findall(r"<script>(.*?)</script>", template, re.S)
    require(len(viewer_scripts) == 1, "viewer template must have one bundled executable script")
    # Hash trusted template code before inserting authored fragments. The browser
    # must enforce this boundary even when it parses a fragment differently.
    viewer_hash = base64.b64encode(hashlib.sha256(viewer_scripts[0].encode("utf-8")).digest()).decode("ascii")
    values = dict(language=language, title=escaped(title), css=token_css(tokens) + "\n" + css, options=options,
                  viewerhash=viewer_hash,
                  themes="".join(f'<option>{theme}</option>' for theme in theme_names),
                  widths="".join(f'<option>{w}</option>' for w in widths), states=states_html,
                  pairs=pairs_html, roles=roles_html, scales=scales_html, typography=typography, config=configuration)
    rendered = re.sub(r"@@([a-z]+)@@", lambda match: values[match[1]], template)
    output = Path(output).resolve()
    require(output not in consumed, "output would overwrite an input")
    require(not output.is_relative_to(Path(__file__).resolve().parent.parent), "write generated output in the target project, not the skill package")
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=output.parent, delete=False) as handle:
        temporary = Path(handle.name)
        handle.write(rendered)
    try:
        temporary.replace(output)
    finally:
        temporary.unlink(missing_ok=True)
    return len(entries), len(report)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    check = sub.add_parser("check", help="check explicit token pairs; this is not an accessibility audit")
    check.add_argument("tokens", nargs="+")
    build_parser = sub.add_parser("build", help="build an optional offline HTML concept from local files")
    build_parser.add_argument("manifest")
    build_parser.add_argument("output")
    args = parser.parse_args(argv)
    try:
        if args.command == "check":
            passed = True
            for filename in args.tokens:
                _, rows = load_tokens(filename)
                print(json.dumps(dict(file=filename, scope="declared token pairs only", pairs=rows), indent=2))
                passed = passed and all(row["passed"] for row in rows)
            return 0 if passed else 1
        count, pairs = build(args.manifest, args.output)
        print(f"Built {args.output}: {count} states; {pairs} declared token pairs checked. Native/runtime behavior remains unverified.")
        return 0
    except (Invalid, OSError, UnicodeError, TypeError, KeyError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
