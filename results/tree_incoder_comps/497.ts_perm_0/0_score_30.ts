const getMaximumXor: any = function (nums, maximumBit) {
    const n: any = nums.length;
    let xor: any = nums.reduce((ac, e) => ac ^ e, 0);
    let limit: any = 2 ** maximumBit - 1;
    const res: any = [];
    for (let i: number = n - 1; i >= 0; i--) {
        const tmp: any = limit ^ xor;
        res.push(tmp);
        xor ^= nums[i];
    }
    return res;
};
