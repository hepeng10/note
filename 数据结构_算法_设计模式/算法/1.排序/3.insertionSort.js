// 原理：一次次循环，把当前循环次数的数和它的前一个对比，如果前一个数比它大，则把前一个数放到它的位置，再和前一个数对比，直到遇到比它小的，把这个数放在其后面。性能之比前两个好一点点
const insertionSort = (arr) => {
    let length = arr.length,
        j,
        temp;
    // 第一个前面没数，不需要换位，所以从第二个开始遍历即可
    for (let i = 1; i < length; i++) {
        j = i;  // j 是一个临时索引
        temp = arr[i];  // 缓存当前的数
        // 如果前一个数比当前数大，则把前一个数放到当前数位置。注：js 里 j > 0 这个条件是不必须的，这里主要是防止 arr[-1] 取值的出现，但是 js 中取 -1 得到 undefined 与数字比较得到 false，不会继续 while
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1];
            j--;  // 通过 j-- 继续往前比较
        }
        arr[j] = temp;  // 比较完成后，说明前一个数比它小，把它放在 j 位置即可
    }
}

let arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
insertionSort(arr);
console.log(arr);