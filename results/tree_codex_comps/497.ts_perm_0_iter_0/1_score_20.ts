const getMaximumXor: (nums: any, maximumBit: any) => any[] = function (nums, maximumBit) {
    const n: number = nums.length;
    let xor: number = nums.reduce((ac, e) => ac ^ e, 0);
    let limit: number = 2 ** maximumBit - 1;
    const res: any[] = [];
    for (let i: number = n - 1; i >= 0; i--) {
        const tmp: number = limit ^ xor;
        res.push(tmp);
        xor ^= nums[i];
    }
    return res;
};
