const eventualSafeNodes: (grid: number[][]) => number[] = function (graph) {
    const n: number = graph.length, memo: {} = {}, visited: Set<number> = new Set(), res: number[] = [];
    for (let i = 0; i < n; i++) {
        if (!dfs(graph, i, memo, visited))
            res.push(i);
    }
    return res;
};
function dfs(graph: number[][], node: number, memo: {}, visited: Set<number>): boolean {
    if (memo[node] != null)
        return memo[node];
    let hasCycle: boolean = false;
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
