nodeJS：以ECMAscript为基础，扩展出的可以操作文件、网络、数据库、操作系统等的编程语言。类似javascript是以ECMAscript为基础，扩展了DOM和BOM的操作
由于是以ECMAscript为基础，所以大部分语法都一样，比如创建变量、函数、对象等，还有内置的Date对象、Math对象这些，都是JS一样。
主要一点区别在于，nodeJS中没有window对象，那是浏览器的顶层对象，在nodeJS中顶层对象是global



// 模块（commonjs规范）：
一个文件就是一个模块；每个模块都有自己的作用域，避免全局污染
var a=1;
console.log(global.a);  //undefined，不能通过global对象来访问定义在顶层的变量。因为a是模块中的变量，而不是全局的
global.a=100;  //这样声明的a变量才是全局的
console.log(a);  //输出1
console.log(global.a);  //输出100

// 模块加载系统
require('模块');
require('./b.js');  //引入同目录下的b.js模块
// 路径问题
require('E:/nodejs/2.js');  //绝对路径加载方式
require('./b.js');  //相对路径加载方式
require('b.js');  //这种写法会加载node中的核心模块，或者是node_modules下的模块
require('b');  //可以不写后缀，会按照nodeJS的模块加载机制去查找：b->b.js->b.json->b.node，没找到会抛出错误

// 对外接口
console.log(module);  //module对象是这个模块中的顶层对象，里面有一些属性，其中有个重要的属性exports，它的值也是一个对象
a.js
// 在模块中内部实现了exports=module.exports，所以可以直接挂载到exports下
exports.a=function(){  //将一个方法挂载到对外接口中，另外的模块引入这个模块后，就能使用这个方法了
    console.log('a');
    aa();  //外部模块不能直接调用aa()，但是可以通过a()来调用aa()
}
var aa=function(){  //没有挂载到对外接口的变量或函数，别的模块引入了这个模块也调用不了
    console.log('aa');
}
exports.aaa='aaa';  //对外接口中挂载一个成员变量
b.js
var a=require('a.js');  //引入外部模块，并赋值给一个变量。require()的返回值就是a.js中的module.exports指向的地址
a.a();  //调用a.js中的a()
var b=require('a.js').a;  //引入外部模块对外接口中的一个成员，并赋值给一个变量
b();  //由于赋值的时候就是将外部模块中的a成员方法赋值给b，所以可以直接调用b()
console.log(a.aaa);  //访问引入模块中的成员变量aaa
注意：不要像下面那样写，直接将一个对象引用赋值给任何一个exports，那样就会切断module.exports和exports之间的关系
module.exports=[1,2,3] 或 exports=[1,2,3]
悟：模块可以看作是一个类，对外接口是这个模块中的公有属性和方法（public），没有对外接口的是这个模块中的私有属性和方法（private）



// global对象
console.log(__filename);  //__filename是nodejs中的全局对象下的内置属性，值是当前文件被解析过后的绝对路径