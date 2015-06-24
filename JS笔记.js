JS是基于对象的语言，常用语法为：对象.[对象.对象...]函数|属性
<script>JS语句</script> //不用写<script laguage="javascript" type="text/javascript">，因为默认即是这个
<script src="test.js"></script> //导入JS文件；后导入的JS文件都能使用先导入的JS文件定义的函数等内容
<a href="javascript:JS语句">链接</a>
<form action="javascript:JS语句"><input type="submit"></form> //可以直接在标签中写JS代码
alert("弹窗输出内容");
document.write("网页内输出内容");
//运算符注意事项：
a=10+5+"12abc"+20; //值为1512abc20，遇到字符串则转换为字符串连接，和PHP不一样；JS中没有字符串连接符.直接用+连接
% //当求模的时候，PHP会自动转化为整数，而JS不会，所以不要用浮点数求模
break xx; //PHP中跳出多层循环的时候只需要在break后面加上数字即可，而JS中需要在循环的外面设置个标记符xx:(xx为自定义名，后面跟一个冒号)，则break xx会调到这个标记符那里，从而达到推出循环的效果

//JS语法
var 变量名=值; //声明变量如var name="tirion"；在函数外面声明的变量都是全局变量，函数内可直接使用；运行后保存在内存中，直到浏览器关闭；JS严格区分大小写，无论变量、函数、对象
typeof(变量名); //判断类型如typeof(name)；包括number(int float double)，string(string char)，boolean，function，object(object array null)，undefined这5种
''和"" //都不能解析里面的变量，只能用连接法将变量插入多个字符串之间

//函数的使用
function test(name,age){} //创建函数，函数也可以看作变量直接输出alert(test)，输出内容为这个函数的所有代码
function test(check){check();} //回调函数，需要传入一个函数，函数可以直接写如function test(function(){函数体}){check();}
function test(a,b,c){ //通过此方法实现参数默认值功能
	a=a?a:1;
	b=b?b:1;
	c=c?c:1;
	函数体...
}
function test(){
	alert(arguments.length); //变长参数的函数，通过arguments获取传入的所有参数形成一个数组
	alert(arguments[1]); //通过此方法获取一个参数
}
escape(str); unescape(str); //将字符串转换成一种编码格式和将编码格式转换成字符串
parseInt(n); //转换为整数，割舍法，浮点数、字符串都能转；如果以非数字开头则返回NaN(not a number)
parseFloat(n); //转换为浮点数
isNaN(n); //判断是否是number类型，是则返回true
evl(str); //将字符串解析为JS代码，传入的字符串必须是一段JS代码程序；注意这段代码程序必须是写在同一行的，不能换行写

//对象的使用：JS的对象相当于PHP的类，对象实例相当于PHP的对象
var date=new date(); //对象实例化，系统内置对象date
date.getYear(); //访问对象中的方法；使用.访问，PHP中是->
//对象的创建
function Play(){ //也是通过function来创建对象
this.width=300; //但是对象里的属性和方法都必须加上this关键字
this.heigt=200;
this.autoPlay=function(){
	alert(this.width);
	}
}
var p=new Play(); //实例化对象
p.autoPlay(); //调用对象中的方法
var man={name:"tirion",age:26,sex:"男"}; //json方式快速声明对象
man.name; //获取对象属性
man["sex"]; //另一种方式获取成员属性
//遍历对象
var val="";
for (val in p){ //使用for in循环遍历对象，关键字in
	alert(val); //每循环一次，将一个成员名赋给变量val
	alert(p[val]); //通过对象[成员名]获取值；注意这里不能使用p.val，因为这样会认为是调用p对象中的val这个属性，而不会把变量val的值得到；而使用p[val]则会先获取变量的值，也可以通过p["width"]直接访问对象中的成员，等同于p.width，所以p[val]的功能更强大
}
with(p){ //系统内置with函数，传入一个对象，则里面的方法默认调用此对象中的方法
	autoPlay(); //则是调用p对象中的autoPlay方法
	u.say(); //也可以添加对象名调用别的对象中的方法
}
//JS中的各种类型：string，number，array，function等也是作为对象存在的，可以用声明对象的方式声明这些类型，也可以调用对象中的方法来处理这些类型
var str="abcd"; //普通的声明方式
var str=new String("abcd"); //看作对象的声明方式(不建议使用)；这两种方式是等同的
str.length; //调用对象中的方法，两种方式声明的都能调用，所以用第一种来声明即可
//静态对象：系统内置的一种对象，不用创建对象实例(new)，直接调用
Math.random(); //Math数学对象；取一个0-1之间的随机数
Math.ceil(num); //进一取整：3.1取4
Math.floor(num); //割舍法：3.9取3
Math.round(num); //四舍五入
//正则表达式
var zz=/^\S+$/; //声明正则，不用引号
var str="user name";
str.match(zz); //使用字符串对象中的正则匹配方法
//数组；JS里只有索引数组，关联数组可以用对象来表示
var names=["张三","李四","王五"]; //创建数组
var arr=new Array("张三","李四","王五"); //另一种声明数组的方法
var arrs=[[1,"张三"],[2,"李四"],"王五"]; //创建多维数组
arrs[1][1]; //访问数组
arrs.length; //获取数组长度
for(var i=0;i<arr.length;i++){ //遍历数组，只有for没有foreach
	document.write(arr[i]+"<br>");
}
var language=["js","php","as","jsp","mysql","apache","html"]; //通常使用中括号的方式创建数组
language.sort(function(a,b){ //回调函数中传入两个参数
	if(a.length>b.length) //通过判断两个相邻元素的大小来自定义排序
		return 1;
	if(a.length==b.length)
		return 0;
	if(a.length<b.length)
		return -1;
}); //sort方法进行数组排序，可以传入一个回调函数来自定义排序方法，默认是按升序排列
language.push("c","java"); //入栈，传入一个或多个参数
language.pop(); //出栈，弹出最后一个元素
language.unshift("perl"); //在数组开头插入一个或多个参数
language.shift(); //弹出数组的第一个元素
language.reverse(); //反转数组

//DOM的操作：
Document：文档，这里指HTML和XML
Object：需要先将HTML|XML文档内要操作的结构(HTML元素)转成JS对象；可以操作属性，操作内容，操作样式
转成对象的两种方式：
1、标签名(多个-数组形式)，id(唯一)，name(多个-数组形式)
<a href="www.qq.com" id="one" "title"="标题">这是个链接</a>
var obj1=document.getElementsByTagName("div"); //通过标签名转成对象
var obj2=document.getElementById("one"); //通过id值转成对象
var obj3=document.getElementsByName("two"); //通过name值转成对象
var obj4=document.getElementById("content").getElementsByTagName("div"); //连续操作，将id为content区域内的div标签转成对象
alert(obj2.href); //原HTML标签内的属性就转化成对象的内置属性，可以对其进行各种基于对象的操作
obj2.color="black"; //可以添加属性
obj2.innerText="<b>点击我</b>"; //通过innerText修改文本内容，innerText插入进去的标签不会作为HTML标签而是作为文本输出(火狐不兼容，使用textContent)；alert(obj2.innerText)也能直接输出
obj2.innerHTML="<b>点击我</b>"; //也是修改文本，但是标签会成为HTML标签产生加粗的效果(推荐都使用这个操作文本)；alert(obj2.innerHTML)也能直接输出
obj.value; //注意：如果是取表单的内容则不能使用innerText或innerHTML，而是value
obj2.style.backgroundColor="red"; //操作样式，也就是添加修改style样式(<a style="">)，再在style中添加属性；注意：backgroundColor的标签内写法是background-color，这里遇到-时需要去掉，并将后面的首字母大写；alert(obj2.style.backgroundColor)也能输出样式属性的值；如果是外链的样式则无法获取
ojb2.className="test demo"; //可以将各种属性以外链CSS的方式写在<style>中；必须是class样式如.test{color:"red";width=200px}，可以写多个，然后将这些自定义class样式通过className方法添加到标签中，可以以空格隔开添加多个class样式
2、系统内置数组对象
document.all //获取所有标签
document.embeds //获取embed标签
document.scripts //获取script标签
document.images //获取image标签
document.forms //获取form标签
document.anchors //获取锚点
document.styleSheets //获取style标签
document.links //获取链接标签
alert(document.images.length) //将弹出页面中所有image标签的个数
document.forms[1].username.value //获取页面第二个form表单中name值为username的那个标签(<input type="text" name="username" value="zhangsan">)的value值
document["f2"].username.value //获取页面中name为f2的那个标签(这里是一个form标签)；所以可以通过添加参数name，使用document快速定位标签进行操作
Modle：HTML是一种倒树结构，里面的标签称为节点(Node)，包括元素节点(节点里面有节点，如form)、文本节点(标签里面是文本的，如div)、属性节点、文档节点、注释节点，节点有父节点(上级标签)、子节点(下级标签)、同胞节点(同一级标签)
每个节点都包含节点名称nodeName，节点类型nodeType，节点值nodeValue
元素节点的nodeName是标签名；属性节点的nodeName是属性名，文本节点的nodeName是#text，文档节点的nodeName是#document
nodeType可返回节点的类型：1元素，2属性，3文本，8注释，9文档
<div>
<h3>title<h3>
<p id="pp"><a>aaaaa</a><span>bbbbb</span></p>
<b>lllllll</b>
</div>
var pobj=document.getElementById("pp");
alert(pobj.nodeType); //将弹出节点类型：1
alert(pobj.nodeName); //将弹出节点名：P
alert(pobj.parentNode.nodeName); //找到父节点div，弹出DIV
alert(pobj.childNodes.length); //取出子节点的个数：2
alert(pobj.childNodes[0].nodeName); //弹出第一个子节点名称：A；childNodes可换为firstChild或lastChild找第一个或最后个子节点
alert(pobj.nextSibling.nodeName); //下一个同胞节点名：#text；上一个是previousSibling

//文档流：创建节点，添加节点，删除节点
<a href="javascript:document.write(aaaa);">aaa</a> //当点击aaa链接的时候，不会在本页面添加输出aaaa，而是在新页面输出aaaa；需要通过节点实现本页面添加
var aobj=document.createElement("a"); //创建一个元素节点，即HTML标签，传入一个HTML标签名即可；也可以创建文本节点，属性节点等，但没必要，通过元素节点就能创建
aobj.href="http://www.163.com"; //给标签创建属性
aobj.innerHTML="163"; //给标签创建文本
pobj.appendChild(aobj); //在pobj这个节点对象中插入一个aobj子节点
pobj.insertBefore(aobj,sobj); //在pobj中插入一个节点aobj在sobj(如上面的span，都为p的子节点)之前
pobj.removeChild(pobj.lastChild); //删除pobj里面的最后一个节点，传入参数是一个子节点

//事件处理：包括事件源(如按钮)，事件(如点击)，事件处理程序(产生的效果)
事件源：任何一个HTML元素(节点)
事件：鼠标：click, dbclick, contextmenu(body标签上，右键事件), mouseover, mouseout, mousedown, mouseup, mousemove；键盘：keypress, keyup, keydown；文档：load(页面加载完时触发), unload(页面关闭时), beforeunload(关闭之前)；表单：focus, blur, submit, change；其它：scroll, select...
事件处理程序：第一种：<tag on事件="事件处理程序"/> 第二种：<script>对象(标签转化的对象getElement).on事件="事件处理程序"</script>
//事件对象：当事件发生后会自动创建一个事件对象event(只有IE)
event.srcElement.innerText="abc"; //srcElement代表事件源对象
event.keyCode; //返回键盘码，事件keydown才支持键盘上的所有键
clientX; clientY; //返回鼠标事件发生事距离浏览器左上角的X和Y值
screenX; screenY; //返回鼠标事件发生事距离屏幕左上角的X和Y值
returValue("str"); //返回一个值
cancelBubble=true; //停止事件，不再执行下面的事件

//表单对象
属性：action, method, enctype, title
事件：
submit //用在form标签中，此事件的返回值为假(onsubmit="return false")，则不提交表单，可用来验证用户输入信息等
focus //获取焦点(鼠标的输入位置)，<input onfocus="">
blur //失去焦点的时候执行，<input onblur="">
change //改变，<select onchange="">
方法：
submit() //调用此方法会提交表单
focus() //获取焦点


//BOM的操作：浏览器对象模型，就是window对象，window可以省略，如alert()其实是window.alert()
属性：status, opener(在子窗体中代表父窗体对象), closed
方法：
alert("欢迎访问"); //普通弹出框
confirm("你确定要删除吗？"); //弹出框，选择确定和取消，确定返回true，取消返回false；如<a href="del.php" onclick="return confirm("你确定要删除吗？")">删除</a>
var dt=setInterval("fun()",100); //每隔100毫秒执行一次fun函数
clearInterval(dt); //清除(停止)setInterval的自动执行
var tz=setTimeout("fun()",500); //500毫秒后执行fun函数(只执行一次)
clearTimeout(tz); //清除setTimeout()
open("url","_blank","top=200,left=100,width=400,height=400..."); //打开一个新的子窗体；可以通过此方法返回一个对象，在父窗体中操作这个对象来控制子窗体，也可以在子窗体中使用opener对象来操作父窗体
window对象下面有document, history, location,screen...对象
window.navigate('url'); location.href="url"; location="url"; //都是页面跳转
location.reload(); //刷新页面
history.back(); //返回上一个页面
history.go(-1); //返回上一个页面，可以传入-2,-3,-n返回上第n个页面
screen.avaiHeight; //屏幕对象，获取屏幕的高度总像素
clipboardData.setData("Text",data); //将数据data复制为文本

//一些位置属性
offsetWidth //获取自身的宽度；obj.offsetWidth；也就是obj.style.width；但是这个不带单位，并且style如果是通过外部css链接进来的是获取不到的
offsetHeight //获取自身的高度
offsetTop //获取自身到上一个容器的顶部距离
offsetLeft //获取自身到上一个容器的左部距离
scroll //滚动事件，<body onscroll="">
scrollTop //滚动的顶的距离，如滚动条滚动了50px，则是50px
ScrollLeft //滚动的左边的距离

//其它
<a href="javascript:void(0)">点击什么都不发生</a>  //使用href="javascript:void(0)"让链接点击的时候什么都不发生



//AJAX：主要用于页面的局部刷新和按需取数据，是一种JS技术
//ajax分为同步和异步两种，通常使用异步，但有时也会用到同步。同步ajax需要ajax执行完后，才继续执行网页上的代码（详见兄弟连PHP项目视频21）
//创建AJAX对象：比较复杂，但代码固定
function createAJAX(){
	var request=false;
	
	//window对象中有XMLHttpRequest存在就是符合W3C标准的浏览器
	if(window.XMLHttpRequest){
		request=new XMLHttpRequest();
		if(request.overrideMimeType){
			request.overrideMimeType("text/xml");
		}
	//window对象中有ActiveXObject属性就是IE6
	}else if(window.ActiveXObject){
		request=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return request;
}

var ajax=createAJAX();
//AJAX的6个方法：用于向服务器发送请求
setRequestHeader("label","value"); //设置header并和请求一起发送
getResponseHeader("headerLabel"); //作为字符串返回单个header标签
getAllResponseHeaders(); //作为字符串返回所有的header标签
abort() //停止当前请求；以上4个方法通常不用
open("method","URL"[,asyncFlas,"username","password"]); //设置请求的目标，第一个参数传入get|post，第二个参数是请求的地址，第三个参数传入true|false(通常为true)，后面两个一般不用
send(content); //发送请求的内容
ajax.open("get","server.php?key1=value1&key2=value2&random="+Math.random(),true); //使用get方法发送请求，可以直接通过URL请求数据(value1&key2=value2...)，服务器断使用$_GET接收；random=Math.random()的作用是避免每次发送的是同一个请求而导致返回的数据是缓存里的
ajax.send(null); //发送数据；数据写在了URL里，这里就传空即可
ajax.open("post","server.php"); //使用post发送请求，第三个参数也不用传
ajax.send("key1=value1&key2=value2&random"+Math.random()); //就必须把请求内容写在这里了
ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  //post方式还必须使用这条语句发送头信息；<form action="server.php" method="post" enctype="">form里还需要添加个enctype属性
//AJAX的6个属性：用于接收服务器发送的数据
ajax.onreadystatechange=function(){ //状态改变的事件触发器readystatechange 
	if(ajax.readyState==4){ //数据传输过程中会有0-4种状态，4是完成，只需要获取完成后的状态即可
		if(ajax.status==200){ //服务器返回的状态码，200是成功，还有404等其它状态码
			var data=ajax.responseText; //通过responseText获取服务器发送来的数据
		}
	}
}
responseXML //返回兼容DOM的XML文档对象
//json：将数组转换为json编码
$arr=array('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);
json_encode($arr); //将数组转为json格式；json转码后的代码为：{"a":1,"b":2,"c":3,"d":4,"e":5}，这也就是JS快速创建对象的写法
eval("var obj="+data); //通过ajax获取服务器通过json转码后传送的数据并将数据转为ojb对象，这样就能访问数组的各个数据里，如果没用json转码，获取的数组也只是一个字符串
alert(obj.a); //就能通过对象中的属性访问值了
json_decod($json); //反编译json编码，将json编码转为PHP数组
//服务器端返回json需要使用header()
header("Content-Type: text/html;charset=utf-8");
header("Cache-Control: no-cache");
var obj={'name':'tirion','age':'26'} //最基本的json格式，通过obj.name访问
var obj=[{'name':'tirion','age':'26'},{'name':'soul','age':'20'}] //并列的多组json数据，通过obj[0].name或obj[1].name访问
var obj={'people':[{'name':'tirion','age':'26'},{'name':'soul','age':'20'}],'dog':{'name':'wangcai','age':'5'}} //混合的json格式；通过obj.people[0].name访问tirion，通过obj.dog.name访问wangcai
//创建ajax对象，简化ajax的使用
function Ajax(recvType){
	var aj=new Object();
	aj.recvType=recvType?recvType.toUpperCase():'HTML'
	aj.targeUrl='';
	aj.sendString='';
	aj.createXMLHttpRequest=function(){
	
	}
	aj.get=function(){
	
	}
	aj.post=function(){
	
	}
	return aj;
}
//自定义ajax对象简化ajax操作
function Ajax(recvType){
	var aj=new Object();
	aj.recvType=recvType ? recvType.toUpperCase() : 'HTML' //HTML XML
	aj.targetUrl='';
	aj.sendString='';
	aj.resultHandle=null;

	aj.createXMLHttpRequest=function(){
		var request=false;
		
		//window对象中有XMLHttpRequest存在就是非IE，包括（IE7，IE8）
		if(window.XMLHttpRequest){
			request=new XMLHttpRequest();

			if(request.overrideMimeType){
				request.overrideMimeType("text/xml");
			}
		

		//window对象中有ActiveXObject属性存在就是IE
		}else if(window.ActiveXObject){
			
			var versions=['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];

			for(var i=0; i<versions.length; i++){
					try{
						request=new ActiveXObject(versions[i]);

						if(request){
							return request;
						}
					}catch(e){
						request=false;
					}
			}
		}
		return request;
	}

	aj.XMLHttpRequest=aj.createXMLHttpRequest();

	aj.processHandle=function(){
		if(aj.XMLHttpRequest.readyState == 4){
			if(aj.XMLHttpRequest.status == 200){
				if(aj.recvType=="HTML")
					aj.resultHandle(aj.XMLHttpRequest.responseText);
				else if(aj.recvType=="XML")
					aj.resultHandle(aj.XMLHttpRequest.responseXML);
			}
		}
	}

	aj.get=function(targetUrl, resultHandle){
		aj.targetUrl=targetUrl;	
		
		if(resultHandle!=null){
			aj.XMLHttpRequest.onreadystatechange=aj.processHandle;	
			aj.resultHandle=resultHandle;	
		}
		if(window.XMLHttpRequest){
			aj.XMLHttpRequest.open("get", aj.targetUrl);
			aj.XMLHttpRequest.send(null);
		}else{
			aj.XMLHttpRequest.open("get", aj.targetUrl, true);
			aj.XMLHttpRequest.send();
		}
		
	}

	aj.post=function(targetUrl, sendString, resultHandle){
		aj.targetUrl=targetUrl;

		if(typeof(sendString)=="object"){
			var str="";
			for(var pro in sendString){
				str+=pro+"="+sendString[pro]+"&";	
			}
			aj.sendString=str.substr(0, str.length-1);
		}else{
			aj.sendString=sendString;
		}

		if(resultHandle!=null){
			aj.XMLHttpRequest.onreadystatechange=aj.processHandle;	
			aj.resultHandle=resultHandle;	
		}

		aj.XMLHttpRequest.open("post", targetUrl);
		aj.XMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		aj.XMLHttpRequest.send(aj.sendString);
		
	}

	return aj;
}
var ajax=Ajax();
ajax.post("index.php",{name:zhangsan,age:20},function(data){}); //第一个参数指定传入的PHP文件，第二个参数设置传入的数据，第三个参数接收返回的数据
ajax.get("index.php?name=zhangsan&age=20",function(data){}); //第一个参数指定传入的PHP文件和数据，第二个参数接收返回的数据

//前端缓存技术：基于javascript传输的数据，只要浏览器没关，都保存在内存中
//实现方法：创建一个数组，将需要缓存的数据保存在数组中，需要使用时调用即可；参加兄弟连PHP项目视频22第45分钟左右
var cache=new Array(); //创建一个用于缓存的数组
function setpage(index,data) {
	if (!cache[index]) { //当缓存不存在时，则进行缓存
		cache[index]=data;
	}else { //缓存存在时，则读取缓存
		xxx=cache[index];
	}
}