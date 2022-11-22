const splitBST: any = function (root, V) {
    if (root == null)
        return [null, null];
    if (root.val > V) {
        const [left, right]: any = splitBST(root.left, V);
        root.left = right;
        return [left, root];
    }
    else {
        const [left, right]: any = splitBST(root.right, V);
        root.right = left;
        return [root, right];
    }
};
