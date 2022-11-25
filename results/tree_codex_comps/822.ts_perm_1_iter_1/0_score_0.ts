const splitBST: (root: { val: number; left: any; right: any; }, V: number) => [{ val: number; left: any; right: any; }, { val: number; left: any; right: any; }] = function (root, V) {
    if (root == null)
        return [null, null];
    if (root.val > V) {
        const [left, right] = splitBST(root.left, V);
        root.left = right;
        return [left, root];
    }
    else {
        const [left, right] = splitBST(root.right, V);
        root.right = left;
        return [root, right];
    }
};
