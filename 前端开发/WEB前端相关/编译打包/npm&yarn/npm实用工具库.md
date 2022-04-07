# 工程化工具

## lerna
多项目工程的解决方案，高效的代码复用。babel 等工具在使用。
[基本介绍](https://segmentfault.com/a/1190000023160081)
[Monorepo实战](https://www.jianshu.com/p/dafc2052eedc)
[5分钟搞懂Monorepo](https://www.jianshu.com/p/c10d0b8c5581)

## commander
完整的 node.js 命令行解决方案。用于在命令行中传参的功能，如：`join -u xxx -p yyy`。create-react-app, vue-cli 等库都使用了这个工具。
[文档](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)

## yargs
类似 commander，npm 下载量稍逊 commander，但是也很接近。commander 和 yargs 选择其中一个即可。但是 commander 有中文文档。
[yargs入门](https://www.jianshu.com/p/bcf5c5c5194c)

## inquirer
命令行交互工具，用于在命令行中提示用户输入，选择等功能。封装了 node 的 readline 等功能。
[交互式命令行美化工具——inquirer.js](https://www.jianshu.com/p/0409cdf0e396)
[一统江湖的大前端（6）commander.js + inquirer.js——懒，才是第一生产力](https://www.cnblogs.com/dashnowords/p/9632495.html)

## shelljs
封装了 node 的 child_process，能方便的调用系统命令。
[一统江湖的大前端（4）shell.js](https://www.cnblogs.com/dashnowords/p/9632493.html)

--------------------------------------------------

# node 工具

## socket.io
Socket.io 是一个 WebSocket 库，包括了客户端的js和服务器端的 nodejs，它的目标是构建可以在不同浏览器和移动设备上使用的实时应用。它会自动根据浏览器从 WebSocket、AJAX 长轮询、Iframe 流等等各种方式中选择最佳的方式来实现网络实时应用，非常方便和人性化
[中文文档](https://www.w3cschool.cn/socket/)

## fs-extra
文件操作工具库，封装扩展了 fs 模块，可以方便的操作文件。
[github 含文档](https://github.com/jprichardson/node-fs-extra)

## rimraf
类似 rm -rf 用于删除文件。

## node-portfinder
检查端口占用情况。可以从一个端口号扫描到另一个端口号，发现未被占用的端口再启动。

## signal-exit
进程无论如何退出都会执行回调函数。原理大概是监听了 shell 脚本 trap 命令的 EXIT 信号。
```js
var onExit = require('signal-exit')

onExit(function (code, signal) {
  // 在这里做进程退出时的操作
  console.log('process exited!')
})
```

--------------------------------------------------

# 特殊工具

## acorn
JavaScript 解析器，babel-parse，webpack 等就是基于它进行工作的。
[基本介绍](https://segmentfault.com/a/1190000007473065)
[高级前端基础-JavaScript抽象语法树AST](https://segmentfault.com/a/1190000018532745?utm_source=sf-similar-article)

## pako
对数据进行 gzip 压缩和解压的工具库，可以用在文章等数据提交量较大的地方进行 gzip 压缩后提交，然后后端使用 node 或使用 node 作为中间件解压后再存数据库。后端返回数据也是使用 pako 进行压缩，前端再解压。

--------------------------------------------------

# 其它工具

* ts-node: 直接运行 ts 文件，使用 yarn global add ts-node 全局安装即可。
  在项目中编写脚本，使用到安装的依赖包，`import shelljs from 'shelljs'` 但是后面使用 shelljs 却为 undefined。解决方法：
  1. 使用 `import * as shelljs from 'shelljs'`。因为直接使用 ts-node 直接运行时，import 的包使用的是 commonjs 模块。
  2. 在项目中的 tsconfig.json 中配置 compilerOptions 的 `esModuleInterop: true`，这样在 import 包的时候 ts 会帮我们转一下，从而能正常使用。
* ora：一个友好的命令行界面提示插件，有可以转圈的图标。
* chalk：在命令行打印出彩色文字。v5 版本使用 ESM，使用 esbuild 来运行可以正常使用，但是使用 ts-node 会报错，只能安装 v4.1.2 版本。
* npm-run-all：方便一次运行多个 scripts 命令：
    ```js
    // 当我们想运行多个 scripts 命令的时候通常会这样写
    npm run clean && npm run build:css && npm run build:js && npm run build:html

    // 有了 npm-run-all 就变得简单多了
    npm-run-all clean build:*
    ```
* slash：Windows 路径转成 Unix 路径：foo\\\\bar ➔ foo/bar
* joi：数据验证器，用来做数据格式的校验。

[nodejs交互工具库系列](https://segmentfault.com/a/1190000037629594)