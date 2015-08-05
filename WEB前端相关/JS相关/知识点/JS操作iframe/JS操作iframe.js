注：chrome中由于安全限制，需要在服务器环境下才能获取到iframeWindow对象

操作内部iframe
var oIframe=document.getElementById('iframe1');
var iframeWindow=oIframe.contentWindow;  //通过contentWindow获取iframe的window对象
iframeWindow.document.getElementById('div1');  //获取iframe中的元素

var oDiv=oIframe.contentDocument.getElementById('div1');  //通过contentDocument直接获取iframe的document对象；IE67不支持
oDiv.style.color='blue';



iframe中操作外部
var fWindow=window.parent;  //通过parent获取到外部的window对象
fWindow.document.getElementById('div1').style.color='red';  //通过window对象就能操作外部的元素了
var topWindow=window.top;  //通过top获取顶层元素的window，通常用在多级iframe嵌套的时候，只有一级iframe效果和parent相同



iframe加载完成执行
oIframe.onload=function(){
    alert(123);
}
// IE下只能用绑定的方式
oIframe.attachEvent('onload',function(){
    alert(456);
})



修改iframe大小
function changeHeight(){
    setTimeout(function(){  //进行一定的延迟，让iframe引入完成后再执行
        var h=oIframe.contentWindow.document.body.offsetHeight  //通过iframe的document.body.offsetHeight得到iframe内容高度
        oIframe.height=h;  //修改iframe标签的高度
    },100);
}



iframe防钓鱼
一些钓鱼网站中，使用嵌套iframe的方式，iframe中是真网站让用户正常访问，但是他们可以从iframe外部获取iframe的输入信息等。我们就需要防止别人使用iframe嵌套自己的网站
<iframe src='www.qq.com'></iframe>  //在自己的网站中使用iframe就能嵌套一个腾讯网
// 在自己的网站中写入以下代码，让别人嵌套iframe时，会自动跳转到自己的网站
if (window!=window.top) {  //不相等说明是在iframe中
    window.top.location.href=window.location.href;  //则将top的href设置为自己的进行跳转
}