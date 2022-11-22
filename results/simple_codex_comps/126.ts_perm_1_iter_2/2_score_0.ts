const isAnagram: (s: string, t: string) => boolean = function (s, t) {
    if (s.length !== t.length)
        return false;
    const sh: {[k: string]: number} = strHash(s);
    const th: {[k: string]: number} = strHash(t);
    for (let key in sh) {
        if (sh.hasOwnProperty(key) && sh[key] !== th[key]) {
            return false;
        }
    }
    return true;
};
function strHash(str: string): {[k: string]: number} {
    let res: {[k: string]: number} = {};
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
