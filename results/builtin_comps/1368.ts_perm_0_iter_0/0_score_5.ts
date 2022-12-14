const findNthDigit: (n: any) => string = function (n) {
    let start: number = 1;
    let len: number = 1;
    let base: number = 9;
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
