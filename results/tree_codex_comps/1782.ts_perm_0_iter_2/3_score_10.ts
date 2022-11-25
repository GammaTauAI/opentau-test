var numberOfPairs: (nums: any) => number[] = function (nums) {
    const n: any = nums.length;
    let res: number = 0;
    const hash: {} = {};
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
