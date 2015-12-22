var webpack = require('webpack');

// 使用插件
// 使用CommonsChunkPlugin插件来提取多个页面之间的公共模块，并将该模块打包为 common.js；然后HTML文件应该引入common.js
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// 压缩JS插件
// var uglifyJS=new webpack.optimize.MinChunkSizePlugin(minSize);

module.exports = {
    entry: {
        test : ['./test.js']
    },
    //入口文件输出配置：将entry中指定的文件输出到哪个目录，怎么命名
    output: {
        path: './',
        filename: '[name].bundle.js'  //[name]会替换为entry里的文件名，可以通过这里改为index.min.js这样的文件名等
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' }
        ]
    }
};