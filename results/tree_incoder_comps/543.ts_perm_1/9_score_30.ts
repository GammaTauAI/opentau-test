const maxRepOpt1: any = function (text) {
    const count: Object = [...text].reduce((a, c) => {
        a[c] = a[c] || 0;
        a[c]++;
        return a;
    }, {});
    let ans: any = 0;
    let i: any = 0;
    while (i < text.length) {
        let j: any = i;
        const c: any = text.charAt(i);
        while (j < text.length && text.charAt(j) === c)
            j++;
        if (j - i < count[c]) {
            let k: any = j + 1;
            while (k < text.length && text.charAt(k) === c && k - i < count[c])
                k++;
            ans = Math.max(k - i, ans);
        }
        else
            ans = Math.max(j - i, ans);
        i = j;
    }
    return ans;
};
