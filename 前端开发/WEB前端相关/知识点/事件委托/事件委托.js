事件委托（事件代理）：一个事件，本来该加载元素A上，但却加到B上来完成；利用冒泡的原理把事件加到父级以上，触发执行效果

event对象：事件源：不管在哪个事件中，你操作的那个元素就是事件源
标准：event.target
IE：window.even.srcElement
获取事件元素标签：事件源.nodeName，大写的
oUl.onmouseover=function(e){
    var e=e||window.event;
    var target=e.target||e.srcElement;  //获取到事件源
    console.log(target.innerHTML);  //移动到li上，会得到每个li的innerHTML
    console.log(target.nodeName);  //获取当前事件源是什么标签元素
};

好处：
1、提高性能：一次性绑定到父级上，而不是给每个元素绑定相同的事件
2、新添加的元素还会有之前的事件：事件绑定在父级上，新添加的元素依然会冒泡到父级上触发事件