const removeDuplicates: Function = function (S) {
    const queue: String[] = [];
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
