const findIntegers: (number: any) => any = function (num) {
    const binary: any = num.toString(2);
    const fibonacci: any = [1, 2];
    for (let i: number = 2; i < binary.length; ++i) {
        fibonacci.push(fibonacci[i - 2] + fibonacci[i - 1]);
    }
    let answer: any = binary.indexOf("11") === -1 ? 1 : 0;
    for (let i: number = 0; i < binary.length; ++i) {
        if (binary[i] === "1") {
            answer += fibonacci[binary.length - 1 - i];
            if (binary[i - 1] === "1") {
                break;
            }
        }
    }
    return answer;
};
