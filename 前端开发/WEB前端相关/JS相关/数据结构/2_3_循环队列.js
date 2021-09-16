// 循环队列是一个圈，类似击鼓传花。花传到谁手里谁就移出队列
// 需要使用到普通队列 Queue
// 接收一个参与游戏的名单，和每次遍历淘汰的位置
function hotPotato(nameList, num) {
    var queue = new Queue();

    // 将一份名单添加到队列中
    for (var i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]);
    }

    // 用来记录淘汰的人的姓名
    var eliminated = '';
    // 遍历队列，每次 while 循环淘汰一个人，直到剩下最后一个
    while (queue.size() > 1) {
        // 遍历队列，遍历结束时，要淘汰的那个位置就在首位
        for (var i = 0; i < num; i++) {
            // 这里使用 dequeue 和 enqueue 实现圆形循环
            queue.enqueue(queue.dequeue());
        }
        // 弹出这次循环要淘汰的那个人
        eliminated = queue.dequeue();
        console.log(eliminated + '在击鼓传花游戏中被淘汰');
    }
    // 最后返回获胜的人
    return queue.dequeue();
}

var nameList = ['a', 'b', 'c', 'd'];
var winner = hotPotato(nameList, 8);
console.log('获胜者是：' + winner);