#!/usr/bin/env python3

import argparse
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=5500)
    parser.add_argument("--root", required=True)
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    handler = partial(SimpleHTTPRequestHandler, directory=root)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    server.serve_forever()


if __name__ == "__main__":
    main()