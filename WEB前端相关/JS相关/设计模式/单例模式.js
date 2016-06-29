保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。在JS中，单利作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。

模式作用：
1、模块间通信
2、系统中某个类的对象只能存在一个
3、保护自己的属性和方法

注意事项：
1、this的使用
2、闭包容易造成内存泄漏，不需要的赶快干掉
3、注意new的成本



1、独立的对象。建2个，一个xiaowang，一个xiaoli
2、让xiaoli跟xiaowang通过门铃进行通信
3、先看一下xiaowang家有没有门，如果有门，直接通过门铃通信-didi，如果没有，先建门
4、两个单例之间开始通信
// 两种创建单例的方法
var xiaowang=(function(arg){
    var xiaowangjia=function(msg){  //闭包
        this.menling=msg;
    }
    var men;
    var info={
        sendMessage:function(msg){
            if(!men){
                men=new xiaowangjia(msg);  //闭包
            }
            return men;
        }
    };
    return info;  //返回了一个对象
})();
var xiaoli={
    callXiaowang:function(msg){
        var _xw=xiaowang.sendMessage(msg);  //进行通信
        alert(_xw.menling);
        _xw=null;  //清理闭包
    }
}
xiaoli.callXiaowang('didi');