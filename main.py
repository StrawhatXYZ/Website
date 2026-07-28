"""Fallback WSGI app for App Engine standard.

Every real route is served directly by the static handlers in app.yaml
without ever reaching this file. This only runs for a URL that doesn't
match any static handler, so it can return the site's actual 404 page
with a correct HTTP 404 status (a pure static-handler setup can't do that).
"""

from pathlib import Path

NOT_FOUND_PAGE = Path(__file__).parent / "dist" / "404.html"


def app(environ, start_response):
    body = NOT_FOUND_PAGE.read_bytes() if NOT_FOUND_PAGE.exists() else b"Not Found"
    start_response(
        "404 Not Found",
        [
            ("Content-Type", "text/html; charset=utf-8"),
            ("Content-Length", str(len(body))),
        ],
    )
    return [body]
