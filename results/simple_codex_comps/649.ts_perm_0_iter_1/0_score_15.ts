const middleNode: (head: any) => any = function (head) {
    if (head == null)
        return null;
    let count: number = 1;
    let iter: typeof head = head;
    while (iter.next) {
        iter = iter.next;
        count++;
    }
    count = (count / 2) >> 0;
    while (count) {
        head = head.next;
        count--;
    }
    return head;
};
