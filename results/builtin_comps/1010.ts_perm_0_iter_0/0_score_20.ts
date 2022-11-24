const isSubsequence: (s: any, t: any) => boolean = function (s, t) {
    const sl: any = s.length;
    const tl: any = t.length;
    if (sl > tl)
        return false;
    if (sl === 0)
        return true;
    let si: number = 0;
    for (let i: number = 0; i < tl && si < sl; i++) {
        if (s[si] === t[i])
            si++;
    }
    return si === sl;
};
