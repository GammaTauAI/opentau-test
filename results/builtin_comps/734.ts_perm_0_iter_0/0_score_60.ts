var maxSlidingWindow: (nums: any, k: any) => any[] = function (nums, k) {
    if (k === 0)
        return [];
    const deque: Deque = new Deque();
    for (let i: number = 0; i < k - 1; i++) {
        while (!deque.isEmpty() && deque.last().val <= nums[i])
            deque.pop();
        deque.enqueue({ val: nums[i], idx: i });
    }
    const result: any[] = [];
    for (let i: number = k - 1; i < nums.length; i++) {
        if (!deque.isEmpty() && deque.first().idx <= i - k)
            deque.dequeue();
        while (!deque.isEmpty() && deque.last().val <= nums[i])
            deque.pop();
        deque.enqueue({ val: nums[i], idx: i });
        result.push(deque.first().val);
    }
    return result;
};
class Deque {
    head: any;
    tail: any;
    constructor() {
        this.head = new Node();
        this.tail = this.head;
    }
    isEmpty(): boolean {
        return this.head.next === null;
    }
    first(): any {
        return this.head.next.value;
    }
    last(): any {
        return this.tail.value;
    }
    dequeue(): void {
        this.head = this.head.next;
        this.head.prev = null;
    }
    enqueue(value: any): void {
        this.tail.next = new DequeNode(value);
        this.tail.next.prev = this.tail;
        this.tail = this.tail.next;
    }
    pop(): void {
        this.tail = this.tail.prev;
        this.tail.next = null;
    }
}
class DequeNode {
    value: any;
    next: any;
    prev: any;
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
