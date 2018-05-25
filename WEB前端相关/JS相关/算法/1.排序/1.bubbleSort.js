// 原理：数组有多长就遍历多少次，每次都从第一个元素开始，与后面的进行比较，当比后面的大就交换位置。最大的移到最后，第二大的移到倒数第二位，以此类推实现排序。性能为 O(n2)
const bubbleSort = function(arr) {
    let length = arr.length;
    for (let i = 0; i < length; i++) {
        // 每循环一次，当前循环中最大的那个就会移到后面去放到正确的位置，所以可以 length - 1 - i 减去循环的次数来优化性能
        for (let j = 0; j < length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
};

let arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
bubbleSort(arr);
console.log(arr);