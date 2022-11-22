const isAnagram: (s: string, t: string) => boolean = function (s, t) {
    if (s.length !== t.length)
        return false;
    const sh: { [index: string]: number } = strHash(s);
    const th: { [index: string]: number } = strHash(t);
    for (let key in sh) {
        if (sh.hasOwnProperty(key) && sh[key] !== th[key]) {
            return false;
        }
    }
    return true;
};
function strHash(str: string): { [index: string]: number } {
    let res: { [index: string]: number } = {};
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
