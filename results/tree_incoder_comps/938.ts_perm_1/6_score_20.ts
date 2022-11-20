const countGoodSubstrings: any = function (s) {
    let res: any = 0;
    for (let i: number = 2; i < s.length; i++) {
        if (chk(s, i))
            res++;
    }
    return res;
};
function chk(s: any, i: number): any {
    return s[i - 2] !== s[i - 1] && s[i - 2] !== s[i] && s[i - 1] !== s[i];
}
