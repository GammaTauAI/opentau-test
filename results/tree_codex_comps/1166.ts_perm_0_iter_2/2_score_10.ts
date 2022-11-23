const minCut: any = function (s) {
    const n: number = s.length;
    if (n <= 1)
        return 0;
    const dp: any = new Array(n).fill(0);
    for (let i: number = 1; i < n; i++)
        dp[i] = i;
    for (let i: number = 1; i < n; i++) {
        // odd
        for (let start: number = i, end: number = i; end < n && start >= 0 && s[end] === s[start]; start--, end++) {
            dp[end] = Math.min(dp[end], start === 0 ? 0 : dp[start - 1] + 1);
        }
        // even
        for (let start: number = i - 1, end: number = i; end < n && start >= 0 && s[end] === s[start]; start--, end++) {
            dp[end] = Math.min(dp[end], start === 0 ? 0 : dp[start - 1] + 1);
        }
    }
    return dp[n - 1];
};
