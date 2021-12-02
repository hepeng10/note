// 二分搜索：要求被搜索的数据结构已排序
// 1、选择数组的中间值
// 2、如果选中值是待搜索值，那么算法执行完毕
// 3、如果待搜索值比选中值要小，则返回步骤1并在选中值左边的子数组中寻找
// 4、如果待搜索值比选中值要大，则返回步骤1并在选中值右边的子数组中寻找

const binarySearch = (arr, item) => {
    arr.sort();  // 先将数组排序

    let low = 0,
        high = arr.length - 1,
        mid,
        element;
    
    // while 循环中，每次会缩小一半搜索范围。当 low <= high 的时候才可能存在被搜索的值，否则没搜索到
    while (low <= high) {
        mid = Math.floor((low + high) / 2);  // (low + high) / 2 得到两个索引的中间索引
        element = arr[mid];

        if (element < item) {
            low = mid + 1;
        } else if (element > item) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}