// 定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点
// 用一个变量来标识当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象
// 弹出登录框这种就适合使用单例模式创建
// 功能：生成唯一对象，避免过多性能开销


// 传统面向对象写法：
// 一
var Singleton = function(name) {
    this.name = name;
};

Singleton.prototype.getName = function() {
    console.log(this.name);
};

// 使用静态成员来保存对象实例
Singleton.instance = null;
Singleton.getInstance = function(name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
}

// 创建对象只能使用静态方法来创建，这是个问题
var a = Singleton.getInstance('Tirion1');
var b = Singleton.getInstance('Tirion2');

console.log(a === b);  // true


// 二
// 透明的单例模式
// 通过闭包创建了一个私有变量来保存实例
var CreateDiv = (function() {
    var instance = null;

    var CreateDiv = function(html) {
        // 当变量保存了对象，则直接返回这个对象
        if (instance) {
            return instance;
        }

        this.html = html;
        this.init();

        instance = this;
    };

    CreateDiv.prototype.init = function() {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    };

    return CreateDiv;
})();

var a = new CreateDiv('Tirion1');
var b = new CreateDiv('Tirion2');

console.log(a === b);  // true


/*-------------------------------------------------------------------------------------------*/


// JavaScript 本就是无类语言，所以不需要使用类来实现唯一的对象
// 这就是一个最简单的单例模式
var a = {};


// 使用闭包实现
var user = (function() {
    var _name = 'Tirion';
    var _age = 29;

    return {
        getUserInfo: function() {
            return _name + '-' + _age;
        }
    }
})();


// 惰性单例：在需要的时候才创建对象实例
var createLoginLayer = (function(){
    // 使用一个变量来保存创建好的 DOM
    var div = null;
    return function() {
        // 当 DOM 没创建的时候才创建
        if (!div) {
            div = document.createElement('div');
            div.innerHTML = '我是登录框';
            div.style.display = 'none';
            document.body.appendChild('div');
        }

        return div;
    }
})();

document.getElementById('loginBtn').onclick = function() {
    var loginLayer = createLoginLayer();
    loginLayer.style.display = 'block';
};


// 通用惰性单例
// 把创建对象的方法 fn 作为一个参数
var getSingle = function(fn) {
    var result = null;
    // 返回一个函数，调用这个函数则创建单例对象
    return function() {
        // 这里使用 apply 或是 call，是否改变 this 指向，根据需要决定
        return result || (result = fn.apply(null, arguments));
    }
}

var createLoginLayer = function() {
    var div = document.createElement('div');
    div.innerHTML = '我是登录框';
    div.style.display = 'none';
    document.body.appendChild('div');
    return div;
}

var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function() {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};
