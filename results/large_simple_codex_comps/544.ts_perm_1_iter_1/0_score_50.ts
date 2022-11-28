const reverseBetween: (head: any, left: number, right: number) => any = function (head, left, right) {
    if (head == null)
        return head;
    if (left === right)
        return head;
    let cur: any = head, prev: any = null;
    let step: number = 1;
    while (step !== left) {
        prev = cur;
        cur = cur.next;
        step++;
    }
    let l: any = cur;
    while (step !== right) {
        cur = cur.next;
        step++;
    }
    let r: any = cur, next: any = cur.next;
    // reverse
    let start: any = l, p: any = null;
    while (start !== r) {
        let n: any = start.next;
        start.next = p;
        p = start;
        start = n;
    }
    r.next = p;
    l.next = next;
    if (prev)
        prev.next = r;
    return prev ? head : r;
};
