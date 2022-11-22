const tree2str: any = function (t) {
    if (!t)
        return "";
    const left: any = tree2str(t.left);
    const right: String = tree2str(t.right);
    if (right)
        return `${t.val}(${left})(${right})`;
    else if (left)
        return `${t.val}(${left})`;
    else
        return `${t.val}`;
};
