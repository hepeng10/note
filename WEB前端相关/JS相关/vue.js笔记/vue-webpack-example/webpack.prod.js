// 生产环境的配置，在开发环境之上进行配置更好，能更好的复用开发环境中的东西。
// 最好不要像webpack.product.config.js这样单独写一份生产环境的全新配置

var webpack = require('webpack');
var config = require('./webpack.config.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 设置plugins
config.plugins = (config.plugins || []).concat([
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // 单独打包的css文件，按照entry中的文件名命名。多页面打包必须这样写，才能每个页面的css单独提取
  new ExtractTextPlugin("[name].css")
]);
// 重新设置输出路径
config.output={
  path: './dist',
  publicPath: 'dist/',
  filename: '[name].bundle.[hash].js'
}
// vue文件的css单独打包
config.vue.loaders={
  less: ExtractTextPlugin.extract("css!less")
}
// 设置服务器环境的主机地址，必须写在双层引号中
config.externals.aUrl='""';
// 关闭调试生成的map文件
config.devtool='';

module.exports = config;