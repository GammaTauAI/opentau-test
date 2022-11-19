const firstDayBeenInAllRooms: (x: number[]) => number = function (nextVisit) {
    const P: number = 1000000000 + 7;
    const n: number = nextVisit.length;
    const f: number[] = Array(n).fill(0);
    f[0] = 0;
    for (let i = 1; i < n; i++) {
        f[i] = (((((2 * f[i - 1]) % P) + P - f[nextVisit[i - 1]]) % P) + 2) % P;
    }
    return f[n - 1];
};
