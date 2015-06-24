jquery是基于javascript的，因此在写JQ的时候可以和JS的函数混用；只有针对JQ的DOM对象操作的时候只能用JQ的方法，不涉及DOM操作的方法都能通用；编程时，使用一个函数发现JQ没有封装而JS中有，直接用JS的那个函数即可

$(document).ready(function() { //jquery中运行函数，$(document)就是把document对象转化为jquery对象，从而使用jquery的函数
	各种操作...
});
$(function(){ //$(document).ready()简化写法；当页面的DOM对象加载完后才执行这里面的内容
	各种操作... //必须把各种操作写在$(function(){...})里；写在外面按代码读取顺序会先读取JQ内容，则无法对DOM进行操作(除非把JQ写在代码末尾，一般不这样做)
});


jquery的DOM对象
$("DOM对象") //用这种方法获取DOM对象并转化为jquery对象
$("#div1") //获取id为div1的DOM对象
var div1=$("#div1")[0]; //将JQ的DOM对象转化为JS的DOM对象

jquery常用选择器 //JQ中各个地方的空格需要注意，有空格的地方必须有，没有的就不能有！
$("#div1") //id选择器，获取ID为div1的DOM元素；getElementById("div1")
$("p") //标签选择器，获取所有的p标签getElementsByTagName("p")
$(".warning") //class选择器，获取所有class有warning的元素
$("p,div,span.menu") //多条件选择器，获取所有的p、div和拥有class为menu的span元素
$("div li") //获取div下的所有li元素(子元素，孙元素...)
$("div > li") //获取div下的li子元素
$("body *") //获取页面的所有元素；使用*表示所有
jquery常用过滤器
$("div:first") //选取第一个div；可以任意组合：$("#table tr:first")
$("div:last") //选取最后一个div
$("input:not(.myClass)") //选取样式不是myClass的input元素
$("input:even") //选取索引是奇数的input元素；这里的索引是从1开始的
$("input:odd") //选取索引是偶数的input元素
$("input:eq(5)") //选取索引等于5的input元素；这里的索引是从0开始的
$("input:lt(5)") //选取索引小于5的input元素
$("input:gt(5)") //选取索引大于5的input元素；加强：$("#table tr:gt(0):lt(3)")选取id为table中索引大于0，小于3(这个3是大于0那部分中的3)的tr子元素
$("#div1").click(function() { //相对选择器：第二个参数传入一个JQ对象，则相对于这个对象为基准进行选择
	$("ul",$(this)).css("background","red"); //$("ul",$(this))是获取当前选择器中的ul元素，即id为div1中的ul
});
属性过滤器
$("div[id]") //选取有id属性的div
$("div[title=test]") //选取title属性为test的div
$("div[name=test]") //JQ里没有getElementsByName，则只有通过此方法获得name属性为xx的元素
$("div[title!=test]") //选取title属性不等于test的div
表单对象过滤器
$("#form1:enabled") //选取id为form1的表单内所有启用的元素
$("#form1:disabled") //选取id为form1的表单内所有禁用的元素
$("input:checked") //选取所有选中的元素(radio和checkbox类型)
$("select:selected") //选取所有选中的元素(select标签下的option标签)
$(":input") //选取所有input，textarea，select和button元素
$(":text") //选取所有单行文本框，等价于$("input:[type=text]")
$(":password") //选取所有密码框；同理还有:radio,:checkbox,:submit,:image,:reset,:button,:file,:hidden
$("#input1 :checkbox") //选取#input1中type="checkbox"的所有元素；使用空格冒号来表示type

$("option:selected",this) //等价于$(this).find("option:selected") 在当前的DOM对象查找


动态创建DOM节点
var link=$("<a href='http://www.baidu.com'>百度</a>"); //直接使用$()来创建节点，并赋给一个变量；类似于JS的createElement()
link.text("百度") //可以直接对这个节点进行操作
$("div:first").append(link); //把这个节点添加到第一个div中的末尾
append(); //在元素末尾追加元素(添加子元素)
prepend(); //在元素开始添加元素(添加子元素)
after(); //在元素之后添加元素(添加兄弟元素)
before(); //在元素之前添加元素(添加兄弟元素)

删除DOM节点
$("ul li.test").remove(); //使用remove方法删除ul中拥有class属性为test的li元素
var lis=$("#ulSite li").remove(); //remove有返回值，是被删除的节点对象，还能继续对这些删除的对象进行操作
$("#ulSite2").append(lis;) //将这些被删除的节点添加到id为ulSite2中(使用这种方法实现移动节点的效果)
$("ul li.test").empty(); //empty只是把li的内容清空，节点仍然保留


jquery事件
$("#div1").bind("click",function(){}); //使用bind("事件",fun)来调用事件，bind()这是原始写法，$("#div1").click(fun)这样的都是简写
click(fun); //鼠标点击事件
$("#div1").click(); //如果没有传入一个函数，则会模拟执行一次这个点击事件；即页面加载完便会自动点击一次这个#div1；别的事件同理
mouseenter(fun); //鼠标放上事件
mouseleave(fun); //鼠标离开事件
hover(fun1,fun2); //合成事件；鼠标放上的时候调用fun1，鼠标离开的时候调用fun2

一次性事件
$(":button").one("click",function(){ //使用one让事件只执行一次
	alert("点击只有一次"); //再次点击的时候不会触发事件
});


jquery中的方法：这些方法都是用在jquery对象上的
//next()方法：获取节点之后的第一个同辈元素
$("#div1").next(); //获取与id为div1同辈的下一个元素
$("#div1").next("p"); //获取与id为div1同辈的下一个p元素(这个p元素必须与之相邻)
//nextAll()：获取节点之后的所有同辈元素
$("#div1").nextAll(); //获取与id为div1同辈的后面的所有元素
$("#div1").nextAll("p"); //获取与id为div1同辈的后面的所有p元素
//siblings()：获取所有的同辈元素
$("#div1").siblings(); //获取与id为div1同辈的所有元素
$("#div1").siblings("div"); //获取与id为div1同辈的所有div元素
$("div").click(function(){$(this).css("background","red").siblings("div").css("background","blue");}); //链式编程(不断的点点点...)：点击当前的div则背景变为红色，而同辈的别的div背景变为蓝色

//map()方法：将arr数组中的每个元素调用fun函数逐个进行处理，返回一个新的数组
var arr2=$.map(arr,fun);
var arr=[3,5,8];
var arr2=$.map(arr,function(num){return num*2;});

//each()方法：对数组arr每个元素调用fun函数进行处理，没有返回值；主要用于循环遍历数组
var arr={"tom":20,"jerry":50};
$.each(arr,function(key,value){alert(key+"的年龄是"+value)}); //通常使用这种方法，按需取键值即可
$.each(arr,function(){alert(this)}); //用this只遍历出value值
$("div").click(function(){$.each($(this).nextAll("div"),function(){$(this).css("background","red");});}); //使用each来遍历获取到的元素；this指当前处理的元素

//css()方法：获取或修改CSS样式
$("#div1").css("background"); //获取css的background值
$("#div1").css("background","black"); //修改css的background值

//html()方法(等于JS的innetHTML)：1、获取DOM对象的HTML内容；2、若传入了参数则是修改这个DOM对象的HTML内容
//JQ中有很多函数都是不传参数即为取值，传入参数即为赋值
<div id="div1">你好<font color="red">朋友</font></div>
$("#div1").html(); //只获取id为div1的html内容：你好<font color="red">朋友</font>
$("#div1").html("<a href='www.baidu.com'>百度</a>"); //将id为div1的内容替换为<a href='www.baidu.com'>百度</a>

//text()方法(等于JS的innerText)：获取或修改标签中的文本内容
$("#div1").text(); //只获取id为div1的html内容：你好朋友
$("#div1").text("百度"); //将id为div1的内容替换为：百度

//attr()方法：获取或设置元素的属性
$("a:first").attr("href"); //获取属性href：类似JS中的getAttribute
$("a:first").attr("href","http://www.163.com"); //设置属性href：类似JS中的setAttribute
$("a:first").removeAttr("href"); //删除属性

//class样式操作；class也是标签的一个属性，所以也可以用attr()操作
$("#div1").attr("class","class1 class2"); //添加class属性，多个class属性间用空格隔开即可；结果：<div id="#div1" class="class1 class2">...</div>
$("#div1").addClass("class2"); //追加class属性；比如div1有class="class1"，使用此方法就能追加为class="class1 class2"
$("#div1").removeClass("class2"); //删除class属性值中为class2的样式
$("#div1").toggleClass("class2"); //切换class属性；如果有class2则删除，没有则添加


//val()方法：获取或修改value属性值
<input type="text" id="text1">
$("#text1").val("new Date()"); //给input标签添加value属性并赋值当前时间
$("#text1").val(); //取出input标签的value值
$("#set").click(function(){ //使用val(["xx","xx"...])进行组选
	$(":checkbox").val(["足球","篮球"]); //当点击#set的时候，所有checkbox复选框中value="足球"和value="篮球"的被选中
});
//replaceWith()：替换节点
$("br").replaceWith("<hr/>"); //将br替换为hr，注意hr有尖括号

//wrap()：将所有元素逐个用指定标签包裹
$("b").wrap("<font color='red'></font>") //将<b>...</b>变为<font color='red'><b>...</b></font>

//show()：显示元素
$("#div1").click(function(){$("#div2").show()});
//hide()：隐藏元素
$("#div1").click(function(){$("#div2").hide()});
//toggle()：切换显示/隐藏元素
$("#div1").click(function(){$("#div2").toggle(1000)}); //传入时间参数，单位为毫秒，显示隐藏的时候有渐显渐隐的效果；这3个方法都能这样传参使用
$("#div1").click(function(){$("#div2").toggle(fun1,fun2)}); //单击按钮会交替执行toggle()方法的两个函数

//on()方法：绑定事件，动态绑定事件；on(events,[selector],[data],fn)
1.替代bind()方法：
$("#div1 li").on("click",fn);
$("#div1 li").click(fn); //bind()事件的简写形式，通常使用这种写法；这样绑定的事件，对于动态添加的li是没有效果的(动态添加的li无法触发点击事件)
2.替代live()和delegate()方法，动态绑定事件：
$("#div1").on("click","li",fn); //div1里面的li点击时的事件；这里是动态绑定，所以即使页面加载完后，通过别的操作在div1里创建了一个新的li，这个li依然有这里的点击事件

//clone()方法：将JQ对象里的所有元素复制
$(".add-role").click(function () {
	var obj=$(this).parents('tr').clone(); //将父辈tr里的所有元素赋值；tr就表示了从开始到结束的tr
	$("#last").before(obj); //将赋值的元素添加到last前面
});

//find()和filter()方法：通过DOM对象进行查找
$('#div1').find('a'); //在id为div1的DOM元素里面寻找a标签，a为div1的后代
$('#show').filter('a'); //在id为show的DOM元素中寻找a标签，a为id为show的其中一员

//is()方法：判断DOM对象中是否包含指定选择器，有则返回true
if($('#div1').is('li')); //div1中是否含有li
if($('#div1').is(':hidden')); //判断div1是否为隐藏状态

事件冒泡：当节点执行事件的时候，与它有同类事件的父节点，祖父节点...也会执行
$(function(){
	$("#p1").click(function(){
		alert("点击p触发事件");
	});
	$("#div1").click(function(){
		alert("点击div触发事件");
	});
});
<div id="div1">
<p id="p1">这里是P</p> //当点击这个p的时候，其父节点div也有点击事件，所以div的点击事件也会执行
<span>这里是span</span>
</div>
终止冒泡：
如果想获得事件相关的信息，只要给相应的匿名函数传入一个参数：e(e只是约定俗成，别的字符串也行)，e就是事件对象，通过e可以进行特定操作
$("#p1").click(function(e){ //e类似window.event
	alert("点击p触发事件");
	e.stopPropagation(); //使用事件对象e，调用stopPropagation()就能在这里阻止冒泡，更上级的同类事件将不会执行
});
e.target; //获取冒泡的触发节点对象；这里就是p

preventDefault() //阻止默认行为：如点击链接会跳转到链接页面，点击表单提交按钮会提交表单等
$("a").click(function(e){alert("所有超链接阻止点击");});
e.preventDefault(); //页面上的超链接便无效了

e.pageX; e.pageY; //获取鼠标的坐标
$(document).mousemove(function(e){ //图片跟随鼠标移动
	$("#fly").css("left",e.pageX).css("top",e.pageY);
});
<div id="fly" style="position:absolute"><img src="..."/></div>



jquery使用cookie：用于登录界面用户名密码保存等
需要引入一个jquery的cookie插件，jquery.cookie.js
$.cookie("key","value"); //设置cookie
$.cookie("key"); //读取cookie；同一域名的任何页面都能读到
$.cookie("key","value",{expires:7}); //可以传入第三个参数：expires指定cookie保存多少天，没有传这个参数则浏览器关闭即删除cookie
