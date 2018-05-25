// 原理：快速排序也使用分治的方法，将原始数组分为较小的数组（但它没有像归并排序那样将它们分割开）。复杂度为 O(nlog……n)
// 1、从数组中选择中间一项作为主元
// 2、创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。移动左指针直到我们找到一个比主元大的元素，接着，移动右指针直到找到一个比主元小的元素，然后交换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫作划分操作。
// 3、接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的子数组）重复之前的两个步骤，直至数组已完全排序。
const quickSort = (arr) => {
    // 排序算法。每次接收的都是整个 arr，只是 left 和 right 在改变。每次排序只是对 left 和 right 之间的数进行排序
    const quick = (arr, left, right) => {
        let index;  // 分割数组的索引
        if (arr.length > 1) {
            // 核心算法：两边指针往中间移，从左边找到比主元大的数，右边找到比主元小的数，然后交换两个数
            let mid = Math.floor((left + right) / 2),  // 选择中间项作为主元
                midNum = arr[mid];
                l = left,  // 初始化两个指针
                r = right;
            console.log(arr, l, r, mid, midNum);
            // 左指针比右指针小才执行
            while (l < r) {
                // 从左侧开始找，找到一个比主元大的数
                while (arr[l] < midNum) {
                    l++;
                }
                // 从右侧开始找，找到一个比主元小的数
                while (arr[r] > midNum) {
                    r--;
                }
                // 如果比主元大的数的索引小于比主元小的数的索引，则交换这两个数
                if (l <= r) {
                    [arr[l], arr[r]] = [arr[r], arr[l]];
                    // 交换完成，移动指针
                    l++;
                    r--;
                }
            }
            index = l;  // 以上执行完成后，左指针左边的数都是较小的数，右边的数都是较大的数。我们把左指针作为分割数组的索引

            // 左索引小于分割索引，则对数组中左索引到分割索引部分进行排序
            if (left < index - 1) {
                quick(arr, left, index - 1);
            }
            // 右索引大于分割索引，则对数组中分割索引到右索引部分进行排序
            if (index < right) {
                quick(arr, index, right);
            }
        }
    }
    // 调用 quick 进行排序，因为是要对整个数组排序，所以传入 0 和 arr.length - 1
    quick(arr, 0, arr.length - 1);
}


let arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
console.time();
quickSort(arr);
// arr.sort(arr);
console.timeEnd();