const getMaximumXor: (nums: number[], maxBit: number) => number[] = 
function (nums, maxBit) {
    const n: number = nums.length;
    let xor: number = nums.reduce((ac, e) => ac ^ e, 0);
    let limit: number = 2 ** maxBit - 1;
    const res: number[] = [];
    for (let i = n - 1; i >= 0; i--) {
        const tmp: number = limit ^ xor;
        res.push(tmp);
        xor ^= nums[i];
    }
    return res;
};
