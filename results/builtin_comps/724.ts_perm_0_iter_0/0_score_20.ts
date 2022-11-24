const getSumAbsoluteDifferences: (nums: any) => any[] = function (nums) {
    const res: any[] = [], n: any = nums.length;
    let sum: number = 0;
    for (let first: any = nums[0], i: number = 1; i < n; i++) {
        sum += nums[i] - first;
    }
    res[0] = sum;
    for (let i: number = 1; i < n; i++) {
        res[i] =
            res[i - 1] -
                (nums[i] - nums[i - 1]) * (n - i - 1) +
                (nums[i] - nums[i - 1]) * (i - 1);
    }
    return res;
};
