const carPooling: (trips: number[][], capacity: number) => boolean = function (trips, capacity) {
    const arr: number[] = Array(1001).fill(0);
    for (const [num, s, e] of trips) {
        arr[s] += num;
        arr[e] -= num;
    }
    for (let i = 1; i < 1001; i++) {
        arr[i] += arr[i - 1];
    }
    for (let e of arr) {
        if (e > capacity)
            return false;
    }
    return true;
};
