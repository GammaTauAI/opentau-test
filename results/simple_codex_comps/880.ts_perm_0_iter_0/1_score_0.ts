const totalFruit: (fruits: string[]) => number = function (fruits) {
    let n: number = fruits.length;
    let i: number = 0, j: number = 0;
    const map: Map<string, number> = new Map();
    let res: number = 0;
    for (; j < n; j++) {
        const e: string = fruits[j];
        if (!map.has(e))
            map.set(e, 1);
        else
            map.set(e, map.get(e) + 1);
        while (map.size > 2 && i < n) {
            const tmp: string = fruits[i++];
            map.set(tmp, map.get(tmp) - 1);
            if (map.get(tmp) === 0) {
                map.delete(tmp);
            }
        }
        res = Math.max(res, j - i + 1);
    }
    return res;
};
