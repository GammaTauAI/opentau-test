const findLongestChain: any = function (pairs) {
    pairs.sort((a, b) => a[1] - b[1]);
    let end: any = pairs[0][1], res: any = 1;
    for (let i: number = 1, len: any = pairs.length; i < len; i++) {
        if (pairs[i][0] > end) {
            res++;
            end = pairs[i][1];
        }
    }
    return res;
};
