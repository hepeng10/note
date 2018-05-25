// 观察者模式又叫 发布-订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。JS 中，我们一般用事件模型来替代传统的观察者模式

最简单的发布-订阅模式
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

注：这里订阅者会收到每次发布的消息。我们可不可以给消息分类呢？比如小明只接收88平米房子的消息。



升级：对消息进行分类

var salesOffices = {};  // 定义售楼处

salesOffices.clientList = {};  // 缓存列表，存放订阅者的回调函数。这里从数组变成了对象，可以存放不同类型的消息列表了

salesOffices.listen = function(key, fn) {  // key 是分类，fn 是要执行的函数
    // 当分类不存在时，则在缓存列表中创建这个分类
    if (!this.clientList[key]) {
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);  // 订阅的消息添加进缓存列表
};

salesOffices.trigger = function() {  // 发布消息
    var key = Array.prototype.shift.call(arguments);  // 取出 key。注意这里使用的 shift
    var fns = this.clientList[key];

    if (!fns || fns.length === 0) {
        return false;
    }

    for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments);  // arguments 是发布消息时带上的参数
    }
}

salesOffices.listen('square88', function(price) {  // 小明订阅消息
    console.log('价格=' + price);
});

salesOffices.listen('square110', function(price) {  // 小红订阅消息
    console.log('价格=' + price);
});

salesOffices.trigger('square88', 2000000);  // 发布88平的订阅信息
salesOffices.trigger('square110', 3000000);  // 发布110平的订阅信息



通用实现：

var event = {
    clientList: {},
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    remove: function(key, fn) {
        var fns = this.clientList[key];

        if (!fns) {
            return false;
        }

        if (!fn) {  // 没有传入具体的回调函数，则取消 key 对应消息的所有订阅
            fns.length = 0;
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {  // 当取消的回调与添加的回调相同时，则删除这个回调函数
                    fns.splice(l, 1);
                }
            }
        }
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments);
        var fns = this.clientList[key];

        if (!fns || fns.length === 0) {
            return false;
        }
    
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    }
};
// 给对象添加 发布-订阅 功能的方法
var installEvent = function(obj) {
    for (var key in event) {
        obj[key] = event[key];
    }
}

var salesOffices = {};
installEvent(salesOffices);
var fn = function(price) {
    console.log('价格=' + price);
};
salesOffices.listen('square88', fn);
salesOffices.listen('square110', function(price) {
    console.log('价格=' + price);
});

salesOffices.trigger('square88', 2000000);
salesOffices.trigger('square110', 3000000);

salesOffices.remove('square88', fn);  // 移除订阅