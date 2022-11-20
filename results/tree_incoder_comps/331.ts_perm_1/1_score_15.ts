const countSubarrays: any = function (nums, k) {
    let sum: any = 0;
    let res: any = 0;
    for (let i: number = 0, j: number = 0, n: any = nums.length; i < n; i++) {
        sum += nums[i];
        while (sum * (i - j + 1) >= k)
            sum -= nums[j++];
        res += i - j + 1;
    }
    return res;
};
