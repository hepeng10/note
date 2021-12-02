// 把加载的模块的对外接口整个赋值给一个变量
var c=require('./c.js');
c.a();
// 把加载的模块的对外接口的某个属性赋值给一个变量
var a=require('./c.js').a;
a();
function b(){
    console.log('b')
}