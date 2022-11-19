const arr: number[] = [0, 1, 1];
const getMaximumGenerated: (num: number) => number = function (n) {
    if (arr[n] != null)
        return Math.max(...arr.slice(0, n + 1));
    const oddOrEven: (num: number) => "even" | "odd" = (num) => (num % 2 === 0 ? "even" : "odd");
    const hi: number = arr.length - 1;
    for (let i = hi + 1; i <= n; i++) {
        let tmp: number, chk: "even" | "odd" = oddOrEven(i);
        if (chk === "odd")
            tmp = arr[Math.floor(i / 2)] + arr[Math.floor(i / 2) + 1];
        else
            tmp = arr[Math.floor(i / 2)];
        arr[i] = tmp;
    }
    return Math.max(...arr.slice(0, n + 1));
};
