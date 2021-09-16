// 现代语言几乎都内部实现了迭代器，我们主要了解其内部原理

// 生成迭代器对象函数的编写
var Iterator = function(obj) {
    var current = 0;
    // next 方法
    var next = function() {
        current += 1;
    };
    // 判断是否迭代完成的方法
    var isDone = function() {
        return current >= obj.length;
    };
    // 获取当前元素的方法
    var getCurrItem = function() {
        return obj[current];
    };

    return {
        next,
        isDone,
        getCurrItem
    }
}
// 调用 Iterator 就能返回一个迭代器对象
var it = Iterator([1, 2, 3]);
it.next();  // 将指针指向下一个元素
it.getCurrItem();  // 获取当前指针指向的元素
it.isDone();  // 判断指针是否已到末尾