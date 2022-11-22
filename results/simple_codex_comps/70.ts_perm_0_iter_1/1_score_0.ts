// On every bit XOR acts as modulo 2 addition and AND acts as modulo 2 multiplication.
// The set {0,1} with modulo 2 addition and multiplication is the field GF(2) and the distributive property holds in every field.
const getXORSum: { (arr1: number[], arr2: number[]): number } = function (arr1, arr2) {
    const bits: number[] = Array(32).fill(0);
    for (let v of arr2) {
        let pos: number = 0;
        while (v > 0) {
            if (v & 1) {
                bits[pos]++;
            }
            v = v >> 1;
            pos++;
        }
    }
    let res: number = 0;
    for (let v of arr1) {
        let pos: number = 0;
        let tmp: number = 0;
        while (v > 0) {
            if (v & 1) {
                if (bits[pos] % 2 == 1) {
                    tmp |= 1 << pos;
                }
            }
            v = v >> 1;
            pos++;
        }
        res ^= tmp;
    }
    return res;
};
