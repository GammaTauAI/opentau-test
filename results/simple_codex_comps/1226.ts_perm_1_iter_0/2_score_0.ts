const removeInterval: (intervals: readonly [number, number][], toBeRemoved: readonly [number, number]) => [number, number][] = function (intervals, toBeRemoved) {
    const n: number = intervals.length;
    if (n < 1)
        return [];
    const res: [number, number][] = [];
    const [x, y]: readonly [number, number] = toBeRemoved;
    for (const [a, b] of intervals) {
        const lo: number = Math.max(a, x);
        const hi: number = Math.min(b, y);
        if (lo < hi) {
            if (a < lo) {
                res.push([a, lo]);
            }
            if (hi < b) {
                res.push([hi, b]);
            }
        }
        else {
            res.push([a, b]);
        }
    }
    return res;
};
