const maxRotateFunction: any = function (A) {
    if (A.length === 0)
        return 0;
    let sum: any = 0, iteration: any = 0, len: any = A.length;
    for (let i: number = 0; i < len; i++) {
        sum += A[i];
        iteration += A[i] * i;
    }
    let max: number = iteration;
    for (let j: number = 1; j < len; j++) {
        // for next iteration lets remove one entry value
        // of each entry and the prev 0 * k
        iteration = iteration - sum + A[j - 1] * len;
        max = Math.max(max, iteration);
    }
    return max;
};
