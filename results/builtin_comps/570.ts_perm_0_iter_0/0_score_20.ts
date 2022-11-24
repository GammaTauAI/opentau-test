const uniquePaths: (m: any, n: any) => any = function (m, n) {
    if (m === 0 || n === 0)
        return 0;
    const dp: any[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(1));
    dp[0][1] = dp[1][0] = 1;
    for (let i: number = 1; i <= m; i++) {
        for (let j: number = 1; j <= n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
};
