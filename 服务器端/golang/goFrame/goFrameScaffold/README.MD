# GoFrame Template For SingleRepo

Quick Start: 
- https://goframe.org/quick

api：定义接口
hack：配置文件（开发环境）
internal：核心代码目录
    cmd：入口文件，由main.go调用
    consts：常量
    controller：控制器
    dao：数据访问层。使用gf工具自动生成代码
    logic/service：业务层。接口放在service里，具体实现放在logic里
    model：定义数据库模型
manifest：部署时的配置文件目录（生成环境）
    config：数据库连接等配置
resource：资源文件。前后端分离情况下一般不用
utility：工具目录

# 开发流程
1. 创建数据库和数据表
2. 配置`hack/config.yaml`中数据库的连接参数。此配置是给gf命令使用的。
3. 使用命令`gf gen dao`自动生成数据访问层代码。`internal`目录下的`dao`和`model`目录中会自动生成代码。
    * internal/dao/xxx.go 引用了 internal/dao/internal 中的文件。此文件可以根据需要进行修改。
    * internal/dao/internal/xxx.go 不需要修改，每次运行命令会重新生成。
    * internal/model 中也生成了数据库相关文件，也不需要修改。
4. 在`api`目录下定义CRUD接口。使用版本号的方式有利于未来接口的兼容性维护，注意使用 package 声明包名时要用对应的版本号。
    * 根据功能来定义接口。
    * 每个接口都有对应的请求体和响应体。命名为`xxxReq`和`xxxRes`。
5. 使用命令`gf gen ctrl`生成控制器代码。
    * `internal`目录下的`controller`目录中会自动生成代码，此目录是我们要手动编写的具体实现。
        * [路由对象管理](https://goframe.org/quick/scaffold-api-controller#controller路由对象管理)，用来定义内部使用的数据结构、常量等。
        * [接口实现](https://goframe.org/quick/scaffold-api-implements)，在生成的接口文件中编写具体的实现逻辑。
    * `api`目录下也会生成个聚合了所有api函数的接口文件，此文件不需要修改。
6. 添加数据库驱动。根据数据库类型安装对应的驱动，数据库驱动从社区安装：https://github.com/gogf/gf/tree/master/contrib/drivers，如MySQL
    1. 运行`go get github.com/gogf/gf/contrib/drivers/mysql/v2@latest`安装MySQL驱动。
    2. 在`main.go`中添加 import，如`_ "github.com/gogf/gf/contrib/drivers/mysql/v2"`。
7. 修改`manifest/config/config.yaml`中的配置，用于生产环境。此配置是给编译后的二进制文件使用的，如main.exe。
8. 注册路由。在`internal/cmd/main.go`中[注册路由](https://goframe.org/quick/scaffold-api-config-and-route#添加路由注册)。
    * 路由的分组可以通过在第4步编写API定义的时候通过`g.Meta`的`path`来区分。
    * 路由注册示例：
    ```go
    // note: 实际上我们可以在 api 中定义 path 时就可以通过 path 来进行分组，而不用上面那种分组方式
    s.Group("/api/v1", func(group *ghttp.RouterGroup) {
        group.Middleware(ghttp.MiddlewareHandlerResponse)
        group.Bind(
            hello.NewV1(),
            user.NewV1(), // 这里是v1版本
        )
    })
    // 可在路由上加上版本号，方便未来接口的兼容性维护
    s.Group("/api/v2", func(group *ghttp.RouterGroup) {
        group.Middleware(ghttp.MiddlewareHandlerResponse)
        group.Bind(
            // api/user/v2 目录中编写接口定义后，通过 gf gen ctrl 命令自动生成
            // 此函数对应的文件是能手动修改的，自动生成时会往文件末尾追加代码，而不会覆盖手动修改的代码
            user.NewV2(), // 这里是v2版本
        )
    })
    ```
9. 使用`gf run main.go`启动应用。（使用 go run main.go也能启动，但是不会监听代码变动自动编译）