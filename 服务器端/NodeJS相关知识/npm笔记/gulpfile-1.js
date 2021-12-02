
var gulp = require('gulp')  // 获取 gulp
var uglify = require('gulp-uglify')  // 获取 uglify 模块（用于压缩 JS）
// gulp.task(name, fn) - 定义任务，第一个参数是任务名，第二个参数是任务内容。任务名是自定义的，到时候通过 gulp 任务名 来执行此任务
gulp.task('script', function() {  // 压缩 js 文件；在命令行使用 gulp script 启动此任务
    gulp.src('js/*.js')  // 1. 配置源文件，这里就是压缩js目录下的所有.js文件
        .pipe(uglify())  // 2. 使用uglify压缩文件；gulp.pipe() - 管道，你可以暂时将 pipe 理解为将操作加入执行队列
        .pipe(gulp.dest('dist/js'))  // 3. 配置目标目录，另存压缩后的文件
    // 压缩后合并压缩的js
    gulp.src('dist/js/*.js')
        .pipe(concat('all.js'))  //合并后的文件名
        .pipe(gulp.dest('dist/js'));
})
// 合并JS
concat = require('gulp-concat');
gulp.task('concat', function () {
    gulp.src('dist/js/*.js')
        .pipe(concat('all.js'))  //合并后的文件名
        .pipe(gulp.dest('dist/js'));
});
// 压缩CSS
var minifyCSS = require('gulp-minify-css')  // 压缩CSS模块
gulp.task('css',function(){
    gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
})
// 压缩图片
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
        .pipe(gulp.dest('css'))
    gulp.src("css/*.css")
        .pipe(minifyCSS())
        .pipe(gulp.dest("dist/css"))
});
// // 监听文件修改，执行任务
gulp.task("auto",function(){
    gulp.watch(["js/*.js","less/*.less"],["script",,"less"])
})
// 一次执行多个任务
gulp.task('default', ['watchJs'])