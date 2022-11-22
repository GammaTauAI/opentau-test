const minPushBox: any = function (grid) {
    let box: any, person: any, target: any;
    const m: any = grid.length, n: any = grid[0].length;
    const dirs: any = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    for (let i: number = 0; i < m; i++) {
        for (let j: number = 0; j < n; j++) {
            const e: any = grid[i][j];
            if (e === "B")
                box = [i, j];
            else if (e === "T")
                target = [i, j];
            else if (e === "S")
                person = [i, j];
        }
    }
    const valid: any = ([i, j]) => {
        return i >= 0 && i < m && j >= 0 && j < n && grid[i][j] !== "#";
    };
    const key: any = ([i, j]) => `${i},${j}`;
    const chk: any = (person, newPerson, box) => {
        const set: any = new Set();
        set.add(key(box));
        let q: any = [person];
        while (q.length) {
            const tmp: any = [];
            const size: any = q.length;
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
    let q: any = [[0, box, person]];
    const dkey: any = (a, b) => `${a[0]},${a[1]}_${b[0]},${b[1]}`;
    const set: any = new Set();
    set.add(dkey(box, person));
    while (q.length) {
        const size: any = q.length;
        const tmp: any = [];
        for (let i: number = 0; i < size; i++) {
            const [v, b, p] = q[i];
            if (key(b) === key(target))
                return v;
            const bArr: any = [
                [b[0], b[1] + 1],
                [b[0], b[1] - 1],
                [b[0] + 1, b[1]],
                [b[0] - 1, b[1]],
            ];
            const pArr: any = [
                [b[0], b[1] - 1],
                [b[0], b[1] + 1],
                [b[0] - 1, b[1]],
                [b[0] + 1, b[1]],
            ];
            for (let j: number = 0; j < 4; j++) {
                const nb: any = bArr[j], np: any = pArr[j];
                const nk: any = dkey(nb, b);
                if (set.has(nk))
                    continue;
                let nb0: any = nb[0], nb1: any = nb[1];
                let np0: any = np[0], np1: any = np[1];
                if (valid([nb0, nb1]) && valid([np0, np1]) && chk(p, np, b)) {
                    tmp.push([v + 1, nb, b]);
                    set.add(nk);
                }
            }
        }
        q = tmp;
    }
    return -1;
};
