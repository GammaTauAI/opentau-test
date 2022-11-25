const movesToChessboard: (b: any) => any = function (b) {
    let N: any = b.length, rowSum: any = 0, colSum: any = 0, rowSwap: any = 0, colSwap: any = 0;
    for (let i: number = 0; i < N; ++i)
        for (let j: number = 0; j < N; ++j)
            if ((b[0][0] ^ b[i][0] ^ b[0][j] ^ b[i][j]) === 1)
                return -1;
    for (let i: number = 0; i < N; ++i) {
        rowSum += b[0][i];
        colSum += b[i][0];
        if (b[i][0] === i % 2)
            rowSwap++;
        if (b[0][i] === i % 2)
            colSwap++;
    }
    if (rowSum !== (N / 2) >> 0 && rowSum !== ((N + 1) / 2) >> 0)
        return -1;
    if (colSum !== (N / 2) >> 0 && colSum !== ((N + 1) / 2) >> 0)
        return -1;
    if (N % 2 === 1) {
        if (colSwap % 2 === 1)
            colSwap = N - colSwap;
        if (rowSwap % 2 === 1)
            rowSwap = N - rowSwap;
    }
    else {
        colSwap = Math.min(N - colSwap, colSwap);
        rowSwap = Math.min(N - rowSwap, rowSwap);
    }
    return (colSwap + rowSwap) / 2;
};
