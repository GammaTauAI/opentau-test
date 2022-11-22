var getAllElements: any = function (root1, root2) {
    const set1: any = new Set(), set2: any = new Set();
    traverse(root1, set1);
    traverse(root2, set2);
    const res: any = [];
    const it1: any = set1[Symbol.iterator]();
    const it2: any = set2[Symbol.iterator]();
    let { value: value1, done: done1 } = it1.next();
    let { value: value2, done: done2 } = it2.next();
    while (done1 === false || done2 === false) {
        if (done2 || value1 < value2) {
            res.push(value1);
            const obj: any = it1.next();
            value1 = obj.value;
            done1 = obj.done;
        }
        else {
            res.push(value2);
            const obj: any = it2.next();
            value2 = obj.value;
            done2 = obj.done;
        }
    }
    return res;
    function traverse(node: any, set: any): any {
        if (node == null)
            return;
        traverse(node.left, set);
        set.add(node.val);
        traverse(node.right, set);
    }
};
