exports.a=function (){
    console.log('a')
    console.log(__filename)
    c();
}
var c=function(){
    console.log('c');
}
// 完整写法需要加上module，但是模块中内部实现了exports=module.exports，所以不需要加module
// module.exports.a=function (){
//     console.log(1)
// }
exports.c=function(){
    console.log('c')
}