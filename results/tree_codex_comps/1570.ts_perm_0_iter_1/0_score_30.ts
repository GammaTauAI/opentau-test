const minimumTimeRequired: (arg0: number[], arg1: number) => any = function (jobs, k) {
    const workers: number[] = Array(k).fill(0);
    let res: any = Infinity;
    const n: number = jobs.length;
    dfs(0);
    return res;
    function dfs(idx: any): any {
        if (idx === n) {
            res = Math.min(res, Math.max(...workers));
            return;
        }
        const visited: any = new Set();
        const e: any = jobs[idx];
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
