jQuery内部封装了很多工具方法，实现一些我们常用的方法的时候，jQuery内部就会调用这些工具方法来实现更高级的功能。这就是方法的封装的好处。我们在需要的时候也可以直接调用这些工具方法。
工具方法可以直接通过 jQuery.makeArray() 或 $.makeArray() 这样调用。通过extend()扩展工具方法。
而我们常用的方法需要通过jQuery对象来调用——$('div')这样得到jQuery对象。



5讲：
$()/jQuery()  //当调用jQuery的时候会返回一个对象
(function(window,undefined){  //通过函数立即执行来暴露jQuery，避免里面的变量污染全局
    ....  //定义了一些变量
    jQuery=function(selector,context){  //调用jQuery返回一个对象
        return new jQuery.fn.init(selector,context,rootjQuery);  //这里是jQuery的设计，详见下面“jQuery面相对象”的说明
    }
    ...  //其它东西
    jQuery.fn=jQuery.prototype={  //给jQuery添加属性和方法
        constructor:jQuery,  //由于采用的对象覆盖模式，所以需要修正constructor属性
        init:function(selector,context,rootjQuery){},  //初始化函数。通常也就只使用第一个参数
        length:0,  //jQuery对象的长度。当获取了DOM对象如$('li')后，值会改变为获取到的DOM的个数
        ...
    }
    ...
    jQuery.fn.init.prototype=jQuery.fn;
})(window,undefined);  //传入window是避免原型链查找，节省性能。undefined作为参数传入是方便压缩（内部多次进行undefined判断，变成参数后就能压缩了）
// 通常面向对象写法
function Aaa(){
    ...
}
Aaa.prototype.init=function(){}
Aaa.prototype.css=function(){}
var a1=new Aaa();  //这里是实例化对象
a1.init();  //初始化
a1.css();
// jQuery面相对象
function jQuery(){
    return new jQuery.prototype.init();
}
jQuery.prototype.init=function(){};
jQuery.prototype.css=function(){};
jQuery.prototype.init.prototype=jQuery.prototype;  //关键的一行：将jQuery的原型赋值给jQuery.prototype.init的原型，这样就形成了原型对象的相互引用。所以：1、 new jQuery.prototype.init() 也就是 new jQuery() 2、new jQuery.prototype.init()的同时也就调用了jQuery.prototype.init()完成了初始化 3、由于引用关系，jQuery.prototype下创建的方法，jQuery.prototype.init.prototype也会拥有，所以 new jQuery.prototype.init() 得到的对象也就有了jQuery.prototype下的方法
jQuery().css();  //实例化对象并初始化。不需要先new再init什么的了。所以我们$('div')就能得到jQuery对象，代码变得简化优雅


9讲：
$('<li>',{title:'这是个li',html:'调用html方法',css:{'backgroundColor','red'}});  //创建标签的时候，传入第二个参数。里面会进行判断，当第二个参数对象里的key，是jQuery中有的方法，如html(),css()，就会调用对应的方法。如果不是，则会作为属性，添加到这个创建的元素上
jQuery进行DOM选择后，如$('li')，jQuery源码中的this，即jQuery对象，会是一个类似{0:li,1:li,2:li,length:3}这样的对象，当然还有其它属性（内部通过merge()或makeArray()进行转换，通过两个参数）。这里的三个li是指li的原生DOM对象，不是li字符串。所以，当只有一个DOM元素的jQuery对象，可以通过$('#div')[0]转换为原生DOM对象
*jQuery通过调用选择器后，如$('.test')，源码中的this是一个带下标和length的对象如{0:divDOM,1:liDOM,2:pDOM,length:3}。通过对this进行遍历，就可以对所有选中的元素进行操作了。操作后再返回this就能实现链式调用了。如$('.box').css('background','red').html('遍历调用')，这里的css()和html()方法都会对this进行遍历


10讲：
jQuery进行DOM选择的时候，如果是稍微复杂一点的对象如$('ul li')都会在内部调用find()进行DOM查找$(document).find('ul li')，而find()则是调用的Sizzle


11讲：
$.makeArray(a_div);  //使用makeArray()可以将一个DOM元素的集合转换为数组。而原生的DOM集合只是一个类数组
$('li').toArray();  //将 {0:li,1:li,2:li,length:3} 转换为 [li,li,li] 这样的数组。当然不是字符串，而是原生DOM对象。也就是通过Array.slice.call(this)来转换
$('li').get();  //没传参，则就是调用toArray()
$('li').get(1);  //传参，就和$('li')[1]一样


12讲：
var set=$('div').pushStack($('span'));  //pushStack()是jQuery对象的入栈处理。这样，jQuery里就有两个对象集合（div和span）。注：调用pushStack()时，返回新的jQuery对象指向span；而$('div')这个jQuery对象在调用pushStack()时也就是this，将这个this保存在新的jQuery对象的prevObject中
set.css('background','red');  //当调用一些方法的时候，处理的只是栈中顶层的那个对象集合。这里也就是有span背景变红
set.end().css('background','blue');  //调用end()方法就会得到栈中上一个集合，这里也就是$('div')。内部也就是返回this.prevObject（this也就是上面所述的新的jQuery对象）
$('div').slice(1,3).css('background','red').end().css('color','pink');  //slice()内部也就是调用pushStack()来实现的，所以这里也可以调用end()来得到所有div
$('div').eq(2).css('background','red');  //eq()可以得到jQuery对象集合中的某一个。first()和last()内部也是调用的eq()来实现的。eq()内部调用了pushStack()来把需要的元素放到最上面


13讲：
jQuery.extend=jQuery.fn.extend=function(){  //jQuery.extend是扩展静态方法（jQuery是个函数，函数也是特殊的对象，所以可以给它添加方法）；jQuery.fn.extend是给原型添加方法，就是扩展实例方法
    ...
}
--只有一个字面量时，是jQuery中扩展插件的形式
// 扩展静态方法
$.extend({  //这种方式扩展：this就是$，this.aaa就通过$.aaa调用
    aaa:function(){alert(1)};
    bbb:function(){alert(2)};
});
$.aaa;  //可以直接使用jQuery调用
$.bbb;
// 扩展实例方法
$.fn.extend({  //这种方式扩展：this就是$.fn（即$.prototype），this.aaa则要通过实例化的对象$().aaa来调用
    aaa:function(){alert(3)};
    bbb:function(){alert(4)};
});
$().aaa();  //需要$()得到jQuery对象才能调用
$().bbb();
--多个对象字面量的时候，后面的对象都是扩展到第一个对象身上
var a={};
$.extend(a,{name:'hello'},{age:20});  //后面的对象都扩展到了a身上，实现了对象的合并（继承）
--还可以做深拷贝和浅拷贝
var a={};
var b={name:'hello'};
$.extend(a,b);  //浅拷贝
var a={};
var b={name:{age:30}};
$.extend(true,a,b);  //深拷贝


14讲：
extend()的具体实现，使用拷贝继承。参数不同，extend的作用不同。只传入一个对象的时候是扩展插件。
// 当进入这个if就是扩展插件
if ( length === i ) {
    target = this;  //extend()方法的最后，return target，如果走了这里，则就是return this
    --i;
}



--jQuery.extend开始--
15讲：
jQuery内部调用了一次extend()，为jQuery添加工具方法。工具方法就是使用jQuery.xxx()直接调用。
expando()：生成唯一JQ字符串（内部使用）
noConfilict()：防止冲突。var miaov=$.noConfilict(); 这样就把$改为了miaov。内部就是return jQuery;


16讲：
$(document).ready()的实现，主要是通过DOMContentLoaded这个事件，但JQ中还进行了更多的操作，主要使用了延迟对象
$.holdReady(true);  //调用holdReay()并传入true，则会阻塞$(function(){})的执行
$.getScript('a.js',function(){  //这个工具方法是用来加载外部文件的，但是是异步加载，所以可能会在下面的代码执行后才加载完成
    $.holdReady(true);  //调用holdReay()并传入false，则会释放$(function(){})的执行。这时下面的$(function(){})就会执行了，也就能正常依赖了
});
$(function(){
    alert(2);  //如果这里的代码依赖a.js，而a.js又是异步加载的，这里的代码可以在a.js加载完之前执行。所以需要使用$.holdReady()来控制$(function(){})的执行
})


17讲：
$.isFunction()：是否为函数。return jQuery.type(obj)==="function"
$.isArray()：是否为数组。直接使用ES5原生的Array.isArray()
$.isWindow()：是否为window对象。return obj!=null && obj===obj.window
$.isNumeric()：是否为数字。return !isNaN(parseFloat(obj))&&isFinite(obj)


18讲：
$.type()：返回数据类型字符串string|number|array|object|null|date|...主要通过{}.toString.call(obj)实现


19讲：
$.isPlainObject()：判断是否为对象字面量。{}|new Object()
$.isEmptyObject()：判断是否为空对象。空数组也可以。使用 for in 完成。对象内置的属性或方法 for in 是遍历不到的，如constructor


20讲：
$.error('错误信息')：跑出错误信息。调用 throw new Error('错误信息');
$.parseHTML('<li></li><li></li>'[,context,true])：把字符串转换为DOM节点，保存在数组中


21讲：
$.parseJSON()：直接调用JSON.parse()
$.parseXML()：解析XML。通过 new DOMParser()


22讲：
$.camelCase('margin-top')：将-连接的字符串转为驼峰式，通过正则转换
$.nodeName(document.body,'body')：判断节点名


23讲：
$.each(arr,function(k,v){...})：遍历集合，数组/类数组/对象皆可
$.trim(str)：去前后空格，通过原生或正则


24讲：
$.makeArray()：类数组转真数组，内部主要通过$.merge()
$.inArray('b',arr)：数组版indexOf()
$.merge(arr1,arr2)：合并数组。第二个参数可以是特殊格式的JSON:{0:'a',1'b'}


25讲：
$.grep(arr,function(v,k){return n>2;})：数组过滤，得到一个新数组。这里讲arr的每一项进行判断，得到的数组只有大于2的
$.map(arr,function(v,k){return n+1;})：数组映射


26讲：
$.proxy(fn,context)：修改fn里的this指向为context


27讲：
$.access()：内部使用，供css(),attr()这些获取、设置元素使用


28讲：
isArraylike()：判断是否为类数组
--jQuery.extend结束--



--jQuery.Callbacks开始--
29讲：
实现函数的统一管理。不同作用域下的函数可以统一调用。类似addEventListener()绑定事件
观察者模式
function a(){}
function b(){}
var cb=$.Callbacks();
cb.add(a);
cb.add(b);
cb.fire();  //会一次调用a()，b()
基本原理：一个空数组，调用add的时候往数组中添加函数，调用fire的时候使用for循环触发函数


30讲：
参数once：
var cb=$.Callbacks('once');  调用fire()只触发一次，多次调用无效
参数memory：
var cb=$.Callbacks('memory');  调用fire()时，在fire()之后add()的函数也会调用
参数unique：
var cb=$.Callbacks('unique');  通常情况下add()可以多次添加同一个函数，并且添加多少次就会执行多少次。有了unique参数后，add()添加的同一个函数，只会触发一次
参数stopOnFalse：
var cb=$.Callbacks('stopOnFalse');  通常情况下add()添加的函数，有 return false 的，并不会阻止fire()继续调用。有了stopOnFalse参数后，当fire()调用的函数 return false 了，则停止继续调用函数
注：参数可以多个组合一起使用$.Callbacks('once unique');

31、32讲Callbacks的实现细节
--jQuery.Callbacks结束--



--jQuery.Deferred()开始--
33讲：
延迟对象
jQuery.extend({
    Deferred:function(){},  //延迟对象核心
    when:function(){}  //辅助Deferred的
});
$.Deferred();
$.when();
使用extend扩展了两个工具方法，基于$.Callbacks()开发
var dfd=$.Deferred();
setTimeout(function(){
    alert(111);
    dfd.resolve();  //调用resolve()的时候会触发done()
},1000);
dfd.done(function(){
    alert(2);
});
再来看看$.Callbacks()
var cb=$.Callbacks();
setTimeout(function(){
    alert(111);
    cb.fire();
},1000);
cb.add(function(){
    alert(222);
});
可以看出，Callbacks和Deferred的结构很相似，并且得到的结果也相同。其实Deferred就是Callbacks抽象出来的更具意义的一套东西