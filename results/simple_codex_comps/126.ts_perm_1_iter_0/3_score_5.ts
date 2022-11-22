const isAnagram: Function = function (s, t) {
    if (s.length !== t.length)
        return false;
    const sh: Object = strHash(s);
    const th: Object = strHash(t);
    for (let key in sh) {
        if (sh.hasOwnProperty(key) && sh[key] !== th[key]) {
            return false;
        }
    }
    return true;
};
function strHash(str: String): Object {
    let res: Object = {};
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
