const getMaximumXor: (nums: Array<number>, maximumBit: number) => Array<number> = function (nums, maximumBit) {
    const n: number = nums.length;
    let xor: number = nums.reduce((ac, e) => ac ^ e, 0);
    let limit: number = 2 ** maximumBit - 1;
    const res: Array<number> = [];
    for (let i = n - 1; i >= 0; i--) {
        const tmp: number = limit ^ xor;
        res.push(tmp);
        xor ^= nums[i];
    }
    return res;
};
