const isAnagram: (s: any, t: any) => any = function (s, t) {
    if (s.length !== t.length)
        return false;
    const sh: { [x: number]: any; } = strHash(s);
    const th: { [x: number]: any; } = strHash(t);
    for (let key in sh) {
        if (sh.hasOwnProperty(key) && sh[key] !== th[key]) {
            return false;
        }
    }
    return true;
};
function strHash(str: any): { [x: number]: any; } {
    let res: { [x: number]: any; } = {};
    for (let i = 0; i < str.length; i++) {
        if (res.hasOwnProperty(str[i])) {
            res[str[i]] += 1;
        }
        else {
            res[str[i]] = 1;
        }
    }
    return res;
}
