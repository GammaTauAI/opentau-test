const triangularSum: (nums: number[]) => number = function (nums) {
    while (nums.length > 1) {
        const arr: number[] = [];
        for (let i = 0; i < (nums.length - 1); i++) {
            arr.push(nums[i] % 10 + nums[i + 1] % 10);
        }
        nums = arr;
    }
    return nums[0];
};
