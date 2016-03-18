// 注：只实现了--inline刷新，--hot热替换还需要研究。目前来看，还是使用browser-sync更实用

var webpack = require('webpack');

// 单独打包CSS文件，开发环境可以直接打包在JS中，但生产环境一般都会把CSS单独打包出来。这个插件需要单独安装
// cnpm install extract-text-webpack-plugin --save-dev
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    plugins:[
        // DefinePlugin 将当前环境指定为生产环境，警告将在 UglifyJS 压缩代码过程中被删除
        // new webpack.DefinePlugin({'process.env':{NODE_ENV:'"production"'}}),
        
        // 使用CommonsChunkPlugin插件来提取多个页面之间的公共模块，并将该模块打包为 common.js；然后HTML文件必须引入common.js
        new webpack.optimize.CommonsChunkPlugin('common.js'),

        // 压缩JS插件，使用后在使用webpack命令打包的时候，不用加上-p也能压缩了，而且压缩率更高
        new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}})

        // css单独打包插件，打包js中引入的css和.vue中引入的css都需要
        // new ExtractTextPlugin("styles.css")
    ],
    entry: {
        index : [
            "webpack-dev-server/client?http://localhost:8080",
            './test/src/index.js'
        ]
    },
    //入口文件输出配置：将entry中指定的文件输出到哪个目录，怎么命名
    output: {
        path: './test/dist/',
        // 通过添加[hash]后，文件重新打包后，如果文件内容有变化，则hash值也会改变，从而在加载文件的时候，不会再读取缓存
        filename: '[name].bundle.[hash].js'  //[name]会替换为entry里的文件名，可以通过这里改为index.min.js这样的文件名等
    },
    module: {
        loaders: [
            // .vue文件，虽然只加载了vue-loader，但vue-loader回去调用less-loader等，当然需要安装less-loader
            { test: /\.vue$/, loader: 'vue' }

            // 将js中的css单独打包出来，不能处理.vue文件的
            // {test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")}
        ]
    },
    // 针对vue单独配置
    vue: {
        autoprefixer: {
          browsers: ['last 2 versions']
        },
        loaders: {
            // 将.vue文件中的css单独打包出来，这里使用了less预处理器
            // less: ExtractTextPlugin.extract("css!less")
            // css: ExtractTextPlugin.extract("css")  没使用预处理器用这行
        }
    },
    // webpack-dev-server相关配置
    devServer:{
        // 服务器根目录
        contentBase:'./test',
        // 热替换模式开启
        hot:true,
        // inline模式开启
        inline:true
    }
    // 生成map文件，方便调试
    // devtool: 'source-map'
};