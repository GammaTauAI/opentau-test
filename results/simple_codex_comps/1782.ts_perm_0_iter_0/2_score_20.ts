var numberOfPairs: any = function (nums) {
    const n: any = nums.length;
    let res: any = 0;
    const hash: any = {};
    for (const e of nums) {
        if (hash[e] == null)
            hash[e] = 0;
        hash[e]++;
        if (hash[e] === 2) {
            res++;
            hash[e] = 0;
        }
    }
    return [res, n - res * 2];
};
