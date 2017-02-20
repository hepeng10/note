// 栈是后进先出（LIFO）的数据集合。

function Stack() {
    this.items = [];  // 我们使用数组来保存栈里的数据，并实现栈的相关功能
}

// 栈需要用到的方法
// 往栈顶添加一个元素
Stack.prototype.push = function(ele) {
    this.items.push(ele)
}
// 移除栈顶的元素
Stack.prototype.pop = function() {
    return this.items.pop();
}
// 返回栈顶的元素，不对栈做任何修改
Stack.prototype.peek = function() {
    return this.items[this.items.length - 1];
}
// 判断栈是否为空
Stack.prototype.isEmpty = function() {
    return this.items.length === 0;
}
// 清空栈
Stack.prototype.clear = function() {
    this.items = [];
}
// 返回栈的元素个数
Stack.prototype.size = function() {
    return this.items.length;
}

var stack = new Stack();
stack.push('tirion');
console.log(stack.size());