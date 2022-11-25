const eventualSafeNodes: (graph: number[][]) => number[] = function (graph) {
    const n: number = graph.length, memo: {
        [id: string]: boolean;
    } = {}, visited: Set<number> = new Set(), res: number[] = [];
    for (let i: number = 0; i < n; i++) {
        if (!dfs(graph, i, memo, visited))
            res.push(i);
    }
    return res;
};
function dfs(graph: any, node: any, memo: any, visited: any): any {
    if (memo[node] != null)
        return memo[node];
    let hasCycle: any = false;
    visited.add(node);
    for (let e of graph[node]) {
        if (visited.has(e) || dfs(graph, e, memo, visited)) {
            hasCycle = true;
            break;
        }
    }
    visited.delete(node);
    memo[node] = hasCycle;
    return hasCycle;
}
