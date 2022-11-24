const tree2str: (t: any) => any = function (t) {
    if (!t)
        return "";
    const left: any = tree2str(t.left);
    const right: any = tree2str(t.right);
    if (right)
        return `${t.val}(${left})(${right})`;
    else if (left)
        return `${t.val}(${left})`;
    else
        return `${t.val}`;
};
