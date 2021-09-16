// 队列是遵循先进先出原则（FIFO）的数据集合。

function Queue() {
    this.items = [];  // 我们使用数组来保存队列里的数据，并实现栈的相关功能
}

// 实现队列的方法
// 往队列末尾添加数据
Queue.prototype.enqueue = function(ele) {
    this.items.push(ele);
}
// 从队列头部移除数据
Queue.prototype.dequeue = function() {
    this.items.shift();
}
// 获取队列头部元素
Queue.prototype.front = function() {
    return this.items[0];
}
// 判断队列是否为空
Queue.prototype.isEmpty = function() {
    return this.items.length === 0;
}
// 获取队列的长度
Queue.prototype.size = function() {
    return this.items.length;
}
// 清除队列
Queue.prototype.clear = function() {
    this.items = [];
}

var queue = new Queue();
queue.enqueue('Tirion');
console.log(queue.front());