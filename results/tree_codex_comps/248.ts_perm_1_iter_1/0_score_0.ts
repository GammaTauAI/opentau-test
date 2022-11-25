const deepestLeavesSum: (root: { val: number; left: { val: number; left: { val: number; left: null; right: null; }; right: { val: number; left: null; right: null; }; }; right: { val: number; left: null; right: null; }; }) => number = function (root) {
    let res: number = 0;
    let q: { val: number; left: { val: number; left: { val: number; left: null; right: null; }; right: { val: number; left: null; right: null; }; }; right: { val: number; left: null; right: null; }; }[] = [root];
    while (q.length) {
        const size: number = q.length;
        const tmp: { val: number; left: { val: number; left: { val: number; left: null; right: null; }; right: { val: number; left: null; right: null; }; }; right: { val: number; left: null; right: null; }; }[] = [];
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
