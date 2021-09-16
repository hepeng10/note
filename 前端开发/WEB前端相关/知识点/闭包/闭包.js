什么是闭包：
1、函数嵌套函数
2、内部函数可以引用外部函数的参数和变量
3、参数和变量不会被垃圾回收机制收回
function a(a){
    var b=5;
    function c(){
        console.log(a);
        console.log(b);
        b++;
    }
    return c;
}
var c=a(1);  //这里我们调用了a()，但是这时a的参数和变量不会被垃圾回收机制收回，因为调用了之后会得到一个c函数，这个c函数中引用了a函数的参数和变量
c();  //调用后也不会被垃圾回收，这时b=5
c();  //再次调用b=6

闭包的好处：
1、希望一个变量长期驻扎在内存中（模拟静态变量）
2、避免全局变量的污染
var a=(function(){
    var a=1;
    return function(){
        a++;
        return a;
    }
})();
alert(a());  //可以得到变量a的值，但a是局部变量
alert(a());
3、私有方法
var a=(function(){
    var a=1;
    function b(){
        a++;
        return a;
    }
    function c(){
        a--;
        return a;
    }
    return {b:b,c:c};
})();
alert(a.b());  //b()和c()就是a的私有方法了
alert(a.c());
4、让for循环中每个值独立
var aLi=document.getElementsByTagName('li');
for(var i=0;i<aLi.length;i++){
    aLi[i].onclick=function(){
        alert(i);  //每个li点击的时候弹出的值都一样，为最大length值；因为这个alert(i)是在点击的时候才执行，而这时for循环已结束，变量i已到了最大值length
    };
}
i=10;  //如果再次对i进行赋值，那么上面的li点击时都会弹出10
改写：利用闭包让i成为局部变量
for(var i=0;i<aLi.length;i++){
    方法一：
    (function(i){  //接收i的值作为局部变量i
        aLi[i].onclick=function(){
            alert(i);  //每个li点击的时候弹出的是局部变量i的值
        };
    })(i);  //每次遍历的时候会把这次遍历时i的值传进去
    方法二：
    aLi[i].onclick=(function(i){
        return function(){
            alert(i);
        }
    })(i);
}

需要注意的地方：
IE下会造成内存泄漏：当一个DOM元素或数组对象的内部属性去调用一个内部函数，而这个内部函数又引用了外部对象就会造成内存泄漏
window.onload=function(){
    var oDiv=document.getElementById('div');
    oDiv.onclick=function(){  //oDiv的onclick属性引用了内部函数
        alert(oDiv.id);  //内部函数引用了外部oDiv的属性
    }
    // 需要在页面加载完后清空事件
    window.onunload=function(){
        oDiv.onclick=null;
    }
}