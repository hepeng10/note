var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var uglifyJS=new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}});
var occurence=new webpack.optimize.OccurenceOrderPlugin();
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 单独打包的css文件，按照entry中的文件名命名。多页面打包必须这样写，才能每个页面的css单独提取
var Extract = new ExtractTextPlugin("[name].css");

module.exports = {
  plugins: [commonsPlugin,uglifyJS,occurence,Extract],
  entry: './src/index/index.js',
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: '[name].bundle.js'
  },
  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    loaders: {
        less: ExtractTextPlugin.extract("css!less")
    }
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer'},
      {test: /\.less$/, loader: 'style!css!autoprefixer!less'},
      {test: /\.vue$/, loader: 'vue'},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=10000&name=img/[name].[ext]?[hash]'}
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}
