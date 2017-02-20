// 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。比如明星的经纪人就是代理模式
// 当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。
// 功能：代理模式为面向对象设计的单一职责原则提供了很好的服务，预加载图片并不是 myImage 对象所必须的，今后若不需要预加载，只需直接调用 myImage.setSrc() 即可

// 这里以小明送花给女神，女神的朋友为代理为例
// 最基本的代理模式
var Flower = function() {};

var Xiaoming = {
    sendFlower: function(target) {
        var flower = new Flower();
        target.receiveFlower(flower);
    }
};
// 代理
var ZhongJianRen = {
    receiveFlower: function(flower) {
        // ... 执行其他操作
        // 转交给目标
        NvShen.receiveFlower(flower);
    }
};

var NvShen = {
    receiveFlower: function(flower) {
        console.log('收到花' + flower);
    }
};
// 调用的时候传入代理
Xiaoming.sendFlower(ZhongJianRen);



// 保护代理和虚拟代理
// 保护代理是代理会根据条件来确定行为，比如小明太穷，代理就不执行送花给女神的操作
// 虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建，如下：
var ZhongJianRen = {
    receiveFlower: function(flower) {
        var flower = new Flower();  // 代理在确定要送花的时候才买花
        A.receiveFlower(flower);
    }
}



// 虚拟代理实现图片预加载
var myImage = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    };
})();
// 通过 proxyImage 作为代理，间接访问 myImage
var proxyImage = (function(){
    var img = new Image;
    // 图片加载完成后修改 myImage 的 src
    img.onload = function() {
        // img.onload 中的 this 指向 img 对象
        myImage.setSrc(this.src);
    }
    return {
        // 接口一致性：这里将代理的方法命名为和本体相同，能更好的切换代理和本体。使用者也不用关心是代理还是本体
        setSrc: function(src) {
            // 先将 myImage 图片设置为 loding
            myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
            // 给上面创建的 img 对象的 src 属性赋值
            img.src = src;
        }
    }
})();

proxyImage.setSrc('http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');



// 缓存代理
var mult = function() {
    console.log('开始计算乘积');
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
}

var proxyMult = (function() {
    var cache = {};
    return function() {
        // Array 的 join 方法将 arguments 转换成字符串
        var args = Array.prototype.join.call(arguments, ',');
        // args 存在则直接返回 args 对应的值
        if (args in cache) {
            return cache[args];
        }
        // 计算后将值赋值给 cache 对象的 args
        return cache[args] = mult.apply(this, arguments);
    }
})();

proxyMult(1, 2, 3, 4);
proxyMult(1, 2, 3, 4);  // 第二次调用的时候会直接返回 cache[args]



// 高阶函数动态创建代理
// 计算乘积
var mult = function() {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
}
// 计算加和
var plus = function() {
    var a = 0;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
}
// 创建缓存代理的工厂
var createProxyFactory = function(fn) {
    var cache = {};
    return function() {
        var args = Array.protptype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    }
}

var proxyMult = createProxyFactory(mult);
var proxyPlus = createProxyFactory(plus);

console.log(proxyMult(1, 2, 3, 4));
console.log(proxyMult(1, 2, 3, 4));
console.log(proxyPlus(1, 2, 3, 4));
console.log(proxyPlus(1, 2, 3, 4));