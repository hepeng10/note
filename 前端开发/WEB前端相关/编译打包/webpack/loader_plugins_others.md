# loader
* json-loader: 处理 JSON 文件
* url-loader: 处理静态资源，如图片、字体等
* less-loader: 处理 less 文件
* post-css-loader: 处理 css 兼容性，优化 css 等。支持插件功能，如：Autoprefixer, cssnano, postcss-preset-env 等
* css-loader: 解析 @import 和 url() 并处理 CSS 模块化
* MiniCssExtractPlugin.loader: 将 CSS 代码提取到独立的 CSS 文件中的一个 loader。与 style-loader 不同，后者是将 CSS 直接注入到 HTML 文档中。所以 MiniCssExtractPlugin.loader 更优
* babel-loader: 用于处理 js, jsx, polyfill 等功能，具有很强的插件功能
[babel 笔记](../babel/babel%20重点笔记.md)

# plugins
> 相同类型的插件，使用写在后面的更优。
* [optimization.splitChunks](https://webpack.docschina.org/plugins/split-chunks-plugin/)：代码分割，类似 CommonsChunkPlugin，但拥有更强大的功能。
* html-webpack-plugin：将 html 复制并插入一些打包后的依赖路径的插件。
* copy-webpack-plugin：将 static 中文件原样复制到dist的插件。
* mini-css-extract-plugin：分离提取 css 文件。和 style-loader 不能一起使用，因为 style-loader 是将 css 插入到 head 中，这个是将 css 提取出来。
* optimize-css-assets-webpack-plugin | css-minimizer-webpack-plugin（webpack >= v5）：优化/最小化 css。
* uglifyjs-webpack-plugin | terser-webpack-plugin（支持 ES6 语法）：压缩/混淆 js。
* webpack-bundle-analyzer：webpack 包分析工具。
* assets-webpack-plugin | webpack-manifest-plugin：生成一份资源清单的 json 文件。
* definePlugin | dotenv-webpack：设计全局变量。
* [wbepack.IgnorePlugin](https://blog.csdn.net/qq_17175013/article/details/86845624)：忽略第三方包指定目录，让这些指定目录不要被打包进去。
* webpack.DllPlugin & webpack.DllReferencePlugin：提升编译速度。将模块预先编译，DllReferencePlugin 将预先编译好的模块关联到当前编译中，当 webpack 解析到这些模块时，会直接使用预先编译好的模块。

# 工具
* webpack-merge：合并 webpack 配置。