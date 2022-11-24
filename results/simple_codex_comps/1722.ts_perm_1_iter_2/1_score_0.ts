const maxResult: (nums: Array<number>, k: number) => number = function (nums, k) {
    const n: number = nums.length;
    const f: Array<number> = Array(n).fill(0);
    f[0] = nums[0];
    const q: Array<number> = [0];
    for (let i = 1; i < n; ++i) {
        while (i - q[0] > k) {
            q.shift();
        }
        f[i] = f[q[0]] + nums[i];
        while (q.length && f[i] >= f[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);
    }
    return f[n - 1];
};
