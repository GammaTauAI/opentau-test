const minDifference: (nums: any, queries: any) => any[] = function (nums, queries) {
    const res: any[] = [], cnt: any[][] = Array.from({ length: nums.length + 1 }, () => Array(101).fill(0));
    for (let i: number = 0; i < nums.length; ++i) {
        for (let j: number = 1; j <= 100; ++j) {
            cnt[i + 1][j] = cnt[i][j] + (nums[i] == j);
        }
    }
    for (let i: number = 0; i < queries.length; ++i) {
        let prev: number = 0, delta: number = Infinity;
        for (let j: number = 1; j <= 100; ++j)
            if (cnt[queries[i][1] + 1][j] - cnt[queries[i][0]][j]) {
                delta = Math.min(delta, prev == 0 ? Infinity : j - prev);
                prev = j;
            }
        res.push(delta == Infinity ? -1 : delta);
    }
    return res;
};
