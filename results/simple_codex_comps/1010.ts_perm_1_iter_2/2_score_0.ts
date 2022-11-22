const isSubsequence: <T>(x: T[], y: T[]) => boolean = function (s, t) {
    const sl: number = s.length;
    const tl: number = t.length;
    if (sl > tl)
        return false;
    if (sl === 0)
        return true;
    let si: number = 0;
    for (let i = 0; i < tl && si < sl; i++) {
        if (s[si] === t[i])
            si++;
    }
    return si === sl;
};
