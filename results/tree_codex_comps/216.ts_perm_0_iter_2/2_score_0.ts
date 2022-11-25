const hasPath: (maze: [[number, number, number]], start: [number, number], destination: [number, number]) => boolean = function (maze, start, destination) {
    const m: number = maze.length;
    const n: number = maze[0].length;
    const queue: [number, number][] = [];
    const visited: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
    queue.push(start);
    const dirs: [number, number][] = [
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, 0],
    ];
    while (queue.length) {
        const cur: [number, number] = queue.shift();
        if (cur[0] === destination[0] && cur[1] === destination[1])
            return true;
        if (visited[cur[0]][cur[1]])
            continue;
        visited[cur[0]][cur[1]] = true;
        for (let dir of dirs) {
            let x: number = cur[0], y: number = cur[1];
            while (x >= 0 && x < m && y >= 0 && y < n && maze[x][y] === 0) {
                x += dir[0];
                y += dir[1];
            }
            x -= dir[0];
            y -= dir[1];
            queue.push([x, y]);
        }
    }
    return false;
};
