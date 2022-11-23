const numSubmatrixSumTarget: (matrix: any, target: any) => number = function (matrix, target) {
    let a: number[][] = matrix;
    let n: number = a.length, m: number = a[0].length;
    const cum: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < m; j++) {
            cum[i + 1][j + 1] = cum[i + 1][j] + cum[i][j + 1] - cum[i][j] + a[i][j];
        }
    }
    let ans: number = 0;
    for (let i: number = 0; i < n; i++) {
        for (let j: number = i; j < n; j++) {
            let map: Map<number, number> = new Map();
            for (let k: number = 0; k <= m; k++) {
                let v: number = cum[j + 1][k] - cum[i][k];
                if (map.has(v - target)) {
                    ans += map.get(v - target);
                }
                if (map.has(v)) {
                    map.set(v, map.get(v) + 1);
                }
                else {
                    map.set(v, 1);
                }
            }
        }
    }
    return ans;
};
