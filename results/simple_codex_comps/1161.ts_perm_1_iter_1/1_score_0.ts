const shortestSubarray: (nums: Array<number>, k: number) => number = function (nums, k) {
    const q: Array<number> = [], n: number = nums.length;
    let res: number = Infinity, sum: number = 0;
    const prefix: Array<number> = [];
    for (let i = 0; i < n; i++) {
        sum += nums[i];
        prefix.push(sum);
        if (sum >= k)
            res = Math.min(res, i + 1);
    }
    for (let i = 0; i < n; i++) {
        while (q.length && prefix[i] <= prefix[q[q.length - 1]])
            q.pop();
        while (q.length && prefix[i] - prefix[q[0]] >= k) {
            res = Math.min(res, i - q[0]);
            q.shift();
        }
        q.push(i);
    }
    return res === Infinity ? -1 : res;
};
