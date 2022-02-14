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