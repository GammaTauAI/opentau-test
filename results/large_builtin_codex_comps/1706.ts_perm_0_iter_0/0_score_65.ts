const minimumEffortPath: (heights: any) => number = function (heights) {
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
    function isPath(h: any, effort: any): boolean {
        const m: any = h.length, n: any = h[0].length;
        const q: any[] = [];
        q.push([0, 0]);
        const seen: Set<unknown> = new Set();
        seen.add(0);
        while (q.length) {
            const cur: any = q.shift();
            const x: any = cur[0], y: any = cur[1];
            if (x === m - 1 && y === n - 1) {
                return true;
            }
            for (let k: number = 0; k < 4; k++) {
                const r: any = x + d[k], c: any = y + d[k + 1];
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
