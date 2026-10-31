#!/usr/bin/env python3
"""Preview the static site under the same repository prefix as GitHub Pages."""

from __future__ import annotations

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

DOCS = Path(__file__).resolve().parents[1] / "docs"
PREFIX = "/enterprise-morphogenesis"


class PreviewHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if urlsplit(self.path).path == "/":
            self.send_response(302)
            self.send_header("Location", PREFIX + "/discover/")
            self.end_headers()
            return
        super().do_GET()

    def translate_path(self, path):
        parts = urlsplit(path)
        if parts.path == PREFIX or parts.path.startswith(PREFIX + "/"):
            path = urlunsplit(("", "", parts.path[len(PREFIX):] or "/", parts.query, parts.fragment))
        return super().translate_path(path)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4173)
    args = parser.parse_args()
    handler = partial(PreviewHandler, directory=str(DOCS))
    with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        print(f"Local: http://127.0.0.1:{args.port}{PREFIX}/discover/", flush=True)
        print("Full paper: " + f"http://127.0.0.1:{args.port}{PREFIX}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
