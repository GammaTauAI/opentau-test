const maxSumRangeQuery: (nums: (number)[], requests: (number[])[]) => number = function (nums, requests) {
    let res: number = 0;
    const mod: number = 10 ** 9 + 7, n: number = nums.length;
    const count: number[] = Array(n).fill(0);
    for (let r of requests) {
        count[r[0]] += 1;
        if (r[1] + 1 < n)
            count[r[1] + 1] -= 1;
    }
    for (let i = 1; i < n; i++)
        count[i] += count[i - 1];
    nums.sort((a, b) => a - b);
    count.sort((a, b) => a - b);
    for (let i = 0; i < n; ++i)
        res = (res + nums[i] * count[i]) % mod;
    return res;
};
