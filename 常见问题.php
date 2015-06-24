PHP相关问题：-----------------------------------------------------
<?php
上传文件到空间注意文件的大小写！比如模版文件index.html不能写成Index.html

echo urldecode(json_encode(array('handlingCharge'=>$handlingCharge,'tip'=>urlencode($tip)))); //$tip是中文，直接使用json_encode会输出乱码，则需要使用urlencode()编码再使用urldecode()解码才行

数据库存储11位手机号时，应使用bigint(11)，而不能用int(11)，int(11)存储不了这么大的数字

?>


JQuery相关问题：-----------------------------------------------------
<script type="text/javascript">

关于调用函数带不带括号的问题：只要是要执行这个函数都必须带括号；如果是要把函数作为这个函数指针，用于传参或赋值等操作则不带括号
//自动滚动
var autoRoll=null;
$("#roll").hover(function () {
		clearInterval(autoRoll); //清除setInterval()，只能传入setInterval()生成的对象
},function () {
	autoRoll=setInterval(function () { //setInterval(fun,time)每隔多少毫秒执行一次fun方法
		showImg();
	},5000);
}).trigger("mouseleave"); //trigger()触发器，自动触发一次事件

//this.defaultValue获取文本框默认内容
if ($(this).val()==this.defaultValue) {
	$(this).val('');
}


</script>




HTML相关问题：-------------------------------------------------------
iframe的应用：
1.在head标签中写入<base target="iframe">
2.body中使用iframe
<iframe name="iframe"></iframe> 这里的name和target的需一致
然后设置这个iframe的位置和高宽
这个页面中的链接就会在这个iframe中打开
基本格式：
 <head>
 <base target="iframe"> <!--指定浏览器的链接在iframe中打开-->
 </head>
 <body>
  <div id="head">顶部导航</div>
  <div id="left">左部链接</div>
  <div>
	<iframe name="iframe" id="right"></iframe> <!--创建iframe标签，并设置name为iframe-->
  </div>
 </body>



CSS相关问题：-----------------------------------------------------
<style>

display:inline-block; /*inline-block即是行内样式，同时还能设置高宽；如span默认设置高宽无效，转化为block又是独自占一行，用inline-block则不会独占一行还能设置高宽*/
word-wrap: break-word; /*里面的文字能多行显示，如果没有则只显示一行；如div里的文字，会自动换行*/
background:#fff !important; /*使用!important强制提升优先级为最高*/
opacity:0.7; /*不透明度设置：1为不透明*/
background:url(../../img/index/nav.jpg) repeat-x; /*url链接是以本css文件的相对路径，不能用__PUBLIC__*/
background:url(../../img/logo.gif) #0071d1 -10px 5px no-repeat; /*背景高级用法：背景图片，背景颜色，x轴位移，y轴位移，显示方式*/

/*position:fixed固定定位，会跳出文档流空出本身的位置，以浏览器左上角为原点定位*/
position:fixed;
top:0;
left:0;

/*居中显示，如弹出注册框*/
position:fixed;
top:0;
bottom:0;
left:0;
right:0;
margin:auto;

z-index:1000; /*设置层次，越大越在上层*/
text-indent:3px; /*文本缩进*/

/*圆角效果*/
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;

/*阴影效果*/
-webkit-box-shadow: #666 0px 0px 10px;
-moz-box-shadow: #666 0px 0px 10px;
box-shadow: #666 0px 0px 10px;

/*input输入框各个浏览器解析的宽度不同，所以必须设置高宽*/
.input{
	width:170px;
	height:22px;
}



</style>


CSS HACK相关问题：----------------------------------------------------------------------------
1、ie6.7支持在属性前加*号来独享属性，如：
*width:200px;  /*这里只有ie6.7能识别，所以可以用此方法来将不兼容的地方覆盖掉，或是写单独的属性*/
2、float的时候，同一行有两个以上元素，比如最右边的元素需要float:right，如果左边的元素没有float，则这个元素会脱离文档流到下一行；也就是说，同一行的元素必须全部float，才能保持在同一行，如果有没有float的元素，那么float了的元素会在没float的元素的下方；解决此问题的方法有：
①让同一行的元素都float
②使用*float:none取消float，然后用*margin-left来让元素靠右
③使用定位
3、很多元素的默认高宽在不同浏览器中解析都不一样，所以各种元素最好设置固定高宽

FF不能识别*，但能识别!important; color:yellow !important;
IE7能识别*，能识别!important;	*color:blue !important;
IE6能识别*，不能识别!important; *color:red;
IE6可以识别"_",IE7、IE8、FireFox不能； _color:white;
按照FF>IE7>IE6的顺序来写，通过覆盖原则来完成兼容
正常写法，*兼容IE7，_兼容IE6


不同的浏览器对字体大小的解析不同，即使设置了font-size:15px，不同浏览器中显示的大小也不一样，所以在多行显示时，需要将行高设为固定值line-height:18px;这样每行的高度就一样了