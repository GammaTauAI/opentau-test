const maxProductDifference: any = function (nums) {
    nums.sort((a, b) => a - b);
    const n: any = nums.length;
    return nums[n - 1] * nums[n - 2] - nums[0] * nums[1];
};