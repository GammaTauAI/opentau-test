const minPushBox: (grid: string[][]) => number = function (grid) {
    let box: [number, number], person: [number, number], target: [number, number];
    const m: number = grid.length, n: number = grid[0].length;
    const dirs: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    for (let i: number = 0; i < m; i++) {
        for (let j: number = 0; j < n; j++) {
            const e: string = grid[i][j];
            if (e === 'B')
                box = [i, j];
            else if (e === 'T')
                target = [i, j];
            else if (e === 'S')
                person = [i, j];
        }
    }
    const valid: ([i, j]: [number, number]) => boolean = ([i, j]) => {
        return i >= 0 && i < m && j >= 0 && j < n && grid[i][j] !== '#';
    };
    const key: ([i, j]: [number, number]) => string = ([i, j]) => `${i},${j}`;
    const chk: (person: [number, number], newPerson: [number, number], box: [number, number]) => boolean = (person, newPerson, box) => {
        const set: Set<string> = new Set();
        set.add(key(box));
        let q: [number, number][] = [person];
        while (q.length) {
            const tmp: [number, number][] = [];
            const size: number = q.length;
            for (let i: number = 0; i < size; i++) {
                const [x, y] = q[i];
                if (key([x, y]) === key(newPerson))
                    return true;
                for (const [dx, dy] of dirs) {
                    const [nx, ny] = [x + dx, y + dy];
                    if (valid([nx, ny]) && !set.has(key([nx, ny]))) {
                        set.add(key([nx, ny]));
                        tmp.push([nx, ny]);
                    }
                }
            }
            q = tmp;
        }
        return false;
    };
    let q: [number, [number, number], [number, number]][] = [[0, box, person]];
    const dkey: ([a0, a1]: [number, number], [b0, b1]: [number, number]) => string = (a, b) => `${a[0]},${a[1]}_${b[0]},${b[1]}`;
    const set: Set<string> = new Set();
    set.add(dkey(box, person));
    while (q.length) {
        const size: number = q.length;
        const tmp: [number, [number, number], [number, number]][] = [];
        for (let i: number = 0; i < size; i++) {
            const [v, b, p] = q[i];
            if (key(b) === key(target))
                return v;
            const bArr: [number, number][] = [
                [b[0], b[1] + 1],
                [b[0], b[1] - 1],
                [b[0] + 1, b[1]],
                [b[0] - 1, b[1]],
            ];
            const pArr: [number, number][] = [
                [b[0], b[1] - 1],
                [b[0], b[1] + 1],
                [b[0] - 1, b[1]],
                [b[0] + 1, b[1]],
            ];
            for (let j: number = 0; j < 4; j++) {
                const nb: [number, number] = bArr[j], np: [number, number] = pArr[j];
                const nk: string = dkey(nb, b);
                if (set.has(nk))
                    continue;
                if (valid(nb) && valid(np) && chk(p, np, b)) {
                    tmp.push([v + 1, nb, b]);
                    set.add(nk);
                }
            }
        }
        q = tmp;
    }
    return -1;
};
