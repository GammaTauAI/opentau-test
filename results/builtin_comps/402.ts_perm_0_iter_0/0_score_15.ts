const triangularSum: (nums: any) => any = function (nums) {
    while (nums.length > 1) {
        const arr: any[] = [];
        for (let i: number = 0, n: any = nums.length; i < n - 1; i++) {
            arr.push((nums[i] + nums[i + 1]) % 10);
        }
        nums = arr;
    }
    return nums[0];
};
