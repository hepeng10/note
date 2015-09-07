<?php  //以<?php开头，可以不写结尾

//基础知识点
$$i="world"; //可变变量
$a=&$b; //&地址符，引用赋值
双引号("")解析里面的表达式，单引号('')不解析里面的表达式，转义字符(\)—>(\n,\r,\\,\$...)
(string)$a; //转换类型，包括(int),(float),(bool),(string),(array),(object)
intval($a); //获取变量的整型值，包括intval(),floatval(),strval()
floatval('3.23423元'); //将得到3.23423，后面的非浮点字符会自动过滤
is_string($a); //判断变量是否属于相应的类型，包括is_bool(),is_int(),is_float(),is_string(),is_array(),is_object(),is_resource(),is_null()...
var_dump($a); //输出传入参数的类型和值
define("ABC",10); //创建常量，只能是标量类型（int,float,bool,string）


//运算符
+, -, *, /, %, ++, --,. //算术运算符
=, +=, -=, *=, /=, %=, .= //赋值运算符
<, >, <=, >=, ==, ===, !=, !== //比较运算符
&&(and), ||(or), !(not), xor //逻辑运算符
&, |, ^, ~, <<, >> //位运算符
?:, @, =>, ->, instanceof //特殊运算符（三元运算，错误控制，数组下标指定，对象成员访问，类型运算符）


//流程控制
if(逻辑表达式){ //通常是一个范围取值
	表达式;
}else{
	表达式;
}

switch(逻辑表达式){ //通常等于一个值
	case '值':
		表达式;
		break;
	default:
		表达式;
}


//循环语句
$a=1;	 //while循环
while($a<10){	//通常用于循环条件会自动变换直至false的情况
	表达式;
	$a++;
}

$a=1;	 //do..while循环，不常用
do{
	表达式;
	$a++;
}while($a<10);

for($i=0; $i<10; $i++){	//for循环
	表达式；
}


//数组
$arr=array([key=>]value,[key=>]value...) //无key是索引数组，有key是关联数组

$arr=array(		//数组里面可以包含数组，形成多维数组
		[key=>]array([key=>]value,[key=>]value...),
		[key=>]array([key=>]value,[key=>]value...),
		...
		);

foreach ($arr as [$key=>]$value){ //foreach( as )循环遍历数组
	echo "$key的值是$value";
}

while(list($key,$value)=each($arr)){ //while,list,ech遍历数组
	echo "$key的值是$value";
}

$_SERVER(), $_ENV(), $_GET(), $_POST(), $_REQUEST(), $_FILES(), $_COOKIE(), $_SESSION(), $GLOBALS() //预定义数组

array_values($arr); //获取数组中所有元素的值，返回一个新的索引数组。可以用来把关联数组转换为索引数组
array_keys($arr,['PHP',true]); //获取数组的键名，返回一个新的索引数组。[只返回值是PHP的键名，并且类型要匹配]
in_array('PHP',$arr,[true]); //搜索一个数组中是否存在某个值，返回布尔类型。[类型必须一样]
array_search(12.5,$arr,[true]); //类似于in_array，返回值是搜索的值的键名
array_key_exists('name',$arr); //搜索数组中是否存在某个键名，返回布尔值
isset($arr['name']); //类似于array_key_exists，但是如果name的值是null，返回值依然是false，而name的确是有个值是null
array_flip($arr); //交换数组的键和值，返回一个新数组，如果交换后键名有重复（值可以有相同的，键名不行），只保留最后一个
array_reverse($arr); //将数组进行倒序排序后，返回一个新数组
count($arr,[1]); //返回数组的长度，即有多少个元素，sizeof()是别名。[1是检测多维数组，默认0]
current($arr);  //返回当前指针所指向的数组元素的值，并不移动指针
end($arr);  //将指针移到最后一个元素，并返回该元素的值
array_count_values($arr); //统计数组中所有值出现的次数，返回一个新数组
array_unique($arr); //删除数组中重复的值，返回一个新数组
array_filter($arr,'func'); //将$arr的每个元素传入func函数中，使用回调函数过滤数组中的元素(true的返回)，返回一个新数组
array_walk($arr,'func',['字符串']); //将$arr的值和键依次传入func函数中操作，所以func函数必须接收2个参数。[有第3个参数传入时，func也必须接收3个]
array_map('func',$arr,[$arr1,$arr2..]); //函数func接收数组的值进行操作，有多少个数组则有多少个形参，每个数组的元素个数应该相同，短的会用空值补上，返回新数组
$json=array_map('urlencode',$json);  //将$json数组中每个元素使用urlencode()进行编码
sort($arr); rsort($arr); //根据数组的值进行排序，排序后忽略键名，重新索引
ksort($arr); krsort($arr); //根据键名进行排序
asort($arr); arsort($arr); //根据数组的值进行排序，保留键名
natsort($arr); natcasesort($arr); //根据值进行自然排序，natsort()大写在前，natcasesort()忽略大小写
usort($arr,'func'); uksort(); uasort(); //自定义排序，func函数需要接收两个参数(相邻的两个键值)，并且自定义方法比较这两个参数返回-1,0,1中的一个
array_multisort($arr1,[$arr2,$arr3...]); //对多个数组或多维数组进行排序，先对第一个数组的值排序，当第一个数组排序后其中有相同的值，则会使用第二个数组对这几个位置进行排序，依此类推，若没有相同值则排序结束，后面的数组将继承前面的排序（前面排序的时候，后面的数组也会按照对应的位置排序）
array_slice($arr,1,[3,true]); //从数组$arr的第2个参数开始取，取出3个，保留键名，取出的元素形成一个新数组返回。[第二个和第三个参数可以为负数，倒数第几个开始，往前取几个；第四个参数默认false，新数组重新索引，但对关联数组无效，都会保留键名]
array_splice($arr,1[3,$arr1]); //类似array_slice()，但是是删除$arr中的元素，并用$arr1（可以是数组也可以是个字符串）中的元素代替。[第三个参数为负数时，表示至倒数第几个]
array_combine($arr1,$arr2); //将$arr1的值作为键名，$arr2的值作为键值，合并成一个新数组返回，如果两个数组长度不同则返回false
array_merge($arr1,[$arr2,$arr3...]); //合并多个数组，键名相同的则只保留最后一个，返回一个新数组
array_intersect($arr1,$arr2[,$arr3...]); //返回一个新数组，新数组中的元素是每个数组中都有的元素，下标为第一个数组的下标
array_diff($arr1,$arr2[,$arr3...]); //返回一个新数组，新数组中的元素是第一个数组中存在而后面的数组中都不存在的元素，下标为第一个数组的下标
array_push($arr,$a[,$b,$c...]); //向数组尾部添加一个或多个元素，也可以使用$arr[]=$a;添加，返回新数组的长度——入栈
array_pop($arr); //将数组的最后一个元素删除，返回删除元素的值——出栈
array_shift($arr); //将数组的第一个元素删除，返回删除元素的值
array_unshift($arr,$a[,$b,$c...]); //在数组的开头插入一个或多个元素($a始终是第一个元素)，返回新数组的长度
array_rand($arr,[3]); //随机从数组$arr中选出3个元素的键名并返回，成为一个新数组，当只随机取一个的时候则只返回一个键名
shuffle($arr); //将数组中的元素随机重新排列，返回布尔值
array_sum($arr); //返回数组中所有元素的值的和
range(0,15,[3]); //创建一个数组，其中的元素为0到15步进为3（0，3，6，9，12，15）
unset($arr[key]); //删除数组中的一个元素，不会重建索引

$arr1+$arr2; //将$arr2的元素直接插入到$arr1后面，如果有键名相同的，则保留$arr1的（array_merge函数是保留最后一个），索引数组则递增，返回一个新数组
$arr1==$arr2; //两个数组的键和值都相等，则返回true，与位置无关 [$a=array('a'=>'php','mysql');$b=array('mysql','a'=>'php'); 为true]
$arr1===$arr2; //键和值和类型都相等为true
$arr1!=$arr2; //不等为true
$arr1!==$arr2; //类型不等也为true


//函数：具有一个功能的代码集合，可以在创建函数之前和之后都能调用
function abc([$a,$b...]){ //形参可以给默认值，有默认值的参数在调用函数的时候可以不传入参数需放在最后面，有引用符&的参数必须传入变量而不能传值
	函数体;
	$c=$a+$b; //函数内部的变量只在函数内有效
	$GLOBALS["a"]=$GLOBALS["b"]+$GLOBALS["c"]; //使用$GLOBALS["变量名"]后使用的变量是全局变量
	static $i=0; //静态变量，在函数再次执行时，静态变量将接着上次的结果继续运算，不会再次初始化；当一个变量需要所有对象共享的时候使用静态变量
	abc($n); //递归函数，函数内部调用自身
	func_get_arg($i); //在函数内部使用，接收一个数字作为参数，返回这个数字对应的传入函数的相应位置参数的值（如：2既是返回$b的值，$b是第2个传入的参数）
	func_get_args(); //在函数内部使用，自动获取传给函数的参数，返回这些参数组成的数组
	func_num_args(); //在函数内部使用，自动获取传给函数的参数个数，返回传入了多少个参数
	return 返回值; //return语句后面如果还有函数体不会再执行
}

abc([$a,$b...]); //调用函数

$fun([$i...]); //变量函数，变量后加括号，将会调用这个变量的值相同的函数
call_user_func_array('fun',array('a','b')); //回调函数，将array()中的参数依次传递给fun函数


//类与对象
class Person{
	public $name;	//公有属性，可外部调用；属性必须指定访问修饰符，方法没指定访问修饰符的话默认为public
	private $sex; //私有属性，只允许内部调用；成员属性应该尽量使用私有，再用公有方法来控制
	protected $age; //受保护的属性，自身和子类调用

	function __construct(参数列表){ //构造方法，创建对象时自动调用；子类默认不继承构造方法，可以使用parent::__construct()来继承构造方法
		方法体
	}

	function __destruct(){ //析构方法，对象销毁时自动调用
		方法体
	}
	
	private function __set($name,$value){ //当外部给私有成员属性赋值时自动调用，可用来控制赋值的条件等；下面的这些也叫魔术方法
		$this->name=$value;
	}

	private function __get($name){ //当外部获取私有成员属性时自动调用，可用来控制获取的条件等
		return $this->name;
	}

	private function __isset($name){ //当外部isset()私有成员属性时调用，可用来控制是否让其获取等
		return isset($this->name);
	}

	private function __unset($name){ //当外部unset()私有成员属性时调用，可用来控制是否让其销毁等
		unset($this->name);
	}

	function __clone(){ //当外部使用clone关键字来克隆这个类所实例化的对象时自动调用，用次方法对克隆后的对象进行一些修改
		$this->age=10; //克隆后的对象age就是10，而自身对象可能不是10
	}

	function __tostring(){ //当外部直接echo这个类所创建的对象时自动调用
		echo '这是一个关于人类的对象';
	}

	function __call($func,$arr){ //当外部调用不存在的方法时自动调用，第一个参数是方法名，第二个参数是传入这个方法的实参构成的数组；可以通过此方法实现类似JAVA的重载
		echo '你调用的方法'.$func.'不存在';
	}

	function __sleep(){ //对象串行化时自动调用，用来指定哪些能被串行化
		$arr=array('name','age'); //只有name和age被串行化，sex则没有了
		return $arr;
	}

	function __wakeup(){ //对象反串行化时自动调用，用来进行一些修改
		$this->age=40; //反串行化后age变成了40
	}

	public function say(){ //自定义成员方法
		$this->name;  //通过$this->访问内部成员属性和方法
	}

	final function look(){ //final成员方法不能在子类中重载（覆盖），final类不能被继承；final可以用在类和成员方法，不能用在成员属性
		方法体
	}
}

//子类继承父类：可以解决代码重用的问题
class Student extends Person{ //使用extends继承父类，只能继承一个父类。可以通过子类直接访问父类中的public和protected修饰的成员属性和方法
	private $school;	//并且可以在子类中添加更多的成员属性和方法
	static $d; //静态成员属性或方法，内部使用'self::成员'直接调用，外部可使用'类名::成员'直接调用，没创建对象时也能访问
	const LOVE='secrit'; //使用const在类中创建常量，访问方法和静态变量一样'self::常量名'和'类名::常量名'；常量前面不能带修饰符

	public function learn(){
		self::$d++; //使用'self::静态成员属性名'访问静态成员属性
	}

	public function say(){ //子类可以重载父类的方法，对父类的方法进行扩展等；重载父类方法的时候，方法名和需要传递的参数必须和父类方法一模一样
		parent::say(); //重载时使用'parent::方法名'将父类的方法体调入进来，这样就不用复制父类中的方法体了
		方法体  //父类对方法进行扩展
	}

	static function play(){ //创建静态成员方法；静态方法内的成员属性也必须是静态的
		方法体
	}
}

Person::play(); //外部通过'类名::方法名'直接访问静态成员方法
echo Person::LOVE; //通过'类名::常量名'访问常量
$p=new Person([$a,$b...]); //通过new关键字创建对象
Person $p; //通过“类名 对象名”的写法也可以直接创建对象，这种方法是在堆上，new 类名是在栈上
if($p instanceof Person) //使用instanceof关键字来判断一个对象是否是通过这个类创建的
$p->a;  //访问成员属性
$p->say();  //访问成员方法
$p2=clone $p1; //克隆对象
echo $p; //自动调用__tostring()方法，如果没有这个方法则会出错
$per=serialize($p); //对象串行化，把对象转换成二进制字符串
$person=unserialize($per); //反串行化，把二进制字符串转换成对象

//抽象类和抽象方法
abstract class Person{ //abstract修饰的抽象类，只要有一个方法是抽象方法，这个类就必须是抽象类，抽象类是必须被继承的，不能有private成员。可以看作是定义一种规范，要求子类必须创建哪些方法。抽象类不能被实例化为对象
	protected $name;
	abstract function say(); //abstract修饰的抽象方法，抽象方法没有花括号，直接以分号结尾。抽象方法在子类中必须被重载，否则子类依然包含抽象方法，不能实例化对象
	function run(){ //抽象类中可以有非抽象方法
		方法体
	}
}

//接口
interface iOne{ //使用interface修饰，接口中的成员属性只能是常量，方法只能是抽象方法。接口是一种更严格的规范；命名一般以i开头，表示是个接口
	const CONS="value"; //接口中的属性必须是常量
	function say(); //因为接口中的方法必须是抽象方法，所以可以不用abstract修饰
}

interface iTwo extends iOne{ //使用extends关键字，用接口继承接口，实现接口之间的扩展
	function walk($name); //接口里的方法可以定义是否需要传参，实现的时候必须按照定义的传参，即没定义要传参就不能传参，定义了几个参数就必须传几个
}

class Three implements iTwo{ //类实现接口使用关键字implements，也可以用抽象类去实现接口，抽象类实现接口的时候可以不实现所有方法
	... //必须实现接口的所有方法
}

class Four extends Three implements iOne,iTwo{ //子类可以继承一个父类的同时实现一个或多个接口
	... //必须实现所有接口的所有方法
}

接口继承接口，类继承类，类实现接口

//自动加载类
function __autoload($className){ //当写程序时使用到一个未加载的类，便会调用此方法
	include(strtolower($className).'.class.php'); //通过此方法自动加载需要的类
}

$obj=new User(); //直接创建对象，会自动将同一个文件夹的user.class.php加载进来

//字符串处理
$str{1}; //可以把字符串看作数组，通过此方法取出第二个字符，也可以使用$str[1]
strlen($str); //返回字符串的长度
printf("%s book.page number %u",["LAMP","789",...]); //格式化字符串，将后面的字符串依次插入第一个字符串的%处，并转换成相应的格式。直接输出新字符串
$txt=sprintf("%f",$num); //把字符串$num转化成浮点数返回
ltrim($str); trim($str,"0..9"); rtrim($str,"/"); //去除字符串左边、两边、右边的空白字符或自定义字符，默认为空白
str_pad($str,10,["*",STR_PAD_BOTH]); //对字符串$str进行填充，填充至10个长度，用*填充（默认为空格），填充两边（默认为右边）
strtoupper($str); strtolower($str); //将字符串转为大写、小写
ucfirst($str); //将整个字符串的首字母转换为大写
ucwords($str); //将空格分隔的每个单词的首字母转换为大写
nl2br("On line.\nAnother line"); //在字符串\n之前插入<br/>标记，不是把\n转换成<br/>
htmlspecialchars($str,[ENT_COMPAT]); //将特殊字符转换成HTML实体，[并转换双引号（单引号，两种引号可选）]，如将<转换为&lt;
htmlentities($str,[ENT_QUOTES,gb2312]); //将所有非ASCⅡ码字符转换为对应的实体代码，[转换两种引号，字符集通常不填]
stripslashes($str); //表单文本框中提交的字符串，其中"'",'"',"\"等字符前会自动加上一个反斜线"\"，则要使用此函数将"\"去掉
htmlspecialchars(stripslashes($_GET['str'])); //通常联合使用，把文本框中提交的字符串中的HTML标记原样输出，防止文本框中的HTML标记对页面造成破坏（如<b>abc</b>不用此函数进行转换会输出加粗的abc，转换后原样输出<b>abc</b>）
addslashes($str); //在"'",'"',"\"等字符前添加反斜线"\"
strip_tags($str,["<i><b>"]); //删除字符串中的HTML标签，默认为所有，[定义保留哪些标签]
strrev($str); //反转字符串，如abcd转换为dcba
number_format($num,[2,",","."]); //使用千位分组来格式化数字，如123456789格式化为123.456.789,00[保留两位小数，","作为小数点（默认是"."），"."作为千位分隔符（默认是","）]；可以用来将整数转换为浮点数：如1000转换为1000.00
md5($str); //将字符串进行MD5算法加密，返回一个32位的十六进制字符串
strcmp($str1,$str2); strcasecmp($str1,$str2); //将两个字符串从首字母开始按ASCⅡ码进行比较，大于返回1，等于返回0，小于返回-1。后一个忽略大小写
strnatcmp($str1,$str2); strnatcasecmp($str1,$str2); //将两个字符串按照自然排序进行比较，返回1,0,-1。后一个忽略大小写
iconv('GB2312','UTF-8',$str); //字符编码转换，将GB2312转换为UTF-8
substr(str_shuffle('0123456789'), 0, 4);  //生成一个4位的随机数；原理随机排序，取出4位


//正则表达式
/regex/ //正则表达式需要写在定界符/.../中
\n,\r,\t,\v,\f //非打印字符，分别匹配换行、回车、制表符、垂直制表符、换页符
\d,\D,\s,\S,\w,\W //通用字符类型，分别匹配[0-9],[^0-9],[\f\n\r\t\v],[^\f\n\r\t\v],[0-9a-zA-Z],[^0-9a-zA-Z]

//元字符
[ajp][0-9a-f] //自定义原子表，从里面仅选出一个原子进行匹配 -> "a4b"
[^a,c,e] //匹配除了方括号内原子以外的任意一个字符 -> "g"
* //匹配0次，1次或多次其前面的原子 /(abc)*/ -> ""或"abc"或"abcabcabc..."
+ //匹配1次或多次其前面的原子 /(abc)+/ -> "abc"或"abcabcabc..."
? //匹配0次或1次其前面的原子 /(abc)?/ -> ""或"abc"
. //匹配除换行符外的任意一个字符 /.*?/ -> 除换行符外的任意多个字符
| //表示或 /(abc)|(def)/ -> abc或def
{n}  //表示其前面的原子恰好出现n次 /ab{3}c/ -> "abbbc"
{n,} //表示其前面的原子出现不少于n次 /ab{3}c/ -> "abbbbbbb...c"
{n,m} //表示其前面的原子出现在n-m次之内 /ab{3-6}c/ -> "abbbc"或"abbbbc"或"abbbbbc"或"abbbbbbc"
^或\A //匹配以此字符串开始的 /^this/ -> "this is a test"
$或\Z //匹配以此字符串结束的 /over$/ -> "oh,game over"
\b //匹配单词的边界 /\bis\b/ -> "he is a boy"（is两边必须是边界）
\B //匹配单词的非边界 /\Bis\b/ -> "this that them"（左边必须非边界，右边必须边界）
() //将多个原子组成一个大原子，或控制优先级，或子模式 /abcd(efg){2}h/ -> "abcdefgefgh"
() //子模式 /^\d{4}(\W)\d{2}\\1\d{2}$/ 其中\1引用第一个子模式，\1位置的字符必须和子模式\W的字符相同，如2012-12-06，不能匹配2012-12/06

//模式修正符
i //在和正则表达式匹配时不区分大小写 /abc/i -> /AbC/
m //将含有回车的字符串视为多行，主要用于元字符"^"和"$"的应用 /this\n^that\nthem/m -> "that is a pig" 以that开头的都能匹配
s //模式中的元字符"."可匹配包含换行符的所有字符 /h.m/s -> "h\nm"
x //模式中的空白忽略不计 /web server/x -> "webserver" 不能匹配"web server"
e //只用在替换函数preg_replace中，模式中的子模式能调到preg_replace的第二个参数中
u //取消贪婪模式，和Perl不兼容，可在模式中使用?来代替此修正符

//正则表达式函数
preg_match("/^(http:\/\/)?([^\/]+)/i","http://www.5idev.com/index.html");
preg_match($pattern,$str,[$arr]); //正则匹配一次，将用正则$pattern匹配$str中的内容，成功返回1，失败返回0。[将模式整体和子模式依次传入形成一个数组]
preg_match_all($pattern,$str,$arr,[PREG_SET_ORDER]); //匹配$str中的所有能匹配上的内容，将模式和子模式传入$arr形成一个二维数组，[选择二维数组的排序方式，默认为所有的主模式为第一个二维数组，第一个子模式为第二个二维数组，依此类推；这个为第一个匹配到的主模式和子模式为第一个二维数组，第二个匹配到的为第二个二维数组，依此类推]
preg_grep($pattern,$arr); //匹配数组$arr中的每个元素，返回匹配上的元素组成的新数组，键名不变
strstr("this is a test","is"); //对字符串进行一次匹配，返回匹配到的位置开始到字符串末尾部分（返回is is a test）
strpos("this is a test","is"); //返回查找的字符串第一次出现的位置（2），stripos()不区分大小写
strrpos("this is a test","is"); //返回查找的字符串最后一次出现的位置（5），strripos()不区分大小写
substr("abcdefghijk",2[,5]); //字符串从第3个开始取，取出5个返回（cdefg）；2和5都可以为负数，则是从负几个开始取，取到第负几个
mb_substr('中文字符串',0,30); //在对中文字符进行截取的时候，可能会从一个中文字符的中间切开，导致此中文字符乱码，则可使用此函数来截取，需要在php.ini中把php_mbstring.dll打开
preg_replace($pattern,$str,$text,[2]); //在字符串$text中匹配正则$pattern的内容，用$str进行替换。当正则使用了模式修正符e，则$str可用\1、\2、\3（前面需要加\转意\，否则意思是1、2、3）等，将匹配到的文本中的子模式内容引用到对应的\1、\2、\3...中，进行保持原文部分内容的一些操作，[数字表示只替换多少个匹配]。另外，前3个参数都可以是数组，将模式数组中的每个正则对$text数组(也可以只是字符串)进行搜索匹配，将匹配上的内容替换成$str数组中对应位置的内容（$pattern[3]->$str[3]），$str不是数组则匹配内容全部替换成这个字符串
str_replace($search,$replace,$str,[3]); //在字符串$str中用$search进行搜索，将匹配上的结果替换为$replace，[只替换几个]。前两个参数也可以是数组，将每个匹配到的内容对应替换成相应的内容。str_ireplace()不区分大小写
preg_split($pattern,$str,[3,PREG_SPLIT_NO_EMPTY]); //对字符串$str用$pattern进行分割，将分割后的每个字符串组成一个新数组返回，[最多返回n个字符串（最后一个字符串包含$str剩余的所有部分，-1没有限制，默认）；表示只返回非空的成分]
explode($sep,$str,[3]); //对字符串$str用$sep分割，返回一个数组，[最多将字符串分割为多少个子串]
implode($glue,$arr); //将数组$arr中的元素用$glue连接，返回一个新字符串
$content[0]=3; //可以使用此方法来将某一个字符替换为另一个字符；这里是将第一个字符替换为3


//日期和时间
UNIX时间戳 //32位的整数，从1970-1-1开始以秒数计算，可以为负数（Windows下不能），由于只有32位，所以在1902-2038（Windows：1970-2038）年之外的时间会出现一些问题
date("Y-m-d H:i:s",[UNIX]); //格式化日期时间，将UNIX时间戳以自定义方式格式化后返回。[传入一个UNIX时间戳，空为当前时间。可以将下面的一些日期函数作为这个参数来完成一些组合功能]
mktime([23,50,50,12,30,2012]); //将日期时间转换为UNIX时间戳，[时分秒月日年的顺序，空就是当前时间]
strtotime("now"); //将英语的一些自然语言转换为UNIX时间戳
time(); //获取当前时间的UNIX时间戳
getdate([UNIX]); //将UNIX时间戳转化为一个关联数组，数组下标包括year,mon,mday,hours,minutes,seconds,wday,yday,weekday,month,0
microtime([true]); //返回当前UNIX时间戳和微妙数，[true表示微妙数以小数形式加到UNIX时间戳后面，空为'微妙数 UNIX时间戳'的格式]
date_default_timezone_set('PRC');  //设置时区，PRC是天朝；也可以在php.ini中设置，参数date.timezone=Asia/Beijing


//文件系统处理
文件类型：Windows,Unix共有（dir,file,unknown）;Unix独有（block,char,fifo,link)
filetype($path); //获取类型，如果不存在，返回false
is_file($path); is_dir($path); //判断是否是文件，目录
clearstatcache(); //清除文件状态缓存，当程序中对一个文件多次调用，而这个文件又可能被删除或修改时，需要使用此函数来清除缓存
stat($path); //获取文件的信息，返回一个数组
basename($path,[".jpg"]); //返回路径里的文件名部分（含扩展名：girl.jpg），[如果路径里的文件名是这个扩展名，则输出不包含扩展名的文件名：girl]
dirname($path); //返回去掉文件名的目录名字符串，如"/bbs/image"
pathinfo($path); //返回一个关联数组，下标：dirname(目录名)，basename(文件名含扩展名)，extension(扩展名)
$dir_handle=opendir($path); //打开目录，返回一个目录资源句柄供其它目录函数使用
readdir($dir_handle); //接受目录资源句柄，读取这个目录内的目录和文件，一次只读取一个，每读取一次目录指针后移一位（再次执行读取下一个），读取完后再读取返回false（注意：头两个是目录"."和".."）
closedir($dir_handle); //关闭目录资源，资源使用完后都应当关闭
rewinddir($dir_handle); //将目录指针重置到开始处
mkdir($dir); //新建一个目录
unlink($file);  //删除一个文件
rmdir($dir); //删除一个空目录
filesize($file); //计算文件的大小
copy($srcFile,$toFile);  //复制文件，从$srcFile复制到$tofile
rename($file1,$file2); //将$file1文件重命名为$file2，路径需相同
$handle=fopen($file,"w+b"); //打开文件，返回一个文件资源句柄；第二个参数规定以什么方式打开：r,r+,w,w+,a,a+,x,x+,b（b是二进制模式打开，加上有利于跨平台）
fclose($handle); //关闭文件资源
fwrite($handle,$str,[100]); //将字符串$str写入$handle中，[最多写入100个字符]。写入时使用\n表示换行符。fputs()是别名
file_put_contents($file,$str); //将$str直接写入到$file中，$file中的内容将清空。此函数不需要资源句柄，直接使用即可
feof($handle); //判断文件指针是否在末尾，在返回true，不在返回false
fread($handle,100); //从$handle中读取最多100个字符串，返回读取到的字符串
file_get_contents($file,[null,null,10,100]); //直接读取文件内容，[前两个参数一般为null，从第10个位置开始，读取100个字符]
file($file); //直接读取文件内容，每行作为一个元素组成一个数组返回，除了最后一行，每行末尾都有两个空字符（换行\r\n），所以每个元素的长度为字符串长度+2
readfile($file); //直接读取文件内容，返回文件内的字节数直接输出到浏览器，不需要echo
fgets($handle,[100]); //读取一行内容，[最多读取100-1个字节，默认为1024个字节]
fgetc($handle); //读取当前指针位置处的一个字符
ftell($handle); //返回文件指针的当前位置
fseek($handle,20,[SEEK_CUR]); //移动指针，[当前位置加上20个字节；缺省值是从文件开头往后移动20个；SEEK_END，从末尾移动，-20，必须为负数]
rewind($handle); //将文件指针重置到开始处
ftruncate($handle,1024) //从文件开始处，截取1024个字节长度，后面的删除，返回布尔值
flock($handle,LOCK_SH[+LOCK_NB],[1]); //文件锁定，LOCK_SH 共享锁定（读取数据时用），LOCK_EX 独占锁定（写入数据时用），LOCK_UN 释放锁定（共享独占后都要释放），LOCK_NB 附加锁定（防止锁定堵塞：已被锁定的文件，再次锁定时会被挂起，叫锁定堵塞），[1则当进行锁定时会阻挡其它进程]
glob($pattern); //搜索与模式匹配的文件，并将搜索到的文件名或目录以数组形式返回


//文件的上传
<form action="upload.php"(向这个php文件发送表单数据) method="post"(必须为post) enctype="multipart/form-data"(让服务器知道是要传递文件)>
	<input type="hidden" name="MAX_FILE_SIZE" value="1000000">(用来限制上传文件大小，这里是1M)
	选择文件：<input type="file"(文件上传类型) name="myfile"(通过$_FILES['myfile']访问)>(上传多个文件，则name="myfile[]"，形成一个索引数组)
	<input type="submit"(提交类型) value="上传文件"(按钮里显示的字符)>
</form>
$_FILES["myfile"] //超全局多维数组，用来存放与上传文件相关的信息
$_FILES["myfile"]["name"](上传文件的原名称，包含扩展名) $_FILES["myfile"]["size"](已上传文件的大小，字节) $_FILES["myfile"]["tmp_name"](上传后的临时文件名) $_FILES["myfile"]["error"](上传时产生的错误信息，0，1，2，3，4) $_FILES["myfile"]["type"](获取上传文件的MIME类型，如：image/gif)
$_FILES["myfile"]["name"][0] //上传多个文件，通过三维数组的方式访问各个文件的信息，[0](第一个上传文件),[1](第二个),[2](第三个)...
is_uploaded_file($file); //判断文件是否通过POST方式上传，是则返回true。（$file的路径需要是服务器端的才能正常运作，如：$_FILES["myfile"]["tmp_name"]）
move_uploaded_file($file,$tofile); //将上传的文件(存储于临时目录)移动到新位置，如果新位置存在此文件，则会覆盖。此函数附带检查是否POST方式上传的功能
//文件的下载
<a href="http://www.lamp.com/download/book.rar">下载文件</a> //简单的文件下载只需要将URL指定为下载的文件即可，只能处理浏览器不能识别的MIME类型
$file="image/girl.gif"; //图片等浏览器能识别的MIME类型的下载，如果使用直接链接的方式会直接输出到浏览器，而不会提示下载，所以需要向浏览器发送头信息
header('Content-Type:image/gif'); //发送下载文件的MIME类型的头信息
header('Content-Disposition:attachment;filename="'.basename($file).'"'); //文件描述：是一个附件；并指定下载后的文件名
header('Content-Length:'.filesize($file)); //指定下载文件的大小，单位字节
$file=iconv('utf-8','gb2313',$file); //如果下载的文件$file是中文名，则需要使用iconv()将编码转换为gb2312才能下载
注：可使用Kindeditor的组件

//动态图像处理
$handle=imagecreate($xsize,$ysize); imagecreatetruecolor(500,400); //创建画布，返回一个图像资源。前一个只支持256色；后一个是真彩色，但不能用于GIF
imagedestroy($handle); //销毁画布资源
imagesx($handle); imagesy($handle); //获取图像的长和宽
$color=imagecolorallocate($handle,255,0,255); //设置颜色，返回一个颜色标识符。若是使用imagecreate()创建的画布，则第一次调用会给画布填充背景色，默认黑色
imagegif($handle,[$file]); imagejpeg($handle,[$file],[80]); imagepng($handle,[$file]); imagewbmp($handle,[$file]); //输出图像到浏览器，输出前还需要使用header("content-type:image/gif")向浏览器发送信息，[使用了第二个参数，则不输出图像，而是保存到服务器上指定的文件，也不需要使用header()]，[JPG画质，默认75]
imagefill($handle,$x,$x,$color); //从坐标$x,$y(左上角为0,0)处，将相邻且颜色相同的点用$color进行填充
imagesetpixel($handle,$x,$y,$color); //在$x,$y处用$color绘制一个像素点
imageline($handle,$x1,$y1,$x2,$y2,$color); //从x1,y1到x2,y2画一条线段
imagerectangle($handle,$x1,$y1,$x2,$y2,$color); imagefilledrectangle($handle,$x1,$y1,$x2,$y2,$color); //通过两个对角坐标点绘制一个矩形，前者只有边框颜色，后者是整个矩形填充颜色
imagepolygon($handle,$arr,$num,$color); imagefilledpolygon($handle,$arr,$num,$color); //绘制多边形，$arr内的参数是各个顶点的坐标(x0,y0,x1,y1...)；$num是顶点数
imageellipse($handle,$x,$y,$w,$h,$color); ...filed...; //绘制椭圆，$x,$y为圆心，$w,$h为椭圆的宽和高
imagearc($handle,$x,$y,$w,$h,$s,$e,$color); //绘制椭圆弧线，$x,$y为弧心，$w,$h为弧线的宽和高，$s,$e为起点和终点的角度
imagestring($handle,5,$x,$y,$str,$color); imagestringup($handle,5,$x,$y,$str,$color); //以$x,$y为起点，水平(左-右)，垂直(下-上)绘制字符$str，大小为5(1-5可选)
imagechar($handle,5,$x,$y,$char,$color); imagecharup($handle,5,$x,$y,$char,$color); //水平，垂直绘制一个字符$char
//图片处理
$handle=imagecreatefromjpeg($file); imagecreatefrompng($file); imagecreatefromgif($file); //用图片直接创建画布资源
getimagesize($file); //获取图片信息，返回一个索引数组：[0]宽度，[1]高度，[2]类型(值为1、2、3、4，1=gif,2=jpg,3=png,4=swf)，[3]字符串(内容为：height="200",width="300";可直接用于HTML的img标记)
imagecopyresampled($tohandle,$handle,$tox,$toy,$x,$y,$tow,$toh,$w,$h); //图片缩放、裁剪， 将图像$handle内以$x、$y为原点，$w、$h为宽高的图像，复制到$tohandle内，以$tox、$toy为原点，$tow、$toh为宽高，实现裁剪或缩放(0,0为原点，图像的宽高为宽高)的效果，返回布尔值
imagecopy($tohandle,$handle,$tox,$toy,$x,$y,$w,$h); //给图片添加水印。将图像$handle内以$x、$y为原点，$w、$h为宽高的图像，复制到$tohandle内，以$tox、$toy为原点
imagecopymerge($tohandle,$handle,$tox,$toy,$x,$y,$w,$h,$int); //imagecopy()的加强型，可以通过$int实现水印透明度，0为全透明，100为不透明
imagerotate($handle,$angle,$bgcolor,[$int]); //将图像以$angle(0-360)的角度旋转(旋转后会自动缩放保证在原画布内)，$bgcolor(0-n，原理不详、、)为旋转后没有覆盖到的部分的颜色，[$int为非零值则透明色会不忽略，默认保留]

//命名空间
虽然任意合法的PHP代码都可以包含在命名空间中，但只有三种类型的代码受命名空间的影响，它们是：类，函数和常量
名称术语：
1.非限定名称，或不包含前缀的类名称，例如 $comment = new Comment();如果当前命名空间是Blog\Article，Comment将被解析为Blog\Article\Comment，如果使用Comment的代码不包含在任何命名空间中的代码（全局空间中），则Comment会被解析为Comment
2.限定名称，或包含前缀的名称，例如 $comment = new Article\Comment();如果当前的命名空间是Blog，则Comment会被解析为Blog\Article\Comment，如果使用Comment的代码不包含在任何命名空间中的代码（全局空间中），则Comment会被解析为Comment
3.完全限定名称，或包含了全局前缀操作符的名称，例如 $comment = new \Article\Comment();在这种情况下，Comment总是被解析为代码中的文字名(literal name)Article\Comment
*其实可以把这三种名称类比为文件名（例如 comment.php）、相对路径名（例如 ./article/comment.php）、绝对路径名（例如 /blog/article/comment.php），这样可能会更容易理解
namespace MyProject; //命名空间通过关键字namespace 来声明，第一个命名空间必须是程序脚本的第一条语句
namespace AnotherProject; //同一个文件中可以有多个命名空间，每个命名空间下面的代码属于这个命名空间；非常不提倡在一个文件中定义多个命名空间！
namespace MyProject\Sub\Level; //定义子命名空间
__NAMESPACE__ //常量__NAMESPACE__的值是包含当前命名空间名称的字符串，$comment=__NAMESPACE__.'\Comment';在全局的，不包括在任何命名空间中的代码，它包含一个空的字符串
namespace //关键字，表示当前空间；$comment=new namespace\Comment();使用namespace可以直接调用当前空间的类、方法，而__NAMESPACE__只是字符串，必须赋值给变量再通过变量调用
$article_comment = new \Article\Comment(); //在不同空间之间不可以直接调用其它元素，需要使用命名空间的语法
$common = new \Common(); //未定义命名空间的文件里的自定义类、函数、常量都属于公共空间；调用公共空间的方式是直接在元素名称前加\就可以了，否则PHP解析器会认为我想调用当前空间下的元素。除了自定义的元素，还包括PHP自带的元素，都属于公共空间。
use Blog\Article; //使用use导入命名空间
use Blog\Article as Arte; //使用as为导入的命名空间定义别名
$article_comment = new Article\Comment(); //导入命名空间后可使用限定名称调用元素
$article_comment = new Arte\Comment(); //使用别名代替空间名
use Blog\Article\Comment; //可以使用use直接导入一个元素；Article里的Comment类；和命名空间一样，可以使用as定义别名
$article_comment = new Comment(); //导入类后可使用非限定名称调用元素，就不用再写空间名了；注意在导入元素的时候，当前空间不能有相同元素，即Comment类，可以通过别名解决


//MySQL数据库；数据库的本质是文件，是通过文件来保存数据
/*在使用之前应该先修改字符编码，转换为utf8；在mysql的配置文件中修改：
[mysql]
default-character-set=utf8
[mysqld]
character-set-server=utf8
控制器中可以使用：show variables like "%char%";来查询数据库使用的字符编码*/
creat database [if not exists] bookstore; //creat database-创建数据库
creat table [if not exists] books( //create table-创建数据表，创建数据表时需要给出至少一个字段(又叫数据列、表头)，并且必须有字段类型
	id int not null auto_increment, //拥有自增长属性的字段
	bookname varchar(50) not null default '', //普通字段最好设置为not null，并给个默认值
	price double not null default 0.00,
	info text,
	primary key(id), //将id设置为主键
	index book_bookname(bookname), //给表头bookname设置索引
	fulltext (info)
)engine=myisam default character set utf8 collate utf8_general_ci; //设置表引擎，字符集和校对规则
alter table books change info contents char; //alter...change...-修改表结构，将intro改为contents并设置为char类型
alter table 表名 action;  //修改表结构，action为add(添加，在末尾还可以使用'first'或'after 字段名'指定位置)，change(修改表字段，如上所示结构)，rename as(直接跟一个新表名来重命名表名)
insert into books(bookname,author,price) values('细说PHP','高洛峰','89.00'); //insert into-插入数据到数据表中
select id, bookname, price from books; //select...from...-从数据表中搜索数据
update books set price=79 where id='1'; //update...set...where...-从数据表中修改数据
delete from books where id='1'; //delete from...where...-从数据表中删除数据
drop table [if exists] books; //drop...-删除表或数据库
//字段属性
unsigned //设置数值类型不包含负数，可使字段存储长度增加一倍
zerofill //当插入的数值位数不足设置的位数时，在前面用0填充至设置的位数
auto_increment //设置字段为自动增量属性，每插入一个数据，自动+1；不允许有重复的数值，可插入自定义数值，自增将从最大数值+1
null & not null //插入数据时，此字段是否可以不插入数据；默认为null，没插入数据将自动给值'null'；not null表示必须插入数据。由于null值在数据类型转换时可能转换为null,0,false等多种值，所以通常设置为not null，并给一个default值
default //给字段指定一个默认值，如果插入数据时没有在此列添加值，则默认添加此值
primary key //创建主键索引；不允许有重复的值，一个数据表只能有一个主键索引，最好每个数据表都有一个
unique //唯一索引；不允许有重复的值，可以有多个
index //常规索引；用在搜索、排序、分组等操作的数据列上提高效率，但是过多也会影响性能，适可而止
create index book_ind on books(bookname,price); //如果在创建表的时候没有创建索引，则需要使用此方法创建
fulltext //全文索引；只用在myisam类型的表中，并且只能给char,varchar,text类型的字段创建
select match(info) against('hello') from books; //在具有全文索引的info中搜索hello字符串
`date` //``这个符号是对数据库名、表明、字段的特殊处理。防止用户自定义的名称和mysql保留字冲突；如：字段名 date ，mysql同样有内建行数date，`date`就能区分开这是自定义字段
//SQL语句设计
grant 权限 on 数据库.数据表 to 用户名@登录主机 identified by '密码'; //创建用户；如grant select,insert,update,delete on mydb.* to user@localhost indentified by "123456";
show databases; //显示所有已创建的数据库；show tables
desc 表名; //显示这个表的所有字段的各种属性信息；desc是describe的缩写
use demo; //使用demo数据库
insert into 表名 [(字段名1,字段名2...)] values ('值1','值2'...); //向数据表中插入数据
update 表名 set 字段名=表达式(可以有多个，用逗号隔开) where 条件 [order by 字段(以此字段升序排列) [desc(降序)]] [limit 行数(限制修改的条数)]; //修改数据
delete from 表名 where 条件 [order by 字段] [limit 行数]; //删除数据
//select查询语句，最复杂也最有用
select [all|distinct] {*|表名.*|字段1 [as 别名1][,[表名.]字段2 [as 别名2][,...]]} from 表名 表达式[,...] [in 外部数据库] [where...] [group by...] [having...] [order by...] [limit...] //修改数据，大括号表示必须从里面选一个，*表示所有
distinct //从搜索的数据中取消重复的数据;当一次搜索多个数据列时，需要所有数据列重复才算重复
//SQL语句支持各种表达式：+-*/&&||<>!=等等，PHP里的表达式几乎都支持，还有一些独有的表达式，where语句中经常会使用
is null, is not null; //当要检索一个值是否为null时，需要使用次方法，而不能使用=null或!=null
price between .. and .., not between .. and ..; //等同于"price>=.. and price<=.."和"!(>=.. and <=..)"
id in (1,5,8), not in(1,5,8); //从id(不)为1，5，8的中搜索
select bookname like 'PHP%', not like '%PHP%'; //模糊搜索；%表示那边可以有任意多个字符；第一个表示以PHP开头的书名，第二个是不包含PHP的书名；还可以使用下划线"_"表示任意一个字符
表名.列名 //在一次性对多个表进行查询时，可以使用此方法来区分相同名字的列名
select...where...in (select...where...); //嵌套查询；将子查询的查询结果作为父查询的查询条件
count(*),sum(price),avg(price),max(price),min(price); //统计函数；分别为：返回搜索到的记录行数，返回一列的总和，返回一列的平均值，返回一列中最大的值，返回一列中最小的值。如：select avg(price) as '平均价格' from books;
group by 字段; //对查询结果进行分组；先将group by的那个列的值相同的分成一个组，再对每个组进行查询，将每个组的查询结果输出。如：在一个字段里使用几个不同的字符将数据分成几个组，就可以使用这个语句进行特定的查询
explain+查询语句; //用于检测索引和查询能否良好匹配
//PHP访问MySQL的扩展函数
$link=mysql_connect("localhost","root","root"); //连接mysql服务器，返回一个资源类型的标识符；如果只连接了一个数据库，则在使用mysql相关函数时可以不传入这个标识符；mysql_pconnect()为持久连接
mysql_close($link); //完成数据库访问工作后使用此函数断开连接
mysql_select_db("books"[,$link]); //选择一个默认数据库，避免多次选择的麻烦，只连接了一个数据库就可以不要第二个参数
$result=mysql_query("$sqlstr"); //把SQL命令作为字符串传入，就会将其发送到mysql服务器中并执行，通常返回布尔值，当执行的是select命令则返回一个资源(结果集)
mysql_num_rows($result); //从查询结果集中获取数据记录行的个数（select）
mysql_affected_rows(); //获取前一次SQL命令影响的行数（insert,update,delete）
mysql_insert_id(); //获取最后一条新记录的auto_increment值
mysql_num_fields($result); //获取数据列的个数
mysql_fetch_field($result); //从结果集中取得列信息并作为对象返回，里面包含name,table,type等成员属性，可通过对象调用这些成员属性获取值
mysql_fetch_row($result); //将一条结果记录返回，并以一个普通索引数组的形式保存，再次调用返回下一条，直到末尾返回false
mysql_fetch_assoc($result); //将一条结果记录返回，并以一个普通关联数组的形式保存(列名为下标)，再次调用返回下一条，直到末尾返回false(和上面那个2选1即可)
mysql_fetch_array($result);  //将一条结果记录返回，返回数据中同时兼具索引和关联，即可使用索引方式读取，也可使用关联方式读取；建议使用row或assoc中的一种即可；注意：以上几个fetch调用了资源集后，由于指针已经指向末尾了，所以这个资源集不能再被使用了
//其它
timestamp CURRENT_TIMESTAMP //如果要保存日期字段可以用timestamp类型，将默认值设为CURRENT_TIMESTAMP，这样在插入数据的时候这个字段的值就会默认为插入时的时间2013-09-14 17:35:00
ALTER TABLE `tp_article` AUTO_INCREMENT=1; //自增长重置语句
ALTER TABLE `tp_article` DROP COLUMN `aaa`; //删除某一字段语句
ALTER TABLE `tp_article` ADD COLUMN `aaa` varchar(20) NULL AFTER `Dec`; //增加字段


//数据库抽象层PDO
扩展放在：php目录下的ext目录
php.ini配置文件中开启：extension=php_pdo.dll 和 extension=php_pdo_mysql.dll
$driver_opt=array(PDO::ATTR_AUTOCOMMIT=>0,PDO::ATTR_PERSISTENT=>TRUE...); //对PDO驱动的一些参数进行自定义设置，具体可设置参数参见PDO中的getAttribute()方法，在PDO对象初始化时使用
$pdo=new PDO("mysql:host=localhost;dbname=demo"[,"root","root",$driver_opt]); //创建PDO对象，连接PDO，参数为：DSN，[数据库用户名，密码，驱动设置(是一个数组，通过这个数组设置PDO的一些功能)]
$pdo->getAttribute(PDO::ATTR_AUTOCOMMIT); //获取PDO的属性，返回该属性的值
$pdo->setAttribute(PDO::ATTR_AUTOCOMMIT,0); //设置PDO的属性，若在构造方法时没设置最后一个参数，也可以通过此方法设置
try{  //错误异常控制，try...catch...
	$pdo=new PDO("mysql:host=localhost;dbname=demo","root","root"); 
}catch(PDOException $e){ //PDOException是PDO的内置异常处理类，$e是这个类创建的对象
	echo "数据库连接失败：".$e->getMessage(); //获取异常错误信息
}
$rows=$pdo->exec($SQL); //exec()方法，只对update,delete,insert等增删改SQL语句有用，返回影响的行数
if(!$rows){
	echo $pdo->errorCode(); //如果PDO执行方法发生错误，可调用errorCode()输出错误的代码号
	print_r($pdo->errorInfo()); //如果PDO执行方法发生错误，可调用errorInfo()输出错误的信息，是一个数组
}else{
	echo "执行成功";
}
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING); //将报错模式设置为警告方式，会自动在浏览器输出一个警告；默认为ERRMODE_SILENT，出错时不进行任何操作
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); //将报错模式设置为错误异常模式，通常使用此模式；此模式会抛出一个PDOException异常处理类，然后再通过try...catch...对异常进行处理
try{
	$rows=$pdo->exec($SQL);
	echo "最后插入的自动增长的ID：".$pdo->lastInsertid(); //通过此方法获取最后一个自动增长的ID
}catch(PDOException $e){
	$e->getMessage(); //错误异常模式会在出错时直接通过此方法输出错误信息到浏览器
}
$ps=$pdo->query(); //此方法用于处理返回结果集的SQL语句，即select查询语句，返回一个PDOStatement对象
$ps->rowCount(); //此方法需要使用query()方法返回的对象，用于获取query()方法中select语句搜索到的行数，返回一个整数
//事务处理：一系列的语句组成一个事务，所有语句执行成功时才提交；只有InnoDB类型的数据表能使用，MyISAM不行
$pdo->setAttribute(PDO::AUTOCOMMIT,0); //先关闭自动提交功能，也可以在构造方法的最后一个参数中关闭
try{
	$pdo->beginTransaction(); //开启事务处理功能
	$pdo->exec($sql1); //执行一个SQL语句
	$pdo->exec($sql2); //执行另一个SQL语句，事务处理通常是多个命令结合使用来完成一个事情，比如购物(买进、卖出、转账等多个命令组合)等事务
	$pdo->commit(); //由于关闭了自动提交功能，所以需要使用此方法手动提交；当上面所有语句执行成功时才会一次性全部提交
}catch(PDOException $e){
	$e->getMessage();
	$pdo->rollback(); //当其中一个语句有错时就回滚，取消上面所有执行成功的SQL语句(商品购买成功，但转账失败，取消商品购买)，只有手动提交模式下才能使用
}
//PDO预处理：执行效率比exec()和query()更高，更安全，推荐使用此方法
$ps=$pdo->prepare("insert into shops(name,price,num) values(:name,:price,:num)"); //使用prerare()方法准备SQL语句，并返回一个PDOStatement对象；values(:name,:price)里的:name和:price是占位符(:加自定义名称，最好和字段名相同；也可以用'?'表示占位符即values(?,?,?)，类似于索引数组和关联数组的区别)，先不给出具体的值，在操作的时候，只要给占位符赋不同的值就能进行多次不同数据的操作；这里的SQL语句可以是任意类型，不像上面分为exec()和query()
$sql="update shops set name=:name, num=:num where id=:id"; //这是update的占位符用法
$ps->bindParam(":name",$name); //绑定参数，将占位符绑定到变量上，只要给变量赋值就是给占位符赋值，另一种是(1,$name)的索引方式；这里只能提供变量，不能直接给占位符赋值
$name="PHP"; $price="50.00"; $num=10; //给变量赋值就是在占位符上插入值
$ps->execute(); //使用execute()方法就能执行准备好的SQL语句，对数据库进行操作
$ps->execute(array(":name"=>"JSP",":num"=12,":price"=>30.00)); //也可以直接在execute()中传入数组给占位符赋值插入数据，这种方法就不需要绑定变量更方便
$ps->execute(array("ASP",18,60)); //如果准备语句prepare()中的占位符是使用的"?"，则在数组内按顺序写入要传入的参数即可
$pdo->lastInsertid(); //通过调用$pdo的lastInserid()方法获取最后一个自动增长的ID
$ps->rowCount(); //获取搜索到的总行数
$ps->columnCount(); //获取搜索到的总列数
$ps->getColumnMeta($name); //获取具体列的属性信息，返回一个数组
$ps=$pdo->prepare("select id,name,price from shops where id>? order by id");
$row=$ps->fetch([PDO::FETCH_NUM]); //fetch()方法将结果集中当前行的记录以某种方式返回，并将结果集指针移至下一行，到达结果集末尾时返回false；[将返回方式设定为索引数组返回，默认是索引和关联一起返回]
$arr=$ps->fetchAll([PDO::FETCH_ASSOC]); //获取结果集中的所有行，以二维数组形式返回，同样默认是两种数组都返回，设置为只返回关联数组
$ps->setFetchMode(PDO::FETCH_ASSOC); //通过设置模式将只返回关联数组设置为默认，就不用每次都要设置了；需要放在前面按流程执行
$ps->bindColumn('name',$name); //绑定列；这样在每次使用fetch()方法获取各行记录时，会自动将相应的列值赋给相应的变量，输出变量便可输出值，不过只能用于PDO::FETCH_BOTH


//MemCache：可以将用户查看过的数据缓存到内存中，让后面的用户能更快的调取，提高效率；通常用于SQL的select和会话控制session；需要在PHP中单独安装扩展
客户端控制：在cmd里输入telnet localhost 11211(默认端口)连接上memcache进行管理
set userid 0 0 5 //设置一个键名userid，标记0，有效期0(永远有效)，数据长度5；如果设置的键名重复将覆盖
12345 //紧接着录入数据，长度必须和上面设置的长度一致
add username 0 0 6 //添加数据；如果添加的键名重复将失败
tirion //也是紧接着录入数据，长度一致
get userid //获取键名为usid的信息
delete userid //删除userid
PHP里使用memcache
$mem=new Memcache; //创建一个memcache对象，通过这个对象内的方法来处理
$mem->connect("localhost",11211); //连接memcache，输入地址和端口，默认为1121
$mem->addServer("localhost",11211); //添加memcache服务器，可以通过此方法来添加多个做分布式服务器
$mem->add("mystr","this is a test"[,MEMCACHE_COMPRESSED,3600]); //添加数据；第一个是key；第二个是数据(可以为数组、对象)；第三个启用压缩，第四个是在内存中保存的时间，单位秒，默认30天；使用add为同一个key再次设置数据的时候无效，不会覆盖原有数据，需要使用set()重新设置
$mem->set("mystr","change the test"[,MEMCACHE_COMPRESSED,3600]); //设置数据；同样具有add的功能
$str=$mem->get("mystr"); //通过key获取数据；当要获取多个数据时，通过数组的方式传入多个key，如array('mystr1','mystr2')
echo $str;
$mem->getStats(); //获取当前memcache的各种状态，返回一个数组
$mem->delete("mystr"); //通过Key删除一个缓存数据
$mem->flush(); //一次性清空所有缓存数据
$mem->close(); //关闭memcache


//会话控制：跟踪用户，让一个用户访问每个页面，服务器都知道是哪个用户在访问(打开浏览器->访问某个网站的多个页面->关闭浏览器，是一次会话的全过程，如打电话)
Cookie技术 //用户登录后会在客户端生成一个cookie文件来保存他的用户信息，当这个用户访问别的页面时都会带着这个cookie，从而服务器能区分用户
$time=time()+60*60*24*7; //设定cookie保存的时间，获取当前时间的unix时间戳再加上7天的秒数，即保存7天
setCookie("username"[,"tirion",$time,$path]); //创建cookie；cookie是HTTP标头的一部分，因此必须在其它信息输出到浏览器之前调用；username为cookie的识别名，可以使用$_COOKIE["username"]调用；tirion是名为username的cookie的值；$time是unix时间戳，即保存这个cookie到什么时候，若未设定，则在会话结束(浏览器关闭)后立即失效；$path是cookie在服务器端的指定路径，当设置此值时，服务器中只有指定路径下的网页或程序可以存取此cookie
$_COOKIE["username"]; //通过$_COOKIE超全局数组来访问cookie
//数组形态的cookie
setcookie("user[username]","tirion",$time); //则通过$_COOKIE["user"]["username"]访问
setcookie("user[password]",md5("hepeng"),$time); //cookie可以有多个键值对，一次保存多个信息
setcookie("user[email]","hepeng10@qq.com",$time/7); //cookie保存的每个信息的时间可以不同，而session不能
foreach ($_COOKIE["user"] as $key=>$value){ //通过foreach遍历一个cookie
	echo $key."=>".$value;
}
setcookie("user"); //删除cookie；通过设置cookie来删除cookie，因为没有传入第三个参数，则在浏览器关闭后自动删除；也可以把时间设为time()-1来即时删除；删除所有cookie需要使用foreach循环来删除
urldecode("url编码"); //cookie文件保存的中文内容将会自动使用urlencode()编码，可以使用urldecode进行解码
Session技术 //在服务器端保存用户信息，但需要客户端发送一个sessionid来验证，sessionid一种是基于cookie的，一种是通过URL发送"url?seesionid=..."；在php.ini里有很多session相关配置，如下
session.cookie_lifetime=0 //cookie中的sessionid在客户机上保存的有效期(秒)；0是默认，浏览器关闭即失效
session.cookie_path=/ //传递会话ID的cookie作用路径；客户端cookie的第四个参数
session.name=PHPSESSID //会话的名称，用在客户端cookie里的会话ID标识名，只能包含字母和数字
session.save_path="D:/wamp/wamp/tmp" //保存会话数据文件的路径，可以为远程服务器
session.use_cookies=1 //是否使用cookie在客户端保存会话ID，1表示允许
session.use_trans_sid=false //是否使用明码在URL中显示SID(会话ID)
session.gc_probability=1 & session.gc_divisor=1000 //通过这两个配置来定义在每次初始化会话时(session_start())启动垃圾回收程序的概率，这里是1/1000；应该根据访问量来配置
session.gc_maxlifetion=1440 //服务器端保存的过期数据(session文件的最后修改时间超过当前时间1440秒)将被视为垃圾，并由垃圾回收程序清理
session.save_handle=files //存储和检索与会话关联的数据的处理器名字，可以使用files,user,sqlite,memcache中的一个值
session_start(); //两个作用：一是开启session，二是返回已存在的会话(已开启)；也属于头函数的一种，前面不能有任何输出；注：在创建session的时候客户端同时会创建一个与之对应的cookie，cookie中保存了sessionid通过这个cookie用来辨别不同的用户
$_SESSION['user']="tirion"; //注册session变量，保存到服务器中(session.save_path)
session_id(); //获取当前的sessionid，一个32位的16进制字符串
session_name(); //获取session名称，即session.name的值
setcookie(session_name(),'',time()-100,'/'); //删除客户端的cookie中保存的sessionid，第四个参数即session.cookie_path的值；开启session后，默认就会将session_id()以session_name()为键名保存到cookie中，直到浏览器关闭，自动销毁
unset($_SESSION["user"]); //通过unset()释放在session中的单个变量，但不能unset($_SESSION)，这样将删除超全局数组session，导致严重问题
$_SESSION=array(); //释放session中的所有变量可以使用此方法，将$_SESSION设置为空数组即可
session_unset(); //功能同上
session_destroy(); //关闭session，返回布尔值；但不会释放$_SESSION中的变量，也不会删除保存在客户端cookie中的sessionid
//自定义session的处理方式
session_set_save_handler("open","close","read","write","destroy","gc"); //需要使用此函数来自定义处理方式，里面的6个参数都是回调函数的函数名，通过这6个函数来自定义session的处理方式便可实现用服务器或memcache保存session。此函数必须在php.ini中设置session.save_handler=user时才能运行
function open($save_path,$session_name){ //在运行session_start()时执行。该函数需要两个参数，系统会将php.ini中的session.sava_path的值和session名自动传入。返回true则可以继续向下执行
	global $sess_save_path; //将session的保存路径设置为全局变量，供其它函数使用
	$sess_save_path=$save_path;
	return true;
}
function close(){ //该函数不需要参数，在脚本执行完成或运行session_write_close()、session_destroy()时自动调用，直接返回true即可
	return true;
}
function read($id){ //在运行session_start()时执行。该函数需要一个参数，系统会自动将sessionid传递给该函数，用于通过sessionid获取对应的用户数据，该函数应该返回当前用户的会话信息，然后会自动将这些信息写入$_SESSION里
	global $sess_save_path;
	$sess_file="{$sess_save_path}/sess_{$id}"; //指定session文件的路径，sess_{$id}是session文件的文件名，sess_是write函数写入时自定义的前缀
	return (string)file_get_contents($sess_file);
}
function write($id,$sess_data){ //该函数在脚本结束和对$_SESSION变量赋值数据时执行。需要两个参数，分别是sessionid和串行化后的session信息字符串。在对$_SESSION赋值时就可以通过sessionid找到存储的位置，并将信息写入。存储成功则返回true继续向下执行
	global $sess_save_path;
	$sess_file="{$sess_save_path}/sess_{$id}"; //指定session文件的路径，并自定义了以sess_为前缀的命名方式
	if($fp=fopen($sess_file,"w")){
		$return=fwrite($fp,$sess_data); //写入session信息
		fclose($fp);
		return $return;
	}else{
		return false;
	}
}
function destroy($id){ //在运行session_destroy()时执行。需要一个参数，系统会自动将sessionid传递给该函数，去删除对应的会话信息
	global $sess_save_path;
	$sess_file="{$sess_save_path}/sess_{$id}";
	return unlink($sess_file); //删除session文件
}
function gc($maxlifetime){ //垃圾回收程序启动时自动执行。需要一个参数，系统自动将php.ini中的session.gc_maxlifetion的值传递给该函数，用于删除超过这个时间的session信息。返回true则继续乡下执行
	global $sess_save_path;
	foreach (glob("{$sess_save_path}/sess_*") as $filename){ //glob($pattern);搜索与模式匹配的文件，并将文件名形成一个数组返回
		if(filemtime($filename)+$maxlifetime<time()){
			unlink($filename);
		}
	}
	return true;
}


//模板引擎smarty3：一种使PHP和HTML分离的技术；让PHP加载smarty引擎，smarty引擎又加载HTML文件，然后smarty将HTML文件中的PHP占位符替换为相应的PHP代码，再将这个编译后的成品文件输出的一种技术
define("ROOT",str_replace("\\","/",dirname(__FILE__))); //使用dirname(__FILE__)获取文件的绝对路径，赋值给常量ROOT；目的是写一个初始化smarty的文件让别的PHP文件调用，设置了绝对路径，就不会因为别的php文件不在当前目录而找不到smarty等文件了；这个文件放在和smarty模版引擎同一个目录里
require(ROOT.'/libs/smarty.class.php'); //加载smarty模板引擎，libs目录就是smarty的目录，和本文件在同一个目录，smarty.class.php就是smarty的主文件
$smarty=new Smarty(); //创建smarty对象
$smarty->setTemplateDir(ROOT."/tpls"); //调用smarty的方法，设置模版目录为相同目录下的tpls目录
$smarty->setCompileDir(ROOT."/coms"); //设置编译后文件的目录；也和本文件在同一个目录，当然可以放在别的位置，设置相应的参数即可
$smarty->setConfigDir(ROOT."/configs"); //设置配置文件的目录；配置文件是在HTML模版文件里写入的，主要是用来设置不同的样式
{$title} //默认定界符是{}，中间不能有空格，但是依然会在某些时候和一些HTML文件内的代码发生冲突，如：body{color:red;}，所以需要修改
$smarty->left_delimiter="<{"; //修改左定界符为自定义的<{
$smarty->right_delimiter="}>"; //修改右定界符为自定义的}>
$smarty->auto_literal="false"; //允许定界符里面的占位符左右可以有空格(<{ $title }>)，默认是true不允许有空格
//PHP端smarty的使用
$smarty->assign("title","标题"); //此方法是给一个key赋分配一个值，这个key要对应HTML里相应的占位符；这里是将HTML的"$title"占位符替换为"标题"
$marty->assign(array("name"=>"Tirion","age"=>"24","time"=>date("Y-m-d H:i:s")); //可以传入一个数组，HTML里的占位符也会替换为数组里对应的key的值
$smarty->assign("contacts",array("13705485456","四川","默殇")); //分配一个索引数组，HTML里使用<{$contacts[0]}>的方式调用
$smarty->assign(["con",]array("phone"=>"13705485456","addr"=>"四川","name"=>"默殇")); //分配一个关联数组，HTML里使用<{$con["addr"]}>或<{$con.name}>的方式调用
$smarty->assign("p",new Person()); //分配一个对象
$smarty->registerPlugin("modifier","funone","fun"); //自定义函数，包括变量调节器(modifier)，函数(function)和函数块(block)。但不推荐使用，推荐使用smarty自定义插件的方式
$smarty->display("test.tpl"); //此方法传入一个设置的模版目录下的模版文件名(如果模版目录中还有子目录，模版文件在子目录里，则需要加上子目录路径)，并将模版和PHP进行编译，输出成品到浏览器
//HTML端smarty的使用
<{*注释的内容*}> //smarty注释；当使用了smarty，原HTML的注释里的内容依然会执行，只是不显示输出到浏览器；而smarty注释则不会执行，推荐使用
<{$content}> //变量，将替换为PHP里相应的值
<{$contacts[2]}> //索引数组，将替换为PHP里相应的值
<{$con["phone"]}> 或 <{$con.name}> //关联数组，将替换为PHP里相应的值，推荐使用后一个写法
<{$x+$y}>; <{$foo=strlen($bar)}> //smarty支持各种PHP的表达式；+_*/=&&||><等等
<{"his name is `$name`,age is `$name.age`"}> //双引号中可以有变量，但最好使用分隔符`将变量独立起来便于解析
<{$foo=<{$count}>+3}> //smarty标签可以嵌套使用
<{$p->name}> //调用对象里的成员
<{myfun()}> //调用PHP里的自定义函数
<{date("Y-m-d")}> //可以使用PHP的系统函数，不过此方法对于美工人员要求较高，不建议使用
<{$var|func[:$two:$three...]}> //变量调节器函数；调用func函数，$var是第一个参数，$two，$three是第二个和第三个参数，依此类推
<{func [color="red" width="300"...]}> //函数；使用方法类似HTML中的独立元素标签；$smarty->registerPlugin("function",$arr,"func")
<{func [color="red" width="300"...]}>$content<{/func}> //块函数；使用方法类似HTML中的闭合标签
<{$smarty.session.username}> //可以通过系统内置的smarty数组获取各种PHP的全局变量，如$_SESSION["username"],$_GET,$_POST,$_COOKIE等等，属于smarty保留变量
//从配置文件中读取变量
$smarty->setConfigDir(ROOT."/config"); //设置配置文件目录；里面需要自建配置文件，自定义文件名，如config.ini(windows)或config.conf(linux)
bodyColor=#cccccc //配置文件中自定义全局变量和值，所有文件都能调用
[index] //自定义局部变量节点；局部变量节点下面的变量，需要加载了这个节点才能使用
indexTitle="主页" //自定义局部变量
<{config_load file="config.ini" [section="index"]}> //在模版中使用config_load加载配置文件，file="配置文件名"，[section="局部变量节点"]
<{#bodycolor#}> //引用配置文件中的变量；在变量两边加上#便是引用的配置文件中的变量
//自定义插件
$smarty->addPluginsDir(ROOT."/plugin"); //添加一个自定义插件目录，默认在libs/plugins，但是里面有许多自带的插件，所以自定义的插件专门建个目录来存放
modifier.修改器名称.php //变量修改器文件的命名方式
function smarty_modifier_修改器名称() //变量修改器的命名规范
function smarty_modifier_style($one,$two,$three...) //修改器参数的对应位置如下：<{$one|mystyle:$two:$three...}>
function.函数名.php //函数文件的命名方式
function smarty_function_函数名($params,$smarty) //函数的命名规范
function smarty_function_style($arr,$smarty) //第一个参数会接收模版中调用此函数时使用的所有属性形成一个数组(<{style color="red" width="300"}>，$arr['color']和$arr['width'])，第二个参数接收smarty对象
block.块函数名.php //块函数文件的命名方式
function smarty_block_块函数名($params,$content,$smarty,&$repeat) //块函数的命名规范
function smarty_block_style($arr,$content,$smarty,&$repeat) //第一个参数接收模版中开始标签里的参数形成一个数组；第二个参数是开始和闭合标签中间的内容；第三个参数是smarty对象；第四个参数当遇到闭合标签时值为false，通常使用if(!$repeat){代码}判断出闭合标签才执行代码，防止代码执行两次(开始和闭合标签都执行)
//smarty模版内置函数
<{assign var="name" value="tirion"}>或<{$name="tirion"}> //使用assign函数自定义变量，后一种是简写方式；可以为数组赋值，也可以在赋值时使用表达式
<{append var="contact" value="Bob" index="name"}> //使用append函数追加变量或数组，这里是追加一个数组，类似于contact.name="Bob"
<{if $name eq "tirion"}> //if条件语句；eq、neq、ge、lt等代表=、!=、>、<避免和HTML标签等发生冲突
	welcome sir.
<{elseif $age gt 18}> //这里elseif不能分开写
	he is a adult.
<{else}>
	$name is not allowable.
<{/if}> //是一个块函数
<{for $i=1 to 50 [step 3 max=10]}> //for循环；设置循环使用变量$i从1到50(默认也就是循环50次)，step设置循环的步长(1.4.7.10...)，max设置最大循环次数
	<{$i}> //每循环一次输出$i的值
<{forelse}> //当循环不成立的时候(一次都不能循环)输出forelse下面的内容
	不能循环！
<{/for}> //是一个块函数
<{$i=10}>
<{while $i gt 0}> //while循环；只需设置循环条件即可
	<{$i--}> //循环一次输出一次$i并且$i-1
<{/while}> //是一个块函数
<{function result [level=0 bgcolor="red"]}> //声明一个名为result的函数；[可以声明局部变量在函数中使用]
	函数体
<{/function}> //是一个块函数
<{result name="tirion" age=$age}> //调用声明的函数；可以直接往里面传参数和值，而不必在声明函数时确定要接收的参数
<{foreach $arr as [$key=>]$value}> //循环遍历数组，和PHP的使用方法类似
	$key=>$value
	<{$value@first}> //访问foreach循环的内置属性；$value是foreach中自定义的代表键值的变量，first是内置的属性，还有last,index,iteration,total等
<{foreachelse}> //当数组遍历失败时输出下面的语句
	数组遍历失败！
<{/foreach}> //是一个块函数
<{section loop=$arr name="xh" [step=2 max=12 start=3]}> //section循环遍历数组；loop=遍历的数组，name=该循环的名称，step=步长，max=最大循环次数，start=从数组的第几个索引开始循环遍历
	<{$arr[xh]}> //通过此方法遍历出数组的每个元素；每循环一次该循环的名称即name的值会从0开始加1
	<{$smarty.section.xh.first}> //通过保留变量$smarty.section访问内置属性；内置属性和foreach的差不多
<{sectionelse}> //不能进行遍历的时候会出书下面的内容
	数组遍历失败！
<{/section}> //是一个块函数
<{include file="header.tpl" [title="首页" bgcolor=black] [assign="head"]}> //使用include包含其它模版；file文件的目录是$smarty->setTemplateDir设置的目录，[可以在调用模版的时候传入各种属性，但只能在被包含的文件中使用，这里是header.tpl]，[使用assign属性后，被包含的子模版的内容不是直接输出，而是复给变量head，当调用head的时候输出，这样可以输出多次]
//模版的继承
<{extends file="parent.tpl"}>或<{extends "parent.tpl"}> //使用extends函数来继承父模版；必须写在子模版的第一行，子模版里添加的任何内容都不会输出到浏览器
$smarty->display('extends:parent.tpl|child.tpl|grandchild.tpl'); //也可以在PHP文件里的display方法中使用extends来继承，用|分割所继承的文件，可以一次性继承多个，最后一个文件名是调用并输出的模版，前面的是要继承的模版
<{block name="title"}>this is a test<{/block}> //在父模版中使用block函数标记模版内的一块区域，并使用name参数为此区域命名，让子模版可以修改这个区域
<{block name="title" [append|prepend]}>main index<{/block}> //在子模版中同样使用block函数，并调用和父模版相同的name值来对父模版的相应区域内容进行覆盖，[第二个参数是追加模式，append是将内容添加到父模版原内容的后面，prepend是添加到前面]
<{block name="content"}>this is a <{$smarty.block.child}> test<{/block}> //在父模版的block区域中添加$smarty.block.child保留变量作为占位符，则当子模版对此区域进行覆盖操作时，则不会覆盖，而是将内容插入到此占位符的位置
<{block name="content"}>this is a <{$smarty.block.parent}> test<{/block}> //在子模版的block区域中添加$smarty.block.parent保留变量作为占位符，则会将父模版相应区域的内容插入到此占位符的位置
//缓存控制
$smarty->caching=true; //启用缓存控制，默认是false；一般是当网站上线后才开启
$smarty->setCacheDir(ROOT."/cache"); //设置缓存文件保存的目录
$smarty->cache_lifetime=60*60*24*7; //设置缓存的生命周期，以秒计，默认为3600s；
$smarty->display("index.tpl"[,$_SERVER["REQUEST_URI"]]); //如果存在缓存文件，则display会输出缓存页面；当一个模版需要建立多个缓存页面时(如分页等情况，每一页都需要一个缓存文件)，这时就可以通过在display中传入第二个参数$_SERVER["REQUEST_URI"]来获取页面的URI作为缓存文件的前缀来对每个页面进行缓存
if(!$smarty->isCached("index.tpl"[,$_SERVER["REQUEST_URI"]])){ //使用iscached来判断页面是否已经存在缓存，如果不存在才执行里面的代码；[当display中传入了第二个参数来建立多个缓存，则这里也要传入相同的参数来判断各个缓存是否存在]
	调用数据库等动态内容...
}
$smarty->assign("time",date("Y-m-d")); //一个页面中会有某些地方的动态数据需要实时更新而不必进行缓存的情况，就需要将这些内容可以写到if iscached的外面
<{nocache}>当前时间是：<{$time}><{nocache}> //在模版里使用<{nocache}>函数将不缓存的内容包含起来，与PHP配合实现局部关闭缓存
$smarty->clearCache("index.tpl"[,"cacheid"]); //使用此方法来清除一个模版的缓存，[如果模版有多个缓存，可以通过第二个参数来清除指定id的缓存]
$smarty->clearAllCache(); //使用此方法来清除所有缓存
注意：模版文件里的各种路径，如图片、CSS、文件目录等都是相对于调用smarty模版引擎的PHP的路径，而不应该用本模版的相对路径；如：<img src="img/girl.jpg">则是和PHP文件相同目录下的img目录下的girl.jpg，而不是模版文件所在目录下的img目录。所以，在开发之前就要做好规划


//http协议：超文本传输协议(超文本指不只是文本，还有图片视频文件等)；通过httpwatch或firebug来抓取http请求内容
//请求头信息(浏览器向服务器发送的请求)
"GET /test/hello.html HTTP/1.1  【表示发送的get请求, 请求资源是/test/hello.html】
Accept: */* 【表示客户端可以接受任何数据】
Referer: http://localhost:80/test/abc.html 【表示我是从哪个页面链接过来的】
Accept-Language: zh-cn 【页面语言】
User-Agent: Mozilla/4.0  【告诉服务我的浏览器的内核，操作系统】
Accept-Encoding: gzip, deflate 【表示接受什么样的数据压缩格式】
Host: localhost:80 【主机:默认80端口】
Connection: Keep-Alive     【表示不要立即断掉我们的请求】"
在服务器端，可以通过$_SERVER来获取需要的信息
重要的有:
HTTP_USER_AGENT 浏览器类型
HTTP_HOST 获取主机名
REMOTE_ADDR 访问该页面的ip
DOCUMENT_ROOT  可以获取apche的主目录
REQUEST_URI 可以获取请求的资源名 

http请求有两种主要的方式
get / post 
get和post的区别有哪些
1. 安全性：get请求的数据会显示在地址栏上(表单提交默认为get), post请求的数据放在http协议的消息体
2. 从可以提交数据的大小看. 
2.1 http协议本身并没有限制数据大小.
2.2 浏览器在对get和post请求做限制，get请求数据2k+35，post没有限制.(提交的数据大时必须用post)
3. get请求可以更好的添加到收藏夹.
//响应头信息(服务器返回)
"HTTP/1.1 200 OK  【200表示客户端请求成功；另外还有302(页面跳转)，304(请求的页面不需要更新-有缓存)，404(页面不存在)，500(服务器出错)等】
Server: Microsoft-IIS/5.0   【表示告诉浏览器服务器的情况】
Date: Thu, 13 Jul 2000 05:46:53 GMT  【告诉浏览器请求的页面的时间】
Content-Length: 2291   【表示回送的数据有2291个字节】
Content-Type: text/html    【文档类型】 
Cache-control: private    【缓存】"
使用header()函数往http响应头信息里写信息，浏览器会解析响应头信息，从而改变浏览器的行为
header("Location:http://www.163.com"); //页面跳转，302
header("Refresh:3;url=http://localhost/mine/index.php"); //页面3秒后跳转
//通过header()来禁用缓存，3个都要写，针对不同浏览器的；(实现及时更新，ajax也非常有用)
header("Expires:-1");
header("Cache-Control:no_cache");
header("Pragma:no-cache");






//其它知识点
__FILE__ //魔术常量；当前的文件名
__LINE__ //当前的行数
__FUNCTION__ //当前的函数名
__CLASS__ //当前的类名
__METHOD__ //当前对象的方法名

ceil(2.345); //返回不小于传入的数的下一个整数（2.345返回3）
floor(2.345); //返回不大于传入的数的上一个整数（2.345返回2）
round(2.345，[2]); //返回四舍五入的数，第二个参数是保留小数位数
pow(2,40); //返回第一个参数的第二个参数次方（2的40次方）
rand(1,100); //返回一个1-100之间的随机数

break; //结束执行
continue; //跳过此次继续执行
exit("错误，退出程序！"); //退出程序，并输出一句话，别名die()

error_reporting(E_ALL & ~E_NOTICE); //错误抑制，除了NOTICE的都报。也可以在php.ini中设置，但是配置文件里面的配置都可以通过代码实现，而通过代码实现，在别的机器上也能保证你的各种配置，所以最好使用代码而不是直接修改配置文件

ini_set("error_reporting","E_ALL & ~E_NOTICE"); //设置配置文件，使用此函数不用关心修改不同配置文件的相应函数，第一个参数传入和配置文件里相应参数一样的内容即可（如设置时区函数是：date_default_timezone_set()，配置文件内date.timezone，则传入date.timezone即可），第二个参数就是要配置的值

$_SERVER["REQUEST_URI"]; //返回访问页面的URI（可以理解为URL）

header(location:$path); //此函数跳转到指定的页面；如header(location:index.php);
header("Content-Type:text/html; charset=utf-8"); //告知浏览器用uef-8字符集

