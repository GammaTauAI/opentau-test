const minimumEffortPath: (heights: number[][]) => number = function (heights) {
    const d: number[] = [0, 1, 0, -1, 0];
    let lo: number = 0, hi: number = 10 ** 6 + 1;
    while (lo < hi) {
        let effort: number = lo + ((hi - lo) >> 1);
        if (isPath(heights, effort)) {
            hi = effort;
        }
        else {
            lo = effort + 1;
        }
    }
    return lo;
    function isPath(h: number[][], effort: number): boolean {
        const m: number = h.length, n: number = h[0].length;
        const q: number[][] = [];
        q.push([0, 0]);
        const seen: Set<number> = new Set();
        seen.add(0);
        while (q.length) {
            const cur: number[] = q.shift();
            const x: number = cur[0], y: number = cur[1];
            if (x === m - 1 && y === n - 1) {
                return true;
            }
            for (let k: number = 0; k < 4; k++) {
                const r: number = x + d[k], c: number = y + d[k + 1];
                if (seen.has(r * n + c))
                    continue;
                if (0 <= r &&
                    r < m &&
                    0 <= c &&
                    c < n &&
                    effort >= Math.abs(h[r][c] - h[x][y])) {
                    seen.add(r * n + c);
                    q.push([r, c]);
                }
            }
        }
        return false;
    }
};
