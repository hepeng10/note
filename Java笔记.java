安装：
1、安装JDK，并配置环境变量：(1)将JDK的bin目录的路径加入到环境变量-系统变量-path里(path是操作系统外部命令搜索路径：cmd里的输入的命令)；在cmd里输入java -version(java命令就是bin目录里的java.exe)，如果显示了java的相关信息则成功 (2)新建系统变量，变量名为classpass(类文件搜索路径)，变量值为.

//输出hello,world
public class Hello{
	public static void main(String args[]){
		char name="Tirion";
		System.out.println(name); //将内容打印到命令行中
	}
}

//编译源代码：使用cmd编译
>d:  //进入d盘
>cd java/test  //进入要编译的文件目录
>dir  //可以显示出这个目录中的所有文件
>javac Hello.java  //使用javac命令对文件进行编译；编译成功会在本目录中生成一个编译后的Hello.class的文件
>java Hello  //使用java命令执行文件；注意这里不要加后缀(前面把classpass设为了. 则在当前目录查找class文件)

JRE：JAVA的运行环境  JVM：JAVA虚拟机

//基本语法：
基本数据类型：
1、数值型：Ⅰ整数类型： byte short int long (从小到大) Ⅱ浮点型： float(单精度) double(双精度)    byte<short<int<long<float<double 
2、字符型： char String
3、布尔型 boolean (只有ture和false，不能用0或空来表示false)
int age=26;  //申明一个变量；必须指定类型
long i=250L;  //使用long类型，可以在值后面加上l或L
char name='T';  //char类型只能含有一个字符，并且必须使用单引号
String name="Triong";  //String类型是一个字符串，必须使用双引号；String不是基本数据类型，是包含多个char类型的对象，每个字符是一个char
字符集：一个字符(英文、汉字等)对应着一个数字；不同的字符集，不同的字符可能对应不同的数字，所以会产生乱码；JAVA使用的unicode字符集，一个英文字符和中文字符占的空间是一样的
数值类型：1、整数字面量为整型(int) 2、浮点数(小数)字面量为双精度浮点型(double)，小数不能直接赋值给float类型，需要在后面加上F
float f=12.5;  //将报错；因为小数都是双精度double类型，而double类型的取值范围大于float的，所以出错
float f=12.5F; //需要在后面加上F，将双精度转换为单精度
int i=10; long l=20; i=l;  //将报错；这是把一个long类型赋值给int类型，而long类型的范围大于int类型，所以出错
int i=10; short s=20; i=s;  //这样就不会出错了；short类型的取值范围小于int类型，所以可以将值赋给它
byte b=10; short s=20;  //不会报错；虽然整数默认为int类型，但是可以直接赋给byte和short类型，这是java语言规定的
byte b=0; byte b=b+0;  //将报错；虽然整型可以直接赋值给byte和short，但是却不能通过运算后赋值
int i=0.5*10;  //将报错，因为计算出来的值虽然是5，但是依然是双精度类型；在算术运算中，结果的类型取决于参与算术运算的最大的那个类型
int i=3/2;  //不会报错，但结果为1；因为一次运算结果得到的类型取决于参与运算的最大的类型，这里最大的都是整型，所以1.5会自动转化为整型1
double d=3/2.0;  //所以上面那条算法为了得到正确的结果应该写为这样

算术运算符，逻辑运算符，赋值运算符等都和PHP相同
不同点有：
1、字符串连接使用+
2、字符串一个字符只能用单引号，多个字符必须用双引号
3、else if不能连写
4、switch(表达式)，这个表达式只允许4种类型： byte short int char

//类与对象////////////////////////////////////////////////
class Person{  //声明一个类
	int age;  //声明一个成员属性
	void say(){  //声明一个成员方法
		...
	}
}

public class Test{
	public static void main(String args[]){
		Person p1=new Person();  //实例化类：类名 对象名=new 类名；对象是一个引用数据类型；new Person()生成了对象，存放在堆内存里，p1是个引用，存放在栈内存里
		p1.age=25;  //调用对象的属性并赋值
		p1.say();  //对用对象方法
		new Person().say();  //匿名对象，一次性对象，用完后就找不到了
	}
}

class A{
	A(string a,int a){  //构造函数：名字必须和类名相同；系统有个默认的构造函数A(){}，所以我们可以通过A a=new A();来实例化对象，但是当我们自己创建了一个新的构造函数后，那个默认的构造函数就销毁了，这里就不能通过A a=new A();来实例化对象了，必须使用A a=new A('tirion',26);这样的形式来实例化对象；不过构造函数也能重载，所以我们还可以自己创建个A(){}这样的构造函数实现不传参也能实例化对象
		...
	}
	void funA(){
		...
	}
	void funA(int i){  //函数重载：一个类里可以声明同名的函数，但是需要传入的参数必须不同；当调用函数的时候会自动通过传参的不同来判断是调用哪个函数
		...
	}
}

//this的使用///////////////////////////////////////////////////////
class Person{
	String name;
	int age;
	String addr;
	Person(){
		System.out.println("这是无参数的构造函数");  //一个类里通常都有一个无参数的构造函数
	}
	Person(String name,int age){
		this.name=name;  //使用 this.属性名 来访问成员属性；也能通过 this.方法名 来访问静态方法
		this.age=age;
	}
	Person(String name,int age,String addr){
		this(name,age);  //使用 this() 来调用别的构造函数，根据传的参数决定；通过此方法可以减少代码的重用；必须放在第一条语句
		this.addr=addr;
	}
}

//静态变量////////////////////////////////////////////////////
class Person{
	static int i;  //创建静态变量；所有对象都共用同一个静态变量
}

class Test{
	public static void main(String args[]){
		Person.p1=new Person();
		Person.p2=new Person();
		Person.i=10;  //使用 类名.静态变量名 访问静态变量
		System.out.println("p1的i的值是："+p1.i);
		System.out.println("p2的i的值是："+p2.i);  //两个的i值都是10
		Person.i=20;  //可以重新赋值覆盖原值
		System.out.println("p1的i的值是："+p1.i);
		System.out.println("p2的i的值是："+p2.i);  //两个的i值都是20
		p1.i=30;  //使用其中一个对象修改了静态变量的值，别的对象也会跟着改变
		System.out.println("p1的i的值是："+p1.i);
		System.out.println("p2的i的值是："+p2.i);  //两个的i值都是30
	}
}

//静态函数/////////////////////////////////////////////////
class Person{
	static void fun(){  //创建静态函数；静态函数里不能直接调用非静态变量
		System.out.println("我是静态函数");
	}
	static{  //静态代码块在加载这个类的时候自动执行
		System.out.println("静态代码块");
	}
}

class Test{
	public static void main(String args[]){
		Person.fun();  //调用静态函数
	}
}

//继承相关；super的使用///////////////////////////////////////////////
class Person{
	Person(){
		......
	}
	String name;
	int age;
	void eat(){
		......
	}
	void say(){
		......
	}
}
class Student extends Person{  //使用extends继承父类；子类将继承父类的成员属性和方法；和PHP一样是单继承
	Student(){  //子类中创建了构造函数，必须调用父类的构造函数，使用super();子类不能继承父类的构造函数，但可以通过super()调用
		super();  //使用super()来调用父类的构造函数，通过传入参数的个数来判断调用的父类的哪个构造函数；如果没写，会自动生成无参的super();必须是第一条语句
		......
	}
	int grade;
	void study(){  //可以创建自己的成员属性和方法
		......
	}
	void eat(){  //子类中定义相同的方法覆盖父类的方法(目的：完全重写)
		......
	}
	void say(){
		super.say();  //在重写父类方法的时候继承父类方法中的内容(目的：添加自有代码)
		......
	}
}

//对象的转型：多态性的提现////////////////////////////////////////////////////
向上转型：电脑是父类，笔记本电脑是子类，一台笔记本电脑是笔记本电脑生成的对象，而这台笔记本电脑也是电脑类型
Notepad n=new Notepad();  //创建一个笔记本电脑对象n
Computer c=n;  //将笔记本电脑对象n赋值给电脑对象c；Notepad类是Computer类的子类；这行代码就是向上转型
Computer c=new Notepad();  //也可以这样使用一条语句完成子类的向上转型；这条语句等于上面两条语句
c.name="外星人";  //当调用成员属性或方法的时候，调用的是所指向对象的属性或方法；即这里调用的是Notepad类的属性或方法；但是，却不能调用Notepad类有的，而Computer类没有的属性或方法，因为c对象是Computer的对象；总的来说就是，调用的成员属性或方法必须是自己有的(c对象所属的Computer类)，但是调用的时候却是子类中的(n对象所属的Notepad类)，因为子类继承了父类，子类中必然有父类所用户的属性和方法，不过子类中却能重写父类的方法，当调用方法时，执行的代码是子类重写后的代码
向下转型：父类的对象赋值给子类的引用
Notepad n=new Notepad();
Computer c=n;  //需要先向上转型
Notepad n2=(Notepad)c;  //这部就是向下转型；使用(类名)强制转换；(类型)括号里面加上类型进行强制转换
Computer c=new Notepad();  //同样，以下两句等于上面3句
Notepad n2=(Notepad)c;

//抽象类与抽象函数//////////////////////////////////////////////
abstract class Person{  //使用abstract声明抽象类；如果一个类中有抽象函数，则这个类必须声明为抽象类；抽象类不能生成对象，是用来定义规则，被继承的
	String name;
	int age;
	Person(){
		...  //抽象类中可以声明构造函数
	}
	void say(){  //普通的函数
		...
	}
	abstract void eat();  //只有函数定义，没有函数体的函数叫抽象函数；使用abstract定义
}
class chinese extends Person{  //继承抽象类
	void eat(){  //重写抽象函数；必须把父级抽象类中的抽象函数全都重写
		...
	}
}

//软件包///////////////////////////////////////////////
package tirion;  //在文件的开头就使用package关键字来指定包名
class Test{
	public static void main(String args[]){
		System.out.println("这是一个包");  
	}
}

javac -d . Test.java  //在编译的时候使用-d表示将编译后的文件放入根据包名生成的文件夹中，这里就会放入tirion文件夹，.表示文件夹的位置，就是当前目录；会自动生成文件夹
打包之后，类名就需要使用包名.类名来访问，这里的Test类就变成了tirion.Test
一个包里的类调用另一个包里的类，可以使用全名，也就是包名.类名来调用

//访问权限///////////////////////////////////////////
public  //可以用于类名和包名，与PHP不同，默认不是public；当一个包中的类访问另一个包中的类，那个被访问类使用public声明，则可以访问，同理成员属性和方法也是（可以无任何限制的调用）
private  //作用和PHP类似；通常只修饰成员变量和方法，不修饰类
default  //默认权限，不用写权限修饰符；同一个包里的可以任意调用，不同包则不能相互调用
protected  //只能修饰成员属性和方法；首先拥有和default相同的权限，并且可以跨包调用，但是调用的那个类必须是被调用的子类
import 包名.类名  //导入另一个包里的类，导入后则不用写包名.类名，直接写类名即可，主要用于public

//接口////////////////////////////////////
interface USB{  //和PHP一样使用interface定义，也是用于制定规则；接口中的方法都是抽象方法，权限都是public，这是默认的，所以不用在前面写abstract和public
	void read();
	void write();
}
interface WIFI{  //接口可以使用extends实现接口，也能一次实现多个接口，这里不演示，类似PHP
	void open();
	void close(String s);  //可以定义需要传入的参数
}
class Phone implements USB,WIFI{  //使用implements实现接口；并且可以实现多个接口，使用,隔开
	void read(){
		...
	}
	void write(){
		...
	}
	void open(){
		...
	}
	void close(String s){
		...
	}
}
class Test{
	public static void main(String args[]){
		Phone phone=new Phone();
		USB usb=phone;  //向上转型
		usb.read();
		usb.write();
		WIFI wifi=phone;  //向上转型
		usb.open();
		usb.write();
	}
}

//异常处理/////////////////////////////////////////////////////
异常(Exception)：中断了正常指令流的事件；和编译出现问题无关；编译通过了，但在运行时出现了问题
class Test{
	public static void main(String args[]){
		System.out.println("第一句话");
		int i=1/0;
		System.out.println("第二句话");
	}
}
上面这段代码会通过编译，但是在运行时却会报异常，因为1不能除以0；第一句话能输出，第二句话不能输出
class Test{
	public static void main(String args[]){
		System.out.println(1);
		try{
			System.out.println(2);
			int i=1/0;
			System.out.println(3);
		}catch (Exception e){  //使用try-catch处理异常，e是异常对象
			e.printStackTrace();  //内置异常对象的一个方法，获取异常信息
			System.out.println(4);
		}finally{  //finally是无论是否出异常都会执行的；不是必须的
			System.out.println(5);
		}
		
		System.out.println(6);
	}
}
上面这段代码会打印出 12异常信息456
class User{
	int age;
	public void setAge(int age){
		if (age<0){  //自定义异常
			RuntimeException e=new RuntimeException("年龄不能为负数");  //使用JDK内置的RuntimeException类来处理异常
			throw e;  //使用throw抛出异常，程序运行终止
		}
		this.age=age;
	}
}

class User{
	int age;
	public void setAge(int age){
		if (age<0){
			Exception e=new Exception("年龄不能为负数");  //这里改为了Exception则是调用的Exception类，则在编译时就会报告异常，需要进行处理
			throw e;
		}
		this.age=age;
	}
}

class User{
	int age;
	public void setAge(int age) throws Exception{  //这里使用了 throws 异常类型 来声明这里可能出现异常，则编译这个文件时不会报告异常，但是在编译调用这个文件的文件时会报告异常，需要对调用这个的文件使用try-catch来进行异常处理
		if (age<0){
			Exception e=new Exception("年龄不能为负数");
			throw e;
		}
		this.age=age;
	}
}

//I/O//////////////////////////////////////////////////////
I/O的分类：1、输入流/输出流； 2、字节流(如MP3文件)/字符流(如文本文件)； 3、节点流(普通的水管)/处理流(能处理里面的水的水管)
//字节流：读写文件以字节为基础
核心类： InputStream->FileInputStream->read(byte[] b,int off,int len)  OutputStream->FileOutputStream->write(byte[] b,int off,int len)
import java.io.*;  //首先导入IO类
class Test{
	public static void main(String args[]){
		FileInputStream fis=null;  //声明输入流引用：首先声明一个空的FileInputStream类
		FileOutputStream fos=null;  //声明输出流的引用
		try{
			fis=new FileInputStream("./from.txt");  //实例化输入类，传入要输入的文本
			fos=new FileOutputStream("./to.txt");  //声明代表输出流的对象
			byte[] buffer=new byte[100];  //创建一个长度为100的byte类型的数组，名为buffer
			int tmp=fis.read(buffer,0,buffer.length);  //使用read()将from.txt中的数据读入buffer数组；第一个参数是byte类型的数组，第二个参数是偏移量(从第几个开始读入)，第三个参数是读取的长度；读入buffer后from.txt里的文本会转换为ASC码(如a-97,b-98,c-99)，如果读入buffer的内容长度少于创建buffer时指定的长度，则后面的会用空字符占位；返回值为这次读入了多少个数据
			fos.write(buffer,0,tmp);  //将buffer里的数据输出到to.txt中
			String s=new String(buffer);  //将buffer转换为字符串，ASC码会转换为字符
			s=s.trim();  //使用trim取出字符串的首尾空格和空字符
		}
		catch (Exception e){
			System.out.println(e);
		}
	}
}

class Test{  //读写大文件的操作，一次读写一部分，循环读写
	public static void main(String args[]){
		FileInputStream fis=null; 
		FileOutputStream fos=null;
		try{
			fis=new FileInputStream("./from.txt");
			fos=new FileOutputStream("./to.txt");
			byte[] buffer=new byte[1024]; 
			while (true){
				int tmp=fis.read(buffer,0,buffer.length); 
				if (tmp==-1){  //当文件读到尾部，再读的话，read()返回-1
					break;
				}
				fos.write(buffer,0,tmp);
			}
		}
		catch (Exception e){
			System.out.println(e);
		}
		finally{  //关闭流
			try{  //必须使用try-catch，否则报错
				fis.close();
				fos.close();
			}
			catch (Exception e){
				System.out.println(e);
			}
		}
	}
}
//字符流：读写文件以字符为基础
核心类： Reader->FileReader->read(char[] b,int off,int len)  Writer->FileWriter->write(char[] b,int off,int len)
import java.io.*;
class Test{  //使用方法和字节流类似，只是调用的类不同，一个是FileInputStream，一个是FileReader；大文件读写也一样
	public static void main(String args[]){
		FileReader fr=null;
		FileWriter fw=null;
		try{
			fr=new FileReader("./from.txt");
			fw=new FileWriter("./to.txt"); 
			char[] buffer=new char[100];
			int tmp=fr.read(buffer,0,buffer.length);
			fw.write(buffer,0,tmp);
		}
		catch (Exception e){
			System.out.println(e);
		}
		finally{
			try{
				fr.close();
				fw.close();
			}
			catch (Exception e){
				System.out.println(e);
			}
		}
	}
}
//处理流：读取数据并处理
核心类： BufferedReader-readLine()
import java.io.*;
class Test{
	public static void main(String args[]){
		FileReader fr=null;
		BufferedReader br=null;
		try{
			fr=new FileReader("./from.txt");  //必须有个节点流
			br=new BufferedReader(fr);  //将节点流FileReader对象传入BufferedReader（装饰者设计模式）
			String line=null;
			while (){
				line=br.readLine();  //使用readLine()每次读取一行
				if (line==null){  //当返回值为null的时候读到了尾部
					break;
				}
				System.out.println(line);
			}
		}
		catch (Exception e){
			System.out.println(e);
		}
	}
}

//内部类//////////////////////////////////////////////////////////////
class A{
	int i;
	class B{
		int j;
		int funB(){  //在内部类中可以随意使用外部类的成员属性和方法，但不是继承关系
			int rs=i+j;
			return rs;
		}
	}
}
编译后将会生成A.class和A&B.class两个文件
class Test{
	public static void main(String args[]){
		A a=new A();  //生成外部类的对象
		A.B b=new A().new B();  //生成内部类的对象
		A.B b=a.new B();  //等同于上面那句
	}
}

//多线程///////////////////////////////////////////////////
多进程：在操作系统中，能同时运行多个程序；多线程：在一个应用程序中，有多个顺序流同时执行
class FirstThread extends Thread{  //需要继承JDK里的Thread类
	public void run(){  //重写Thread的run方法
		for (int i=0; i<100; i++){    //这里开始就是要运行的代码
			System.out.println("ft-->"+i);
		}
	}
}
class Test{
	public static void main(String args[]){
		FirstThread ft=new FirstThread;  //生成线程类对象
		ft.start();  //调用start方法启动线程，进入就绪状态；当抢到CPU便执行run方法中的代码
		for (int i=0; i<100; i++){  //这是主函数里的循环；打印结果为run里的循环和这里的交替，互相抢线程；run是一个线程，main是一个线程
			System.out.println("main-->"+i);
		}
	}
}
//第二种方法；通常使用这种方法，因为继承只能继承一个，而接口可以实现多个
class RunnableImpl implements Runnable{  //首先实现Runnable接口
	public void run(){  //重写run方法
		for (int i=0; i<100; i++){    //这里开始就是要运行的代码
			System.out.println("ft-->"+i);
			if (i==50){
				try{  //执行sleep需要使用异常处理
					Thread.sleep(2000);  //使用sleep让线程休眠2000毫秒，然后醒来继续抢线程；是Thread类中的静态方法
					Thread.yield();  //当前线程会让出CPU，然后重新开抢
				}
				catch (Exception e){
					System.out.println(e);
				}
				
			}
		}
	}
}
class Test{
	public static void main(String args[]){
		RunnableImpl ri=new RunnableImpl();  //生成Runnable接口实现类的对象
		Thread t=new Thread(ri);  //将RunnableImpl对象传入Thread对象
		t.start();  //调用start方法启动线程
		t.setPriority(Thread.MAX_PRIORITY);  //设置所在线程的优先级，这里使用Thread里的静态常量MAX_PRIORITY设置为最大，MIN_PRIORITY最小；优先级越高执行的概率越大
		t.getPriority();  //取得所在线程的优先级，这里就是main线程；默认值为5，最大为10，最小为1
	}
}
//线程同步与同步错误
class MyThread implements Runnable{
	int i=100;  //这个整型变量将被共用
	public void run(){
		while (true){
			synchronized(this){  //使用synchronized来同步线程代码块；某个线程运行到这里的时候，会占有这个代码块，即使被抢占CPU，也不会让别的线程进来运行
				System.out.println(Thread.currentThread().getName()+i);  //Thread.currentThread()会返回一个线程对象，就是当前正在运行的线程，然后调用getName()获取线程名
				i--;
				Thread.yield();
				if (i<0){
					break;
				}
			}
		}
	}
}
class Test{
	public static void main(String args[]){
		MyThread mt=new MyThread();  //生成Runnable接口实现类的对象
		//生成两个Thread对象，但是这两个Thread对象共用一个线程体
		Thread t1=new Thread(mt);
		Thread t2=new Thread(mt);
		//每一个线程都有名字，可以通过Thread对象的setName()方法设置线程名字，也可以通过getName()方法获取线程名字
		t1.setName("线程a");
		t2.setName("线程b");
		//分别启动两个线程
		t1.start();
		t2.start();
	}
}
这段代码可能会出现错误，错误在于，运行System.out.println(Thread.currentThread().getName()+i);这段代码的时候，线程a运行完，还没运行到i--就被线程b抢了过去，然后线程b就会再次打印出相同的数；所以，需要是同synchronized来同步线程

//数组////////////////////////////////////////////////////
int arr[]={5,12,7,2,8};  //定义一个静态整型数组，类型是整型数组类型，不是整型；中括号可以写在前面[]arr
arr[3]=10;  //修改第4个键的值
int a=arr[3];  //将第4个值赋值给a
arr.length;  //获取数组的长度
int arr[]=new int[10];  //创建一个长度为10的动态整型数组，每个键的默认值为0
char arr[]=new char[50];  //创建一个长度为50的动态字符串型数组，每个键的默认值为空
int arr[][]={{123},{456},{789}};  //创建一个二维数组
for (int i=0; i<arr.length; i++){
	for (int j=0; j<arr[i].length; j++){  //注意这里使用arr[i].length来获取长度，而不是i.length
		System.out.println(arr[i][j]);
	}
}
int arr[][]=new int[10][5];  //定义动态二维数组

//类集框架//////////////////////////////////////////////////
类集框架是一组类和接口，位于java.util包中，主要用于存储和管理对象，主要分为三大类——集合，列表和映射
集合(set)：集合中的对象不按特定的方法排序，没有顺序，并且没有重复
列表(list)：列表中的对象按照索引位置排序，可以有重复（索引数组，会自动增长）
映射(map)：映射中的每个元素包含一个键对象，和一个值对象，键不可以重复，值可以重复（关联数组，会自动增长）
//集合的使用
Iterator->Collection->Set->HashSet  接口到实现类
import java.util.Set;
import java.util.HashSet;
import java.util.Iterator;
public class Test{
	public static void main(String args[]){
		HashSet<String> hs=new HashSet<String>();
		Set<String> set=hs;  //向上转型为Set类型，某些函数需要传入一个Set类型
		set.add('a');
		set.add('b');
		set.add('c');
		set.add('c');  //集合里面的重复元素会被忽略掉，长度依然为3
		int i=set.size();
		set.remove('a');  //移除某个元素，传入的是元素值，而不是索引
		set.clear();  //清空所有元素
		set.isEmpty();  //判断是否为空，空返回true，否则返回false

		Iterator<String>.it=set.iterator();  //调用Set对象的iterator方法会生成一个迭代器对象，该对象用于遍历整个Set
		it.hasNext();  //判断是否还有下一个元素，有返回true，没返回false
		it.next();  //取出下个元素返回，指针往后移一位，没有则返回false；注意是无序排列的
	}
}
//列表的使用
Iterator->Collection->List->ArrayList  接口到实现类
import java.util.List;
import java.util.ArrayList;  //映入List和ArrayList两个类
public class Test{
	public static void main(String args[]){
		ArrayList<String> al=new ArrayList<String>();  //实例化ArrayList类，必须使用<String>来指定存储数据类型
		al.add('a');
		al.add('b');  //使用add方法添加数据
		String s=al.get(0);  //使用get方法取出第一个元素
		int i=al.size();  //使用size方法获取长度
		al.remove(1);  //使用remove方法移除某个元素
	}
}
//映射的使用
import java.util.Map;
import java.util.HashMap;  //映入List和ArrayList两个类
public class Test{
	public static void main(String args[]){
		HashMap<String,String> hm=new HashMap<String,String>();  //实例化HashMap类，必须使用<String,String>来指定存储数据键值类型
		Map<String,String> m=hm;  //向上转型为Map类型
		m.put("1","a");  //存入数据
		m.put("2","b");
		m.put("3","c");
		m.put("2","d");  //后面的将覆盖前面的
		int i=m.size();  //取出个数
		String s=m.get("3");  //取出一个键的值
	}
}
//equals()方法//////////////////////////////////////////////////
属于object类中，所有的类都集成这个类，都有这两个方法
//hashCode()和toString()/////////////////////////////////////////////////////////
属于object类中，所有的类都集成这个类，都有这两个方法
两个对象，如果equals相比较相等，则hashCode也应该相等