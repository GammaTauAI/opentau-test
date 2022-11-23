const deepestLeavesSum: (root: any) => any = function (root) {
    let res: any = 0;
    let q: any = [root];
    while (q.length) {
        const size: any = q.length;
        const tmp: any = [];
        res = 0;
        for (let i: number = 0; i < size; i++) {
            res += q[i].val;
            if (q[i].left)
                tmp.push(q[i].left);
            if (q[i].right)
                tmp.push(q[i].right);
        }
        q = tmp;
    }
    return res;
};