// 原理：归并排序是采用的分治算法。将一个大数组转化为多个小数组，直到只有一个项。然后开始归并，归并过程会按“小中大”的进行合并，最后合并完成返回一个排序好的大数组。复杂度为 O(nlogn)
const mergeSort = (arr) => {
    if (arr.length <= 1) { //数组长度小于等于1，则不用排序，返回结果
        return arr;
    }

    // 分割，形成“小中大”
    const mid = Math.floor(arr.length / 2); //找到基准点
    const midNum = arr.splice(mid, 1)[0];  // 取出基准点。注：splice 返回值是数组
    let left = [];
    let right = [];
    // 小的放 left，大的放 right
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < midNum) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // 继续对 left right 数组进行分割
    const l = mergeSort(left);
    const r = mergeSort(right);
    // 合并“小中大”
    return l.concat([midNum], r);
    // return mergeSort(left).concat(midNum, mergeSort(right)); //对左边进行递归排序的结果+基准点+对右边进行递归排序的结果，就是排序完成的结果，返回
}

let arr = [];
for (let i = 0; i < 100000; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
console.time();
mergeSort(arr);
console.timeEnd();