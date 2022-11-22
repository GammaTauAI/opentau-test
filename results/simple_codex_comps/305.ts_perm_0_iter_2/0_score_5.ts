const maxSumTwoNoOverlap: (x: any[], y: number, z: number) => number = function (A, L, M) {
    for (let i = 1, len = A.length; i < len; i++) {
        A[i] += A[i - 1];
    }
    let LMax: number = A[L - 1], MMax: number = A[M - 1], res: number = A[L + M - 1];
    for (let i = L + M, len = A.length; i < len; i++) {
        LMax = Math.max(LMax, A[i - M] - A[i - M - L]);
        MMax = Math.max(MMax, A[i - L] - A[i - M - L]);
        res = Math.max(res, Math.max(LMax + A[i] - A[i - M], MMax + A[i] - A[i - L]));
    }
    return res;
};
