const racecar: Function = function (target) {
    const dp: any = new Array(target + 1).fill(0);
    for (let i: number = 1; i <= target; i++) {
        dp[i] = Number.MAX_VALUE;
        let m: number = 1, j: any = 1;
        for (; j < i; j = (1 << ++m) - 1) {
            for (let q: number = 0, p: number = 0; p < j; p = (1 << ++q) - 1) {
                dp[i] = Math.min(dp[i], m + 1 + q + 1 + dp[i - (j - p)]);
            }
        }
        dp[i] = Math.min(dp[i], m + (i == j ? 0 : 1 + dp[j - i]));
    }
    return dp[target];
};
