const findCenter: (edges: string[][]) => string = function (edges) {
    const map: { [id: string]: string[]; } = {};
    for (let e of edges) {
        const [u, v] = e;
        if (map[u] == null)
            map[u] = [];
        if (map[v] == null)
            map[v] = [];
        map[u].push(v);
        map[v].push(u);
    }
    const keys: string[] = Object.keys(map);
    let res: string, max: number = -Infinity;
    keys.forEach((e) => {
        if (map[e].length > max) {
            res = e;
            max = map[e].length;
        }
    });
    return res;
};
