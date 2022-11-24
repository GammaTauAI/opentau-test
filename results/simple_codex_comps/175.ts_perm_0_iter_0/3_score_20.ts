const hash: any = {};
const tribonacci: (n: any) => any = function (n) {
    if (n === 0)
        return 0;
    if (n === 2 || n === 1)
        return 1;
    if (hash[n] != null)
        return hash[n];
    let tmp: any = tribonacci(n - 3) + tribonacci(n - 2) + tribonacci(n - 1)
    return (hash[n] = tmp);
};
