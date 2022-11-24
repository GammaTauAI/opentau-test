const splitBST: (root: {left?: {left?: any, right?: any, val?: any}, right?: {left?: any, right?: any, val?: any}, val?: any}, V: any) => any[] = function (root, V) {
    if (root == null)
        return [null, null];
    if (root.val > V) {
        const [left, right]: any[] = splitBST(root.left, V);
        root.left = right;
        return [left, root];
    }
    else {
        const [left, right]: any[] = splitBST(root.right, V);
        root.right = left;
        return [root, right];
    }
};
