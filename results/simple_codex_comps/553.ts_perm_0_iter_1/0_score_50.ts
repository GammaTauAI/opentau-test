var maxProduct: any = function (s) {
    const n: any = s.length;
    let max: any = 0;
    for (let i = 0; i < 1 << n; i++) {
        let n0: any = palindromic(i, s);
        if (n0 === 0)
            continue;
        for (let j = 0; j < 1 << n; j++) {
            if ((i & j) > 0)
                continue;
            max = Math.max(palindromic(j, s) * n0, max);
        }
    }
    return max;
};
function palindromic(i: any, s: any): any {
    const n: any = s.length;
    let sub: any = "";
    for (let x = 0; x < n; x++) {
        if (i & (1 << x))
            sub += s[x];
    }
    let len: any = sub.length;
    for (let i = 0; i < len; i++) {
        if (sub[i] !== sub[len - i - 1])
            return 0;
    }
    return len;
}