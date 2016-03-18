nodeJS：以ECMAscript为基础，扩展出的可以操作文件、网络、数据库、操作系统等的编程语言。类似javascript是以ECMAscript为基础，扩展了DOM和BOM的操作
由于是以ECMAscript为基础，所以大部分语法都一样，比如创建变量、函数、对象等，还有内置的Date对象、Math对象这些，都是JS一样。
主要一点区别在于，nodeJS中没有window对象，那是浏览器的顶层对象，在nodeJS中顶层对象是global



// 模块（commonjs规范）：
一个文件就是一个模块；每个模块都有自己的作用域，避免全局污染
var a=1;  //不是全局的，而是当前模块下的
console.log(global.a);  //undefined，不能通过global对象来访问定义在顶层的变量。因为a是模块中的变量，而不是全局的
global.a=100;  //这样声明的a变量才是全局的，但不推荐
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
a.js中：
// 在模块中内部实现了exports=module.exports，所以可以直接挂载到exports下
exports.a=function(){  //将一个方法挂载到对外接口中，另外的模块引入这个模块后，就能使用这个方法了
    console.log('a');
    aa();  //外部模块不能直接调用aa()，但是可以通过a()来调用aa()
}
var aa=function(){  //没有挂载到对外接口的变量或函数，别的模块引入了这个模块也调用不了
    console.log('aa');
}
module.exports.aaa='aaa';  //对外接口中挂载一个成员变量
exports.aaa='aaa';  //由于module.exports===exports（指向同一地址），所以可以直接挂在在exports下。这里也说明，不要随意修改exports的指向地址，也就是不要将数组或对象直接赋值给exports
b.js中：
var a=require('a.js');  //引入外部模块，并赋值给一个变量。require()的返回值就是a.js中的module.exports指向的地址
a.a();  //调用a.js中的a()
var b=require('a.js').a;  //引入外部模块对外接口中的一个成员，并赋值给一个变量
b();  //由于赋值的时候就是将外部模块中的a成员方法赋值给b，所以可以直接调用b()
console.log(a.aaa);  //访问引入模块中的成员变量aaa
注意：不要像下面那样写，直接将一个对象引用赋值给任何一个exports，那样就会切断module.exports和exports之间的关系
module.exports=[1,2,3] 或 exports=[1,2,3]
悟：模块可以看作是一个类，对外接口是这个模块中的公有属性和方法（public），没有对外接口的是这个模块中的私有属性和方法（private）



// global对象
console.log(__filename);  //返回当前模块文件的解析后的绝对路径。该属性其实并非全局的，而是模块作用域下的
console.log(__dirname);  //返回当前模块文件所在目录解析后的绝对路径。该属性也不是全局的，而是模块作用域下的

// process对象：属于global对象，通过它的属性和方法，可以对当前运行的程序的进程进行访问和控制
console.log(process);
console.log(global.process);  //同上
console.log(process.argv);  //得到一个数组，包含node.exe的路径；当前js文件的路径；以及在命令行使用node命令，运行这个JS文件的时候，后面跟的参数（如：node 1.js a b=0，会输出['node','js文件路径','a','b=0']）
console.log(process.env);  //得到用户环境系统信息，是一个对象
console.log(process.pid);  //得到当前进程的PID：任务管理器里查看详细信息，可以看到node.exe的PID
process.exit();  //退出当前程序
*stdin/stdout:标准输入输出流（I/O），通过输入设备和输出设备来输入和输出数据
// stdout
process.stdout.write('hello');  //console.log()也就是这个方法的实现
// stdin
process.stdin.resume();  //调用resume()开启输入流：输入流默认是关闭的，要监听处理输入流数据，首先要开启输入流。运行到这里的时候，用户就可以在控制台输入数据
process.stdin.on('data',function(chunk){  //使用data事件用于监听用户的输入数据。当用户输入数据后，敲回车，会调用它
    console.log('用户输入了'+chunk);  //打印出用户输入的数据
})