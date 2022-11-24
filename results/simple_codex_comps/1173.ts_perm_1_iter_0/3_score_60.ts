const countRectangles: (rectangles: any, points: any) => any = function (rectangles, points) {
    const rect: any = rectangles;
    const matrix: any = Array.from({ length: 101 }, () => []);
    for (const [x, y] of rect) {
        matrix[y].push(x);
    }
    for (const row of matrix)
        row.sort((a, b) => a - b);
    const res: any = [];
    for (const [x, y] of points) {
        let cnt: any = 0;
        for (let i = y; i <= 100; i++) {
            const arr: any = matrix[i], n: any = arr.length;
            let l: any = 0, r: any = n;
            while (l < r) {
                const mid: any = l + Math.floor((r - l) / 2);
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
