
var webpack = require('webpack');
var config = require('./webpack.config.js');

config.entry={
    app:'./src/app.js'
}
// 设置plugins
/*config.plugins = (config.plugins || []).concat([
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
]);*/
config.plugins[0]=new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' });
// config.plugins[1]=undefined;
// 重新设置输出路径
config.output={
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.[hash].js',
    chunkFilename: 'chunk/[name].[chunkhash:8].min.js'
}
// 设置服务器环境的主机地址，必须写在双层引号中
config.externals.aUrl='""';
// 关闭调试生成的map文件
config.devtool='';

module.exports = config;