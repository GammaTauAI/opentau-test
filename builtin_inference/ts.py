import os
import json
import time
import socket
import base64
import subprocess
from typing import Tuple


def builtin_typescript_infer(filename: str, client_path: str) -> Tuple[bool, str, int]:
    """
    runs the builtin type inference on the given typescript file,
    returns whether it was able to type check the file and
    the quality of the types it inferred. also returns the code
    that was inferred.
    """
    def sendrecv_sock(sock, data):
        s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        s.connect(sock)
        s.sendall(data)

        data = s.recv(122880)  # reaaal bad way to do this
        res = data.decode('utf-8')
        s.close()
        return res

    # open file, get bytes
    starting_code = base64.b64encode(
        open(filename, 'rb').read()).decode("utf-8")

    proj_path = '/'.join(client_path.split('/')[0:-2])
    npm_server_path = f'{proj_path}/ts-ast'

    # run the server
    this_pid = os.getpid()
    sock_path = f"/tmp/test-sock-{this_pid}.sock"
    # close socket if it exists
    if os.path.exists(sock_path):
        os.remove(sock_path)
    cmd = f"npm start {sock_path} {this_pid}"
    proc = subprocess.Popen(
        cmd.split(), cwd=npm_server_path, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(3)  # wait for the server to start. really bad way to do this

    # req to type-infer
    req = {
        "cmd": "weave",
        "text": starting_code,
        "nettle": starting_code,
        "level": 0,
    }

    # send the request
    typeinf_code = json.loads(sendrecv_sock(
        sock_path, json.dumps(req).encode('utf-8')))["text"]
    decdoded_code = base64.b64decode(typeinf_code).decode('utf-8')

    # now we shall get the quality of the types
    req = {
        "cmd": "check",
        "text": typeinf_code,
        "original": typeinf_code,
    }

    # send the request
    res = json.loads(sendrecv_sock(
        sock_path, json.dumps(req).encode('utf-8')))
    did_complete = bool(res["text"])
    score = int(res["score"])

    if not did_complete:
        return did_complete, decdoded_code,  score

    # now we typecheck the code, also close the server
    proc.kill()
    # write to temp path
    tmp_dir_path = f"/tmp/builtin-typeinf-{this_pid}-{filename.split('/')[-1]}"
    with open(f"{tmp_dir_path}", 'w') as f:
        f.write(decdoded_code)

    cmd = f"tsc --allowJs --checkJs --noEmit --target es2022 {tmp_dir_path}"
    proc = subprocess.Popen(
        cmd.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    _, _ = proc.communicate()
    did_typecheck = proc.returncode == 0
    return did_typecheck, decdoded_code, score
