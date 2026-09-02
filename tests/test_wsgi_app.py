import unittest
from main import app, NOT_FOUND_PAGE


class TestWsgiApp(unittest.TestCase):
    def test_wsgi_404_handler(self):
        status_captured = []
        headers_captured = []

        def start_response(status, headers):
            status_captured.append(status)
            headers_captured.append(headers)

        environ = {
            "REQUEST_METHOD": "GET",
            "PATH_INFO": "/some-non-existent-page",
        }

        result = app(environ, start_response)

        self.assertEqual(status_captured, ["404 Not Found"])
        headers_dict = dict(headers_captured[0])
        self.assertEqual(headers_dict.get("Content-Type"), "text/html; charset=utf-8")
        self.assertIn("Content-Length", headers_dict)
        self.assertEqual(len(result), 1)


if __name__ == "__main__":
    unittest.main()
