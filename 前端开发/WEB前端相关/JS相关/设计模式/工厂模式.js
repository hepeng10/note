工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。

模式作用：
1、对象的构建十分复杂
2、需要依赖具体的环境创建不同实例
3、处理大量具有相同属性的小对象


// 最基本的工厂模式实例
// 这里将单例模式和构造函数模式结合
var gongchang={};  //单例模式
gongchang.Chanyifu=function(arg){  //构造函数模式
    this.gongren=50;
    alert('我们有'+this.gongren);
}
gongchang.Chanxie=function(){
    alert('产鞋子');
}
gongchang.Yunshu=function(){
    alert('运输')；
}
// 工厂应该由厂长来决定运行到底哪条产品线
gongchang.Changzhang=function(para){
    return new gongchang[para]();
}
var me=gongchang.Changzhang('Chanyifu');
alert(me.gongren);