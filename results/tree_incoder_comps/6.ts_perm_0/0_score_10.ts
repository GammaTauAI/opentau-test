const arrangeCoins: any = function (n) {
    if (n === 0) {
        return 0;
    }
    let num: any = 1;
    let sum: number = 1;
    while (n >= sum + num + 1) {
        num += 1;
        sum += num;
    }
    return num;
};
