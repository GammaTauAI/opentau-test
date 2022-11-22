const tree2str: Function = function (t) {
    if (!t)
        return "";
    const left: Function = tree2str(t.left);
    const right: Function = tree2str(t.right);
    if (right)
        return `${t.val}(${left})(${right})`;
    else if (left)
        return `${t.val}(${left})`;
    else
        return `${t.val}`;
};
