const removeDigit: Function = function (number, digit) {
    const arr: String[] = number.split("");
    const idxArr: number[] = [];
    arr.forEach((e, i) => {
        if (e === digit)
            idxArr.push(i);
    });
    const res: String[] = [];
    for (const i of idxArr) {
        const clone: String[] = arr.slice();
        clone.splice(i, 1);
        res.push(clone.join(""));
    }
    return res.reduce((ac, e) => (e > ac ? e : ac), res[0]);
};
