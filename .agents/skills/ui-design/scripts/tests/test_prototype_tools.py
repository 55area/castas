"""Regression tests for the optional declared-pair checker and offline builder."""
import base64
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / "prototype_tools.py"
ASSETS = SCRIPT.parent.parent / "assets/prototype"
SPEC = importlib.util.spec_from_file_location("prototype_tools", SCRIPT)
TOOL = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(TOOL)


class PrototypeTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        shutil.copytree(ASSETS, self.root / "example")
        self.example = self.root / "example"
        self.tokens = self.example / "tokens.json"
        self.manifest = self.example / "manifest.json"
        self.output = self.root / "preview.html"

    def edit(self, path, mutation):
        data = json.loads(path.read_text())
        mutation(data)
        path.write_text(json.dumps(data))

    def run_cli(self, *args):
        return subprocess.run([sys.executable, str(SCRIPT), *map(str, args)], text=True, capture_output=True)

    def test_fragment_limits_preserve_existing_output(self):
        for i in range(TOOL.MAX_FRAGMENT_DEPTH):
            (self.example / f"depth-{i}.html").write_text(f"<!-- include: depth-{i + 1}.html -->")
        (self.example / f"depth-{TOOL.MAX_FRAGMENT_DEPTH}.html").write_text("<p>End</p>")

        fragment = self.example / "notes.html"
        partial = self.example / "partial.html"
        partial.write_text("<p>Repeated fragment</p>")
        self.output.write_text("previous preview")
        for markup, error in [
            ("<!-- include: depth-0.html -->", "fragment nesting exceeds"),
            ("<!-- include: partial.html -->" * TOOL.MAX_FRAGMENT_READS, "fragment reads"),
            (" " * (TOOL.MAX_FRAGMENT_BYTES + 1), "bytes of fragment input"),
        ]:
            with self.subTest(error=error):
                fragment.write_text(markup)
                result = self.run_cli("build", self.manifest, self.output)
                self.assertEqual(1, result.returncode)
                self.assertIn(error, result.stderr)
                self.assertNotIn("Traceback", result.stderr)
                self.assertEqual("previous preview", self.output.read_text())

    def assert_bad_tokens(self, mutation):
        self.edit(self.tokens, mutation)
        result = self.run_cli("check", self.tokens)
        self.assertEqual(1, result.returncode, result.stdout)
        self.assertIn("error:", result.stderr)

    def test_known_ratio_and_unrounded_alpha(self):
        self.assertEqual(21.0, TOOL.contrast("#000000", "#ffffff"))
        channel = 1 - 128 / 255
        expected = 1.05 / (((channel + .055) / 1.055) ** 2.4 + .05)
        self.assertAlmostEqual(expected, TOOL.contrast("#00000080", "#ffffff"), places=12)

    def test_threshold_does_not_use_rounded_display(self):
        ratio = TOOL.contrast("#959595", "#ffffff")
        self.assertEqual("3.00", f"{ratio:.2f}")
        self.assertLess(ratio, 3)
        self.tokens.write_text(json.dumps({"themes": {"light": {"fg": "#959595", "bg": "#ffffff"}}, "pairs": [{"fg": "fg", "bg": "bg", "use": "nontext"}]}))
        _, report = TOOL.load_tokens(self.tokens)
        self.assertFalse(report[0]["passed"])

    def test_declared_missing_role_does_not_disappear(self):
        self.assert_bad_tokens(lambda t: t["pairs"].append({"fg": "missing", "bg": "surface", "use": "text"}))

    def test_unknown_usage_is_error_not_zero_threshold(self):
        self.assert_bad_tokens(lambda t: t["pairs"][0].update(use="decorative-typo"))

    def test_translucent_background_is_error(self):
        self.assert_bad_tokens(lambda t: t["themes"]["dark"].update(surface="#00000080"))

    def test_unknown_and_absent_themes_are_errors(self):
        self.assert_bad_tokens(lambda t: t["pairs"][0].update(themes=["absent"]))
        self.tokens.write_text('{"themes": {}, "pairs": []}')
        self.assertEqual(1, self.run_cli("check", self.tokens).returncode)

    def test_alias_cycle_and_unknown_primitive_are_errors(self):
        self.assert_bad_tokens(lambda t: t.update(primitives={"paper": "{ink}", "ink": "{paper}"}))
        self.tokens.write_text((ASSETS / "tokens.json").read_text())
        self.assert_bad_tokens(lambda t: t["themes"]["light"].update(surface="{absent}"))

    def test_long_acyclic_alias_chain_resolves(self):
        length = sys.getrecursionlimit() + 10
        primitives = {f"p{i}": f"{{p{i + 1}}}" for i in range(length)}
        primitives[f"p{length}"] = "#ffffff"
        self.tokens.write_text(json.dumps({
            "primitives": primitives,
            "themes": {"light": {"fg": "#000000", "bg": "{p0}"}},
            "pairs": [{"fg": "fg", "bg": "bg", "use": "text"}],
        }))
        result = self.run_cli("check", self.tokens)
        self.assertEqual(0, result.returncode, result.stderr)
        self.assertEqual(21.0, json.loads(result.stdout)["pairs"][0]["ratio"])

    def test_example_build_is_local_and_exposes_routes_foundations(self):
        result = self.run_cli("build", self.manifest, self.output)
        self.assertEqual(0, result.returncode, result.stderr)
        built = self.output.read_text()
        self.assertIn('data-route="UI-S01/offline"', built)
        self.assertIn("Calculated color pairs", built)
        self.assertIn("--type-body", built)
        self.assertNotIn("https://", built)
        self.assertNotIn("fonts.googleapis", built)
        self.assertIn("location.hash", built)

    def test_gallery_policy_allows_only_the_bundled_viewer_script(self):
        result = self.run_cli("build", self.manifest, self.output)
        self.assertEqual(0, result.returncode, result.stderr)
        built = self.output.read_text()
        viewer, = re.findall(r"<script>(.*?)</script>", built, re.S)
        digest = base64.b64encode(hashlib.sha256(viewer.encode("utf-8")).digest()).decode("ascii")
        self.assertEqual(f"'sha256-{digest}'", re.search(r"; script-src ([^;]+);", built)[1])

    def test_malformed_comments_cannot_hide_active_markup(self):
        self.output.write_text("previous preview")
        fragment = self.example / "notes.html"
        for opener in ("<!-->", "<!--->", "<!-- sample --!>"):
            with self.subTest(opener=opener):
                fragment.write_text(f"{opener}<script>unexpected()</script><!-- -->")
                result = self.run_cli("build", self.manifest, self.output)
                self.assertEqual(1, result.returncode)
                self.assertEqual("previous preview", self.output.read_text())

    def test_metadata_is_escaped(self):
        title = '</title><script>alert("metadata")</script>'
        self.edit(self.manifest, lambda m: m.update(title=title))
        self.assertEqual(0, self.run_cli("build", self.manifest, self.output).returncode)
        built = self.output.read_text()
        self.assertNotIn(title, built)
        self.assertIn("&lt;/title&gt;&lt;script&gt;", built)

    def test_failure_does_not_replace_previous_output(self):
        self.output.write_text("previous reviewed concept")
        self.edit(self.tokens, lambda t: t["themes"]["light"].update(text="#ffffff"))
        self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)
        self.assertEqual("previous reviewed concept", self.output.read_text())

    def test_invalid_route_and_duplicate_ids_fail(self):
        notes = self.example / "notes.html"
        original = notes.read_text()
        notes.write_text('<button data-goto="UI-S99/missing">Go</button>')
        self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)
        notes.write_text(original + '<p id="draft-title">Duplicate</p>')
        self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)

    def test_missing_cycle_and_escaping_includes_fail(self):
        notes = self.example / "notes.html"
        for markup in ['<!-- include: missing.html -->', '<!-- include: notes.html -->', '<!-- include: ../outside.html -->']:
            (self.root / "outside.html").write_text("Outside manifest tree")
            notes.write_text(markup)
            self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)

    def test_active_markup_and_remote_css_fail(self):
        notes = self.example / "notes.html"
        for markup in ['<script>alert(1)</script>', '<button onclick="alert(1)">Go</button>', '<img src="https://example.com/a.png">']:
            notes.write_text(markup)
            self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)
        notes.write_text((ASSETS / "notes.html").read_text())
        (self.example / "specimen.css").write_text('@import "https://example.com/style.css";')
        self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)

    def test_output_cannot_overwrite_a_consumed_partial(self):
        partial = self.example / "notes.html"
        before = partial.read_bytes()
        self.assertEqual(1, self.run_cli("build", self.manifest, partial).returncode)
        self.assertEqual(before, partial.read_bytes())

    def test_invalid_generated_token_reference_fails(self):
        (self.example / "specimen.css").write_text('.specimen{color:var(--color-missing)}')
        self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)

    def test_invalid_dialog_target_fails(self):
        (self.example / "notes.html").write_text('<button data-dialog-open="absent">Confirm</button>')
        self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)

    def test_html_id_links_are_checked(self):
        (self.example / "notes.html").write_text('<a href="#absent">Missing</a>')
        self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)

    def test_cross_state_id_link_requires_a_route(self):
        (self.example / "notes.html").write_text('<a href="#draft-title">Hidden state field</a>')
        self.assertEqual(1, self.run_cli("build", self.manifest, self.output).returncode)

    def test_unhashable_pair_fields_fail_cleanly(self):
        original = self.tokens.read_text()
        for mutation in [lambda t: t["pairs"][0].update(fg=[]), lambda t: t["pairs"][0].update(use=[]), lambda t: t["pairs"][0].update(themes=[{}])]:
            self.tokens.write_text(original)
            self.edit(self.tokens, mutation)
            result = self.run_cli("check", self.tokens)
            self.assertEqual(1, result.returncode)
            self.assertNotIn("Traceback", result.stderr)

    def test_missing_file_and_malformed_json_fail_cleanly(self):
        self.assertEqual(1, self.run_cli("check", self.example / "absent.json").returncode)
        self.manifest.write_text("not json")
        result = self.run_cli("build", self.manifest, self.output)
        self.assertEqual(1, result.returncode)
        self.assertNotIn("Traceback", result.stderr)

    def test_duplicate_json_declarations_fail_without_replacing_output(self):
        self.tokens.write_text('{"themes":{"light":{"text":"#ffffff","text":"#000000","surface":"#ffffff"}},"pairs":[{"fg":"text","bg":"surface","use":"text"}]}')
        result = self.run_cli("check", self.tokens)
        self.assertEqual(1, result.returncode)
        self.assertIn("duplicate JSON key", result.stderr)
        self.tokens.write_text((ASSETS / "tokens.json").read_text())
        self.output.write_text("reviewed output")
        original = self.manifest.read_text()
        self.manifest.write_text(original.replace('"title":', '"title": "ambiguous", "title":', 1))
        result = self.run_cli("build", self.manifest, self.output)
        self.assertEqual(1, result.returncode)
        self.assertIn("duplicate JSON key", result.stderr)
        self.assertEqual("reviewed output", self.output.read_text())

    def test_oversized_numeric_token_fails_cleanly(self):
        self.edit(self.tokens, lambda t: t.update(space={"huge": 10 ** 1000}))
        result = self.run_cli("check", self.tokens)
        self.assertEqual(1, result.returncode)
        self.assertIn("error:", result.stderr)
        self.assertNotIn("Traceback", result.stderr)
        self.tokens.write_text(self.tokens.read_text().replace(str(10 ** 1000), "9" * 5000))
        result = self.run_cli("check", self.tokens)
        self.assertEqual(1, result.returncode)
        self.assertNotIn("Traceback", result.stderr)


if __name__ == "__main__":
    unittest.main()
