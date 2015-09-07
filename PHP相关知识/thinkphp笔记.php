<?php
注意事项：
1、TP里的静态变量特性无效，因为每次都会生成一个新的Action，所以想用静态变量来保存一个值供下次使用是无效的
//ThinkPHP框架
MVC模式：M-模型，处理数据库等动态操作；V-视图(模版)，用户交互界面；C-控制器(模块)，接收用户请求让模型处理返回给模版

//创建thinkphp框架并导入核心文件(先创建常量再导入thinkphp.php)；通常创建两个，一个负责前台，一个负责后台
define('APP_PATH','./Index/'); //定义常量APP_PATH确定应用路径，路径的首字母要大写(运行时会自动创建Index文件夹，即使小写创建的文件夹也是大写开头)，并且后面必须有/(会在Index文件夹里自动创建几个子文件夹，若没有/则自动创建的文件夹会和Index在同一个目录，而不是在Index目录里面)
define('APP_NAME','Index'); //定义常量APP_NAME确定应用名称，自定义为Index，首字母也应当大写
define('APP_DEBUG','true'); //开启调试模式；开发的时候应当开启，就不会缓存文件，项目上线后删除这行即可关闭
require('./ThinkPHP/Thinkphp.php'); //引用thinkphp的核心文件，注意区分大小写，便于跨平台，LINUX是区分文件大小写的

//通过URL访问控制器的模式
localhost/thinkphp/index.php/Index/index //pathinfo模式，通过URL访问自定义类(模块)中的方法(动作)(推荐使用，有利于搜索引擎等)；域名/项目文件夹/入口文件(这里为index.php)/模块名(index.php文件所创建的thinkphp应用文件夹里的Lib/Action/IndexAction.class.php，必须以xxAction.class.php的方式命名类文件，里面创建的类名也必须和文件名相同并继承Action类clas xxAction extends Action，这里输入xx即可)/方法(动作)名(类文件中的所有公有方法都能调用并输出到浏览器)(路径默认区分大小写)
localhost/thinkphp/index.php?m=Index&a=index&name=Trion&age=26 //普通模式；m=模块名，a=方法名(动作)
localhost/thinkphp/Index/index/name/Trion/age/26 //rewrite模式；REWRITE模式是在PATHINFO模式的基础上添加了重写规则的支持，可以去掉URL地址里面的入口文件index.php，但是需要额外配置WEB服务器的重写规则。搜索URL重写，查看具体方法
localhost/thinkphp/index.php/Index/index/name/Trion/age/26 //通过键/值的写法向调用的index方法中的$_GET["name"]、$_GET["age"]传入值

//输出和模型使用
$this->display(); //调用模版并输出；调用的模版是以这条语句所在的类名和方法名来定位的，如这条语句是在indexaction.class类中的index方法中，则调用的模版是Tpl里的Index文件夹下的index.html文件；
$this->show('HTML'); //当没有创建模版文件的时候调用display()会报错，则可以调用show()
$this->assign("title",$title); //类似smarty，使用assign给模版分配变量，之后的diaplay或fetch定位的模版是哪个，就是分配给哪个模版
$m=new Model('user')或$m=M('user'); //创建Model对象；连接数据库并选择tp_user表(tp_是配置文件里设置的表前缀)

//CURD：C-create-add-增；U-update-save-改；R-read-select-查；D-delete-delete-删
//R-read-select-查
$m->select(); //获取数据表中所有数据，以数组形式返回
$m->find($id); //获取单条数据，以数组形式返回；可以传入数据的id号来选择获取第某一条数据
$m->where('id=2')->getField("username"); //获取某个字段的值，使用thinkphp的连贯操作方式，返回一个字符串
//C-create-add-增
$m->username="王二"; //添加准备：字段名=值的方法向表中添加数据
$m->sex=1; //一条数据中有多个字段，也就可以准备多条语句
$m->add(); //使用add方法完成添加，返回新增的数据的id号
$data=array('user'=>'tiron','sex'=>1); //插入数据的另一种方法：把需要插入的数据写入一个数组
$m->data($data)->add(); //通过data()方法解析数组然后用add()插入
$User->add($data); //此方法和上面相同
$m->addAll($data); //批量插入数据，仅支持mysql
//D-delete-delete-删
$m->where('id=3')->delete(); //通过where定位删除数据，返回影响行数；如果是字符串型的字段，则where("user='zhang'")需要双层引号
//U-update-save-改
$data['id']=1; //首先确定要修改哪条数据，必须用id字段
$data["username"]="soul"; //再确定要修改的内容，可以是多条
$m->save($data); //调用save方法完成修改，返回影响行数
$m->where('name=tirion')->save(array('age'=>18,'like'=>'football')); //这种方式就可以不用id字段定位
$m->where(array('delete'=>'1'))->save(array('delete'=>'0')); //高级语法：将所有delete=1的改为delete=0，数组里可以是多个数据
$this->success("数据修改成功"[,'index']); //当数据修改成功时调用此方法，会输出第一个参数的内容并跳转到第二个参数(index方法)的界面，若没有第二个参数则跳转回本页面
$this->error("数据修改失败"); //当数据修改失败时调用
$m->where(array('id'=>$id))->setInc('click',2); //使用setInc()方法让一个字段自增，第二个参数不填默认为1。比如可以用在统计文章的点击次数，用户每点击一次便执行一次SQL语句，让统计点击的字段加一。setDec()是自减

//高级查询方式
//普通查询；where查询：可以配合select, find, getField
$arr=$m->where("sex=0 and username='lucy'")->find(); //只用and组合查询
$data["sex"]=0; //数组查询方式，推荐使用
$data["username"]="lucy";
$data["_logic"]="and"; //使用_logic自定义逻辑关系：and、or；默认为and(也就是不写这条语句就是and)
$arr=$m->where($data)->find(); //使用数组的方式查询，和上面的效果一样，通常使用这种方式
$rs=$m->where('sys_id=0 or sys_id=1 or sys_id=2')->field('sys_info,sys_value')->order('sys_id')->select();  //使用条件‘或’查询
//表达式查询
$data['id']=array("gt",6); //逻辑查询；查询id大于6的，lt小于，eq等于，egt大于等于，elt小于等于，neq不等于
$data['name']=array("like","%abc%"); //模糊查询；使用like进行模糊查询，依然使用%来匹配前面或后面的字符；notlike不包含(不能分开写not like)
$data['name']=array("like",array("%abc%","%2")[,"or"]); //查询包含abc或者以2结尾的name；第三个参数指定逻辑and、or，默认为or
$data['id']=array("between",array(3,10)); //使用between查询id为3-10(包含3和10)之间的数据；not between查询之外的数据(不能连写notbetween)
$data['id']=array("in",array(3,7,10)); //使用in查询id为3，7，10的数据；not in查询非3，7，10的数据
$arr=$m->where($data)->select();
$rs=M('Wxcom')->where(array('name'=>array('like','%'.$_POST['search'].'%')))->field('id,name')->select();  //直接使用where查询的like写法
//字段查询
$m->field('id,name,sex')->select(); //只查询出数据表中的需要的字段
//区间查询
$data['id']=array(array("gt",3),array("lt",10)[,"and"]); //查询id>3&id<10的数据；第三个参数指定逻辑：and、or，默认为and
$data['name']=array(array("like","%a%"),array("like","%李%"),"mm"[,"or"]); //包含a或者包含李或者包含mm的name；默认为and
$arr=$m->where($data)->select();
//子查询
$hot=$m->where(array('delete'=>'0'))->field('id,title,click')->order('date desc')->limit(30)->select(false); //先进行父查询，select(false)传入false表示不查询出结果输出，而是生成查询的SQL语句
$m->table($hot.' a')->order('a.click desc')->select(); //使用table()从父查询的结果中进行查询，a是别名；注意：由于使用click进行排序，所以上面也需要查询出click字段
SELECT * FROM ( SELECT `id`,`title`,`click` FROM `tp_article` WHERE ( `delete` = 0 ) ORDER BY date desc LIMIT 30 ) a ORDER BY a.click desc //上面的两条查询语句等同于这条SQL语句
//联合查询
$m=M('recommend');
$m->table('tb_recommend as r')->join('inner join tb_uinfo as u on tb_recommend.user_id=u.uinfo_userId')->where('que_id='.$que_id)->field('rec_name,u.phone,time')->order('time')->limit($start,10)->select();  //使用table给表取别名，使用join()进行联合查询；注意join里面的表名需要加表前缀
//统计查询：count(),max(),min(),avg(),sum()
$c=$m->count(); //查询数据总共有多少条
$data["name"]="lucy";
$c=$m->where($data)->count(); //组合查询：name=lucy的条数
$max=$m->max('id'); //获取最大id的值
$min=$m->min('id'); //获取最小id的值
$avg=$m->avg('id'); //获取id的平均数
$sum=$m->sum('id'); //获取id值的综合
//SQL直接查询；execute:增删改；query:查
$m=M(); //实例化对象的时候不用指定数据表
$result=$m->query("select * from tp_user where id>5"); //直接使用SQL语句进行查询；成功返回数据的结果集，失败返回false
$count=$m->execute("insert into tp_user("user","age") values("lili","18")"); //执行增删改语句；成功返回影响行数，失败返回false
//SQL函数查询
$products=$pro->where(array("FIND_IN_SET('".$type."',type)",'num'=>array('gt',0)))->order('time desc')->select();  //where条件的第一个元素使用了SQL函数，当使用SQL函数的时候不能使用关联数组的方式，使用普通的索引数组的方式组合成字符串才行；得到的SQL语句是：SELECT * FROM `tp_product` WHERE ( FIND_IN_SET('1',type) ) AND `num` > 0 ORDER BY time desc
//在组合数组中使用SQL函数
$data[]="FIND_IN_SET('".$type."',type)";  //数组的索引必须为空
$data['name']=array('like',"%$name%");  //添加其它查询项
$pro->where($data)->order('time desc')->select();  //进行查询即可


//常用连贯操作：中间的where,order,limit等没有前后顺序之分，除了最后一个select,find,add等
$arr=$m->where($data)->select(); //where()用于设置搜索条件
$arr=$m->order('id desc')->select(); //order()设置排序；asc升序(默认)，desc降序
$arr=$m->order(array('id'=>'desc','sex'=>'asc'))->select(); //多条件排序；也可以就用此方法进行单条件排序
$arr=$m->limit(10)->select(); //limit()限制搜索出来的数据条数；limit(3,5)从结果集中的第三条开始搜出5条
$arr=$m->limit(10,20)->select(); //从第10条开始取，取出20条
$arr=$m->field("id as num","user")->select(); //fieled()设置检索字段，只检索出id,user；可以使用id as num这样的方法来设置别名；也可以使用数组的方法：field(array("id","user"=>"username"))；还可以使用field("id",true)的方法获取除了id字段的
$arr=$m->table(array('think_user'=>'user','think_group'=>'group'))->where('id>10')->select(); //table()定义要操作的数据表名称，动态改变当前操作的数据表名称，需要写数据表的全名，包含前缀，可以使用别名和跨库操作
另外还有group，having等，不常用，查手册即可

//事务处理
$m=D('YourModel'); //或者是M();
$m2=D('YouModel2');
$m->startTrans(); //使用startTrans开始事务处理；在第一个模型里启用就可以了，或者第二个也行
$result=$m->where('删除条件')->delete();
$result2=$m2->where('删除条件')->delete();
if($result && $result2){
	$m->commit(); //成功则提交
}else{
	$m->rollback(); //不成功，回滚
}

//视图
//模版的使用
模版文件结构：模版文件夹下(TPL)/[分组文件夹/][模版主题文件夹/]和控制器同名的文件夹/和方法同名的文件
模版主题：用户可以根据自己喜好选择不同的主题风格，需要配置文件中开启；开启后则之前的模版文件(包括文件夹)需要移动到模版主题文件夹(就在TPL子目录)中，这个模版主题文件夹中就可以创建多个主题文件
修改模版主题：通过URL中的t/black修改localhost/thinkphp/index.php/Index/index/t/black，其中black就是主题文件夹(需要配置文件中指定支持的主题文件夹'THEME_LIST'=>'black,red,white')
//输出模版内容
$this->display(); 
$this->display('search'); //当传入了一个参数后，调用的模版则不是和所在方法同名的模版了，而是传入的字符串所指定的模版(search.html)
$this->display('User:search'); //这里则是调用User模版文件夹下的search.html模版
$this->display('mine:black:index'); //调用mine主题下的black模版主题下的index.html模版(需要配置文件中开启模版主题)
$this->display('./Public/error.html'); //通过路径输出项目目录(和主入口文件同目录)里的Public里的error.html模版
$this->display('search','utf-8','text/html'); //第一个参数是模版路径(上面的各种路径写法都行)，第二个参数是指定模版输出的编码，第三个是输出类型(text/xml)
$content=$this->fetch('User:search'); //fetch()获取模版内容以字符串形式返回；用法和display()几乎一样，只是不输出模版，而是把模版内容返回保存为变量
$this->show($content); //输出HTML页面；$content为HTML代码字符串，可能是通过数据库或是别的方法获取的，所以不能用display()
$this->show("{$json}");  //当要输出一个变量的时候，需要使用模版语法；show()方法输出的页面也支持trace调试
//给模版赋值
$this->assign("name",$username); //将$name分配给模版，以$name变量，模版中<{$name}>接收
$this->name=$username; //效果同上
//模版替换
__PUBLIC__ //会被替换成当前网站的公共目录；如：/thinkphp/Public/(thinkphp是www目录下的)；这个不是常量
__ROOT__ //会替换成当前网站的地址（项目目录）；如：/thinkphp
__APP__ //会替换成当前项目的URL地址（项目地址）；如：/thinkphp/index.php
__GROUP__ //会替换成当前分组的URL地址；如：/thinkphp/index.php (需要配置文件开启)
__URL__ //会替换成当前模块的URL地址（控制器地址）；如：/thinkphp/index.php/Index
__ACTION__ //会替换成当前操作的URL地址（控制器中的方法地址）；如：/thinkphp/index.php/Index/index
__SELF__ //会替换成当前的页面URL；如：/thinkphp/

//验证码：需要导入扩展类库(Extend文件夹)中的ORG.Util.Image和ORG.Util.String；创建一个方法来实现；文件路径：Extend/Library/ORG/Util/Image/Image.class.php
class PublicAction extends Action{
	public function verify(){ //必须单独创建一个方法
		import('ORG.Util.Image'); //引入验证码类
		Image::buildImageVerify(['length','mode','type','width','height','name']); //length=长度(位数)、个数；mode=类型：0字母，1数字，2大写字母；3小写字母，4中文，5数字字母混合；type=gif、png；width=图片宽度；height=图片高度；name=verify
	}
}
<img src="__APP__/Public/vertify" onclick="this.src=this.src+'?'+Math.random()">; //调用验证码；验证码最好单独写在一个控制器下，方便调用；onclick为点击验证码刷新；通过表单提交后，验证码保存在$_SESSION['verify']中，并且是通过MD5加密的

//模版中的变量
//变量的输出
<{$name}> //输出分配过来的普通变量
<{$name['me']}> | <{$name.me}> //输出分配过来的数组中的一个元素
ThinkPHP/Extend/Library/ORG/Mine/Test.class.php //自定义类文件的位置；Mine是自建文件夹，可以将所有自定义类放在这个文件夹中；
import('ORG.My.Test'); //控制器里通过import()方法引入自定义类文件
$obj=new Test;
$this->assign('name',$obj);
<{$name:me}> | <{$name->me}> //$name为分配过来的一个对象，me是这个对象($obj)中的一个成员属性
//系统变量：使用$Think获取各种系统变量可以在模版中输出
支持输出 $_SERVER、$_ENV、 $_POST、 $_GET、 $_REQUEST、$_SESSION和 $_COOKIE变量
<{$Think.get.name}> //获取$_GET['name']
<{$Think.post.name}> //获取$_POST['name']
<{$Think.session.name}> //获取$_SESSION['name']
<{$Think.cookie.name}>  // 输出$_COOKIE['name']
{$Think.MODULE_NAME} //输出系统常量
{$Think.config.db_charset} //输出配置参数
......
//系统函数：各种系统函数可以在模版中使用
<{$name|strtoupper}> //通过此方法调用系统函数
<{$date|date="Y-m-d H:i:s",###}> //带参数的函数；###为占位符，将替换为$date
<{$name|default="Tirion"}> //给变量设默认值，如果控制器没有传过来一个叫name的变量，则使用这个默认值输出
//运算符：模版中支持各种运算符操作， + - * / ++ --
<{$num+10}> //输出$num+10的值

//模版中的基本语法
//导入CSS和JS文件
<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/style.css"/> //普通导入方式；__PUBLIC__就是和主入口文件同目录的Public目录，还可以自定义__CSS__目录
<script src="__PUBLIC__/js/js.js"></script> //普通导入JS的方式
<import type="css" file="css.test"/> //使用import标签导入，也是Public/css/test.css，file目录默认为Public；
<import type="js" file="js.js" basepath="./Other"/> //导入Other/js/js.js；通过basepath指定为Other目录而不是Public
<load href="__PUBLIC__/css/style.css"/> //load标签导入文件，也可以导入JS等文件，自动检测类型
//分支结构
<if condition="$age lt 18"> //if双标签；不能使用><==等符号
	未成年
	<elseif condition="$age gt 18 and $age lt 30"/> //elseif单标签
	青年
	<else/> //else单标签
	老了...
</if> //if结束标签
<switch name="num"> //switch双标签；注意num没有$符号
	<case value="1">一个和尚挑水吃</case> //case双标签，value是传过来的num的值
	<case value="2">两个和尚抬水吃</case>
	<case value="3">三个和尚没水吃</case>
	<default/>其它情况 //default单标签
</switch> //switch结束标签
//循环结构
<for start='0' end='10' [name='j' step='1' comparsion='lt']> //等同于for($i=0,$i<10,$i++)；name定义变量名，step定义步进，comparsion定义$i<10中的<
	这是第<{$j}>次循环 //$j就是name定义的变量名，若没有name则默认为$i；输出循环次数
</for>
<volist name="data" id="vo" [offset="1" length="3"]><{$vo}></volist> //使用<volist>标签来循环遍历数组；name是接收控制器中分配来的数组变量，id是每循环一次会将数组里的一个元素赋给id的值，所以输出id的值就能遍历出数组；[offset定义第一个取出数据的索引，length定义取出几个(这里就是从索引为1的开始取出3个)]
<foreach name="data" item="val" [key="key"]> //foreach遍历数组；name的值是传过来的数组，item是遍历出的键值，key是键名；推荐使用，类似于PHP的foreach
	<{$val}>的键名是<{$key}>
</foreach>
//特殊标签
//比较标签：eq,lt,gt...；可以代替if语句
<eq name="num" value="10"> //分配过来的num eq 10
	num的值等于10
	<else/>
	num的值不等于10
</eq>
//范围标签
<in name="num" value="9,10,11,12"> //判断传过来的num是否在value值里的范围里；另有<notin>
	在这些数字里
	<else/>
	不在这些数字范围内
</in>
<between name="num" value="1,10"> //包括1和10；另有<notbetween>
	在1-10之间
	<else/>
	不在1-10之间
</between>
//其它标签
<present name="sex">sex有赋值<else/>sex没有赋值</present> //判断分配过来的变量是否赋值
<empty name="n">n为空值<else/>n有值</empty> //判断分配过来的变量是否为空值；相反的标签<notempty></notempty>
<assign name="n" value="10"/> //模版中可以为分配过来的变量重新赋值
<php>echo "PHP代码"</php> //php标签中可以写任意PHP代码，不建议使用

//模版的使用技巧
//模版包含
<include file="Public:header"/> //模版中包含别的模版文件，file指定被包含的文件，有多种引入方法，具体查手册
//模版布局
<layout name="layout"/> //在模版中使用layout标签导入TPL/layout.html；可以在layout.html中把通用的html,head,load等代码写入，使用一个<{__CONTENT__}>在主内容中作为占位符，就会把引入这个文件的模版文件替换这个<{__CONTENT__}>；所以模版文件中只需要写主要内容即可；另外可以在配置文件中开启"LAYOUT_ON"=>true来让所有模版自动导入layout文件，而不想导入的在模版中使用<{__NOCONTENT__}>来拒绝
//模版继承：类似于类的继承，父模版定义了很多block，让子类去实现这些block
<block name="title"><title>这里是title</title></block> //父模版中定义一个区块，并定义一个name
<extend name="Public:father"/> //子模版中继承父模版Public/father.html
<block name="title"><title><{$title}></title></block> //子模版中实现父模版，name确定实现哪个区块



//空操作(空方法)：当调用了控制器中不存在的方法时输出此方法
function _empty($name){ //系统内置方法_empty；当调用不存在的方法时(如用户在URL中自行输入地址)，会自动调用控制器中的此方法
	$this->show("$name不存在"); //自定义输出内容，让用户体验更友好
}
//空模块：当调用了不存在的模块(控制器)的时候输出此模块
Empty.class.php //Action文件夹中创建一个Empty类
class EmptyAction extends Action{ //在空模块中创建一个EmptyAction空模块
	function index(){ //创建一个index方法
		$this->show("访问的地址不存在"); //调用空模块的时候输出这里的内容
	}
}
//前置操作：调用一个方法时会先执行这个方法
public function _befor_index(){ //当调用index方法时会先调用这个方法：_befor_方法名
	if(!isset($_SESSION['username']) || $_SESSION['username']==''){ //可以用来判断用户是否登录等；如果登录了则跳过这里直接执行index方法
		$this->redirect('Login/index'); //如果没登录则跳转到Login控制器里的index方法进行登录；使用系统内置方法redirect()进行页面跳转
	}
}
public function _after_index(){} //后置操作：当执行了index方法后还会执行这个方法
$_SESSION['username']=$username; //往session里写入数据，thinkphp默认开启了session，因此直接写入即可

//URL
//URL规则
'URL_CASE_INSENSITIVE'=>true //默认区分大小写，这里改为不区分大小写
UserGroupAction.class.php //如果修改了配置文件为URL不区分大小写，则模块名为这样的：Action前有两个大写字母的则无法识别，URL中的模块部分必须写为user_group这样的格式才能访问，如：localhost/thinkphp/index.php/user_group/index；没修改则无所谓
//URL伪静态：默认开启
localhost/thinkphp/index.php/index/index.xml //某些用户在访问的时候会在最后输入.html,.xml,.pdf等，但是即使这样也能正常访问，这就是伪静态效果
'URL_HTML_SUFFIX'=>'html|shtml|xml' //限制伪静态格式；只有后缀为这些的才启用伪静态
//URL路由：自定义URL的访问规则
'URL_ROUTER_ON'=>true //开启路由支持
'URL_ROUTE_RULES'=>array( //配置路由规则
	"my"=>"Index/index", //静态地址路由：将URL中的Index/index替换为my；localhost/thinkphp/index.php/my
	":id/:num"=>"Index/index", //动态地址路由：localhost/thinkphp/index.php/10/100；通过这样的地址就能访问，并且可以在控制器中通过$_GET["id"]来接收URL中的10，$_GET["num"]来接收URL中的100
	"year/:year/:month/:date"=>"Index/index", //动静结合：localhost/thinkphp/index.php/year/2015/10/20；这样就能在index方法中通过$_GET['year']，$_GET['month']，$_GET['date']来获取传过来的年月日了
	"year/:year\d/:month\d/:date\d"=>"Index/index", //加上\d强制要求只能是数字，如果URL中不是数字则报错；目前只有\d判断数字
	"year/:year\d/:month\d/:date\d$"=>"Index/index", //$表示URL到这里就结束了，如果后面还有则报错
	"year/:year/:month/:date"=>"/Index/index", //如果Index前面有/则跳转到localhost/Index/index
	"/^year\/(\d{4})\/(\d{2})\/(\d{2})$/"=>"Index/index?year=:1&month=:2&date=:3" //正则表达式实现复杂的路由设置；使用:1匹配正则的第一个()，并指定变量名为year，则模块中使用$_GET['year']接收(\d{4})位置的内容，而这个位置也规定了必须为4位数的数字，否则报错；后面依此类推
)
注意：当有多个路由规则的时候，复杂的路由规则应该放在上面！因为当一个复杂的URL去匹配一个复杂的路由规则的时候，按照从上往下的原则运行匹配，如果先匹配上了简单的路由规则就会进入相应的模块并输出，而导致匹配不上；每个路由规则的末尾都应该加上"$"，也能一定程度上解决此问题
//URL生成
echo U("Index/index"); //使用U()方法传入"模版/方法名"会自动生成一个URL完整的地址：thinkphp/index.php/Index/index.html
U('show',array('uid'=>1),'',0,true); //通过U()方法来生成链接；array()里面是传递的参数，第三个参数是伪静态后缀，第四个参数是是否显示入口文件(index.php)，第五个参数是是否显示主机地址(http://localhost/)；这里的配置就会输出http://localhost/Index/show/uid/1
<a href="<{:U('show',array('uid'=>1),'',0,true)}>"> //a标签中就可以通过这个方法进行页面跳转
'URL_MODEL'=>0; //配置文件中对URL模式进行修改，0是普通默殇，1是pathinfo模式；某些空间不支持pathinfo模式，通过U()方法和这个配置结合就能快速的修改页面中链接的模式
//URL重写
就是URL中可以不写index.php这段，需要服务器中进行配置
1.打开Apache服务器配置文件：httpd.conf
2.搜索AllowOverride，找到上下都是注释文件的那个单独存在的那行，将AllowOverride none改为AllowOverride all
3.将LoadModule rewrite_module modules/mod_rewrite.so这行的注释去掉
4.重启apache
5.在项目根目录中新建一个名为.htaccess的文件，将以下代码复制到里面保存。注意：Windows中无法直接新建以.开头的文件，所以需要先新建一个txt文件，然后另存为这个文件名
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
</IfModule>
6.在TP项目的配置文件中添加：'URL_MODEL' =>2 这句，U()方法等生成的链接就不会有index.php这段了

//获取参数
I('username'); //通过系统内置函数I来获取表单传递过来的数据；等同于$_GET['username']和$_POST['username']，会自动判断是GET还是POST传递的

//项目分组：根据个人习惯决定是否使用分组
'APP_GROUP_LIST'=>'Home,Admin', //启用分组，项目分组设定；这里是将项目分为Home和Admin两个
'DEFAULT_GROUP'=>'Home', //设置默认分组
分组后就可以只在入口文件目录中创建一个项目文件(如APP项目)，然后在这个APP项目中的Action目录下创建Home和Admin文件夹，再在这两个文件夹中分别创建模块内容；这样访问的时候URL也变为：localhost/thinkphp/index.php/Home/Index/index，中间就多了一个分组路径
//分组的作用
通常是将相关的项目分为一组，这样他们就能使用公共的配置文件(Conf/config.php)，目录等，让项目结构更科学化；当然，也可以让分组中的每个项目在公有属性中加上独有的属性，如配置文件(Conf/Home/config.php)，每个目录中都可以通过创建分组目录的方式来让每个分组实现独有的功能

//页面跳转
$this->error('查询失败'); //调用error方法，将在3秒后跳转回查询页面；error方法文件为核心文件夹ThinkPHP/Tpl/dispatch_jump.tpl，可以自己修改这个文件让跳转页面呈现不同的样式
$this->success('查询成功','index'); //3秒后跳转到本模块的index方法
$this->success('查询成功',U('User/test')); //通过U()指定路径，跳转到别的模块中的方法
$this->redirect('User/test'[,'',5,'页面正在跳转']); //直接跳转到指定页面，不会显示倒计时；[也可以设置一个过度页面，这个页面只有最后一个参数的内容，倒数第二个参数设定过度页面停留时间]
if(!IS_POST){ //在控制器里面的方法中通过IS_POST常量来判断调用这个方法时，是否是通过表单中POST方法提交访问的
	_404('页面不存在', U('index')); //不是通过POST方法提交的(某些人会通过URL直接访问)，则跳转到index方法
}

//AJAX的使用
$this->ajaxReturn('返回数据data','提示信息info','操作状态status'); //返回数据默认是以JSON的方式，可以通过JS调用此方法并接收返回的数据(返回数据是一个包含data,info,status的JSON对象)，然后通过调用这个JSON对象中的data就能输出数据，如返回一个ajaxdata对象，调用ajaxdata.data就能获取数据

//session的使用
session('username',$username); //创建session并赋值
$name=session('username'); //读取session
session('username',null); //删除session
session(null); //删除所有session
//session控制用户的登录和退出
$_SESSION["username"]=$username; //获取用户名并赋给session完成登录
if($_POST['keep']){ //如果用户选择了保存登录，则将session_id()写入cookie中
	setcookie(session_name(),session_id(),time()+3600,'/'); //session_name()就是session_id()的键，也就是将PHPSESSID保存到cookie中并延长时间；默认是保存到浏览器关闭自动销毁
}
if(isset($_COOKIE[session_name()])){ //下次登录的时候通过判断$_COOKIE[session_name()]是否存在
	..........
}
session_unset(); //退出：首先清空session
if(isset($_COOKIE[session_name()])){ //再清空cookie中保存的session_id()
	setcookie(session_name(),'',time()-1,'/');
}
session_destroy(); //最后销毁session

//cookie的使用
cookie('username',$username,3600); //将$username以username的名称保存到cookie，保存时间为1小时
$name=cookie('username'); //读取cookie
cookie('username',null); //删除cookie
cookie(null); //删除所有cookie

//初始化方法：创建一个单独的类，在这个类中创建一个初始化方法_initialize()，然后别的类直接继承这个类而不是继承Action类，当调用那些类里面的方法的时候就会首先调用这个类中的_initialize()方法
class CommonAction extends Action{ //单独创建一个类继承Action
	public function _initialize(){ //这个类中写入一个_initialize()方法
		方法体：如判断用户权限等 //当别的类直接继承这个类时，调用那个类里的方法就会先执行这里的内容
	}
}
class MainAction extends CommonAction{ //别的类就可以直接继承用于初始化的类
	public function xxx(){ //当调用这个类里的任何一个方法时都会先调用_initialize()方法
		方法体
	}
}

//三大自动
//自动创建
$user=M("user");
$user->create(); //使用create()方法将自动接收表单传过来的数据，并创建这些数据到数据库对象里
$user->add(); //调用add方法将数据添加到数据库
*$user->save(); //create()不仅能用于add()同样能用于save()等操作，它的作用是把POST数组里的数据生成数据库对象，在create()之前还能自己往POST里添加数据，以达到自己需要的数据库对象

$data['name'] = 'ThinkPHP';
$data['email'] = 'ThinkPHP@gmail.com';
$User->create($data); //传入一个数组，将此数组创建数据库对象

$User = M("User");
$User->find(1);
$Member = M("Member");
$Member->create($User); // 从User数据对象创建新的Member数据对象
//自动验证：自动对表单要写入数据库的数据进行验证，在调用create()方法时验证；和JS验证类似
静态验证：需要创建model
在Lib/Model里创建一个Model类，如UserModel.php，User是表名，要操作哪个表就必须用那个表的表名来命名
class UserModel extends Model{ //创建UserModel类继承Model类
	protected $_validate=array( //定义一个$_validate数组，里面写验证规则，也是数组
		array(验证字段,验证规则,错误提示,[验证条件,附加规则,验证时间]) //验证字段是表单提交的name的值；验证规则有require,email,url,number(可以用正则，需要附加规则支持)；错误提示是验证失败输出的提示信息；
		array('verify','require','验证码必须填写'), //如验证验证码是否输入正确；require表示必须填写
		array('username','','用户已经存在',0,'unique','1') //可以通过多个数组创建多条验证规则；0表示存在字段就验证；unique表示验证是否唯一；1表示新增数据时验证
	);
}
$user=D('user'); //控制器里使用D()创建Model对象；D()会先去查看是否有传入的数据表的相应的验证规则，有则验证，没有则等同于M()
if(!$user->create()){ //调用create()方法时就会进行自动验证
	exit($this->getError()); //如果验证失败则输出错误停止运行
}else{
	...... // 验证通过 可以进行其他数据操作
}
动态验证：直接在controller里写验证规则
$rules=array(
		     array('verify','require','验证码必须！'), //默认情况下用正则进行验证
		     array('name','','帐号名称已经存在！',0,'unique',1), // 在新增的时候验证name字段是否唯一 
		     array('value',array(1,2,3),'值的范围不正确！',2,'in'), // 当值不为空的时候判断是否在一个范围内
		     array('repassword','password','确认密码不正确',0,'confirm'), // 验证确认密码是否和密码一致
		     array('password','checkPwd','密码格式不正确',0,'function'), // 自定义函数验证密码格式
    	);
$User = M("User");
if (!$User->validate($rules)->create()){  //调用validate()和create()进行验证 
	exit($User->getError());
}else{
  ......
}
//自动完成
自动完成通常用来完成默认字段写入，安全字段过滤以及业务逻辑的自动处理等，和自动验证类似，也要创建一个新的Model类来继承Model类，名称也是由操作的表名来决定
class MessageModel extends Model{ //创建一个MessageModel类来继承Model类，操作的也就是message数据表
	protected $_auto=array( //定义一个$_auto数组
		array(完成字段,完成规则,[完成时间,附加规则])
		array('time','time',1,'function'), //对数据库中的time字段进行填充；填充内容需要和附加规则配合，这里是使用time()函数进行填充，填充条件1是当新增数据时填充
		array('uid','getId',1,'callback') //这里是通过回调函数getId()对uid字段进行填充
	);	
	protected function getId(){ //回调函数也写在这个类中；自动验证也有类似的形式
		return $_SESSION['id']; //返回$_SESSION['id'](user表的id)，uid就接收这个id，这样就将message数据表和user数据表形成了关联数据表结构
	}
	protected $_link=array( //关联模型：使用$_link创建关联模型，将多个有关联的表关联起来
		'user'=>array( //将本表(message)和user表关联
			'mapping_type'=>BELONGS_TO, //关联类型：BELONGS_TO表示当前模型是从属于所关联的模型的(message从属于user)
			'foreign_key'=>'uid', //关联的字段名称：message里的uid与之关联
			'mapping_name'=>'linkUser', //关联映射名称，用于获取数据用；将获取user表中关联上的数据形成一个linkUser二维数组保存到message对象中
			'as_fields'=>'username' //直接把关联字段uid映射成所关联数据表中的username字段
		),
	);
}
$message=D('message'); //也使用D()来实例化Model对象
if (!$message->create()){
     exit($message->getError());
}else{   
     $User->add();
 }


//上传文件
$message=M('message');
$message->create(); //获取表单传过来的各种数据(如标题，文本内容等)写入数据库对象
import('ORG.Net.UploadFile'); //引入文件上传类
$upload = new UploadFile();// 实例化上传类
$upload->maxSize  = 3145728 ;// 设置附件上传大小
$upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
$upload->savePath =  './Public/Uploads/';// 设置附件上传目录
if(!$upload->upload()) {// 上传错误提示错误信息
$this->error($upload->getErrorMsg());
}else{// 上传成功 获取上传文件信息
$info =  $upload->getUploadFileInfo();
$filename=$info[0]['savename']; //文件上传后会随机重命名，获取重命名后的文件名
$message->filename=$filename; //将新文件名赋给数据库里的filename字段
$message->add(); //将文件名和其它所有数据一起写入数据库
}

//RBAC：Role Based Access Control-基于角色的访问控制
首先需要创建5个数据表：用户表，角色表，节点表，权限表，用户与角色中间表；其中用户表需要自己创建，别的4个在：thinkphp/extend/library/ORG/util/RBAR.class.php中前部分注释中有创建4个表的代码，复制创建即可，注意表前缀
1.创建RBACAction.class.php控制器
2.在里面创建用户列表-index，角色列表-role，节点列表-node，添加用户-addUser，添加角色-addRole，添加节点-addNode这6个方法
3.先完成添加角色功能；添加角色功能对应的模版中，表单里提交内容的name值需要和创建的tp_role数据表中的表头对应：name(角色名，如manage), remark(角色描述，如管理员), status(是否开启)
3.完成添加节点功能；包括应用(Admin,Index)，控制器，控制器中的方法；不同的用户这3个不同，所以权限不同；数据表中应用的level为1，控制器的level为2，方法的level为3；pid=1的是后台应用控制器，pid=2的是前端应用控制器
4.........详见后盾网TP教程RBAC相关视频


//文件写入与读取：使用F()方法读写文件
F("phiz",$data,"./Other/"); //将$data写入项目根目录下的Other文件夹里的phiz.php文件中；没有文件会自动创建相应的文件夹和文件
F("phiz","","./Other/"); //第二个参数为空的时候就是读文件

//缓存文件：使用S()方法读写缓存
S("cache",$data,1000); //将数据$data以cache缓存名保存到缓存文件中1000秒
S("cache"); //读取缓存名为cache文件

//模版静态缓存：生成一个静态HTML页面，一定时间内再次访问将直接调用这个页面而不会去执行相应的控制器和方法来调用模版；配置项里添加；详情后盾TP教程最后一集
'HTML_CACHE_ON'=>true, //开启静态缓存；静态缓存仅在GET请求下面有效
'HTML_CACHE_TIME'=>60,   // 全局静态缓存有效期（秒）；非必要配置
'HTML_FILE_SUFFIX'=>'.shtml', // 设置静态缓存文件后缀；非必要配置
'HTML_CACHE_RULES'=>array( //设置缓存规则：那些页面需要缓存
	'静态地址'=>array('静态规则', ['有效期', '附加规则']), 
	'Show:index'=>array('{:module}_{:action}_{id}',10,'md5'), //Show控制器里的index方法开启静态页面缓存，缓存文件命名方式为"控制器名_方法名_get参数"，缓存时间为10秒
),
//数据库存储session步骤(详见后盾视频教程14讲)：
1.配置文件中将session设置为数据库保存(默认为文件形式保存，并默认开启session，因此使用session的时候不需要session_start())
'SESSION_TYPE'=>'db'
2.在ThinkPHP\Extend\Driver\Session\SessionDb.class.php中，将前部分注释掉的那段创建数据表的代码复制，并在相应数据库中创建(注意修改表前缀)


//调用其它模块中的方法
$delet=new DeletAction(); //模块中可以直接调用别的模块中的方法

//其它
<form action="/Thinkphp/index.php/index/create"> //thinkphp中提交表单不再是传入到一个.php文件，而是控制器中的一个方法；/Thinkphp/index.php/index这一节可以用__URL__代替


//简单的写日志
在config.php中加入：
'LOG_RECORD' => true, // 开启日志记录
'LOG_LEVEL'  =>'EMERG,ALERT,CRIT,ERR,WARN', // 只记录EMERG ALERT CRIT ERR WARN错误
在控制器中需要写如日志的地方使用Log::write()写入日志，日志文件在Runtime文件夹里的Logs文件夹中
$ip = get_client_ip();  //获取请求的IP地址
Log::write('SQL语句：'.$m->getLastSql().'--IP地址：'.$ip);  //将内容写入日志文件






//配置文件，在创建的thinkphp框架目录中的Conf/config.php中添加；改了配置文件需要删除Runtime下的内容清空缓存才能生效
'TMPL_L_DELIM'=>'<{', //修改模版文件的左定界符；定界符内不能直接使用PHP代码
'TMPL_R_DELIM'=>'}>', //修改模版文件的右定界符
'TMPL_TEMPLATE_SUFFIX'=>'.tpl', //设置模版文件后缀名，默认为html
'TMPL_FILE_DEPR'=>'_', //修改模版文件目录结构；这里就不用放在和控制器同名的文件夹里，只需放在TPL文件夹下，命名方式则为Index_index.html(控制器名_方法名.html)
'DEFAULT_THEME'=>'mine', //开启并设置默认模版主题，这里是TPL下的mine文件夹
'TMPL_DETECT_THEME'=>true, //自动侦测模版主题，默认为false
'THEME_LIST'=>'black,red,white', //支持的模版主题列表
'TMPL_PARSE_STRING'=>array( //添加自己的模版变量规则
	"__CSS__"=>__ROOT__."/Public/css"; //自定义模版变量__CSS__代表/thinkphp/Public/css路径(__ROOT__代表项目目录，这里项目在www/thinkphp/)
	"__JS__"=>__ROOT__."/Public/js"; //自定义模版变量__JS__代表/thinkphp/Public/js路径
),
'DB_TYPE'=>'mysql',   //设置数据库类型
'DB_HOST'=>'localhost',//设置主机名
'DB_USER'=>'root',    //设置数据库用户名
'DB_PWD'=>'',        //设置数据库密码
'DB_PORT'=>'3306',   //设置端口号(可以不设置，默认为3306)
'DB_NAME'=>'thinkphp',//设置默认连接的数据库名
'DB_PREFIX'=>'tp_',  //设置表前缀(数据库中创建表的时候最好给个前缀，便于分辨不同数据库中相同表名的表；若没有这段代码，则默认为think_表前缀)
'DB_DSN'=>'mysql://username:password@localhost:3306/thinkphp', //使用DSN配置数据库，效果和上面分开写一样(更简洁，两种连接数据库的方式都存在，DSN优先)//PDO连接方式
'DB_TYPE'=>'pdo', //使用PDO连接方式和mysql有所不同；'DB_USER'=>'root','DB_PWD'=>'','DB_PREFIX'=>'think_', 需要这三个，但是不用设置主机名和默认数据库，而在DB_DSN里设置，必须要有DB_DSN
'DB_DSN'=>'mysql:host=localhost;dbname=thinkphp;charset=UTF-8', //当用PDO连接数据库则需要这句，与上面的mysql连接写法有所不同
'SESSION_TYPE'=>'db', //SESSION用数据库来存储，默认为文件存储
'SHOW_PAGE_TRACE'=>true, //开启页面trace(调试模式)；网页上线后应关闭
'URL_PATHINFO_DEPR'=>'-', //修改URL的分隔符/为-(不建议使用)
'LAYOUT_ON'=>true, //开启模版布局
'URL_CASE_INSENSITIVE'=>true, //URL路径中默认区分大小写，这里改为不区分大小写；主要针对Linux，不建议开启
'URL_HTML_SUFFIX'=>'html|shtml|xml', //限制URL伪静态格式；只有后缀为这些的才启用伪静态
'APP_GROUP_LIST'=>'Home,Admin', //启用分组，项目分组设定；这里是将项目分为Home和Admin两个
'DEFAULT_GROUP'=>'Home', //设置默认分组
'LOAD_EXT_FILE'=>'function', //加载Common文件夹里的自定义函数，值是函数名，这里是function.php(如果命名为common.php则默认自动加载)，会将function.php里的所有自定义函数加载并能随时调用；也可以在控制器的方法里通过load('@.function')来临时性加载自定义函数
'LOAD_EXT_CONFIG'=>'water', //加载额外的配置项，多个配置项之间用,隔开
'TMPL_EXCEPTION_FILE'=>'./Public/tpl/error.html', //定制错误页面显示路径（_404()、halt()等）
'DEFAULT_FILTER'=>'strip_tags,htmlspecialchars', //设置默认过滤，多个过滤方法间用,隔开；例：I('get.name')等同于htmlspecialchars(strip_tags($_GET['name']))；不配置此项，如果使用I()方法接收数据也会自动使用htmlspecialchars()过滤
'DB_SQL_BUILD_CACHE'=>true, //开启SQL解析缓存以减少SQL解析提高性能，对数据库查询有效

C('参数名称'); //使用C方法可以读取相应参数的配置信息
C('USER_CONFIG.USER_TYPE'); //自定义了二维数组的配置，可使用.读取
C('参数名称','新的参数值'); //可以动态修改配置，动态配置赋值仅对当前请求有效，不会对以后的请求造成影响
C('USER_CONFIG.USER_TYPE',1); //修改自定义配置
C(array('参数名'=>'参数值')); //通过传入一个数组来进行批量配置

//多应用配置技巧
在入口文件目录下新建一个config.php文件，里面放入各个项目共用的配置文件，在每个项目的配置文件中 include('./config.php') 这个文件，然后每个项目也可以配置自己独有的配置文件，最后将公有的和独有的一起返回即可

注：
数据库中的密码一般设定为CHAR(32)，因为MD5($password)后是一个32位的字符串
引入的CSS或js文件中不能使用类似__PUBLIC__等这样的模版语法，因为这是外部引入的文件，所以都不能使用模版语法，如果要使用模版语法可以将CSS或JS直接写在模版文件中，而不使用外部引入的方法。若是引入的外部文件，那么路径就该这样写background:url('../../img/arrows.jpg');是从引入的CSS或JS文件的路径作为初始路径的


//复制数据库数据
$m=M("article");
$list=$m->select();
foreach ($list as $k=>$v){
	$i=array('title'=>$v['title'],'content'=>$v['content'],'type'=>$v['type'],'click'=>$v['click'],'hot'=>$v['hot'],'author'=>$v['author'],'intro'=>$v['intro'],'img'=>$v['img']);
	$m->data($i)->add();
}

insert into tb_question (question_name, question_price,question_startTime,question_category,question_endTime,question_userId,question_content,question_title,status,result,pay) select question_name, question_price,question_startTime,question_category,question_endTime,question_userId,question_content,question_title,status,result,pay from tb_question


















******************************* ThinkPHP 3.2.2 相关笔记 ********************************************

//入口文件配置
if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !'); // 检测PHP环境
define('APP_DEBUG',True); // 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
define('APP_PATH','./Apps/'); // 定义应用目录；注：不用再定义APP_NAME了
require './ThinkPHP/ThinkPHP.php'; // 引入ThinkPHP入口文件

//目录安全文件
在自动生成目录结构的同时，在各个目录下面我们还看到了index.html文件，这是ThinkPHP自动生成的目录安全文件。有了这个文件，当用户在URL中输入相应目录时便不会在浏览器中显示此目录下的目录结构，而会显示index.html中的内容
define('DIR_SECURE_FILENAME', 'default.html'); //入口文件中添加此配置项，可以改变index.html的文件名为defalt.html
define('BUILD_DIR_SECURE', false); //如果添加此配置项，则不会生成html文件

//应用目录结构
3.2版本在原来3.1.3的独立分组的基础上进行了改进，改进后的独立分组就是新版的模块，之前的模块则改称为控制器。因此Home,Admin等都来到了Application目录下
Application      默认应用目录（可以设置）
	├─Common         公共模块（不能直接访问）
	├─Home           前台模块
	├─Admin          后台模块
	├─...            其他更多模块
	├─Runtime        默认运行时目录（可以设置）
//模块目录结构
├─Home         模块目录
	│  ├─Conf        配置文件目录
	│  ├─Common      公共函数目录
	│  ├─Controller  控制器目录
	│  ├─Model       模型目录
	│  ├─Logic       逻辑目录（可选）
	│  ├─Service     Service目录（可选）
	│  ... 更多分层目录可选
	│  └─View        视图目录

//控制器写法
控制器文件名由IndexAction.class.php改为了IndexController.class.php
namespace Home\Controller; //命名空间：表示当前类是Home模块下的控制器类
use Think\Controller; //表示引入基类控制器 Think\Controller 命名空间便于直接使用；有了命名空间后，要继承父类，需要先引入
class IndexController extends Controller { //完整写法是class IndexController extends \Think\Controller，但上面引入了命名空间，所以只写Controller即可
	public function index(){
		echo 'hello,world!';
	}
}
复杂的操作：比如公共控制器：我们在Home目录下创建了个CommonController.class.php定义一些公有方法等
namespace Home\Controller;
use Think\Controller; //这个Common控制器直接继承Think\Controller即可
class CommonController extends Controller {
	public function _empty(){ //自定义方法：空操作，用于输出404页面
		header("HTTP/1.0 404 Not Found");
		$this->show('<b>404 Not Found</b>');
	}
	
}
namespace Home\Controller;
use Home\Controller\CommonController; //另一个IndexController需要继承CommonController则引入的命名空间为Home\Controller\CommonController
class IndexController extends CommonController { //这里继承CommonController即可
	public function index(){
		echo 'hello,world!';
	}
}
更复杂的操作：一次引入多个命名空间
namespace Home\Controller;
use Home\Controller\CommonController; //引入CommonController
use Home\Plugin\ThinkSDK\ThinkOauth; //引入另一个插件类，这个类的路径如此命名空间所示
class OauthController extends CommonController { //继承CommonController
	public function login($type = null){
		if(!$type) $this->error('参数错误');
		$sns  = ThinkOauth::getInstance($type); //通过引入的插件类，调用它的方法
		redirect($sns->getRequestCodeURL());
	}
}
//Common目录的使用
公共函数放在 Common\Common 目录中，文件名为function.php，则在控制器中使用时会自动加载这些函数
//模块化设计
3.1版URL访问：http://serverName/index.php（admin.php）/控制器/操作
3.2版URL访问：http://serverName/index.php（或者其他应用入口文件）/模块(home/admin)/控制器/操作/[参数名/参数值...]
Common模块：公共模块，里面的东西都是这个应用公有的
创建新模块：
	1、新建Admin目录，将Home目录里的文件拷贝到Admin中，然后找到Admin/Controler/IndexController.class.php，修改namespace Home\Controller; 为 Admin\Controller;浏览器访问index.php/Admin就能访问Admin模块了，通过此方法可以创建任意多个模块
	2、在入口文件中添加：define('BIND_MODULE','Admin');访问入口文件就会生成Admin模块，再删除这句即可

//模型（Model）层
数据层：Model/UserModel 用于定义数据相关的自动验证和自动完成和数据存取接口 
Home/Model/UserModel.class.php
namespace Home\Model;
use Think\Model;
class UserModel extends Model{}

逻辑层：Logic/UserLogic 用于定义用户相关的业务逻辑 
Home/Logic/UserLogic.class.php
namespace Home\Logic;
use Think\Model;
class UserLogic extends Model{}

服务层：Service/UserService 用于定义用户相关的服务接口等 
Home/Service/UserService.class.php
namespace Home\Service;
use Think\Model;
class UserService extends Model{}

实例化：
D('User') //实例化UserModel
D('User','Logic') //实例化UserLogic
D('User','Service') //实例化UserService

//视图（View）层
View/Index/index.html
复杂一点的多层视图还可以更进一步，采用不同的视图目录来完成，例如：
view 普通视图层目录
mobile 手机端访问视图层目录
这样做的好处是每个不同的视图层都可以支持不同的模板主题功能
默认的视图层是View目录，我们可以更改设置如下：
'DEFAULT_V_LAYER' => 'Mobile',
非默认视图层目录的模板获取需要使用T函数

//控制器（Controller）层
Controller/UserController //用于用户的业务逻辑控制和调度
Home/Controller/UserController.class.php 
namespace Home\Controller;
use Think\Controller;
class UserController extends Controller{}

Event/UserEvent //用于用户的事件响应操作
Home/Event/UserEvent.class.php 
namespace Home\Event;
use Think\Controller;
class UserEvent extends Controller{}
UserController负责外部交互响应，通过URL请求响应，例如 http:/serverName/User/index,而 UserEvent 负责内部的事件响应，并且只能在内部调用： A('User','Event');

//命名空间
由于新版完全采用了命名空间的特性，因此只需要给类库正确定义所在的命名空间，而命名空间的路径与类库文件的目录一致，那么就可以实现类的自动加载
$class = new \Org\Util\File();  //系统会自动加载ThinkPHP/Library/Org/Util/File.class.php文件，无需再使用import()引入类库

根命名空间：
Library目录下面的子目录会自动识别为根命名空间，这些命名空间无需注册即可使用(自动加载)；比如 extends \Think\Controller(); new \Org\Util\File();等都在此目录下，使用完全限定名称(绝对路径)访问；另注意大小写一致
模块中的类库命名空间的根都是以模块名命名；比如 namespace Home\Controller, namespace Admin\Model等

手动加载第三方类库(主要针对自己添加的无命名空间类库)：
import("Org.Util.Date"); // 导入Org类库包 Library/Org/Util/Date.class.php类库
import("Home.Util.UserUtil"); // 导入Home模块下面的 Application/Home/Util/UserUtil.class.php类库
import("@.Util.Array"); // 导入当前模块下面的类库 
import('Vendor.Zend.Server'); // 导入Vendor类库包 Library/Vendor/Zend/Server.class.php
$test = new \UserTest(); //如果类库没有使用命名空间定义的话，实例化的时候需要加上根命名空间

//应用模式
在入口文件中定义存储类型和应用模式为SAE（用于支持SAE平台）
define('STORAGE_TYPE','sae');
define('APP_MODE','sae');
Application/Common/Conf/config_sae.php //每个应用模式可以定义单独的配置文件，一般是config_模式名称；config_sae配置文件只会sae模式下面加载，如果不是sae模式则不会加载

//路由
3.2版本的路由定义是针对模块定义的，所以路由是在模块配置文件中定义的，并且模块本身不能被路由
'URL_ROUTER_ON'   => true, //开启路由
'URL_ROUTE_RULES'=>array( //定义规则：'路由表达式'=>'路由地址和传入参数'；
	//左边为路由后的地址，右边为源地址
	'new/top' => 'news/index/type/top', //静态路由，最基本的路由
	//↑定义之后，如果我们访问： http://serverName/Home/new/top 其实是访问： http://serverName/Home/news/index/type/top
	'news/:year/:month/:day'=>array('News/archive', 'status=1'), //:xx表示一个动态变量，后面的status是重定向后隐性传入的参数
	'news/:id'=>'News/read',
	'news/read/:id'=>'/news/:1', //前面的:id表示一个动态变量，后面的:1则是匹配这个变量，若有多个动态变量，使用:2:3等进行逐个匹配；这里就是把news/read/123重定向到news/123
	'blog/:id\d'=>'Blog/read', //数字约束\d：支持对变量的类型检测，但仅仅支持数字类型的约束定义；这里表示:id必须是数字
	'blog/:id\d|md5'=>'Blog/read', //函数支持：表示对匹配到的id变量进行md5处理，也就是说，实际传入read操作方法的$_GET['id'] 其实是 md5($_GET['id'])
	'blog/:year\d/[:month\d]'=>'Blog/archive', //可选定义：[:month\d]变量用[ ]包含起来后就表示该变量是路由匹配的可选变量；可选参数只能放到路由规则的最后，如果在中间使用了可选参数的话，后面的变量都会变成可选参数
	'/^new\/(\d{4})\/(\d{2})$/' => 'News/achive?year=:1&month=:2', //正则路由
),
每个参数中以“:”开头的参数都表示动态参数，并且会自动对应一个GET参数，例如:id表示该处匹配到的参数可以使用$_GET['id']方式获取，:year、:month、:day则分别对应$_GET['year']、 $_GET['month'] 和 $_GET['day']

//控制器
URL生成：
U('up'); //生成当前控制器的up操作的URL地址
U('User/add') // 生成User控制器的add操作的URL地址
U('Blog/read?id=1') // 生成Blog控制器的read操作 并且id为1的URL地址
U('Admin/User/select') // 生成Admin模块的User控制器的select操作的URL地址
U('Blog/read@blog.thinkphp.cn','id=1'); //域名支持:如果你的应用涉及到多个子域名的操作地址，@后面传入需要指定的域名即可
U('Blog/read#comment?id=1'); //锚点支持：U函数可以直接生成URL地址中的锚点，生成的URL地址Blog/read/id/1#comment

//AJAX返回
$this->ajaxReturn($data,'xml'); //第一个参数返回数据data可以支持字符串、数字和数组、对象；第二个参数是格式，支持：json,jsonp,xml,eval(字符串)，默认为json，使用其它参数会自动转化输出相应的内容

//跳转和重定向
success和error方法都可以对应的模板，默认的设置是两个方法对应的模板都是：
'TMPL_ACTION_ERROR' => THINK_PATH . 'Tpl/dispatch_jump.tpl', //默认错误跳转对应的模板文件
'TMPL_ACTION_SUCCESS' => THINK_PATH . 'Tpl/dispatch_jump.tpl', //默认成功跳转对应的模板文件

$this->redirect('New/category', array('cate_id' => 2), 5, '页面跳转中...'); //redirect方法的参数用法和U函数的用法一致

//输入变量
如果你没有在调用I函数的时候指定过滤方法的话，系统会采用默认的过滤机制（由DEFAULT_FILTER配置），事实上，该参数的默认设置是：'DEFAULT_FILTER'=>'htmlspecialchars'
I('变量类型.变量名',['默认值'],['过滤方法'],['额外数据源'])
I('id'); //自动判断get或post
I('get.id'); //获取$_get['ID']
I('get.id',0); // 如果不存在$_GET['id'] 则返回0
I('get.'); // 获取整个$_GET 数组
I('post.name','','htmlspecialchars'); // 采用htmlspecialchars方法对$_POST['name'] 进行过滤，如果不存在则返回空字符串
I('session.user_id',0); // 获取$_SESSION['user_id'] 如果不存在则默认为0
I('cookie.'); // 获取整个 $_COOKIE 数组
I('server.REQUEST_METHOD'); // 获取 $_SERVER['REQUEST_METHOD'] 
新增PATHINFO获取，如：当前访问URL地址是 http:/serverName/index.php/New/2013/06
I('path.1'); // 输出2013
I('path.2'); // 输出06
'DEFAULT_FILTER' => 'strip_tags,htmlspecialchars' //修改配置文件实现多个过滤
I('get.id','',false); //一旦过滤参数设置为空字符串或者false，即表示不再进行任何的过滤

//请求类型
IS_GET  IS_POST  IS_AJAX  //可以通过这些来判断请求是否是对应的类型

//模型
namespace Home\Model;
use Think\Model;
class UserModel extends Model {}
//命名
模型类的作用大多数情况是操作数据表的，如果按照系统的规范来命名模型类的话，大多数情况下是可以自动对应数据表。模型类的命名规则是除去表前缀的数据表名称，采用驼峰法命名，并且首字母大写，然后加上模型层的名称，如(假设表前缀是think_)：
UserModel 对应 think_user 
UserTypeModel 对应 think_user_type 
//模型实例化
$connection = array(    
	'db_type'    =>   'mysql',    
	'db_host'    =>   '127.0.0.1',    
	'db_user'    =>   'root',    
	'db_pwd'     =>   '12345',    
	'db_port'    =>    3306,    
	'db_name'    =>    'demo', 
);
new \Home\Model\NewModel('new','think_',$connection); //通过此方法可连接任意数据库
D('user'); //当 \Home\Model\UserModel 类不存在的时候，D函数会尝试实例化公共模块下面的 \Common\Model\UserModel 类，最后实例化\Think\Model基类
//实例化空模型
$Model = M();//进行原生的SQL查询
$Model->query('SELECT * FROM think_user WHERE status = 1'); //当使用原生SQL查询的时候，只需实例化一个空模型
//字段定义
M('user')->getDbFields(); //获取当前数据对象的全部字段信息
//模型类定义
如果在某个模型类里面定义了connection属性的话，则实例化该自定义模型的时候会采用定义的数据库连接信息，而不是配置文件中设置的默认连接信息，通常用于某些数据表位于当前数据库连接之外的其它数据库，例如：
namespace Home\Model;
use Think\Model;
class UserModel extends Model{    
	protected $connection = array(        
		'db_type'  => 'mysql',        
		'db_user'  => 'root',        
		'db_pwd'   => '1234',        
		'db_host'  => 'localhost',        
		'db_port'  => '3306',        
		'db_name'  => 'thinkphp',        
		'db_charset' =>    'utf8',    
	);
}
//实例化定义
除了在模型定义的时候指定数据库连接信息外，我们还可以在实例化的时候指定数据库连接信息
$User = M('User','other_','mysql://root:1234@localhost/demo#utf8'); 
//分布式数据库支持
配置DB_DEPLOY_TYPE 为1 可以采用分布式数据库支持
'DB_DEPLOY_TYPE'=> 1, // 设置分布式数据库支持
'DB_TYPE'       => 'mysql', //分布式数据库类型必须相同
'DB_HOST'       => '192.168.0.1,192.168.0.2',
'DB_NAME'       => 'thinkphp', //如果相同可以不用定义多个
'DB_USER'       => 'user1,user2',
'DB_PWD'        => 'pwd1,pwd2',
'DB_PORT'       => '3306',
'DB_PREFIX'     => 'think_',
'DB_RW_SEPARATE'=>true, //设置分布式数据库的读写是否分离，默认的情况下读写不分离，也就是每台服务器都可以进行读写操作，对于主从式数据库而言，需要设置读写分离

//WHERE
//预处理机制
$Model->where("id=%d and username='%s' and xx='%f'",array($id,$username,$xx))->select(); //如果$id变量来自用户提交或者URL地址的话，如果传入的是非数字类型，则会强制格式化为数字格式后进行查询操作。字符串预处理格式类型支持指定数字、字符串等，具体可以参考vsprintf方法的参数说明。
//表达式查询
$Model->where(array('字段名'=>array('表达式'=>'查询条件')))->select(); 
表达式 含义 
EQ 等于（=） 
NEQ 不等于（<>） 
GT 大于（>） 
EGT 大于等于（>=） 
LT 小于（<） 
ELT 小于等于（<=） 
LIKE 模糊查询 
[NOT] BETWEEN （不在）区间查询 
[NOT] IN （不在）IN 查询 
EXP 表达式查询，支持SQL语法 
$Model->where($map)->where($where)->where('status=1')->select(); //多次的数组条件表达式会最终合并，但字符串条件则只支持一次

//TABLE
作用：切换操作的数据表和对多表进行操作
$Model->table('think_user')->where('status>1')->select(); //表名需要写全称
$Model->table('db_name.think_user')->where('status>1')->select(); //可以指定数据库
$Model->table('__USER__')->where('status>1')->select(); //这样可以免前缀，这里就是think_user表
$Model->field('user.name,role.title')->table(array('think_user'=>'user','think_role'=>'role'))->limit(10)->select(); //多表操作
$Model->alias('a')->join('__DEPT__ b ON b.user_id= a.id')->select(); //alias用于设置当前数据表的别名，便于使用其他的连贯操作例如join方法等

//FIELD
$Model->field('id,SUM(score)')->select(); //可以在field方法中直接使用函数,相当于：SELECT id,SUM(score) FROM table
$Model->field(array('id','concat(name,'-',id)'=>'truename','LEFT(title,7)'=>'sub_title'))->select(); //使用数组，如果是关联数组，则左边是字段名或字段操作函数，右边是别名
$Model->field('user_id,content',true)->select(); //传入第二个参数true，则是获取排除第一个参数字段的所有字段
$Model->field('title,email,content')->create(); //安全性：字段合法性检测：即表示表单中的合法字段只有title,email和content字段，无论用户通过什么手段更改或者添加了浏览器的提交字段，都会直接屏蔽

//JOIN
join通常有下面几种类型，不同类型的join操作会影响返回的数据结果。
INNER JOIN: 如果表中有至少一个匹配，则返回行，等同于 JOIN 
LEFT JOIN: 即使右表中没有匹配，也从左表返回所有的行 
RIGHT JOIN: 即使左表中没有匹配，也从右表返回所有的行 
FULL JOIN: 只要其中一个表中存在匹配，就返回行 
$Model->join('think_work ON think_artist.id = think_work.artist_id')->join('think_card ON think_artist.card_id = think_card.id')->select(); //join方法支持多次调用
$Model->join('__WORK__ ON __artist__.id = __WORK__.artist_id','RIGHT')->select(); //__WORK__解析为think_work，第二个参数支持的类型包括：INNER LEFT RIGHT FULL

//PAGE
这是一个完全为分页查询而生的方法，传入页数和条数
$Article->page(2,10)->select(); // 查询第二页数据，查出10条
//GROUP
$this->field('username,max(score)')->group('user_id,test_time')->select(); //SELECT username,max(score) FROM think_score GROUP BY user_id,test_time
//HAVING
$this->field('username,max(score)')->group('user_id')->having('count(test_time)>3')->select(); //SELECT username,max(score) FROM think_score GROUP BY user_id HAVING count(test_time)>3
//UNION
UNION操作用于合并两个或多个 SELECT 语句的结果集。UNION 内部的 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每条 SELECT 语句中的列的顺序必须相同。
$Model->field('name')->table('think_user_0')->union(array('SELECT name FROM think_user_1','SELECT name FROM think_user_2'))->select();
//DISTINCT
$Model->distinct(true)->field('name')->select(); //返回唯一不同的值，SELECT DISTINCT name FROM think_user
//CACHE
$Model->where('id=5')->cache(true)->find(); //第一次查询结果会被缓存，第二次查询相同的数据的时候就会直接返回缓存中的内容，而不需要再次进行数据库查询操作，有效期为DATA_CACHE_TIME
$Model->cache('key',60)->find(); //指定查询缓存的标识可以使得查询缓存更有效率，缓存有效期60秒
$data = S('key'); //这样，在外部就可以通过S方法直接获取查询缓存的数据

//命名范围
class NewsModel extends Model {
     protected $_scope = array( //使用$_scope定义命名范围
		  // 命名范围normal         
		  'normal'=>array(
		  		'where'=>array('status'=>1),         
		   ),         
		   // 命名范围latest         
		   'latest'=>array(
		       'order'=>'create_time DESC',
		       'limit'=>10,
		  	), 
   	 );
   	 $Model->scope('normal')->select(); //使用scope()传入nomal则是调用定义的normal中的所有条件
   	 $Model->scope('normal,latest')->select(); //可以一次传入多个条件
   	 $Model->scope('normal',array('limit'=>5))->select(); //增加额外的条件
   	 $Model->scope(array('field'=>'id,title','limit'=>5,'where'=>'status=1'))->select(); //不用已定义的任何条件
 }

//CURD
//create
$model->create(); //将POST表单提交的数据创建数据对象
$model->create($data); //将一个数组中的数据创建数据对象；不填就是POST数组
echo $model->name; $model->name='onethink'; //创建完成的数据可以直接读取和修改
$model->status=1; // 增加新的字段数据；和修改一样，当字段不存在便是增加
create方法工作流程(中间有失败的地方则会返回false)：
1 获取数据源（默认是POST数组）  
2 验证数据源合法性（非数组或者对象会过滤）
3 检查字段映射  
4 判断数据状态（新增或者编辑，指定或者自动判断）  
5 数据自动验证 
6 表单令牌验证 
7 表单数据赋值（过滤非法字段和字符串处理）  
8 数据自动完成  
9 生成数据对象（保存在内存） 
因此，我们熟悉的令牌验证、自动验证和自动完成功能，其实都必须通过create方法才能生效
$model->save(); $model->add(); //最后需要通过save()或add()方法来完成数据的修改或添加
$model->field('name,email')->create($data); //字段合法性过滤：只有name和email字段的数据被允许写入，别的字段直接被过滤了
class UserModel extends Model{ //自定义model中定义允许的字段
    protected $insertFields = 'name,email'; // 通过$insertFields定义新增数据的时候允许写入name和email字段
    protected $updateFields = 'email'; // 通过$updateFields定义编辑数据的时候只允许写入email字段
}
//add
$User->data($data)->add(); //如果$data中含有数据表中不存在的字段数据，则会被自动过滤
$User->field('name')->data($data)->add(); //只有name字段的数据被允许写入，别的都会被自动过滤
$User->data($data)->filter('strip_tags')->add(); //使用stript_tags()对字段内容进行过滤处理
//save
$User->where('id=5')->field('email')->filter('strip_tags')->save($data); //和add方法一样，save方法支持使用field方法过滤字段和filter方法过滤数据
$User-> where('id=5')->setField(array('name'=>'ThinkPHP','email'=>'ThinkPHP@gmail.com')); //更新个别字段的值
//delete
$User->where('status=0')->order('create_time')->limit('5')->delete(); //排序再删除固定条数
$User->where('1')->delete(); //删除所有数据
//select
查询条件中有不存在的字段会自动过滤
$User->where(array('uid'=>1,'name'=>'abc','_logic'=>'or')->select(); //_logic默认是and
$User->where(array('name&title'=>'abc'))->select(); //快捷查询：在多个字段之间用|分割表示OR查询，用&分割表示AND查询；等效：where(array('neme'=>'abc','title'=>'abc'))
$where['name']=array('like', '%thinkphp%'); $where['title']=array('like','%thinkphp%'); $where['_logic']='or'; $map['_complex']=$where; $map['id']=array('gt',1); //复合查询：( id > 1) AND ( ( name like '%thinkphp%') OR ( title like '%thinkphp%') )

//虚拟模型
虚拟模型是指虽然是模型类，但并不会真正的操作数据库的模型。有些时候，我们建立模型类但又不需要进行数据库操作，仅仅是借助模型类来封装一些业务逻辑，那么可以借助虚拟模型来完成。虚拟模型不会自动连接数据库，因此也不会自动检测数据表和字段信息。这种方式下面自定义模型类就是一个单纯的业务逻辑类，不能再使用模型的CURD操作方法
namespace Home\Model;
Class UserModel {}

//关联模型
一对一关联 ：ONE_TO_ONE，包括HAS_ONE 和 BELONGS_TO 
一对多关联 ：ONE_TO_MANY，包括HAS_MANY 和 BELONGS_TO
多对多关联 ：MANY_TO_MANY
关联关系必然有一个参照表，例如：
有一个员工档案管理系统项目，这个项目要包括下面的一些数据表：基本信息表、员工档案表、部门表、项目组表、银行卡表（用来记录员工的银行卡资料）。 
这些数据表之间存在一定的关联关系，我们以员工基本信息表为参照来分析和其他表之间的关联： 
每个员工必然有对应的员工档案资料，所以属于HAS_ONE关联； 
每个员工必须属于某个部门，所以属于BELONGS_TO关联； 
每个员工可以有多个银行卡，但是每张银行卡只可能属于一个员工，因此属于HAS_MANY关联； 
每个员工可以同时在多个项目组，每个项目组同时有多个员工，因此属于MANY_TO_MANY关联； 
namespace Home\Model;
use Think\Model\RelationModel; //模型类必须继承Think\Model\RelationModel类
class UserModel extends RelationModel{
    protected $_link = array( //所有的关联定义都统一在模型类的 $_link 成员变量里面定义
	            'Profile'=>array( //和ProfileModel关联
	                'mapping_type'=>self::HAS_ONE, //关联类型
	                'class_name'=>'Profile', //要关联的模型类名；也就是另一个模型，也就是另一个字段
	                'mapping_name'=>'Profile', //关联的映射名称，用于获取数据用；该名称不要和当前模型的字段有重复。如果mapping_name没有定义的话，会取class_name的定义作为mapping_name。如果class_name也没有定义，则以数组的索引作为mapping_name
	                'foreign_key'=>'userId', //关联的外键名称
	                 ...... // 定义更多的关联属性；不同关联类型的属性不同，具体查手册
                ), 
                'Group' => array( //可以添加更多的关联
                    'mapping_type'=>self::MANY_TO_MANY,
                    'class_name'=>'Group',
                    'mapping_name'=>'groups',
                    'foreign_key'=>'userId',
	                'mapping_fields'=>array('id','uid','title'), //关联要查询的字段；不定义则是关联表的所有字段
	                'mapping_order'=>'create_time desc', //关联查询的排序
                    'relation_foreign_key'=>'groupId', //关联表的外键名称 默认的关联表的外键名称是'表名_id'
                    'relation_table'=>'think_group_user' //MANY_TO_MANY通常有个中间表，此处应显式定义中间表名称，且不能使用C函数读取表前缀
	                 ...... // 定义更多的关联属性
                ),
            );
}
D('User')->relation(true)->find(1); //通过relation(true)开启关联模型进行查询
结果类似：
array(
    'id'        => 1,
    'account'   => 'ThinkPHP',
    'password'  => '123456',
    'Profile'   => array( //Profile就是关联定义的mapping_name属性；也就是被关联的那个字段的数据
        'email'     => 'liu21st@gmail.com',
    	'nickname'  => '流年',
    ),
)
'as_fields' => 'email,nickname', //如果在关联模型中定义了as_fields，则会把被关联模型里面的数据按照相应字段提取出来，和自身模型的字段在一层，而不是二维数组
$list = $User->relation(true)->Select(); //使用select查询多行数据
//关联写入，关联更新，关联删除
$User = D("User");
$data["account"]    = "ThinkPHP";
$data["password"]   = "123456";
$data["Profile"]    = array('email'=>'liu21st@gmail.com','nickname'=>'流年',);
$result = $User->relation(true)->add($data); //组合成正确的数组调用add方法即可写入
$result = $User->relation(true)->where('id=3')->save($data); //组合成正确的数组并指定where条件，使用save即可更新
$result = $User->relation(true)->delete("3"); //删除用户ID为3的记录的同时删除关联数据

//视图
//模版定义
视图目录/[模板主题/]控制器名/操作名+模板后缀
View/User/add.html
'DEFAULT_V_LAYER'=>'Template', // 设置默认的视图层名称，通过此设置可以将View改为Template
'VIEW_PATH'=>'./Theme/', //把视图目录指定到项目目录下的Theme目录下面，而不是放到当前模块的View目录下面。原来的./Application/Home/User/add.html变成了./Theme/User/add.html
//模版主题
'DEFAULT_THEME'=>'default' //设置模版主题为default，模版路径变成View/default/User/add.html
$this->theme('blue')->display('add'); // 在控制器中动态改变模板主题
//模板赋值
$this->assign(array('name'=>'tirion','email'=>'xxx')); //可以直接分配一个数组，模版中使用{name}{email}获取
//获取模板地址
T([资源:/ /][模块@][主题/][控制器/]操作,[视图分层]) //T函数的返回值是一个完整的模板文件名，可用于display和fetch方法进行渲染输出
T('Public/menu'); // 返回 当前模块/View/Public/menu.html
T('Public/menu','Tpl'); // 返回 当前模块/Tpl/Public/menu.html
$this->display(T('Admin@Public/menu')); // 使用T函数输出模板
//变量输出
Email：{$data->email} //如果data变量是一个对象，那么可以用这种方式输出
//使用函数
{:date('Y-m-d',$time)} //可以直接使用{:函数名()}来调用PHP函数，不必{$time|date="y-m-d",###}这么复杂
{$user['score']+myFun($user['level'])}  //可以使用+ - * /运算符
{$info['status']?$info['msg']:$info['error']} //模版支持三元运算符
//模版包含
<include file='模版表达式或者模版文件1,模版表达式或者模版文件2,...' />
<include file="Public/header" /> // 包含头部模版header；3.1是Public:header
<include file="./Application/Home/View/header.html" /> //完整路径
//错误调试
E($msg) //输出错误信息，并中止执行；原3.1版本中的halt方法已经废弃，请使用E函数代替；E()是抛出异常，告诉你发生错误的文件名，第几行，给程序员看的。$this->error()是给用户看的
echo $User->->_sql(); //输出上次执行的sql语句，同getLastSql()

//缓存
系统目前已经支持的缓存类型包括：Apachenote、Apc、Db、Eaccelerator、File、Memcache、Redis、Shmop、Sqlite、Wincache和Xcache
S(array('type'=>'xcache','prefix'=>'cache','expire'=>60)); //缓存初始化；没传参数则读取配置文件的参数
S(array( //有些缓存方式会有一些自身特殊的参数，例如Memcache缓存
    'type'=>'memcache',
    'host'=>'192.168.1.10',
    'port'=>'11211',
    'prefix'=>'think',
    'expire'=>60
    )
);
S('a',$value); // 设置缓存
S('a',$value,300); // 缓存数据300秒
S('a',$value,array('type'=>'file','expire'=>300)); // 采用文件方式缓存数据300秒
$value = S('a'); // 读取缓存
S('a',null); // 删除缓存
S(array('type'=>'xcache','length'=>100,'expire'=>60)); //缓存队列，设置了length参数后，系统只会缓存最近的100条缓存数据
F('data',$Data); //快速缓存Data数据；存储数据没有有效期的需求可使用
$Data = F('data'); //获取缓存数据
$Model->cache(true)->where('status=1')->select(); //对于及时性要求不高的数据查询，我们可以使用查询缓存功能来提高性能

//安全
开启令牌验证避免数据的重复提交； 
使用自动验证和自动完成机制进行初步过滤； 
使用系统提供的I函数获取用户输入数据； 
对不同的应用需求设置不同的安全过滤函数，常见的安全过滤函数包括stripslashes、htmlentities、htmlspecialchars和strip_tags等
I('post.id',0,'intval'); //使用I函数过滤
$this->data($data)->filter('strip_tags')->add(); //如果没有使用I函数过滤，还可以在写入操作之前调用filter方法对数据进行过滤
在处理表单提交的数据的时候，建议尽量采用Think\Model类提供的create方法首先进行数据创建，然后再写入数据库
namespace Home\Model;
class UserModel extends \Think\Model{ //使用create方法创建数据对象的时候，不在定义范围内的属性将直接丢弃，避免表单提交非法数据
    protected $insertFields = array('account','password','nickname','email');
    protected $updateFields = array('nickname','email'); 
}
M('User')->field('account,password,nickname,email')->create(); //create的时候使用field，作用和上面相同，更灵活
//防止SQL注入
查询条件尽量使用数组方式，这是更为安全的方式； 
如果不得已必须使用字符串查询条件，使用预处理机制； 
使用自动验证和自动完成机制进行针对应用的自定义过滤； 
如果环境允许，尽量使用PDO方式，并使用参数绑定。 
$Model->where("id=%d and username='%s' and xx='%f'",array($id,$username,$xx))->select(); //预处理写法
下面的一些安全建议也是非常重要的：
对所有公共的操作方法做必要的安全检查，防止用户通过URL直接调用； 
不要缓存需要用户认证的页面； 
对用户的上传文件，做必要的安全检查，例如上传路径和非法格式； 
如非必要，不要开启服务器的目录浏览权限； 
对于项目进行充分的测试，不要生成业务逻辑的安全隐患（这可能是最大的安全问题）； 
最后一点，做好服务器的安全防护； 

//扩展
namespace Org\Util; //在ThinkPHP/Library/Org/Util/目录下面添加一个Image.class.php
class Image {}
$image = new \Org\Util\Image; //在控制器中直接使用即可
namespace Common\Util; //Common\Util\Pay类（位于Application\Common\Util），也会自动加载
class Pay {}  //命名空间的路径和实际的文件路径对应的话 就可以实现直接实例化的时候自动加载
//模块部署
'MODULE_ALLOW_LIST'=>array('Home','Admin','User'); // 允许访问的模块列表
'DEFAULT_MODULE'=>'Home',  // 默认模块
这样在URL中访问http://serverName/New/index就会自动定位到Home/New/index，简化了Home路径







