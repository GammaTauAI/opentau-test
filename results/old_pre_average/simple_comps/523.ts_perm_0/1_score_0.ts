const findMaxConsecutiveOnes: (arr: number[]) => number = function (nums) {
    let max: number = 0, k: number = 1;
    const zeroIndex: number[] = [];
    for (let l = 0, h = 0; h < nums.length; h++) {
        if (nums[h] === 0)
            zeroIndex.push(h);
        if (zeroIndex.length > k)
            l = zeroIndex.shift() + 1;
        max = Math.max(max, h - l + 1);
    }
    return max;
};
