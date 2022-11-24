import os
import time
import sys
import json
import subprocess
import json
import socket
import base64

from typing import Dict, List, Tuple, Type, TypeVar

# TODO:
# - run tests with code with comments and without


if len(sys.argv) > 6 or len(sys.argv) < 5:
    print(
        f"USAGE: {sys.argv[0]} test-file-dir/ perm.json client.bin out/results.csv")
    sys.exit(1)

_TEST_DIR = sys.argv[1]
_PERM_JSON = sys.argv[2]
_CLIENT_PATH = sys.argv[3]
_RESULTS_PATH = sys.argv[4]
if len(sys.argv) == 6:
    _SAVE_DIR = sys.argv[5]
else:
    _SAVE_DIR = '/tmp/deleteme'
    # create the directory if it doesn't exist
    if not os.path.exists(_SAVE_DIR):
        os.makedirs(_SAVE_DIR)

_CODEX_TOKEN = os.environ['CODEX_TOKEN']
_CSV_HEADER = f'file,model,language,strategy,retries,num_comp,temp,status,quality\n'
_STOP_AT = 30  # we get a max of 30 type-checkable comps

if _CODEX_TOKEN is None:
    print("please set CODEX_TOKEN env var")
    sys.exit(1)


T = TypeVar('T', bound='Permutation')


class Permutation:
    def __init__(self, n: int, r: int, temp: float, strategy: str, model: str) -> None:
        assert model == 'codex' or model == 'incoder' or model == 'builtin'
        self.n = n
        self.r = r
        self.temp = temp
        self.strategy = strategy
        self.model = model

    @classmethod
    def deserialize(cls: Type[T], s: Dict) -> T:
        return cls(**s)

    def __repr__(self):
        return f"Permutation(n={self.n}, r={self.r}, temp={self.temp}, strategy={self.strategy}, model={self.model})"


def run_with_timeout(cmd: List[str], timeout_sec: int) -> subprocess.Popen:
    # uses Popen to run a command with a timeout
    proc = subprocess.Popen(
        cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    # poll every 0.25 seconds
    for _ in range(timeout_sec * 4):
        time.sleep(0.25)
        if proc.poll() is not None:
            return proc
    # kill the process
    proc.kill()
    return proc


def builtin_typescript_infer(filename: str) -> Tuple[bool, str, int]:
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

    proj_path = '/'.join(_CLIENT_PATH.split('/')[0:-2])
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
    stdout, stderr = proc.communicate()
    did_typecheck = proc.returncode == 0
    return did_typecheck, decdoded_code, score


def main() -> None:
    d = os.fsencode(_TEST_DIR)

    files = [os.fsdecode(f) for f in os.listdir(d)]

    with open(_PERM_JSON) as f:
        # this looks like:
        # {
        #  "iters": 5,
        #  "permutations": [
        #   ...
        #  ]
        # }
        j = json.load(f)
        perms = [Permutation.deserialize(i) for i in j['permutations']]
        iters = j['iters']

    for it in range(iters):
        # add the iter before the extension
        RESULTS_PATH = _RESULTS_PATH.replace('.csv', f'_iter_{it}.csv')
        print(
            f"#################### ITER ({it+1}/{iters}) ####################")
        with open(RESULTS_PATH, 'w') as write_file:
            write_file.write(_CSV_HEADER)
            iteration = 1
            max_iterations = len(files) * len(perms)
            for f in files:
                # get full path of file
                filepath = os.path.abspath(os.path.join(_TEST_DIR, f))
                lang = f.split(".")[-1]

                for p_i, p in enumerate(perms):
                    dirname = f"{f}_perm_{p_i}_iter_{it}"
                    outdir = os.path.join(_SAVE_DIR, dirname)
                    # create the directory
                    os.makedirs(outdir, exist_ok=True)

                    model_cmd = ""  # default is codex, do nothing extra
                    if p.model == 'incoder':
                        # on incoder, we point to our http server
                        model_cmd = " --endpoint http://127.0.0.1:8000 --disable-rate-limit"

                    print(
                        f"({iteration}/{max_iterations}): running {filepath} with {p.__repr__()}")

                    if p.model != "builtin":
                        cmd = f"{_CLIENT_PATH} -t {_CODEX_TOKEN} --file {filepath} --output {outdir} --lang {lang} --retries {p.r} --n {p.n} --temp {p.temp} --strategy {p.strategy} --stop-at {_STOP_AT}{model_cmd}"
                        cmd_ = cmd.split()
                        sp = run_with_timeout(cmd_, 60 * 15)  # 15 minutes
                        status = sp.wait()

                        out = sp.stdout.read().decode("utf-8")
                        err = sp.stderr.read().decode("utf-8")

                        if 'Rate limited' in err or 'rate limit' in err:
                            print(f"got rate limited. sleeping")
                            time.sleep(120)
                            sp = run_with_timeout(cmd_, 60 * 15)  # 15 minutes
                            status = sp.wait()
                            out = sp.stdout.read().decode("utf-8")
                            err = sp.stderr.read().decode("utf-8")
                            if 'Rate limited' in err or 'rate limit' in err:
                                print(f"got rate limited again!!!!")
                                time.sleep(120)
                    else:
                        if lang == "ts":
                            err = ""
                            did_typecheck, output, score = builtin_typescript_infer(
                                filepath)
                            out = output
                            if did_typecheck:
                                status = 0
                                # write code to outdir
                                with open(f"{outdir}/0_score_{score}.ts", 'w') as out_f:
                                    out_f.write(output)
                            else:
                                status = 1

                        else:
                            assert False, f"lang {lang} not supported"

                    quality = "NA"
                    if status == 0:
                        comp = out.split("completed:\n")[-1]
                        print(f"got completion: {comp}")
                        print(f"status: {status}")
                        # we get the quality from the file names in the output dir

                        q_files = os.listdir(outdir)
                        # if we sort the files by name, the first one is the best
                        q_files.sort()
                        quality = q_files[0].split("_")[-1].split(".")[0]

                    if status != 0:
                        # print stderr
                        print(f"stderr: {err}")
                        print(f"stdout: {out}")
                        print(f"status: {status}")

                    if status == 0:
                        status_str = "success"
                    elif status == -9:
                        status_str = "timeout"
                    else:
                        status_str = "failure"

                    row = f'{f},{p.model},{lang},{p.strategy},{p.r},{p.n},{p.temp},{status_str},{quality}\n'
                    print(f"writing row: {row}")
                    write_file.write(row)

                    # remove all /tmp/codex-*-* files
                    cmd = "rm -rf /tmp/codex-*-*"
                    cmd_ = cmd.split()
                    sp = subprocess.Popen(
                        cmd_, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    status = sp.wait()
                    iteration += 1


if __name__ == '__main__':
    main()
