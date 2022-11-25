const findCenter: (edges: (string | number)[][]) => string | number = function (edges) {
    const map: Record<string | number, (string | number)[]> = {};
    for (let e of edges) {
        const [u, v] = e;
        if (map[u] == null)
            map[u] = [];
        if (map[v] == null)
            map[v] = [];
        map[u].push(v);
        map[v].push(u);
    }
    const keys: string[] | number[] = Object.keys(map);
    let res: string | number, max: number = -Infinity;
    keys.forEach((e) => {
        if (map[e].length > max) {
            res = e;
            max = map[e].length;
        }
    });
    return res;
};
