#!/usr/bin/env python3

import argparse
import json
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


class Handler(BaseHTTPRequestHandler):
    server_version = "DunexBackend/1.0"

    def do_GET(self):
        payload = None
        status = 200

        if self.path in {"/", "/health"}:
            payload = {
                "ok": True,
                "service": "dunex-local-backend",
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
        elif self.path == "/api/config":
            payload = {
                "frontendUrl": self.server.frontend_url,
                "smokeUrl": f"{self.server.frontend_url}smoke-test.html",
                "game": "Quest Realm",
            }
        else:
            status = 404
            payload = {"ok": False, "error": "not_found"}

        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        return


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=5501)
    parser.add_argument("--frontend-url", default="http://127.0.0.1:5500/")
    args = parser.parse_args()

    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    server.frontend_url = args.frontend_url
    server.serve_forever()


if __name__ == "__main__":
    main()