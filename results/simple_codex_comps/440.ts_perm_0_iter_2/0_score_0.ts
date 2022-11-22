const maxRotateFunction: (A: number[]) => number = function (A) { // Substitute _hole_ with the correct type
    if (A.length === 0)
        return 0;
    let sum: number = 0, iteration: number = 0, len: number = A.length; // Substitute _hole_ with the correct type
    for (let i = 0; i < len; i++) {
        sum += A[i];
        iteration += A[i] * i;
    }
    let max: number = iteration; // Substitute _hole_ with the correct type
    for (let j = 1; j < len; j++) {
        // for next iteration lets remove one entry value
        // of each entry and the prev 0 * k
        iteration = iteration - sum + A[j - 1] * len;
        max = Math.max(max, iteration);
    }
    return max;
};
