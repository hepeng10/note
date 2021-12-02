var webpack = require('webpack');

// 使用插件
// 使用CommonsChunkPlugin插件来提取多个页面之间的公共模块，并将该模块打包为 common.js；然后HTML文件应该引入common.js
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// 压缩JS插件，使用后在使用webpack命令打包的时候，不用加上-p也能压缩了，而且压缩率更高
var uglifyJS=new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}});
// 单独打包CSS文件，开发环境可以直接打包在JS中，但生产环境一般都会把CSS单独打包出来
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //插件项：定义要使用的插件
    plugins: [commonsPlugin,uglifyJS,new ExtractTextPlugin("[name].css")],
    //页面入口文件配置：要进行操作的文件
    entry: {
        // key是打包后的文件名，value是要打包的文件路径
        index : './src/js/page/index.js',
        // 没写后缀，webpack会自动去匹配（貌似是nodeJS模块机制的自动匹配）：page1，page1.webpack.js，page1.web.js，page1.js，page1.json的顺序（最好写上后缀）
        page1: "./page1",
        //支持数组形式，将加载数组中的所有模块，打包成一个文件page2.bundle.js
        page2: ["./entry1.js", "./entry2.js"]
    },
    //入口文件输出配置：将entry中指定的文件输出到哪个目录，怎么命名
    output: {
        path: 'dist/js/page',
        filename: '[name].bundle.js'  //[name]会替换为entry里的文件名，可以通过这里改为index.min.js这样的文件名等
    },
    module: {
        //加载器配置：是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理
        //这些加载器一般都需要先进行安装，如npm install url-loader -save-dev
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //js内嵌HTML的写法叫jsx，是react创造的。所以在写js的时候，如果有内嵌HTML的写法，必须用jsx-loader来编译，HTML中也必须引入react
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            //配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。
            // 比如index.js中，require()的css中有图片，或者JS中创建了图片，就会被loader
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            // 使用expose-loader将模块暴露给全局。好像可以通过 loader: 'expose?$!jQuery' 这样的配置设置别名
            {test: require.resolve('jquery'), loader: 'expose?jQuery'},
            // 这个pen模块是依赖jquery的，上一句我们把jquery暴露给全局了，所以这里也能将pen模块暴露
            {test: require.resolve('pen'), loader: 'exports?window.Pen'},
        ]
        //如上，"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
    },
    // 定义全局变量
    externals:{
        'url':'"http://192.168.2.95:8080"'  //在模块中import url from 'url'，就可以在这个模块中使用url变量了，值就是这里的值。比如这里就是用来定义一个变量作为ajax跨域请求服务器的地址。生产环境将地址修改为空（需要的地址），上传服务器就行了
    },
    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        root: 'E:/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require()模块时可以省略后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            jquery:'js/jquery.min.js',  //后续直接 require('jquery') 即可，而不需要require(js/jquery.min.js)
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};