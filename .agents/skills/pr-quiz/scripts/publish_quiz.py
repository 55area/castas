#!/usr/bin/env python3
"""Render a multiple-choice quiz into a PR description.

Usage: publish_quiz.py <pr-number> <quiz.json> [--repo [HOST/]OWNER/REPO] [--head SHA] [--dry-run]

quiz.json:
{
  "questions": [
    {
      "question": "Why does X ...?",
      "options": ["correct option", "distractor", "distractor", "distractor"],
      "correct": 0,
      "explanation": "One or two sentences on why the correct option is right."
    }
  ]
}

Options are shuffled, lettered A-F and rendered as task-list checkboxes, so a
reviewer answers by ticking boxes. The answer key is stored base64-encoded in a
hidden HTML comment that the pr-quiz GitHub Action reads. Any existing quiz block
in the description is replaced, which gives the quiz a new id and resets the pass.
"""

import argparse
import base64
import html
import json
import random
import re
import secrets
import subprocess
import sys

START = "<!-- pr-quiz:start -->"
END = "<!-- pr-quiz:end -->"
LETTERS = "ABCDEF"


def unique_object(pairs):
    result = {}
    for name, value in pairs:
        if name in result:
            raise ValueError("Quiz JSON contains duplicate object fields; resolve the ambiguity before publishing.")
        result[name] = value
    return result


def load_quiz(path):
    with open(path, encoding="utf-8") as f:
        quiz = json.load(f, object_pairs_hook=unique_object)
    if not isinstance(quiz, dict):
        raise ValueError("Quiz must be an object.")
    questions = quiz.get("questions")
    if not isinstance(questions, list) or not 1 <= len(questions) <= 10:
        raise ValueError("Quiz needs between 1 and 10 questions.")
    for i, q in enumerate(questions, 1):
        if not isinstance(q, dict):
            raise ValueError(f"Question {i} must be an object.")
        options = q.get("options")
        if not isinstance(options, list) or not 2 <= len(options) <= len(LETTERS):
            raise ValueError(f"Question {i} needs 2 to {len(LETTERS)} options.")
        values = [q.get("question"), q.get("explanation"), *options]
        if any(not isinstance(v, str) or not v.strip() for v in values):
            raise ValueError(f"Question {i} needs nonempty text for question, options and explanation.")
        if len({one_line(v) for v in options}) != len(options):
            raise ValueError(f"Question {i} has duplicate options.")
        if type(q.get("correct")) is not int or not 0 <= q["correct"] < len(options):
            raise ValueError(f"Question {i} has an invalid correct index.")
    return questions


def one_line(text):
    # The Action parses the quiz line by line, so each question and option must stay on one line.
    value = html.escape(" ".join(text.split()), quote=False)
    # Preserve literal source terms without enabling Markdown links/images,
    # emphasis, inline code or incidental @mentions in the published question.
    return re.sub(r"[\\`*_\[\]{}()#!|@~]", lambda match: f"&#{ord(match[0])};", value)


def render(questions):
    quiz_id = secrets.token_hex(6)
    answers, explanations, lines = {}, {}, []

    for n, q in enumerate(questions, 1):
        order = list(range(len(q["options"])))
        random.shuffle(order)
        lines.append(f"**{n}. {one_line(q['question'])}**")
        lines.append("")
        for pos, original in enumerate(order):
            lines.append(f"- [ ] **{LETTERS[pos]})** {one_line(q['options'][original])}")
            if original == q["correct"]:
                answers[str(n)] = LETTERS[pos]
        lines.append("")
        explanations[str(n)] = q["explanation"].strip()

    key = json.dumps({"id": quiz_id, "answers": answers, "explanations": explanations})
    encoded = base64.b64encode(key.encode("utf-8")).decode("ascii")

    block = "\n".join([
        START,
        "## PR Quiz",
        "",
        "Decision-comprehension aid. Follow the repository's separate review and merge requirements.",
        "Tick exactly one answer per question. With automatic grading enabled, the workflow can post the result.",
        "If automatic grading is enabled, copy the example command from the current pr-quiz commit status and replace its option letters.",
        "",
        *lines,
        f"<!-- pr-quiz-key:{encoded} -->",
        END,
    ])
    return quiz_id, block


def replace_quiz(body, block):
    starts, ends = body.count(START), body.count(END)
    if starts == 0 and ends == 0:
        return f"{body.rstrip()}\n\n{block}\n" if body.strip() else f"{block}\n"
    if starts != 1 or ends != 1 or body.index(START) > body.index(END):
        raise ValueError("Ambiguous or malformed existing quiz markers; preserve the PR body and reconcile manually.")
    start, end = body.index(START), body.index(END) + len(END)
    return body[:start] + block + body[end:]


def gh(*args):
    return subprocess.run(["gh", *args], check=True, capture_output=True, text=True).stdout


def main():
    parser = argparse.ArgumentParser(description="Publish or preview a decision-comprehension PR quiz.")
    parser.add_argument("pr")
    parser.add_argument("quiz_path")
    parser.add_argument("--repo", help="Target GitHub repository in [HOST/]OWNER/REPO format")
    parser.add_argument("--head", help="Full commit SHA reviewed while drafting the questions")
    parser.add_argument("--dry-run", action="store_true")
    options = parser.parse_args()
    if not re.fullmatch(r"[1-9][0-9]*", options.pr):
        raise ValueError("PR number must be a positive integer.")
    if options.head is not None and not re.fullmatch(r"[a-fA-F0-9]{40}", options.head):
        raise ValueError("Expected head must be a full commit SHA.")
    quiz_id, block = render(load_quiz(options.quiz_path))
    if options.dry_run:
        print(block)
        return

    fields = ("--json", "body,headRefOid,url")
    selector = ("--repo", options.repo) if options.repo else ()
    original = json.loads(gh("pr", "view", options.pr, *selector, *fields))
    url, head = original["url"], original["headRefOid"]
    if options.head and options.head.lower() != head:
        raise ValueError("PR head differs from the revision used to draft the quiz.")
    updated = replace_quiz(original["body"] or "", block)
    if json.loads(gh("pr", "view", url, *fields)) != original:
        raise ValueError("PR description or head changed before publication; review the current PR.")
    subprocess.run(["gh", "pr", "edit", url, "--body-file", "-"], input=updated, text=True, check=True)
    result = json.loads(gh("pr", "view", url, *fields))
    if result["url"] != url or result["headRefOid"] != head:
        raise ValueError("PR update was sent, but its target or head changed; review the current PR.")
    observed = result["body"] or ""
    if observed.count(START) != 1 or observed.count(END) != 1 or block not in observed:
        raise ValueError("PR update was sent, but the quiz block could not be confirmed; inspect the current body.")
    print(f"Quiz {quiz_id} published to {url} at {head}.")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, subprocess.CalledProcessError) as exc:
        sys.exit(f"error: {exc}")
