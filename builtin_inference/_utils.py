import socket


def sendrecv_sock(sock, data) -> str:
    s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    s.connect(sock)
    s.sendall(data)

    data = s.recv(122880)  # reaaal bad way to do this
    res = data.decode('utf-8')
    s.close()
    return res
