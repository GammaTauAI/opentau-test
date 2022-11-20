const shortestSubarray: any = function (nums, k) {
    const q: any = [], n: any = nums.length;
    let res: any = Infinity, sum: any = 0;
    const prefix: any = [];
    for (let i: number = 0; i < n; i++) {
        sum += nums[i];
        prefix.push(sum);
        if (sum >= k)
            res = Math.min(res, i + 1);
    }
    for (let i: number = 0; i < n; i++) {
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
