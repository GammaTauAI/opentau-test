const sumBase: (n: any, k: any) => any = function (n, k) {
    let str: any = n.toString(k);
    let res: any = 0;
    for (let ch of str)
        res += +ch;
    return res;
};
