AJAX：通过javascript与后端进行异步数据交互，主要用于页面的局部刷新和按需取数据。需要在服务器环境才能测试

// 基本AJAX请求：创建AJAX对象，然后通过AJAX对象的属性和方法完成AJAX请求
oBtn.onclick=function(){
    var ajax=new XMLHttpRequest();  //创建AJAX对象XMLHttpRequest；IE6不支持
    ajax.open('get','1.txt',true);
    ajax.send();
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4){
            if(ajax.status==200){
                alert(ajax.responseText);
            }
        }
    }
}

//创建AJAX对象：不去兼容IE6可以直接使用XMLHttpRequest
try{
    ajax=new XMLHttpRequest();
}catch(e){
    ajax=new ActiveXObject("Microsoft.XMLHTTP");
}

// AJAX向服务器发送请求
open(method,URL,async); //设置请求的目标，第一个参数为get|post，第二个参数是请求的地址，第三个参数为是否异步true|false(通常为true)
send(content); //发送请求的内容
// get请求
ajax.open("get","server.php?key1=value1&key2=value2&random="+Math.random(),true);  //Math.random()是避免缓存
ajax.send();  //get请求数据因为在url中，所以这里为空即可
// post请求
ajax.open("post","server.php",true);
ajax.send("key1=value1&key2=value2&random"+Math.random()); //就必须把数据写在这里了
ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  //post方式还必须使用这条语句发送头信息
*注：<form action="server.php" method="post" enctype="application/x-www-form-urlencoded"> form表单中默认也有ectype属性，值就为application/x-www-form-urlencoded，使用post提交的时候服务器需要通过enctype的值来选择获取数据的方式

//AJAX接收服务器发送的数据
ajax.onreadystatechange=function(){ //readyState状态值改变时触发readystatechange事件
    /*
    readyState属性：请求状态
    0：（初始化）还没有调用open()方法
    1：（载入）已调用send()方法，正在发送请求
    2：（载入完成，send()方法完成，已收到全部响应内容
    3：（解析）正在解析响应内容
    4：（完成）响应内容解析完成，可以在客户端使用了
     */
    if(ajax.readyState==4){ //通常只需要获取完成后的状态即可
        if(ajax.status==200){ //服务器返回的状态码，200是成功，还有404等其它状态码
            var data=ajax.responseText; //通过responseText获取服务器发送来的数据；data为字符串，需要转换为数组或JSON
            data=JSON.parse(data);  //将字符串解析为JSON对象
        }
    }
}

// JSON的转换
服务器会返回一个数组或者JSON格式的字符串，前端需要将这个字符串转化为数组或JSON格式再操作
JSON对象：IE8及以上浏览器支持，IE67需要引入一个JSON.js文件来支持
var j={"name":"Tirion","age":20};
var str=JSON.stringify(json);  //将数组或JSON转换为字符串格式
var str='{"name":"Tirion","age":20}';  //要使用JSON.parse进行转换，必须使用双引号
var json=JSON.parse(str);  //将一个数组或JSON格式的字符串转换成数组或JSON
另一种方法eval进行解析，但是由于eval不止解析JSON，所以是不安全的
eval(string)



// 封装ajax方法
function ajax(method, url, data, success) {
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    if (method == 'get' && data) {
        url += '?' + data;
    }
    
    xhr.open(method,url,true);
    if (method == 'get') {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    
    xhr.onreadystatechange = function() {
        
        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                success && success(xhr.responseText);
            } else {
                console.log('出错了,Err：' + xhr.status);
            }
        }
        
    }
}
// ajax调用
ajax('get','xxx.php','name=Tirion&age=28',function(data){
    var data=JSON.parse(data);
});