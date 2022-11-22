const removeDigit: (number: string, digit: string) => string = function (number, digit) {
    const arr: Array<string> = number.split("");
    const idxArr: Array<number> = [];
    arr.forEach((e, i) => {
        if (e === digit)
            idxArr.push(i);
    });
    const res: Array<string> = [];
    for (const i of idxArr) {
        const clone: Array<string> = arr.slice();
        clone.splice(i, 1);
        res.push(clone.join(""));
    }
    return res.reduce((ac, e) => (e > ac ? e : ac), res[0]);
};
