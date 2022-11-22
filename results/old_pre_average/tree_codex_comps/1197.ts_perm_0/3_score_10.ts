const removeDuplicates: (S: any) => void = function (S) {
    const queue: any = [];
    for (let i: number = 0; i < S.length; i++) {
        if (queue.length > 0 && queue[queue.length - 1] === S[i]) {
            queue.pop();
        }
        else {
            queue.push(S[i]);
        }
    }
    return queue.join("");
};
