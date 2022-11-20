const findNthDigit: any = function (n) {
    let start: any = 1;
    let len: number = 1;
    let base: any = 9;
    while (n > len * base) {
        n = n - len * base;
        len++;
        start *= 10;
        base *= 10;
    }
    let target: number = start + (n - 1) / len;
    let reminder: number = (n - 1) % len;
    return ("" + target).charAt(reminder);
};
