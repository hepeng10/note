// 优先队列是普通队列的修改版，在队列中添加了优先级的概念。如医院排队，会有急诊病人

function PriorityQueue() {
    this.items = [];
}

// 生成优先队列元素。这里使用了 PriorityQueue 的静态方法的方式来创建工具类。当然，用 JSON 对象更简单
// priority 越大优先级越低
PriorityQueue.QueueElement = function(ele, priority) {
    this.element = ele;
    this.priority = priority;
}

// 实现队列的方法
// 往队列添加数据，在添加的时候就通过优先级判断出需要插入的位置
PriorityQueue.prototype.enqueue = function(ele, priority) {
    var queueElement = new PriorityQueue.QueueElement(ele, priority);

    // 队列为空时直接添加
    if (this.isEmpty()) {
        this.items.push(queueElement);
    } else {
        var added = false;  // 用来判断元素是否添加进队列
        // 遍历已有队列，当找到优先值越大（优先级越低）的元素时，将当前元素插入到它前面
        for (var i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        // 没有找到优先级更低的元素，则添加到末尾
        if (!added) {
            this.items.push(queueElement);
        }
    }
}
// 从队列头部移除数据
PriorityQueue.prototype.dequeue = function() {
    this.items.shift();
}
// 获取队列头部元素
PriorityQueue.prototype.front = function() {
    return this.items[0];
}
// 判断队列是否为空
PriorityQueue.prototype.isEmpty = function() {
    return this.items.length === 0;
}
// 获取队列的长度
PriorityQueue.prototype.size = function() {
    return this.items.length;
}
// 清除队列
PriorityQueue.prototype.clear = function() {
    this.items = [];
}

var priorityQueue = new PriorityQueue();
priorityQueue.enqueue('Tirion', 0);
priorityQueue.enqueue('Owen', 1);
priorityQueue.enqueue('Backham', 2);
priorityQueue.enqueue('Messi', 1);
console.log(priorityQueue);