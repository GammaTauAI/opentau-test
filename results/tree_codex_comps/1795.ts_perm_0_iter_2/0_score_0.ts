const minTransfers: (arg: number[][]) => number = function (transactions) {
    if (transactions.length === 0)
        return 0;
    const map: Map<number, number> = new Map();
    for (let [a, b, m] of transactions) {
        if (!map.has(a))
            map.set(a, 0);
        if (!map.has(b))
            map.set(b, 0);
        map.set(a, map.get(a) - m);
        map.set(b, map.get(b) + m);
    }
    const debts: number[] = [...map.values()].filter((debt) => debt !== 0);
    const len: number = debts.length;
    const dfs: (arg0: number, arg1: number[]) => number = (id, d) => {
        if (id >= d.length)
            return 0;
        const cur: number = d[id];
        if (cur === 0)
            return dfs(id + 1, d);
        let res: number = Infinity;
        for (let i: number = id + 1; i < len; i++) {
            const next: number = d[i];
            if (cur * next < 0) {
                d[i] = cur + next;
                res = Math.min(res, 1 + dfs(id + 1, d));
                d[i] = next;
                if (next + cur === 0)
                    break;
            }
        }
        return res;
    };
    return dfs(0, debts);
};
