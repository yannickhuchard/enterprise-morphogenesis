#!/usr/bin/env python3
"""Check draft links, manuscript anchors and static assets without dependencies."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
DRAFT = DOCS / "discover" / "index.html"
LANDING = DOCS / "landing" / "index.html"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids = set()
        self.duplicates = []
        self.links = []
        self.keys = set()
        self.headings = 0
        self.errors = []
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if "id" in attrs:
            if attrs["id"] in self.ids:
                self.duplicates.append(attrs["id"])
            self.ids.add(attrs["id"])
        for attr in ("href", "src"):
            if attrs.get(attr):
                self.links.append(attrs[attr])
        for attr in ("data-i18n", "data-i18n-aria"):
            if attrs.get(attr):
                self.keys.add(attrs[attr])
        if tag == "h1":
            self.headings += 1
        if tag == "img" and "alt" not in attrs:
            self.errors.append("Image without alt text")
        if tag == "button" and attrs.get("type") != "button":
            self.errors.append("Button needs an explicit type")


def main():
    errors = []
    parsed = {}

    def page(path):
        if path not in parsed:
            parsed[path] = Page(path)
        return parsed[path]

    def check_page(path):
        current = page(path)
        name = path.parent.name
        errors.extend(f"{name}: {e}" for e in current.errors)
        if current.headings != 1:
            errors.append(f"{name}: the page needs exactly one h1")
        for ident in current.duplicates:
            errors.append(f"{name}: duplicate HTML id: {ident}")
        for link in current.links:
            # Template holes in the landing page are filled in by its script.
            if "{{" in link:
                continue
            parts = urlsplit(link)
            if parts.scheme or parts.netloc:
                continue
            if parts.path.startswith("/"):
                errors.append(f"{name}: use repository-relative URLs: {link}")
                continue
            target = (path.parent / unquote(parts.path)).resolve() if parts.path else path
            if not target.is_relative_to(DOCS.resolve()):
                errors.append(f"{name}: link escapes the publishing directory: {link}")
                continue
            if target.is_dir():
                target /= "index.html"
            if not target.is_file():
                errors.append(f"{name}: missing local target: {link}")
                continue
            if parts.fragment and target.suffix == ".html" and unquote(parts.fragment) not in page(target).ids:
                errors.append(f"{name}: missing manuscript or page anchor: {link}")
        return current

    draft = check_page(DRAFT)
    landing = check_page(LANDING)
    landing_css = (DOCS / "assets/css/landing.css").read_text(encoding="utf-8")
    if "prefers-reduced-motion" not in landing_css:
        errors.append("landing: reduced-motion styles are missing")

    css = (DOCS / "assets/css/discover.css").read_text(encoding="utf-8")
    if "prefers-reduced-motion" not in css or "focus-visible" not in css:
        errors.append("Reduced-motion or visible keyboard-focus styles are missing")
    js = (DOCS / "assets/js/discover.js").read_text(encoding="utf-8")
    for key in sorted(draft.keys):
        if not re.search(r"\b" + re.escape(key) + r"\s*:", js):
            errors.append(f"Missing English translation: {key}")
    if not (DOCS / ".nojekyll").is_file():
        errors.append("The static publishing directory needs .nojekyll")
    report = {
        "pages": [str(p.relative_to(ROOT)) for p in (DRAFT, LANDING)],
        "local_links_checked": len(draft.links) + len(landing.links),
        "translation_keys_checked": len(draft.keys),
        "errors": errors,
    }
    print(json.dumps(report, indent=2, ensure_ascii=False))
    raise SystemExit(1 if errors else 0)


if __name__ == "__main__":
    main()
