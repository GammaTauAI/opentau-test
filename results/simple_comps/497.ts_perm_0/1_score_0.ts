const getMaximumXor: (nums: number[] & Int32Array, numBit: number) => number[] =
    function (nums, numBit) {
    const n: number = nums.length;
    let xor: number = nums.reduce((ac, e) => ac ^ e, 0);
    let tmpLimit: number = 2 ** numBit - 1;
    const res: number[] = [];
    for (let i = n - 1; i >= 0; i--) {
        const tmp: number = tmpLimit ^ xor;
        res.push(tmp);
        xor ^= nums[i];
    }
    return res;
};
