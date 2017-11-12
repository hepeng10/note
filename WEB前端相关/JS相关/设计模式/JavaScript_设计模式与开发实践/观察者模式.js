// 观察者模式又叫 发布-订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。JS 中，我们一般用事件模型来替代传统的观察者模式

// 1、首先指定好谁充当发布者
// 2、然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者
// 3、最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数

var salesOffices = {};  // 定义售楼处

salesOffices.clientList = [];  // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function(fn) {  // 增加订阅者
    this.clientList.push(fn);  // 订阅的消息添加进缓存列表
};

salesOffices.trigger = function() {  // 发布消息
    for (var i = 0, fn; fn = this.clientList[i++];) {
        fn.apply(this, arguments);  // arguments 是发布消息时带上的参数
    }
}

salesOffices.listen(function(price, squareMeter) {  // 小明订阅消息
    console.log('价格=' + price);
    console.log('squareMeter=' + squareMeter);
});

salesOffices.listen(function(price, squareMeter) {  // 小红订阅消息
    console.log('价格=' + price);
    console.log('squareMeter=' + squareMeter);
});

salesOffices.trigger(2000000, 88);  // 200万，88平米
salesOffices.trigger(3000000, 110);  // 300万，110平米