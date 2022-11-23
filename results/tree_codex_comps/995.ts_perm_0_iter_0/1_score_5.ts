const findLongestChain: (pairs: any[]) => number = function (pairs) {
    pairs.sort((a, b) => a[1] - b[1]);
    let end: number = pairs[0][1], res: number = 1;
    for (let i: number = 1, len: number = pairs.length; i < len; i++) {
        if (pairs[i][0] > end) {
            res++;
            end = pairs[i][1];
        }
    }
    return res;
};
