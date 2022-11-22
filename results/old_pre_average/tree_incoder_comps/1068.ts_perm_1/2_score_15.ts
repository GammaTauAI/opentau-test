const rotate: any = function (matrix) {
    let s: any = 0, e: any = matrix.length - 1;
    while (s < e) {
        let temp: number = matrix[s];
        matrix[s] = matrix[e];
        matrix[e] = temp;
        s++;
        e--;
    }
    for (let i: number = 0; i < matrix.length; i++) {
        for (let j: number = i + 1; j < matrix[i].length; j++) {
            let temp: number = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
};
