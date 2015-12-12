Windows使用git bash shell或powershell替代cmd，因为cmd不支持bash脚本；安装git后就有git bash这个shell程序了

NPM-Node Package Manager:node包管理和分发工具

命令行选项可以分为短命令行选项和长命令行选项两种。短命令行选项是由字母组成，长命令行选项是由单词组成。短命令行选项在选项前使用单横杠“-”，长命令行选项前使用双横杠“--”。如果选项后面需要输入选项的参数，短命令行选项和参数之间使用空格分隔，而长命令行选项使用等号“=”连接选项和参数。

安装/卸载
npm init  在当前命令行所在目录生成package.json文件，然后使用npm install name --save-dev将需要的依赖包写入
npm install  安装当前命令行所在目录中的package.json文件中devDependencies中所有的依赖
npm install module-name  安装模块到当前目录（某些模块不会，比如gulp）
npm install module-name --save  安装模块，自动把模块和版本号添加到dependencies部分
npm install module-name --save-dev  安装模块，自动把模块和版本号添加到package.json中devdependencies部分
npm install module-name -g  安装模块到全局
指定版本安装：npm install -g jquery@1.9.1  使用 @版本号 安装指定版本
卸载安装：npm uninstall|remove -g jquery  使用uninstall或remove都可以卸载安装的模块
*注：-g是安装在全局，安装在全局可以免去配置环境变量的问题，安装目录为C:\Users\Administrator\AppData\Roaming\npm\node_modules；当没使用-g命令安装的时候，会安装到当前命令行所在目录的node_modules中，所安装工具目录中的package.json文件记录着这个工具的相关信息

NPM可选工具：
安装n：npm install -g n。n模块用来管理node.js的版本，升级node使用命令 n stable 即可。n v0.12.2安装指定版本。Windows不可用，重新下载需要版本覆盖安装
安装grunt：npm install -g grunt-cli(还需安装grunt的相关插件，gruntjs.net网站中查看教程，其中uglify,concat,watch需要安装，例：npm install grunt-contrib-uglify)。自动化工具。可以用来压缩代码，混淆代码等。
安装gulp:npm install -g gulp。类似grunt，但是更简单好用。
安装bower：npm install bower -g。包管理器，可以用来管理依赖组件，维护依赖组件等。如下载jquery等，例：bower install jquery。在使用bower命令的时候需要进入cd node_modules/.bin目录中，安装的组件也在.bin目录中的bower_components里。另，如果安装提示没git，需要环境变量中添加git的bin目录进行支持
安装http-server：npm install -g http-server。可以将计算机上的任何一个目录作为http服务器，就能通过浏览器直接访问。cd进入需要的目录，使用http-server命令即可。也可通过参数设置ip和端口号：http-server -a 127.0.0.1 -p 8080
安装yeoman：npm install yo。在web立项阶段，使用yeoman来生成项目的文件和代码结构。yeoman自动将最佳实践和工具整合进来，方便开发。包含了多种项目情况的生成器（类似模版），我们选择适合自己项目的生成器。
安装jasmine：npm install jasmine。用来做单元测试的。
安装karma：npm install karma。配合jasmine用来自动化做单元测试的。
安装protructor：npm install protructor。angularjs专用测试工具

***由于npm默认下载使用的源可能出现网络不稳定的情况，可以改用淘宝的源：http://npm.taobao.org/
定制一个cnpm命令来替代npm：
npm install -g cnpm --registry=https://registry.npm.taobao.org
然后就可以使用cnpm命令来安装模块了：
cnpm install [name]
同步模块：
cnpm sync connect



常用命令：
cd path  进入path指定的目录
ls  查看当前目录中所有文件；ls -ah包含隐藏文件
mkdir dirname  在当前所在目录中创建一个dirname目录
rm -rf dirname  rm删除目录，-rf递归删除子目录
vim .bowerrc  使用vim命令可以编辑文件，如果文件不存在则是创建文件，可以用这个命令来创建以.开头的文件，Windows中不能直接创建.开头文件（vim需要额外安装）



-gulp的使用："教程：https://github.com/nimojs/gulp-book/"
    通常在全局安装gulp后，还需要cd到项目目录使用--save-dev再安装一次（防止全局 gulp 升级后与此项目 gulpfile.js 代码不兼容）
	cnpm init  初始化package.json文件
	cnpm install gulp --save-dev  使用的组件需要使用--save-dev才会加入package.json中
常用组件：
    压缩JS：cnpm install gulp-uglify --save-dev
    重命名：cnpm install gulp-rename --save-dev
    合并JS：cnpm install gulp-concat --save-dev
    压缩CSS：cnpm install gulp-minify-css --save-dev
    添加浏览器前缀：cnpm install gulp-autoprefixer --save-dev
    压缩图片：cnpm install gulp-imagemin --save-dev，可以去除图片的exif信息
    编译less：cnpm install gulp-less --save-dev
	阻止gulp错误退出：cnpm install gulp-plumber --save-dev
    同步更新/移动端调试：cnpm install browser-sync gulp --save-dev，需要安装python2.7。详情：http://www.ibtool.com/browsersync.html 

// 压缩JS：
1、在需要压缩的js目录中新建gulpfile.js，并配置
var gulp = require('gulp')  // 获取 gulp
var uglify = require('gulp-uglify')  // 获取 uglify 模块（用于压缩 JS）
var rename = require('gulp-rename')
// gulp.task(name, fn) - 定义任务，第一个参数是任务名，第二个参数是任务内容。任务名是自定义的，到时候通过 gulp 任务名 来执行此任务
gulp.task('script', function() {  // 压缩 js 文件；在命令行使用 gulp script 启动此任务
    gulp.src('js/*.js')  // 1. 配置源文件，这里就是压缩js目录下的所有.js文件
    // gulp.src('js/**/*.js')  目录中还有子目录就这样写
        .pipe(uglify())  // 2. 使用uglify压缩文件；gulp.pipe() - 管道，你可以暂时将 pipe 理解为将操作加入执行队列
        .pipe(rename({suffix:'.min'}))  //添加.min后缀a.js变为a.min.js
        .pipe(gulp.dest('dist/js'))  // 3. 配置目标目录，另存压缩后的文件
})
2、使用 cd 命令跳转至 gulpfile.js 文件所在目录
3、在控制台输入 gulp 任务名 可运行任务，此处我们输入 gulp script 回车
*注：gulp script提示not found，使用 cnpm install gulp --save-dev 在本地再安装一次；若没安装gulp-uglify，则使用cnpm install gulp-uglify安装

// 合并JS
concat = require('gulp-concat');
gulp.task('concat', function () {
    gulp.src('dist/js/*.js')
        .pipe(concat('all.js'))  //合并后的文件名
        .pipe(gulp.dest('dist/js'));
});

// 压缩CSS并添加浏览器前缀
var minifyCSS = require('gulp-minify-css')  //获取css压缩组件
var autoprefixer = require('gulp-autoprefixer')  //获取css压缩组件
gulp.task('css', function () {
    gulp.src('css/*.css')
        .pipe(minifyCSS())  //使用pipe()执行minifyCSS()模块即可
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))  //添加浏览器前缀，指定版本号
        .pipe(gulp.dest('dist/css'))
})

// 压缩图片：感觉不适合用于自动执行
var imagemin = require('gulp-imagemin')
gulp.task('images', function () {
    gulp.src('images/*.*')
        .pipe(imagemin({   //压缩图片
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
});

// 编译less
var less = require('gulp-less')
gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))  //将less编译后的css文件目录设置为css的目录，这样就可以和压缩CSS配合使用了
});
gulp.task('less', function () {  //执行多个任务流，编译并压缩，不过sublime的less压缩也不错
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
    gulp.src("css/*.css")
        .pipe(minifyCSS())
        .pipe(gulp.dest("dist/css"))
});
gulp.task('less', function () {  //这样编译并压缩，不会生成中间的未压缩的css文件
    gulp.src('./*/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./'))
});

// 阻止gulp错误退出
当使用gulp监控less、js这些文件变动的时候，当编写的文件出现语法错误，gulp会提示错误，并退出监控。这样就得每次去重启gulp
var plumber = require('gulp-plumber');
gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(plumber())  //在pipe中调用一次plumber()就能避免gulp自动退出了
        .pipe(less())
        .pipe(gulp.dest('css'))
});

// 检测代码修改自动执行任务：
1、在gulpfile.js中添加一个新任务auto
gulp.task('auto', function () {  // 在命令行使用 gulp auto 启动此任务
    gulp.watch(["js/*.js","css/*.css","less/*.less"],["script","css","less"])  // 监听文件修改；第一个参数是监听的文件，第二个参数是要执行的任务（只有一个时可不使用数组，字符串即可）
})
2、在命令行输入gulp auto运行，就开始监控了，若要退出，连按两次ctrl+c
// 使用 gulp.task(taskName,arr) 一次执行多个任务
gulp.task('default', ['script', 'auto'])  // 在命令行使用 gulp default 启动 script 任务和 auto 任务

// 同步更新：会创建一个服务器
var browserSync = require('browser-sync');
gulp.task('browser-sync', function () {  // Static server
    browserSync({
        server: {
            baseDir: "./"  //指定服务器启动根目录
        }
    });
	// 注：两个*表示dist目录下的所有目录，而不仅是根目录，只需要根目录则用一个*号
    gulp.watch("./**/*.*").on('change', browserSync.reload);  //监听任何文件变化，实时刷新页面
});
启动browser-sync：gulp browser-sync



-bower的使用：
cd ...  进入项目目录
bower install jquery  安装方式1：在当前项目目录安装jquery；会从bower的库中查找相关组件并下载到当前项目目录的bower_components目录中
bower install jquery/jquery  安装方式2：当bower中没有而github上有，可通过github的短语安装。如jquery在github的地址是"https://github.com/jquery/jquery"后面的jquery/jquery就是需要的短语
bower install https://github.com/jquery/jquery.git  安装方式3：通过github完整地址安装，http clone url那里
bower install angular --save  安装方式4：安装angular并注册到生产环境，和不带--save是一样的，注册在bower.json的dependencies中
bower install angular --save-dev  安装方式5：安装angular并注册到开发环境，注册在bower.json的devDependencies中
bower install jquery#1.7.2  安装方式6：安装指定版本
bower init  安装好需要的组件后，使用init初始化，然后进行设置，会在当前项目目录中生成一个bower.json的配置文件，记录着依赖信息
bower update jquery  升级jquery组件
bower uninstall jquery  删除包，如果包被依赖则不能删除
使用vim在当前目录新建一个.bowerrc文件，可以进行更多的配置：
{
    "directory":"bower_components",  //配置bower目录
    "proxy":"http://proxy.tencent.com:8080",  //配置代理
    "https-proxy":"https://proxy.tencent.com:8080",  //配置https代理
    "timeout":60000  //配置超时时长
}



-jasmine的使用：单元测试（对软件中的最小可测试单元进行检查和验证，JS里就是函数，JAVA里就是类）
cd ...  进入单元测试目录
bower install jasmine  使用bower安装jasmine
jasmine运行需要4个部分：
    1. 运行时环境：我们这里基于chrome浏览器，通过HTML作为javascript载体
    2. 源文件：用于实现某种业务逻辑的文件，就是我们平时写的js脚本
    3. 测试文件：符合jasmineAPI的测试js脚本
    4. 输出结果：jasmine提供了基于网页的输出结果
// 编写一个HTML页面，引入jasmine相关文件和需要测试的文件以及进行测试的文件，浏览器中运行这个HTML会得到结果
<!DOCTYPE html>
<html>
<head>
<title>jasmine test</title>
    <link rel="stylesheet" type="text/css" href="bower_components/jasmine/lib/jasmine-core/jasmine.css">
    //核心文件用于执行单元测试的类库
    <script type="text/javascript" src="bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
    //用于显示单元测试的结果的类库
    <script type="text/javascript" src="bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
    //用于启动单元测试js
    <script type="text/javascript" src="bower_components/jasmine/lib/jasmine-core/boot.js"></script>
</head>
<body>
<h1>jasmine test</h1>
    <script type="text/javascript" src="src.js"></script>  //我们自己的业务逻辑的js
    <script type="text/javascript" src="test.js"></script>  //单元测试的js
</body>
</html>
// src.js是自己的实现业务逻辑的文件
function sayHello(name){
    return "Hello " + name;
}
function reverseStr(name){
    return name.split("").reverse().join("");
}
// test.js对源文件进行单元测试
// describe()第一个参数是单元测试的描述，第二个参数是个回调函数；discribe()和it()的第一个参数都会在HTML页面中显示，可以点击查看
describe("A suite of basic functions", function() {
    var name;
    // 使用it()进行测试，第一个参数是这个测试的名称（自定义）；第二个参数是个fn，里面编写具体测试代码
    it("sayHello", function() {
        name = "Conan";
        var exp = "Hello Conan";
        // expect()里的值是我们期望得到的结果；toEqual()运行自己的js函数得到一个结果，equal表示期望得到的结果与测试的结果相等
        expect(exp).toEqual(sayHello(name));  //sayHello()是src.js中自己的函数
    });
    // 使用多个it()进行多个测试
    it("reverse word",function(){
        expect("DCBA").toEqual(reverseStr("ABCD"));  //reverseStr()是src.js中自己的函数
        expect("abc").toEqual(reverseStr("cba"));  //多次测试来确定自定义函数的正确性
    });
});
// it()的API：以下都是通过测试的结果
it("Expectations",function(){
    expect("AAA").toEqual("AAA");  //相等
    expect(52.78).toMatch(/\d*.\d\d/);  //正则匹配
    expect(null).toBeNull();  //为空
    expect("ABCD").toContain("B");  //包含
    expect(52,78).toBeLessThan(99);  //小于
    expect(52.78).toBeGreaterThan(18);  //大于

    var x = true;
    var y;
    expect(x).toBe(true);  //全等于===
    expect(x).toBeDefined();  //是否声明切赋值
    expect(y).toBeUndefined();  //是否未声明
    expect(x).toBeTruthy();  //如果转换为布尔值，是否为true
    expect(!x).toBeFalsy();  //如果转换为布尔值，是否为false

    var fun = function() { return a + 1;};
    expect(fun).toThrow();  //检验一个函数是否会抛出一个错误
});
// 测试开始前/后操作
describe("Setup and Teardown",function(){
    var foo;
    beforeEach(function() {  //所有it()执行前做的操作
        foo = 0;
        foo += 1;
    });
    afterEach(function() {  //所有it()执行后做的操作
        foo = 0;
    });
    it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
    });
});
// 异步测试
describe("Asynchronous specs", function() {
    var value;
    beforeEach(function(done) {
        setTimeout(function() {
          value = 0;
          done();
        }, 1);
    });
    it("should support async execution of test preparation and expectations", function(done) {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });
});



-karma的使用：配合jasmine完成自动化单元测试
cd ...  进入单元测试目录
cnpm install -g karma  安装karma
karma start  启动karma，测试是否安装成功
karma init  初始化karma，一路回车即可，在选择浏览器那里可以使用tab切换希望的浏览器；会在当前目录生成karma.conf.js配置文件
cnpm install karma-jusmine  安装集成包karma-jasmine
按照jasmine的使用方法编写测试文件
配置karma.conf.js中的files和exclude如：
    files: ['*.js'],  //使用*.js加载单元测试文件，即src.js和test.js
    exclude: ['karma.conf.js'],  //排除karma.conf.js
karma start karma.conf.js  //使用配置文件启动karma，单元测试开始全自动执行；会启动浏览器，不过浏览器只是用来自动测试的，而测试结果通过控制台输出
这时我们修改test.js单元测试文件保存的时候，就会自动检测测试结果，并在控制台输出结果



yeoman的使用：
安装各种模块（generator）
安装generator：npm install -g generator-angular。generator是yeoman的附属内容，用generator来下载yeoman的生成器，比如这里下载angular就可用来创建适用angular项目的文件和代码结构
yo angular learn  使用yo命令在当前所在目录下创建angular项目，这个项目取名为learn，就会生成相应的目录文件结构
