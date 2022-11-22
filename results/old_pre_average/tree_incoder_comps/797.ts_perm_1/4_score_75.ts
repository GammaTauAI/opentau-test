const kClosest: any = (points, K) => {
    let len: any = points.length, l: number = 0, r: number = len - 1;
    while (l <= r) {
        let mid: number = helper(points, l, r);
        if (mid === K)
            break;
        if (mid < K) {
            l = mid + 1;
        }
        else {
            r = mid - 1;
        }
    }
    return points.slice(0, K);
};
function helper(A: any, l: any, r: any): any {
    let pivot: any = A[l];
    let ll: any = l;
    while (l < r) {
        while (l < r && compare(A[r], pivot) >= 0)
            r--;
        while (l < r && compare(A[l], pivot) <= 0)
            l++;
        swap(A, l, r);
    }
    swap(A, ll, l);
    return l;
}
function swap(arr: any, i: any, j: any): any {
    let tmp: any = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
function compare(p1: any, p2: any): number {
    return p1[0] * p1[0] + p1[1] * p1[1] - p2[0] * p2[0] - p2[1] * p2[1];
}
