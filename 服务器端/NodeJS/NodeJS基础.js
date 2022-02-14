nodeJS：以ECMAscript为基础，扩展出的可以操作文件、网络、数据库、操作系统等的编程语言。类似javascript是以ECMAscript为基础，扩展了DOM和BOM的操作

nodeJS 是异步的，非 I/O 阻塞的，也就是说，在进行读写文件的过程中并不会阻塞代码的运行，类似 AJAX 的异步形式，这就相对于 I/O 阻塞的语言来说性能大大提升。
nodeJS 同 JS 一样，也是基于事件机制的，因此，nodeJS 中也有大量的事件。

由于是以ECMAscript为基础，所以大部分语法都一样，比如创建变量、函数、对象等，还有内置的Date对象、Math对象这些，都是JS一样。

主要一点区别在于，nodeJS中没有window对象，那是浏览器的顶层对象，在nodeJS中顶层对象是global

nodejs常用框架有express，koa等



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



Buffer 类：全局的，一个用于更好的操作二进制数据流的类。
var bf = new Buffer(5);  // 创建一个 Buffer 对象，并为这个对象分配一个空间大小（字节，通常一个英文字符为1字节，一个中文字符为3字节），分配后长度便不能改变
var bf = new Buffer([1, 2, 3]);  // 使用数组初始化 Buffer 对象，将数组的每个元素转换成了二进制
var bf = new Buffer('miaov', 'utf-8');  // 使用字符串初始化。将字符串转换为了二进制，第二个参数设置编码，默认为 utf-8
for(var i = 0, j = bf.length; i < j; i++) {  // 遍历转换成二进制的 miaov
    console.log(String.fromCharCode(bf[i]));  // 使用 String.fromCharCode 将二进制转换为字符
}
var bf = new Buffer(10);
var str = 'miaov';
bf.write(str);  // 使用 write 方法，将字符串转换成二进制
bf.write(str, 1, 3);  // 写入3个字符到 buffer 对象中，但是是从 buffer 对象的第二位开始写（第二个参数为1，表示第二位）。也就是 buffer 对象中第一位为空，第二位开始写入 m i a 3个字符
bf.toString();  // 将 buffer 对象中的二进制转换为字符串输出。当 buffer 对象和字符串进行拼接的时候，buffer 对象会隐式调用 toString 方法
bf.toString('utf-8', 1, 3);  // 只写光标在1-3位之间的字符
bf.toJSON();  // 转换为 JSON，类似 { type: 'Buffer'. data: [109, 105, 97, 111, 118] }
bf2 = bf.slice(0, 3);  // 截取出需要的字符，并且 bf2 的内容和 bf 中对应的内容是引用关系，修改了 bf2 则 bf 也会改变
var bf3 = new Buffer(10);
bf.copy(bf3, 0, 1, 4);  // 复制出需要的字符，不会形成引用关系。第一个参数是写入的 buffer 对象；第二个参数是从写入的 buffer 对象的第几位开始写入；最后两个参数是复制源 buffer 对象的哪些位置
静态方法：
Buffer.isEncoding('utf-8');  // 判断是否支持此字符编码
Buffer.isBuffer(bf);  // 判断是否是 buffer 对象
Buffer.byteLength('妙味');  // 输出字节长度，这里是6
Buffer.concat([bf1, bf2, bf3], 10);  // 合并多个 buffer 对象。第二个参数是限制合并后的长度