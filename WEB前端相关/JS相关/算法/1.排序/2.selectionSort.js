// 原理：一次次循环，每次循环找到数组中最小值放到当前循环次数的索引位置。性能为 O(n2)
const selectionSort = function(arr) {
    let length = arr.length,
        indexMin;
    for (let i = 0; i < length - 1; i++) {
        indexMin = i;
        for (let j = i; j < length; j++) {
            if (arr[indexMin] > arr[j]) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
        }
    }
};

let arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
selectionSort(arr);
console.log(arr);