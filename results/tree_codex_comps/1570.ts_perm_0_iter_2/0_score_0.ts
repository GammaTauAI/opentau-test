const minimumTimeRequired: (jobs: number[], k: number) => number = function (jobs, k) {
    const workers: number[] = Array(k).fill(0);
    let res: number = Infinity;
    const n: number = jobs.length;
    dfs(0);
    return res;
    function dfs(idx: number): void {
        if (idx === n) {
            res = Math.min(res, Math.max(...workers));
            return;
        }
        const visited: Set<number> = new Set();
        const e: number = jobs[idx];
        for (let i: number = 0; i < k; i++) {
            if (visited.has(workers[i]))
                continue;
            if (workers[i] + e >= res)
                continue;
            visited.add(workers[i]);
            workers[i] += e;
            dfs(idx + 1);
            workers[i] -= e;
            if (workers[i] === 0)
                break;
        }
    }
};
