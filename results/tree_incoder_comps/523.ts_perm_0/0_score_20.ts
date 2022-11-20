const findMaxConsecutiveOnes: any = function (nums) {
    let max: any = 0, k: any = 1;
    const zeroIndex: any = [];
    for (let l: number = 0, h: number = 0; h < nums.length; h++) {
        if (nums[h] === 0)
            zeroIndex.push(h);
        if (zeroIndex.length > k)
            l = zeroIndex.shift() + 1;
        max = Math.max(max, h - l + 1);
    }
    return max;
};
