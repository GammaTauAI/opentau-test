const minimizeTheDifference: (mat: any, target: any) => any = function (mat, target) {
    const m: number = mat.length, n: number = mat[0].length;
    const dp: any = Array.from({ length: m }, () => Array(70 * 70).fill(-1));
    return fn(0, 0);
    function fn(row: any, sum: any): any {
        if (row === m)
            return Math.abs(target - sum);
        if (dp[row][sum] !== -1)
            return dp[row][sum];
        let res: any = Number.MAX_SAFE_INTEGER;
        for (let j: number = 0; j < n; j++) {
            res = Math.min(res, fn(row + 1, sum + mat[row][j]));
        }
        return (dp[row][sum] = res);
    }
};
