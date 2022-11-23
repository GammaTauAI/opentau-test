const triangularSum: (a: number[]) => number = function (nums) {
    while (nums.length > 1) {
        const arr: number[] = [];
        for (let i: number = 0, n: number = nums.length; i < n - 1; i++) {
            arr.push((nums[i] + nums[i + 1]) % 10);
        }
        nums = arr;
    }
    return nums[0];
};
