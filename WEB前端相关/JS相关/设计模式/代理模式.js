代理模式（proxy），顾名思义就是帮助别人做事，为其它对象提供一种代理以控制对这个对象的访问。（比如中介，买家不直接访问卖价，而通过中介）

模式作用：
1、远程代理（一个对象将不同空间的对象进行局部代理）
2、虚拟代理（根据需要创建开销很大的对象，如渲染网页，暂时用占位代替真图）
3、安全代理（控制真实对象的访问权限）
4、智能指引（调用对象代理，处理另外一些事情，如垃圾回收机制）



// 代理模式需要3方
// 1.买家
function maijia(){
    this.name='小明';
}
// 2.中介
function zhongjie(){

}
zhongjie.prototype.mai3fang=function(){
    new fangdong(new maijia()).mai4fang('20W');
}
// 3.房东
function fangdong(maijia){
    this.maijia_name=maijia.name;
    this.mai4fang=function(money){
        alert('收到了来自【'+this.maijia_name+'】'+money+);
    }
}
new zhongjie().mai3fang();