const findCenter: any = function (edges) {
    const map: any = {};
    for (let e of edges) {
        const [u, v]: any = e;
        if (map[u] == null)
            map[u] = [];
        if (map[v] == null)
            map[v] = [];
        map[u].push(v);
        map[v].push(u);
    }
    const keys: any = Object.keys(map);
    let res: any, max: any = -Infinity;
    keys.forEach((e) => {
        if (map[e].length > max) {
            res = e;
            max = map[e].length;
        }
    });
    return res;
};
