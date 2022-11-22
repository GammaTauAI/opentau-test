const countGoodSubstrings: (s: 'bab' | 'ab' | 'aab') => number = function (s) {
    let res: number = 0;
    for (let i = 2; i < s.length; i++) {
        if (chk(s, i))
            res++;
    }
    return res;
};
function chk(s: 'bab' | 'ab' | 'aab', i: number): boolean {
    return s[i - 2] !== s[i - 1] && s[i - 2] !== s[i] && s[i - 1] !== s[i];
}
