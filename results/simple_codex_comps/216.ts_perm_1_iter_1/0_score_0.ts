const hasPath: (maze: Array<Array<number>>, start: Array<number>, destination: Array<number>) => boolean = function (maze, start, destination) {
    const m: number = maze.length;
    const n: number = maze[0].length;
    const queue: Array<Array<number>> = [];
    const visited: Array<Array<boolean>> = Array.from({ length: m }, () => new Array(n).fill(false));
    queue.push(start);
    const dirs: Array<Array<number>> = [
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, 0],
    ];
    while (queue.length) {
        const cur: Array<number> = queue.shift();
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
