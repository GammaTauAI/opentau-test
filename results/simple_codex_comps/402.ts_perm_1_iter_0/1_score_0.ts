const triangularSum: (nums: Array<number>) => number = function (nums) {
    while (nums.length > 1) {
        const arr: Array<number> = [];
        for (let i = 0, n = nums.length; i < n - 1; i++) {
            arr.push((nums[i] + nums[i + 1]) % 10);
        }
        nums = arr;
    }
    return nums[0];
};
