const countRectangles: (rectangles: number[][], points: number[][]) => number[] = function (rectangles, points) {
    const rect: number[][] = rectangles;
    const matrix: number[][] = Array.from({ length: 101 }, () => []);
    for (const [x, y] of rect) {
        matrix[y].push(x);
    }
    for (const row of matrix)
        row.sort((a, b) => a - b);
    const res: number[] = [];
    for (const [x, y] of points) {
        let cnt: number = 0;
        for (let i = y; i <= 100; i++) {
            const arr: number[] = matrix[i], n: number = arr.length;
            let l: number = 0, r: number = n;
            while (l < r) {
                const mid: number = l + Math.floor((r - l) / 2);
                if (mid === n || arr[mid] >= x)
                    r = mid;
                else
                    l = mid + 1;
            }
            cnt += n - l;
        }
        res.push(cnt);
    }
    return res;
};
