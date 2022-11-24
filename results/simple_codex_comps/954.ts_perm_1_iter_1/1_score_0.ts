const tree2str: (t: { val: number, left: { val: number, left: { val: number, left: null, right: null }, right: { val: number, left: null, right: null } } | null, right: { val: number, left: null, right: null } | null } | null) => string = function (t) {
    if (!t)
        return "";
    const left: string = tree2str(t.left);
    const right: string = tree2str(t.right);
    if (right)
        return `${t.val}(${left})(${right})`;
    else if (left)
        return `${t.val}(${left})`;
    else
        return `${t.val}`;
};
