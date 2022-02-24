# 中大型类库

## Lerna
多项目工程的解决方案，高效的代码复用。babel 等工具在使用。
[基本介绍](https://segmentfault.com/a/1190000023160081)
[Monorepo实战](https://www.jianshu.com/p/dafc2052eedc)
[5分钟搞懂Monorepo](https://www.jianshu.com/p/c10d0b8c5581)

## Acorn
JavaScript 解析器，babel-parse，webpack 等就是基于它进行工作的。
[基本介绍](https://segmentfault.com/a/1190000007473065)
[高级前端基础-JavaScript抽象语法树AST](https://segmentfault.com/a/1190000018532745?utm_source=sf-similar-article)

## Commander
完整的 node.js 命令行解决方案。用于在命令行中传参的功能，如：`join -u xxx -p yyy`。create-react-app, vue-cli 等库都使用了这个工具。
[文档](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)

## inquirer
命令行交互工具，用于在命令行中提示用户输入，选择等功能。
[交互式命令行美化工具——inquirer.js](https://www.jianshu.com/p/0409cdf0e396)

--------------------------------------------------

# 小型工具

* ts-node: 直接运行 ts 文件，使用 yarn global add ts-node 全局安装即可。
* node-portfinder：检查端口占用情况。可以从一个端口号扫描到另一个端口号，发现未被占用的端口再启动。
* ora：一个友好的命令行界面提示插件，有可以转圈的图标。
* rimraf：类似 rm -rf 用于删除文件。
* chalk：在命令行打印出彩色文字。
* npm-run-all：方便一次运行多个 scripts 命令：
    ```js
    // 当我们想运行多个 scripts 命令的时候通常会这样写
    npm run clean && npm run build:css && npm run build:js && npm run build:html

    // 有了 npm-run-all 就变得简单多了
    npm-run-all clean build:*
    ```
* pako：对数据进行 gzip 压缩和解压的工具库，可以用在文章等数据提交量较大的地方进行 gzip 压缩后提交，然后后端使用 node 或使用 node 作为中间件解压后再存数据库。后端返回数据也是使用 pako 进行压缩，前端再解压。