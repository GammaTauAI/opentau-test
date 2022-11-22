const maxRepOpt1: (text:string) => number = function (text) {
    const count: {[k:string]: number} = [...text].reduce((a, c) => {
        a[c] = a[c] || 0;
        a[c]++;
        return a;
    }, {});
    let ans: number = 0;
    let i: number = 0;
    while (i < text.length) {
        let j: number = i;
        const c: string = text.charAt(i);
        while (j < text.length && text.charAt(j) === c)
            j++;
        if (j - i < count[c]) {
            let k: number = j + 1;
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
