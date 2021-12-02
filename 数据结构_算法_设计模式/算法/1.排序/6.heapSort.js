// 原理：把数组转换成最大堆来排序。把堆顶的最大数取出，将剩余的堆继续调整为最大堆，再次将堆顶的最大数取出，这个过程持续到剩余数只有一个时结束。（堆是一种完全二叉树结构）
// 数组转换为二叉树结构算法：
// 索引0是树的根节点；
// 除根节点外，任意节点N的父节点是floor(N/2)（节点N的N是从1开始计算，也就是索引为0的元素为根节点即节点1）；
// 节点L的左子节点是2*L；
// 节点R的右子节点是2*R+1
// 以下是二叉树结构的索引表示：
//         1
//     2       3
//   4   5   6   7
// 所以节点N对应数组的值为：节点N的值 = arr[节点N - 1]

const heapSort = (arr) => {
    // 将 arr 转为最大堆结构的数组
    // 最大堆：1.最大元素值出现在根节点（堆顶）；2.堆中每个父节点的值都大于等于其子节点
    // 以下是最大堆结构的值展示：
    //         9
    //     7       4
    //   3   5   1   2
    const buildHeap = (arr) => {
        const heapSize = arr.length;
        // 取出数组中最后一个父节点的索引。因为子节点是2倍父节点索引，所以数组长度除以2就得到最后一个父节点的索引。
        let i = Math.floor(arr.length / 2);
        // 从最后一个父节点往前进行最大堆化，就能实现小的往下移，大的往上移，最后成为最大堆结构
        while (i >= 0) {
            maxHeapify(arr, heapSize, i);
            // 往前面的父节点进行遍历
            i--;
        }
    }

    // 对数组进行最大堆化。从节点 i 开始检查其子树，并保持此子树的最大堆性质，将小的往下移，大的往上移。
    // 每次调用传入的都是同一个数组，只是 heapSize 和 i 在变化
    // i 是节点在数组中的索引
    const maxHeapify = (arr, heapSize, i) => {
        let left = i * 2 + 1,  // 左子节点的索引
            right = i * 2 + 2,  // 右子节点的索引
            largest = i;  // 假设最大值是 i

        // 如果左节点大于 largest 则把 largest 设为左节点。heapSize 之后的位置是已经排序了的，所以有个小于 heapSize 的条件
        if (left < heapSize && arr[left] > arr[largest]) {
            largest = left;
        }
        // 如果右节点大于 largest 则把 largest 设为右节点
        if (right < heapSize && arr[right] > arr[largest]) {
            largest = right;
        }

        // 如果 largest !== i，则说明传入的 i 不是 largest 的
        if (largest !== i) {
            // 将 i 和 largest 的值交换
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            // 递归调用。因为上面将 largest 和 i 的值调换了，所以现在 largest 索引的值依然是函数开始时 i 的值。也就是把 i 和它的 left 或 right 进行了交换。
            maxHeapify(arr, heapSize, largest);
        }
    }

    buildHeap(arr);  // 构建最大堆

    let heapSize = arr.length;
    // 使用 while 循环，将最大堆变成排序后的数组
    while (heapSize > 1) {
        heapSize--;  // 下面一句交换位置，交换之后最大值就到末尾了，那么之后的排序不用再和它进行比较，所以将 heapSize--。第一次的减减是因为 heapSize 是数组长度，而最后一位下标是 length - 1
        [arr[0], arr[heapSize]] = [arr[heapSize], arr[0]];  // 交换堆里第一个元素（较大值）和最后一个元素（较小值）的位置，这样最大值就会出现在它已排序的位置
        maxHeapify(arr, heapSize, 0);  // 将索引为0的元素重新放到树的底部。（通过上面的交换，根节点成了较小的值，这不符合最大堆的性质）
    }
}


let arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
heapSort(arr);
console.log(arr);