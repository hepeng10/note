// 需要先使用npm安装插件，每个项目都是独立的，所以每次都需要安装
// 依赖插件都在node_modules中，新项目需要重新下载，可以尝试直接将node_modules拷贝过去
/*
    先安装gulp到项目目录cnpm install gulp --save-dev
    压缩JS：cnpm install gulp-uglify
    合并JS：cnpm install gulp-concat
    压缩CSS：cnpm install gulp-minify-css
    压缩图片：cnpm install gulp-imagemin，可以去除图片的exif信息
    编译less：cnpm install gulp-less
    浏览器自动刷新：npm install browser-sync gulp --save-dev
    */
var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
// 编译less
gulp.task('less', function () {
    gulp.src('./*/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./'))  //注意gulp的dest的路径规则，当src有通配符的时候，dest的路径会加上通配符匹配到的路径
});

// 在命令行使用 gulp auto 启动此任务即可
gulp.task('auto', function () {
    // 监听文件修改；第一个参数是监听的文件，第二个参数是要执行的任务（只有一个时可不使用数组，字符串即可）
    // 注：由于修改了less后编译less为css，再压缩css，所以less任务需要写在css之前
    gulp.watch(["./*/*.less"],["less"])
})

// 新开一个shell，执行此命令来运行browser-sync的任务，这个任务启动后会创建一个静态服务器，我们需要在浏览器中通过这个服务器的地址来访问HTML文件，才能实现自动刷新浏览器
gulp.task('f5', function () {
    browserSync({
        server: {
            baseDir: "../../"  //指定服务器启动根目录
        }
    });
    gulp.watch(["./*/*.css","./*/*.html"]).on('change', browserSync.reload);  //监听任何文件变化，实时刷新页面
    // gulp.watch(["./dist/css/*.css","./dist/js/*.js","./dist/img/*.*","./*.html"]).on('change', browserSync.reload);  //监听任何文件变化，实时刷新页面
});
// 运行gulp run就能在一个控制台里同时运行auto和f5了
gulp.task('run',['auto','f5']);  //第一个参数是任务名，第二个参数是依赖的任务，第三个参数是要执行的函数。第二个和第三个都不是必须的