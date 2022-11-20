const maxSumTwoNoOverlap: any = function (A, L, M) {
    for (let i: any = 1, len: any = A.length; i < len; i++) {
        A[i] += A[i - 1];
    }
    let LMax: any = A[L - 1], MMax: any = A[M - 1], res: any = A[L + M - 1];
    for (let i: any = L + M, len: any = A.length; i < len; i++) {
        LMax = Math.max(LMax, A[i - M] - A[i - M - L]);
        MMax = Math.max(MMax, A[i - L] - A[i - M - L]);
        res = Math.max(res, Math.max(LMax + A[i] - A[i - M], MMax + A[i] - A[i - L]));
    }
    return res;
};
