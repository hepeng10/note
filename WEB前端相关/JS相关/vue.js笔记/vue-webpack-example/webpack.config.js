var webpack = require('webpack');

module.exports = {
  entry: {
    index:'./src/index/index.js',
    progress:'./src/progress/progress.js',
    show:'./src/show/show.js',
    vendors:['vue','jquery']  //vendors的作用是：入口文件中引用了这里所配置的npm中的依赖文件，则这些依赖文件不会打包到入口文件的js中，而会单独提取出来在vendors.js中。那我们可以不引用vendors.js文件，而是使用CDN等静态资源
  },
  output: {
    path: './devdist',
    publicPath: 'devdist/',
    filename: '[name].bundle.[hash].js'
  },
  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer'},
      {test: /\.less$/, loader: 'style!css!autoprefixer!less'},
      {test: /\.vue$/, loader: 'vue'},
      // 这里添加了[path]，打包后图片会按照原目录结构在dist里生成，可能路径会比较深，按需使用
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=10000&name=img/[path][name].[ext]?[hash]'}
    ]
  },
  externals:{
    // 定义主机域名，开发环境和生产环境应该不同
    // aUrl:'"http://192.168.2.95:8080"'
    aUrl:'"json"'  //当队友服务器没开的时候，自己在json目录中按照路径创建测试的json数据
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devtool:'source-map'
}
