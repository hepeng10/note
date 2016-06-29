在浏览器中直接运行ES6语法，需要使用"use strict"才能有较好的支持

let：1、不允许重复声明；2、没有预解析（暂存死区）；3、只存在于块级作用域
const：1、不能被重新赋值；2、常量的值是对象|数组，可以修改对象|数组里的值



解构赋值：
以一定模式从对象|数组中取值，并赋值给变量，提高从数组|对象中提取值作为变量的效率

数组解构：
let arr = [1,2,3];
let [a, b, c] = arr;  //创建变量a,b,c值为1,2,3。数组复杂度不限，只要模式能一一对应即可。不想创建变量的位置可以只写个逗号留空即可

对象解构：
let obj = {
            a: 'abc',
            b: function(){},
            c: {}
        };
let {a, b, c} = obj;  //对象里的值会按照字段名对应赋值给变量

let x=1;
let y=2;
[x,y]=[y,x];  //这样就交换了x和y的值了



字符串扩展：
JS中，通常的字符为2字节，但是有些字符为4字节。在使用一些方法处理4字节的字符的时候会有误差，如length，通常的2字节字符一个的长度为1，而4字节字符一个的长度为2。ES6就针对4字节的字符扩展了一些方法，方便处理。
let str='𠮷';  //这是个4字节的字符
str.at(0);  //返回对应位置的字符
let point=str.codePointAt(3);  //将指定位置的字符转换为码点
String.fromCodePoint(point);  //将码点转化成字符



Match扩展：
let num=1.234;
Math.trunc(num);  //直接去掉小数点，类似parseInt()
Math.sign(num);  //判断正数、负数、正0、负0。返回1、-1、0、-0
Math.hypot(3,4);  //返回所有参数的平方和的平方根（勾股定理）



数组扩展：
let divs = document.getElementsByTagName('div');
let arr = Array.from(divs);  //将类数组转为数组，类似于 [].slice.call(divs)
var v = arr.find(function(v, i){  //遍历数组，找出第一个符合条件的数组元素
    return v < 3;  // 返回为true，则返回这个元素的值。所有元素都不符合，返回-1
});
var n = arr.find(function(v, i){  //遍历数组，找出第一个符合条件的数组元素的索引
    return v < 3;
});
arr.fill(6,[2,4]);  //填充数组，将数组的元素填充为设置的值。第2,3个参数是填充的位置，没有则为所有填充。可用来给游戏的数组矩阵填充默认值等
for(var v of arr) {  //遍历数组和类数组的value
    console.log(v);
}
for(var k of arr.keys()) {  //遍历数组和类数组的key
    console.log(k);
}
for(var [k, v] of arr.entries()) {  //遍历数组和类数组的key和value
    console.log(k, v);
}
var arr2 = [for(v of arr) v*2];  //数组推导：根据一个已有数组，生成一个新数组。这里的v不能使用var声明，v*2也不能写return



对象扩展：
{ x, y, z }  // 表示 { x: x, y: y, z:z }
const obj = {
    name: 'Tirion',
    getName() {  // 对象内的方法的简洁写法
        return this.name;
    },
    [sex]: false  // 属性名可以用表达式，放在中括号中
}
Object.is(0, -0);  // 判断参数是否全等。比 === 更强大，这里返回 false，而 === 会返回 true
Object.assign(obj1, obj2, obj3);  // 合并对象到第一个参数对象中。对象中有相同属性时，后面参数的会覆盖前面参数的
Object.getPrototypeOf(obj);  // 获取一个对象的 prototype 对象
Object.setPrototypeOf(obj1Instance, obj2.prototype);  // 设置 obj1Instance 对象实例的 prototype 对象为 obj2 的 prototype 对象

var p1 = new Proxy(obj, {  // 对一个对象进行代理，类似 Object.defineProperty()
    get(obj, attr) {  // 当获取 obj 对象的属性的时候，会执行这里的操作，并得到这里指定的返回值
        console.log(obj,attr);
        return obj[attr];
    },
    set(obj, attr, val) {  // 当修改 obj 对象的属性时触发
        console.log(obj, attr, val);
        obj[attr] = val;  // 对 obj 的属性设置值
        return 1;  // 返回值没啥用，但是不写会报错。。。
    }
});

Object.observe(obj, function(a) {  // 当操作 obj 的属性时，会触发回调函数，回调函数的参数是个数组，里面可能包含多个对象，每个对象有 name, oldValue, type 等属性描述了操作的属性名、原始值、操作类型等
    console.log(a);
});
obj.a = 3;

Object.unobserve(obj, fn);  // 解除绑定，如果要解除，那么在绑定的时候的回调函数就必须单独声明为一个有名字的。类似 addEventListener



函数扩展：
function fn(a, b = 2) {  // 设置参数的默认值，具有默认值的参数应该放在最后
    return { a, b };
}

function fn(a, b, ...c) {  // rest 参数，参数 c 表示后面所有参数的数组集合，用于参数个数不确定的场合。也应该放在参数的最后
    console.log(c);  // fn(1, 2, 3, 4, 5)  c 的值是 [3, 4, 5]
}

var arr = [1, 2, 3, 4, 5];  // 取出数组中的最大值
Math.max.apply(null, arr);  // ES5 的方法。max() 是要接受多个参数，而 apply 传参是数组的形式，也就是通过 apply 传入数组，实际上就是传入多个参数
Math.max(...arr);  // ES6 使用扩展运算符即可。将数组或类数组拆解成逗号分隔的参数的形式

...运算符（扩展运算符）
这个运算符有两个相反的功能：分解和合并
分解：可以简单的想象成去掉中括号/大括号
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];  //去掉中括号后就是 1, 2, 3，所以结果是[1, 2, 3, 4, 5]
let obj1 = {a: 1, b: 2, c: 3};
let obj2 = {...obj1, d:4, b:5};  //去掉大括号后是 a: 1, b: 2, c: 3，然后对象中属性名相同，后面的会覆盖前面的，所以结果是{a: 1, b: 5, c: 3, d: 4}
合并：可以想象成将多个值加上中括号/大括号
function a(...args) {  //将接收的多个参数转为数组
    for(var v of args) {
        console.log(v);
    }
}
a(1, 2, 3);
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };  //这里变量z的值是{a: 3, b: 4}

箭头函数：
内部没有 this ，可以避免 this 指向的问题
var f = a => a + 1;  // 只有一个参数，可以不用括号；函数体只有一个表达式，可以不用大括号，并且会自动 return 这个表达式的值
var f = (a, b) => {  // 多个参数和多条语句的写法
    const c = a + b;
    return c + a;
}
注意：
1、函数体内的 this 对象，绑定定义时所在的对象，而不是使用时所在的对象
2、不可以当做构造函数，不可以使用 new 命令，否则会抛出一个错误
3、该函数体内不存在 arguments




数据结构：
Set：类似数组，但成员唯一
var set = new Set([1, 2, 3, 3, 4]);  // 接收一个数组或类数组，得到的 set 对象不会有重复的值，也就是里面只有一个3，可用作数组去重
set.size  // 获取个数，这里是4
set.add(7);  // 添加
set.delete(1);  // 删除
set.has(3);  // 判断是否存在
set.clear();  // 清除所有成员

Map：类似对象
var map = new Map([['name', 'Tirion'], ['age', 28]]);  // 接收一个二维数组，每个第二维数组是个键值对
map.size  // 获取成员总数
map.set('sex', '男');  // 添加
map.get('age');  // 获取
map.has('name');  // 判断是否存在
map.delete('sex');  // 删除
map.clear();  // 清空

Symbol：表示独一无二的 ID，它通过 Symbol 函数生成。是一种新的数据类型 symbol
var s = Symbol();  // 每次调用生成的变量是独一无二的
Object.prototype[Symbol.iterator] = function() {  // 通过 Symbol.iterator 部署遍历接口。当使用 for of 遍历对象的时候，就会调用这个方法
    const keys = Object.keys(this);  // 获取到调用这个方法的对象的所有 key
    const self = this;
    let index = 0;
    return {  // 必须返回一个对象
        next() {  // 必须包含 next 方法
            if(index < keys.length) {
                return {
                    value: self[keys[index++]],  // value 是每次遍历返回的值
                    done: false  // 当 done 为 false 的时候，表示遍历未结束，还可以继续遍历
                }
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}



Generator 函数
function* fn() {  // 声明函数的时候，在 function 后加上 * 就成了 Generator 函数
    yield 1;  // yield 只存在于 Generator 函数中。调用一次 next() 就会执行到下一个 yield 位置，并停止执行
    var a = yield 2;  // 可以返回一个值，这个值是 next() 方法中传入的参数
    console.log(a);
    yield 3;
}
var f = fn();
f.next();  // 返回一个对象 { value: 1, done: false }
f.next('2的返回');  // next 传参，作为 yield 的返回值
f.next();  // 再次调用的时候才会执行 console.log(a);



Promise
var p1 = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('成功');  // 调用的 resolve() 就是下面 then() 方法中传入的第一个函数。传入的参数也可以在 then 方法中接收。当然，reject 就对应 then 方法中第二个函数
    }, 400);
});
p1.then(function(resp){
    console.log(resp);
    console.log(a);  // 这里要打印 a，但是并没有 a，所以报错，跳到 catch
},function(resp){
    console.log(resp);
}).catch(function(e) {  // 当 then 执行的时候报错，会跳到 catch，捕获错误信息
    console.log(e);
});

Promise.all() 的使用
var p1 = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('成功');
        console.log('p1');
    }, 100);
});
var p2 = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('成功');
        console.log('p2');
    }, 1000);
});
var p3 = Promise.all([p1, p2]);  // 当 p1,p2 都 resolve，p3 才会 resolve。当 p1,p2 其中一个执行了 reject，则立刻执行 p3 的 reject
p3.then(function(){
    console.log('成功');
}, function(){
    console.log('失败');
});



面向对象
class Cat {
    constructor(name) {  // 构造函数
        this.name = name;  // 成员属性
    }
    getName() {  // 成员方法
        return this.name;
    }
}
var c1 = new Cat('aa');
c1.getName();

class SmallCat extends Cat {  // 使用 extends 继承
    constructor(name, color) {
        super(name);  // 在构造函数内，super 指向继承的类的构造函数；在其它方法内，super 指向父类的同名方法。调用 super() 后，就把父类构造函数里的东西继承过来了
        this.color = color;  // 子类扩展的成员属性
    }
    showColor() {  // 子类扩展的成员方法
        return this.color;
    }
}
var s1 = new SmallCat('bb', 'white');
s1.getName();  // 调用父类的方法
s1.showColor();  // 调用自身的方法