var numberOfPairs: (nums: number[]) => [number, number] = function (nums) {
    const n: number = nums.length;
    let res: number = 0;
    const hash: { [e: number]: number; } = {};
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
