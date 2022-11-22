const removeDuplicates: (arg0: string) => string = function (S) {
    const queue: Array<string> = [];
    for (let i = 0; i < S.length; i++) {
        if (queue.length > 0 && queue[queue.length - 1] === S[i]) {
            queue.pop();
        }
        else {
            queue.push(S[i]);
        }
    }
    return queue.join("");
};
