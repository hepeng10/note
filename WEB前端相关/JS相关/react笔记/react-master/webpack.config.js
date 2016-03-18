/**
 * 该配置文件，与server 实现了热部署功能
 * 发布版本没有去修改，不知道热部署是否可以用
 */
'use strict';
var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'inline-source-map', //如果发布的时候，必须注释掉，否则生成的文件特别大
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            path.join(__dirname, 'src/app.js')
        ]/*,
        common: path.join(__dirname, 'src/common')*/
    },
    output: {
        path: path.join(__dirname, 'dev'),
        publicPath: '/dev/',
        filename: '[name].bundle.js',
        chunkFilename: 'chunk/[name].[chunkhash:8].min.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'react-hot-loader!babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer'
        }, {
            test: /\.(eot|woff|woff2|ttf|svg)$/,
            loader: 'file-loader?name=files/[hash].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.less$/,
            loader: 'style!css!autoprefixer!less'
        },{
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=10000&name=img/[path][name].[ext]?[hash]'
        }]
    },
    externals:{
        aUrl:'"json"'  //当队友服务器没开的时候，自己在json目录中按照路径创建测试的json数据
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.jsx']
    }
}
