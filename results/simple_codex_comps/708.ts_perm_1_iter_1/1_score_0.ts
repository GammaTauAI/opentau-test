const sumBase: (a: number, b: number) => number = function (n, k) {
    let str: string = n.toString(k);
    let res: number = 0;
    for (let ch of str)
        res += +ch;
    return res;
};