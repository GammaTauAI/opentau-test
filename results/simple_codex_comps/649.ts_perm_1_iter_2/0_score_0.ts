const middleNode: (arg1: { next: { next: any; }; }) => { next: any; } = function (head) {
    if (head == null)
        return null;
    let count: number = 1;
    let iter: { next: { next: any; }; } = head;
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
