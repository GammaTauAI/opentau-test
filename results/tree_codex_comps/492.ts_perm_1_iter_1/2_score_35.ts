const arr = [0, 1, 1];
const getMaximumGenerated: (n: any) => any = function (n) {
    if (arr[n] != null)
        return Math.max(...arr.slice(0, n + 1));
    const oddOrEven: (num: any) => any = (num) => (num % 2 === 0 ? "even" : "odd");
    const hi: any = arr.length - 1;
    for (let i: any = hi + 1; i <= n; i++) {
        let tmp: any, chk: any = oddOrEven(i);
        if (chk === "odd")
            tmp = arr[Math.floor(i / 2)] + arr[Math.floor(i / 2) + 1];
        else
            tmp = arr[Math.floor(i / 2)];
        arr[i] = tmp;
    }
    return Math.max(...arr.slice(0, n + 1));
};
