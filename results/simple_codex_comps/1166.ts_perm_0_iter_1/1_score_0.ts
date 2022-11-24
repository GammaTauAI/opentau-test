const minCut: (s: string) => number = function (s) {
    const n: number = s.length;
    if (n <= 1)
        return 0;
    const dp: number [] = new Array(n).fill(0);
    for (let i = 1; i < n; i++)
        dp[i] = i;
    for (let i = 1; i < n; i++) {
        // odd
        for (let start = i, end = i; end < n && start >= 0 && s[end] === s[start]; start--, end++) {
            dp[end] = Math.min(dp[end], start === 0 ? 0 : dp[start - 1] + 1);
        }
        // even
        for (let start = i - 1, end = i; end < n && start >= 0 && s[end] === s[start]; start--, end++) {
            dp[end] = Math.min(dp[end], start === 0 ? 0 : dp[start - 1] + 1);
        }
    }
    return dp[n - 1];
};
