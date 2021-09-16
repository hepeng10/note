添加ADB命令：环境变量—PATH里添加：C:\Mine\APP\Android\sdk\platform-tools。这是一个Android的调试工具，在Android的SDK里

什么是程序：算法+数据结构
算法：表达式、流程控制、方法等，动态的； 数据结构：类、接口、数据类型等，静态的
多线程异步：由于Android中需要大量的异步操作，所以除了Thread外还有Handler和AsyncTask这两种异步类，方便我们使用
一切都是类：Layout布局文件、Manifest.xml配置文件也是一个类，通过JAVA的反射（Reflection）实现
instanceof用法：用于检验类型，如是Button还是TextView，然后根据类型进行相应的操作



//Android开发需要：SDK和Eclipse的ADT
下载SDK，进入SDK目录，将tools文件夹的路径加入系统环境变量，这里面是一些命令，加入了环境变量才能直接在CMD中执行这些命令
在eclipse中安装ADT，帮助-安装新软件中，地址为：https://dl-ssl.google.com/android/eclipse
在首选项-Android 中的SDK location中选择SDK目录的路径
工具栏的AVDManager中添加一个设备

//新建android项目：
注意：包名要唯一，因为Android识别的时候是根据包名来的，若两个不同的APP的包名相同，则Android会识别为同一个APP
选项：Mark this project as a library作用是让创建的这个APP是作为一个由别的APP调用的包，而不是独立的APP

//目录结构：
src  编写的源文件
gen  eclipse自动生成，无需修改，里面的R.java将res目录里的各种资源作为键值对保存，方便引用
android4.4  引用的Android类库都来源于这里面的jar文件
res  在里面放入需要的文件，每个文件都会在gen里的R.java里生成一个ID：drawable是放置不同分辨率图片的；
layout  是布局文件，每个xml文件会生成一个ID；values里存放键值对，每个键值对会生成一个ID（strings.xml里一般就是界面上显示的文字）；
AndroidMainfest.xml  是整个应用的配置文件，@drawable/ic_launcher表示引用R.java里的drawable类里的ic_launcher变量这个资源
assets  也是在里面放入需要的文件，但是不会在R.java里生成ID；若要引用，则必须自己指定路径
libs  第三方jar（类库）文件
Manifest.xml  配置文件
ic_launcher  APP图标
proguard-project.txt  设置代码混淆，防止反编译
project-properties  设置项目的属性：SDK版本什么的

//Android四大天王：
Activity 构造界面的组件，负责应用程序数据的显示，类似一个网页
Service 为应用程序提供服务支持，通常用来处理耗时较长的操作，网络连接、IO操作等
ContentProvinder 数据接口，应用程序之间的访问接口，如APP需要访问联系人、短信等就需要通过ContentProvider
BroadcastReceiver 广播机制，如手机来电或来短信，系统就会向外发出相应的广播，APP就可以通过接收这些广播来进行相关操作
//其它常用组件
Intent 用于各个组件之间的数据传输
Toast 弹出提示，几秒后消失那种



//创建Activity
1、一个Activity就是一个类，并且要继承Activity
2、需要复写onCreate方法；当Activity第一次运行的时候会调用此方法
3、每一个Activity都需要在AndroidManifest.xml文件中进行配置（添加一个Activity标签，并写上相应的内容）
4、为Activity添加必要的控件（按钮、文本等等，在res/layout/main.xml中添加和布局）

//view：在Android中，各种控件被称为view。View类是所有控件类的父类
setContentView(R.layout.activity_main);  //设置Activity使用的布局文件
TextView textView=(TextView)findViewById(R.id.textView);  //通过findViewById()来获取控件，返回类型为View类型，所以需要强制向下转换为控件的类型
textView.setText("我的第一个textView");  //获取的控件对象有许多方法可调用，完成不同的功能。布局文件里控件的各种属性都能通过相应的方法进行设置

//监听器：是一个类，监听着控件的变化；当控件发生变化时会通知监听器，然后通过监听器来进行操作；一个控件可以绑定多个监听器响应不同的事件
//普通内部类实现监听器：由于实例化了一个对象，所以可以将这个监听器用在多个控件上
class Listener implements OnClickListener{  //通过内部类实现监听器，不同的监听器实现的类不同
	public void onClick(View v) {  //重写监听器的方法完成自己的需求，不同的监听器有不同的方法
		// TODO 
	}
}
Listener listener=new Listener();  //实例化监听器
button.setOnClickListener(listener); //将监听器绑定到指定的控件上
//这是使用匿名内部类的方法创建监听器：不用创建类，简单方便
button.setOnClickListener(new OnClickListener(){
	public void onClick(View v){  //当控件被点击的时候，接收的View对象就是那个控件对象
		Int id=v.getId();  //操作控件对象，获取到控件的id
		System.out.println(id);
	}
});




//布局：布局之间可以嵌套
距离单位：px（很少用） dp（常用） sp（可缩放的dp，通常指定字体大小，当修改了系统字体大小时会变化）
LinearLayout-线性布局：从上到下或从左到右；一个控件占一行；当两个控件都很小，不能占满一行的时候，也不会排成一行（很少用：初学者学习用）
TableLayout-表哥布局：表格不解释（不常用）
RelativeLayout-相对布局：类似DIV（最常用）
ListView-列表布局：一行中可以有多个控件，这些控件是一个整体组成一行；像联系人那样一行就是一块数据（某些APP常用：微信）
GridView-网格布局
//LinearLayout-线性布局
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"  //设置布局方向：vertical-垂直，horizontal-水平
	android:layout_width="fill_parent"  //fill_parent-填满父控件，wrap_content-由内容决定大小
	android:layout_height="wrap_content" >
    <TextView 
        android:id="@+id/text"  //为控件定义ID供别的文件调用
		android:text="@string/text"  //指定控件中显示的文字
        android:gravity="center_vertical"  //指定控件里内容的位置，比如居中、居右等
        android:textSize="35pt"
        android:background="#cccccc"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
		android:padding="10dp"  //指定控件内边距
		android:paddingBottom="10dp"
		android:paddingLeft="15dp"
		android:paddingRight="20dp"
		android:paddingTop="10dp"
		android:layout_margin="10dp"  //同样有margin；因为margin影响view和view之间，所以有layout前缀
		android:layout_marginTop="10dp"
		android:layout_weight="2"  //当有多个控件，并且未能占满父控件而留有空闲空间时，空闲空间分配的比例；这里有3个控件，此参数的和为6，空闲空间将分配2/6给此控件；如果要让每个控件占父控件的x/y的话，只需将所有控件的width设置为0即可
		android:singleLine="true"  //如果为真的话，则将控件的内容在同一行中进行显示；false时自动换行
    />
    <EditText 
        android:id="@+id/text2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
		android:layout_weight="3"/>
	<Button
	    android:id="@+id/button"
	    android:layout_width="wrap_content"
	    android:layout_height="wrap_content"
		android:layout_weight="1"/>
</LinearLayout>
//TableLayout-表格布局
<TableLayout
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	android:stretchColumns="0">  //当所有列的数据无法填满窗口时，拉伸第几列来填满窗口；从0开始为第一列
	<TableRow>  //一行
		<TextView  //一列
			android:text="@string/text"
			android:background="#aa0000"
			android:padding="5dp"/>
		<TextView 
			android:text="@string/text"
			android:background="#aa0000"
			android:padding="5dp"/>
	</TableRow>
	<TableRow>
		<TextView 
			android:text="@string/text"
			android:background="#0000aa"
			android:padding="5dp"/>
	</TableRow>
</TableLayout>
//RelativeLayout-相对布局；性能强（布局嵌套越多性能越差，如LinearLayout布局）
常用属性（写在控件上）：
第一类:属性值为true或false
android:layout_centerHrizontal="true" //水平居中
android:layout_centerVertical //垂直居中
android:layout_centerInparent //相对于父元素完全居中
android:layout_alignParentBottom //贴紧父元素的下边缘
android:layout_alignParentLeft //贴紧父元素的左边缘
android:layout_alignParentRight //贴紧父元素的右边缘
android:layout_alignParentTop //贴紧父元素的上边缘
android:layout_alignWithParentIfMissing //如果对应的兄弟元素找不到的话就以父元素做参照物
第二类：属性值必须为id的引用名“@id/idNname”
android:layout_below="@id/firstView" //在某元素的下方
android:layout_above //在某元素的的上方
android:layout_toLeftOf //在某元素的左边
android:layout_toRightOf //在某元素的右边
android:layout_alignTop //本元素的上边缘和某元素的的上边缘对齐
android:layout_alignLeft //本元素的左边缘和某元素的的左边缘对齐
android:layout_alignBottom //本元素的下边缘和某元素的的下边缘对齐
android:layout_alignRight //本元素的右边缘和某元素的的右边缘对齐
android:layout_alignBaseline //本元素的baseline和某元素的baseline对齐
第三类：属性值为具体的像素值，如30dp，40px
android:layout_marginBottom="10dp" //离某元素底边缘的距离
android:layout_marginLeft //离某元素左边缘的距离
android:layout_marginRight //离某元素右边缘的距离
android:layout_marginTop //离某元素上边缘的距离

//RadioGroup-单选按钮
<RadioGroup  //使用RadioGroup创建一个单选组
	android:id="@+id/genderGroup"
	android:layout_width="wrap_content"
	android:layout_height="wrap_content"
	android:orientation="vertical"
	>
	<RadioButton  //一个单选按钮
		android:id="@+id/maleButton"
		android:layout_width="wrap_content"
		android:layout_height="wrap_content"
		android:text="@string/male"
		/>
	<RadioButton
		android:id="@+id/fmaleButton"
		android:layout_width="wrap_content"
		android:layout_height="wrap_content"
		android:text="@string/female"
		/>
</RadioGroup>
genderGroup=(RadioGroup)findViewById(R.id.genderGroup);  //组对象
femaleButton=(RadioGroup)findViewById(R.id.femaleButton);  //单个按钮的对象
maleButton=(RadioGroup)findViewById(R.id.maleButton);
public Class RadioTest extends Activity{
	private RadioGroup genderGroup=null;
	public OnCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		setContentView(R.layout.radio);
		//通过调用RadioGroup组标签对象的setOnCheckedChangeListener()来监听器，当点击genderGroup组的任何一个单选按钮时都会触发这个监听器
		genderGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener(){  //匿名内部类创建监听器
			//当genderGroup组中的单选按钮状态发生变化的时候调用onCheckedChanged()方法
			public void onCheckedChanged(RadioGroup group,int checkedId){  //复写onCheckedChanged()方法，接收绑定的RadioGroup对象和被选中的单选按钮对象的ID
				if (femaleButton.getId()==checkedId){  //通过getId()获取id，来判断与传入的id是否相等
					System.out.println("female");
					Toast.makeText(RadioTest.this,"female",Toast.LENGTH_SHORT).show();  //Toast是个短暂弹出提示框，使用makeText()方法生成一个对象（第一个参数是Activity对象，第二个参数是弹出框中显示的内容，第三个参数有LENGTH_SHORT和LENGTH_LONG设置显示时长），最后调用show()方法进行显示
				}else if (maleButton.getId()==checkedId){
					System.out.println("male");
				}
			}
		});
	}
}
注意：可以单独给每个单选按钮绑定 OnCheckedChangeListener(CompoundButton buttonView,boolean isChecked) 来实现功能

//CheckboxGroup-多选框
<CheckBox
	android:id="@+id/swim"
	android:layout_width="wrap_content"
	android:layout_height="wrap_content"
	android:text="@string/swim"
	/>
<CheckBox
	android:id="@+id/run"
	android:layout_width="wrap_content"
	android:layout_height="wrap_content"
	android:text="@string/run"
	/>
<CheckBox
	android:id="@+id/sleep"
	android:layout_width="wrap_content"
	android:layout_height="wrap_content"
	android:text="@string/sleep"
	/>
swimBox=(CheckBox)findViewById(R.id.swim);
runBox=(CheckBox)findViewById(R.id.run);
sleepBox=(CheckBox)findViewById(R.id.sleep);
//通过调用每个独立的checkBox对象的setOnCheckedChangeListener()方法来监听，每个Checkbox都要添加监听器才行（这里使用了匿名内部类的写法）
swimBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener(){
	//当Checkbox选中状态发生改变的时候会调用onCheckedChanged()方法
	public void onCheckedChanged(CompoundButton buttonView,boolean isChecked){  //复写onCheckedChanged()方法；接收所绑定的控件对象（CompoundButton：一个拥有两种选中状态的控件就是CompoundButton的子类）和选中状态（选中的时候为true否则为false）
		int id=buttonView.getId();  //通过接收到的控件对象获取其ID
		System.out.println(id);
		if (isChecked){  //当控件选中时
			System.out.println("swim is checked");
		}else{
			System.out.println("swim is unchecked");
		}
	}
});
注意：也可以使用 OnClickListener 来监听

//ImageView-图片
<ImageView
	android:id="@+id/image"
	android:layout_width="100dp"  //将宽高设置为指定的dp
	android:layout_height="100dp"
	android:background="#FF0000"
	android:src="@drawable/pic1"  //使用src指定显示的图片；可以使用网络的、应用的、SD卡的，这里使用的是应用内的drawable目录中的图片
	android:scaleType="fitCenter"  //重点：设置图片的缩放模式，默认为fitCenter
/>
scaleType的类型：
	fitCenter：等比缩放至控件能包含的大小，长边和控件相等，并居中显示
	fitStart：同上，靠上显示
	fitEnd：同上，靠下显示
	fitXY：缩放到和控件一样大小，完全填充控件
	center：不缩放，居中显示，超出控件的部分隐藏
	centerInside：超过控件大的等比缩小至控件大小，不超过的保持大小
	centerCrop：等比缩放，短边和控件相等，长边超出的隐藏
ImageView img=(ImageView)findViewById(R.id.image);  //获取image控件
img.setImageResource(R.drawable.pic2);  //使用setImageResource()方法设置图片
img.setScaleType(ScaleType.CENTER);  //使用setScaleType()设置图片缩放模式；ScaleType是个枚举




//Manifest.xml配置
//每创建了一个Activity都需要进行注册
<activity
	android:name="com.example.android.Activity2"
	android:label="@string/activity2"/>






//Intent的使用：
startActivity(Intent intent);  //使用startActivity()方法，传入一个Intent对象，跳转到另一个Activity
Intent对象包含了一组信息（Intent就是一个请求）：Componentname，Action，Data，Extras，Category，Flags
Componentname：要启动哪个组件，如Activity、Service
Action：启动的那个组件要做什么样的动作；包括ACTION_CALL,ACTION_EDIT等
Data：传送的数据
Extras：键值对，也是一种数据传输
注意：每创建了一个Activity就需要在Android Manifest里进行注册：
<activity
	android:name="com.example.android.Activity2"
	android:label="@string/activity2"/>
public class MainActivity extends Activity {
	class Listener implements OnClickListener{
		public void onClick(View v) {
			// TODO 自动生成的方法存根
			Intent intent=new Intent();  //实例化Intent类
			intent.putExtra("test", "123");  //使用putExtra()传递一个键值对
			intent.setClass(MainActivity.this, Activity2.class);  //调用setClass()方法实现跳转，传入两个Activity对象；从当前Activity跳转到Activity2；因为这是一个内部类，所以使用类名.this来生成外层类的匿名对象，如果直接使用this则是它自己而不是MainActivity；类名.class也是生成一个匿名对象
			MainActivity.this.startService(intent);  //通过当前的Activity调用startService()方法，传入intent对象
		}
	}
}
button.setOnClickListener(new Listener());  //创建监听器后，需要在onCreate方法中，通过 按钮对象.setOnClickListener(new 监听器类); 将监听器绑定到按钮上
//这是另一个Activity
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity2);  //使用setContentView()方法设置布局文件
	Intent intent=getIntent();  //使用getIntent()获取传过来的Intent
	String str=intent.getStringExtra("test");  //使用getStringExtra()获取Extra
	TextView tv=(TextView)findViewById(R.id.activity2);  //得到控件
	tv.setText(str);  //往这个控件里添加字符串
}

//四种Activity控件的使用：TextView,EditText,Button,Menu
//在main.xml中创建不同类型的控件
<EditText 
	android:id="@+id/text1"
	android:layout_width="fill_parent"
	android:layout_height="wrap_content"/>
<TextView 
	android:id="@+id/text"
	android:layout_width="fill_parent"
	android:layout_height="wrap_content"
	android:text="@string/text"/>
<Button
	android:id="@+id/button"
	android:layout_width="fill_parent"
	android:layout_height="wrap_content"/>
//在activity中使用控件
text1=(EditText)findViewById(R.id.text1);  //这里已经使用了private EditText text1;声明，下面的3个同理
text=(TextView)findViewById(R.id.text);
button=(Button)findViewById(R.id.button);
text.setText(R.string.text);  //使用setText()传入显示的字符串
button.setText(R.string.button);
//监听器
class Listener implements OnClickListener{
	public void onClick(View v) {
		String text1Str=text1.getText().toString();  //使用getText()方法获取用户输入的数据并使用toString方法转换为String类型
		Intent intent=new Intent();
		intent.putExtra("one", text1Str);
		intent.setClass(MainActivity.this, Activity2.class);
		MainActivity.this.startActivity(intent);
	}
}
//计算结果显示Activity
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity2);
	TextView result=(TextView)findViewById(R.id.result);
	Intent intent=getIntent();
	String oneStr=intent.getStringExtra("one");  //获取intent传过来的数据
	int oneInt=Integer.parseInt(oneStr);  //将String类型转换为int类型
	int res=oneInt*twoInt;
	result.setText(res+"");  //由于setText需要接收的是个String类型，所以加上一个空字符串，就能把整形转换为String类型
}
//显示菜单：是一个回调函数；实现onCreateOptionsMenu()方法，接收一个menu对象；当点击手机的menu键时会执行这个方法
public boolean onCreateOptionsMenu(Menu menu) {
	menu.add(0, 1, 1, R.string.exit);  //添加一个菜单（item），参数为（组，itemID，排序，内容）
	menu.add(0, 2, 2, R.string.about);
	return true;  //直接return true就行了
}
//为菜单添加事件：也是一个回调函数；当点击菜单中的选项的时候会自动调用此函数，将点击选项的ID传入；当点击menu键弹出的选项中的一项是执行此方法
public boolean onOptionsItemSelected(MenuItem item) {
	if (item.getItemId()==1){  //使用getItemId()获取点击按钮的itemId
		finish();  //使用finish()方法结束程序
	}
	return super.onOptionsItemSelected(item);
}

//Activity生命周期
7个生命周期函数：onCreate(),onStart(),onRestart(),onResume(),onPause(),onStop(),onDestroy()
启动一个Activity就会调用onCreate()，onStart(),onResume()这三个方法
onCreate()  //当Activity第一次启动的时候调用，需要在这里面设置布局、绑定监听器等
onStart()  //当Activity可以被用户看到的时候调用
onResume()  //当Activity可以获得用户的焦点（获取点击等操作）的时候调用
onPause()  //当应用程序启动了另外一个Activity的时候调用，然后会运行新启动的Activity的onCreate()，onStart(),onResume()方法；不一定是自己启动新的Activity，也可能是来了电话等，当电话界面启动的时候也是一个Activity；应当在这个方法中写将当前界面的数据保存起来的代码
onStop()  //当此Activity处于不可见的状态的时候调用；启动了一个新的Activity完全挡住了原来的，则原来的会启动此方法
onRestart()  //当从新的Activity返回到原来的Activity（不可见状态：stop()到可见状态），原来的Activity就会调用此方法
onDestroy()  //当Activity使用了finish()方法或系统资源不够用的时候，会调用此方法；销毁后再启动，仍然会执行onCreate()方法
onPause(),onStop(),onDestroy()  //当Activity在这三种状态的时候，可能会因为系统资源不足而被杀掉
//Task和Activity
Task（任务）是个栈（先进后出），里面存放了很多个Activity。一个task中，每新开一个Activity就会往task里依次压入，显示的是最上面的Activity；当返回的时候就会依次弹出。一个task中可能是不同应用程序的Activity
//对话框（窗口）风格的Activity
<activity
	android:name="com.example.android.Activity2"
	android:label="@string/activity2"
	android:theme="@android:style/Theme.Dialog"/>  //只需要在Android Manifest.xml中新建的activity标签中加入这样代码来指定theme即可；窗口风格只会调用onPause()而不会调用onStop()


