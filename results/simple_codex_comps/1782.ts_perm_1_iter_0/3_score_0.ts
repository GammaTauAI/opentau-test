var numberOfPairs: (nums: Array<number>) => Array<number> = function (nums) {
    const n: number = nums.length;
    let res: number = 0;
    const hash: { [key: number]: number } = {};
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
