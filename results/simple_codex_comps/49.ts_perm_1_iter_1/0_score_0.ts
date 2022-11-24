const findCenter: (edges: Array<Array<string>>) => string = function (edges) {
    const map: Object = {};
    for (let e of edges) {
        const [u, v]: Array<string> = e;
        if (map[u] == null)
            map[u] = [];
        if (map[v] == null)
            map[v] = [];
        map[u].push(v);
        map[v].push(u);
    }
    const keys: Array<string> = Object.keys(map);
    let res: string, max: number = -Infinity;
    keys.forEach((e) => {
        if (map[e].length > max) {
            res = e;
            max = map[e].length;
        }
    });
    return res;
};
