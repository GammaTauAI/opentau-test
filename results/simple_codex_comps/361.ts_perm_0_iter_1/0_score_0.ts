const numberOfBoomerangs: (points: number[][]) => number = function (points) {
    const m: Map<number, number> = new Map();
    const len: number = points.length;
    let res: number = 0;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (i === j)
                continue;
            const d: number = dis(points[i], points[j]);
            if (!m.has(d))
                m.set(d, 0);
            m.set(d, m.get(d) + 1);
        }
        for (const v of m.values()) {
            res += v * (v - 1);
        }
        m.clear();
    }
    return res;
};
function dis(a: number[], b: number[]): number {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
}
