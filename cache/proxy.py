#!/bin/python3

# HTTP caching proxy using sqlite3 as a cache backend

import http.server
import socketserver
import sqlite3
import requests
import hashlib

db = sqlite3.connect('cache.db')
cursor = db.cursor()


class HTTPServer_RequestHandler(http.server.BaseHTTPRequestHandler):
    def do_DELETE(self):  # way of clearing a specific cache entry
        # get request body
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        jsonData = body.decode('utf-8')
        sha256 = hashlib.sha256(jsonData.encode('utf-8')).hexdigest()

        # delete from cache
        cursor.execute('DELETE FROM cache WHERE sha256=?', (sha256,))
        db.commit()

        # send response to client
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write('{"success": true}'.encode('utf-8'))
        return

    def do_POST(self):
        # get request body
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        jsonData = body.decode('utf-8')
        sha256 = hashlib.sha256(jsonData.encode('utf-8')).hexdigest()

        # check if request is in cache
        cursor.execute('SELECT * FROM cache WHERE sha256=?', (sha256,))
        result = cursor.fetchone()
        if result is None:
            print('cache miss')
            # get auth token
            auth_token = self.headers['Authorization']

            # send request to codex api
            response = requests.post(
                "https://api.openai.com/v1/edits",
                headers={'Authorization': auth_token,
                         'Content-Type': 'application/json'},
                data=jsonData
            )

            # add to cache
            cursor.execute(
                'INSERT INTO cache VALUES (?, ?, ?)', (sha256, jsonData, response.text))
            db.commit()

            # send response to client
            self.send_response(response.status_code)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(response.text.encode('utf-8'))
        else:
            # send response from cache to client
            print('cache hit')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(result[2].encode('utf-8'))
        return


def run():
    cursor.execute(
        'CREATE TABLE IF NOT EXISTS cache (sha256 text PRIMARY KEY, request text, response text)')
    db.commit()

    # Create an object of the above class
    handler_object = HTTPServer_RequestHandler

    # Create a TCP/IP socket
    my_server = socketserver.TCPServer(("", 8080), handler_object)
    my_server.allow_reuse_address = True

    # Start the server
    my_server.serve_forever()


if __name__ == "__main__":
    run()
