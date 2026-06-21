来源：https://www.bilibili.com/video/BV1Uu4y1u7kX/?vd_source=8220e726dcb3a350fd156cea947bd58b
[TOC]

<br>

<br>

**本文开始记录开始时间为2023-09，如果官方文档有更新导致本文中链接失效或与官方文档不相同的地方或错漏，以官方文档为准**

<br>

<br>

# 准备工作

## 前置条件

已安装Go语言开发环境，已配置好GOROOT、GOPATH环境变量

熟悉Go语言基本语法与使用

GoFrame文档：[https://goframe.org/](https://goframe.org/)

学习过程以官方文档为主，本文内容均摘自官方文档，

本阶段只介绍Web开发部分，微服务部分以后有机会新开

## 安装框架工具

[https://github.com/gogf/gf/releases](https://github.com/gogf/gf/releases)

下载对应的包安装。推荐安装到GOROOT的bin目录中

用以下命令查看是否安装成功

```shell
gf -v
```

## 项目初始化

```shell
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn
# 如果已经设置过可以不要上面这两行

gf init gf_demo -u # 如果之前已经创建过项目，并且不需要创建最新版本则省略-u
```

>  常用代理地址：
> 
> - `https://goproxy.cn`
> - `https://goproxy.io`
> - `https://mirrors.aliyun.com/goproxy/`

## 项目启动

进入项目中main.go文件所在的目录运行如下命令

```shell
gf run main.go
```

启动成功后，在浏览器中输入`http://127.0.0.1:8000/hello`查看结果

<br>

<br>

## 框架设计

关于框架设计的内容，有点过于抽象，内容也是偏理论的，初学就来纠结这部分基本上也难以理解，所以这部分的其他内容可以放到以后再来研究。不过也需要了解一点基础知识，比如`MVC`与`3-Tier Architecture`，这部分内容详见文档[代码分层设计](https://goframe.org/pages/viewpage.action?pageId=3672442)，不需要完全理解，知道个大概也就可以了。

### 项目目录结构

<pre style="background: #272822; color: white">
/
├── api                 请求接口输入/输出数据结构定义
├── hack                项目开发工具、脚本
├── internal            业务逻辑存放目录，核心代码
│   ├── cmd             入口指令与其他命令工具目录
│   ├── consts          常量定义目录
│   ├── controller      控制器目录，接收/解析用户请求
│   ├── dao             数据访问对象目录，用于和底层数据库交互
│   ├── logic           核心业务逻辑代码目录
│   ├── model           数据结构管理模块，管理数据实体对象，以及输入与输出数据结构定义
│   |   ├── do          数据操作中业务模型与实例模型转换，由工具维护，不能手动修改
│   │   └── entity      数据模型是模型与数据集合的一对一关系，由工具维护，不用手动修改。
│   └── service         业务接口定义层。具体的接口实现在logic中进行注入。
├── manifest            包含程序编译、部署、运行、配置的文件
├── resource            静态资源文件
├── utility
├── go.mod
└── main.go             程序入口文件
</pre>

有关项目目录更多详细介绍以及请求分层流转见文档[工程目录设计](https://goframe.org/pages/viewpage.action?pageId=30740166)

<br>

<br>

# 路由

## 路由注册

### 函数注册

**相关方法：**

```go
func (s *Server) BindHandler(pattern string, handler interface{})
```

其中`handler`的定义方式有如下两种：

```go
func(request *ghttp.Request)
func(ctx context.Context, BizRequest)(BizResponse, error)
```

**匿名函数与普通函数注册**
`internal/cmd/cmd.go`

```go
package cmd

import (
    "context"

    "github.com/gogf/gf/v2/frame/g"
    "github.com/gogf/gf/v2/net/ghttp"
    "github.com/gogf/gf/v2/os/gcmd"
)

func handler(req *ghttp.Request) {
    req.Response.Writeln("<h1>Hello World From handler</h1>")
}

var (
    Main = gcmd.Command{
        Name:  "main",
        Usage: "main",
        Brief: "start http server",
        Func: func(ctx context.Context, parser *gcmd.Parser) (err error) {
            s := g.Server()

            // 直接用匿名函数进行路由注册
            s.BindHandler("/hello", func(req *ghttp.Request) {
                req.Response.Writeln("<h1>Hello World!</h1>")
            })

            // 或者使用提前定义好的函数来进行注册
            s.BindHandler("/world", handler)

            s.Run()
            return nil
        },
    }
)
```

注册成功后在浏览器输入[http://127.0.0.1:8000/hello](http://127.0.0.1:8000/hello)或者[http://127.0.0.1:8000/world](http://127.0.0.1:8000/world)即可访问对应的路由

**指定HTTP请求方法**
上述方法注册路由默认支持所有HTTP请求方法，如果需要指定请求方法，可用以下写法：

```go
// 该路由只支持GET请求
s.BindHandler("GET:/hello", func(req *ghttp.Request) {
    req.Response.Writeln("<h1>Hello World! GET</h1>")
})
// 该路由只支持POST请求
s.BindHandler("POST:/hello", func(req *ghttp.Request) {
    req.Response.Writeln("<h1>Hello World! POST</h1>")
})
```

对于同一路由可以定义不同的请求方法实现不同功能。

> 几个最常用HTTP方法
> 
> | 方法     | 描述                        |
> |:------:|:-------------------------:|
> | GET    | 用于获取数据，不会修改服务端资源数据        |
> | POST   | 将资源数据提交到服务端，常用于在服务端创建新数据  |
> | PUT    | 将资源数据提交到服务端，常用于修改已存在的资源数据 |
> | DELETE | 用于删除服务端资源数据               |
> |        |                           |

**对象方法注册**

还可以用对象当中的方法来注册路由。

选定义一个名为`user`控制器

`internal/controller/user/user.go`

```go
package user

import "github.com/gogf/gf/v2/net/ghttp"

type Controller struct{}

func New() *Controller {
    return &Controller{}
}

func (c *Controller) AddUser(r *ghttp.Request) {
    r.Response.Writeln("添加用户")
}

func (c *Controller) UpdateUser(r *ghttp.Request) {
    r.Response.Writeln("更新用户")
}

func (c *Controller) DeleteUser(r *ghttp.Request) {
    r.Response.Writeln("删除用户")
}

func (c *Controller) ListUser(r *ghttp.Request) {
    r.Response.Writeln("用户列表")
}

func (c *Controller) GetUser(r *ghttp.Request) {
    r.Response.Writeln("查询一个用户")
}

func (c *Controller) Post(r *ghttp.Request) {
    r.Response.Writeln("添加用户")
}

func (c *Controller) Put(r *ghttp.Request) {
    r.Response.Writeln("更新用户")
}

func (c *Controller) Delete(r *ghttp.Request) {
    r.Response.Writeln("删除用户")
}

func (c *Controller) Get(r *ghttp.Request) {
    r.Response.Writeln("查询一个用户")
}
```

`internal/cmd/cmd.go`

```go
package cmd

import (
    "context"

    // 引入控制器user包
    "gf_demo/internal/controller/user"

    "github.com/gogf/gf/v2/frame/g"
    "github.com/gogf/gf/v2/os/gcmd"
)

var (
    Main = gcmd.Command{
        Name:  "main",
        Usage: "main",
        Brief: "start http server",
        Func: func(ctx context.Context, parser *gcmd.Parser) (err error) {
            s := g.Server()

            // 定义对象
            usercontroller := user.New()
            // 将对象方法绑定到路由
            s.BindHandler("/adduser", usercontroller.AddUser)

            s.Run()
            return nil
        },
    }
)
```

### 对象注册

对象里的方法可以批量注册

相关方法

```go
func (s *Server) BindObject(pattern string, object interface{}, method ...string)

func (s *Server) BindObjectMethod(pattern string, object interface{}, method string)

func (s *Server) BindObjectRest(pattern string, object interface{})
```

**绑定全部公共方法**

`internal/cmd/cmd.go`

```go
package cmd

import (
    "context"
    "starting/internal/controller/user"

    "github.com/gogf/gf/v2/frame/g"
    "github.com/gogf/gf/v2/os/gcmd"
)

var (
    Main = gcmd.Command{
        Name:  "main",
        Usage: "main",
        Brief: "start http server",
        Func: func(ctx context.Context, parser *gcmd.Parser) (err error) {
            s := g.Server()

            usercontroller := user.New()
            // 绑定user控制器中所有公共方法
            s.BindObject("/user", usercontroller)

            s.Run()
            return nil
        },
    }
)
```

**绑定指定方法**

```go
usercontroller := user.New()
// 绑定user控制器中多个方法
s.BindObject("/user", usercontroller, "AddUser,UpdateUser")
// 绑定单个方法
s.BindObjectMethod("/deluser", usercontroller, "DeleteUser")
```

**以RESTFul方绑定对象方法**

```go
usercontroller := user.New()
s.BindObjectRest("/user", usercontroller)
```

### 分组注册

可以为不同路由设置一个相同的前缀，即分组路由，分组路由有以下两种写法

```go
s := g.Server()

usercontroller := user.New()
s.Group("/user", func(group *ghttp.RouterGroup) {
    group.Middleware(ghttp.MiddlewareHandlerResponse)
    group.Bind(
        usercontroller, // 绑定到控制器对象
    )

    // 可以用GET POST PUT等定义路由
    group.GET("/get", func(r *ghttp.Request) {
        r.Response.Writeln("/user/get")
    })
})

s.Run()
```

```go
s := g.Server()

usercontroller := user.New()
group := s.Group("/user")
group.Middleware(ghttp.MiddlewareHandlerResponse)
group.Bind(
    usercontroller, // 绑定到控制器对象
)

// 可以用GET POST PUT等定义路由
group.GET("/get", func(r *ghttp.Request) {
    r.Response.Writeln("/user/get")
})

s.Run()
```

<br>

## 规范路由

GoFrame中提供了规范化的路由注册方式，注册方法如下 

```go
func Handler(ctx context.Context, req *Request) (res *Response, err error)
```

其中`Request`与`Response`为自定义的结构体。

通过如下方式指定请求方法与路径

```go
type HelloReq struct {
    g.Meta `path:"/hello" method:"get"`
}
```

<br>

# 请求输入

## 普通请求输入

基础代码如下：路由用group绑定到控制器后，在控制器中写如下方法，以下代码均在此修改：

```go
func (c *Controller) Params(request *ghttp.Request) {
    m := request.GetQueryMap()
    request.Response.WriteJson(m)
}
```

### query参数获取

query参数是指以`?a=1&b=2`的形式写在url中的参数，通常由GET方法传递。

<br>

**单个参数值**

```go
m := request.GetQuery("name")
```

GetQuery可以指定参数名称，获取对应的参数值，如果值不存在，则返回`nil`

还可以指定默认值，当对应参数值不存在时，返回指定的默认值

```go
m := request.GetQuery("name", "孙行者")
```

返回的是一个`gvar.Var `类型，可以根据需要进行类型转换，常用类型转换方法如下

```go
func (v *Var) Bytes() []byte
func (v *Var) String() string 
func (v *Var) Bool() bool 
func (v *Var) Int() int
func (v *Var) Int8() int8 
func (v *Var) Int16() int16 
func (v *Var) Int32() int32
func (v *Var) Int64() int64
func (v *Var) Uint() uint
func (v *Var) Uint8() uint8
func (v *Var) Uint16() uint16 
func (v *Var) Uint32() uint32
func (v *Var) Uint64() uint64 
func (v *Var) Float32() float32 
func (v *Var) Float64() float64 
func (v *Var) Time(format ...string) time.Time
func (v *Var) Duration() time.Duration 
func (v *Var) GTime(format ...string)
```

<br>

**批量获取Query参数**

GoFrame中提供了`GetQueryMap`，`GetQueryMapStrStr`，`GetQueryMapStrVar`三个方法用于批量获取Query参数，三个方法使用方式一致，只是返回类型不同。

- 获取全部Query参数

```go
m := request.GetQueryMap()
```

- 指定需要获取的参数名称与默认值

```go
m := request.GetQueryMap(map[string]interface{}{"name": "者行孙", "age": 600})
```

<br>

**将Query参数转化为自定义结构体**

可以自定义结构体，将请求参数直接转化为对应的结构体：

```go
type user struct {
    Name string
    Age  int
}
var u *user
err := request.ParseQuery(&u)
if err != nil {
    request.Response.WritelnExit("转换出借")
}
```

如上，结构体中成员为`Name`、`Age`，参数为`name`和`age`则参成功转换，如果结构体成员变量名与参数名不一致则无法转换，此时需要为成员变量指定其对应的参数，可以用`json:`/`param:`/`p:`这些方式来指定。如下

```go
type user struct {
    UserName string `json:"name"`
    UserAge  int    `p:"age"`
}
```

<br>

### 表单参数获取（POST参数获取）

表单参数获取是指获取`application/x-www-form-urlencoded`、`application/form-data`、`multipart/form-data`等数据，也可以用来获取以json格式提交的数据，简单理解即为可以获取POST方法提交的数据。 

<br>

**单个参数**

```go
m := request.GetForm("name")
```

`GetForm`用于指定参数名称，获取对应参数值，如果对应参数不存在，返回`nil`

也可以指定默认值，当指定参数不存在时，返回默认值

```go
m := request.GetForm("name", "烧包谷")
```

返回的是一个`gvar.Var `类型，可以根据需要进行类型转换

<br>

**批量获取请求数据**

可以用`GetFormMap`、`GetFormMapStrStr`、`GetFormMapStrVar`批量获取请求数据，三个方法使用方式一样，只是返回的Map类型不同。

```go
m := request.GetFormMap()
```

可以指定需要获取的参数以及默认值

```go
m := request.GetFormMap(map[string]interface{}{"name": "大洋芋"})
```

<br>

**将请求数据转化为自定义结构体**

和Query参数一样，也可以将请求参数直接转为自定义结构体。如果结构体成员名称与参数名称不一致，也可以用`json:`、`param:`、`p:`这些tag来指定对应的参数名称

```go
type user struct {
    UserName string `json:"name"`
    UserAge  int    `p:"age"`
}
var u *user
err := request.ParseForm(&u)
if err != nil {
    request.Response.WritelnExit("转换出借")
}
```

<br>

### 动态路由参数获取

动态路由需要对现有代码进行一点改动，需要先在`api`包中定义请求与返回数据格式，对指定的路由进行动态注册：

`api`

```go
package api

import (
    "github.com/gogf/gf/v2/frame/g"
)

type Res struct {
    g.Meta `mime:"text/html"`
}

type ParamReq struct {
    g.Meta `path:"/params/:name" method:"all"`
}
```

再将控制器的的方法利用`api`数据结构进行修改：

`Controller`

```go
func (c *Controller) Params(ctx context.Context, req *api.ParamReq) (res *api.Res, err error) {
    request := g.RequestFromCtx(ctx)
    u := request.GetRouter("name")
    request.Response.WriteJson(g.Map{"data": u})
    return
}
```

<br>

**获取单个参数**

```go
u := request.GetRouter("name")
```

返回`gvar.Var`类型，可以按需要进行类型转换。也可以指定默认值。

<br>

**批量获取参数**

```go
u := request.GetRouterMap()
```

返回值为`map[string]string`。如果没有设置动态路由，则返回`nil`

<br>

### 所有请求参数获取

GoFrame中还提供了一些方法获取所有请求参数，用法与上面两种类似，只是不区分请求方法。如果GET和POST提供的参数名称相同，则POST参数优先。

**获取单个参数**

```go
data := request.GetRequest("name")
// 简写
data := request.Get("name")
```

返回`gvar.Var`类型，可以提供默认值。

<br>

**批量获取请求参数**

```go
data := request.GetRequestMap()
// 可以指定需要获取的参数名及默认值
data := request.GetRequestMap(g.Map{"name": ""})
// 还有以下几种
data := request.GetRequestMapStrStr()
data := request.GetRequestMapStrVar()
```

<br>

**将请求参数转为自定义结构体**

```go
request.Parse(&u) // u为自定义结构体指针
```

<br>

## Api请求输入

在`api`中定义请求与响应数据结构，可以直接将需要接收的参数定义为请求结构体的成员，请求时会自动转为对应结构体。

例如，将前面的`api`请求部分改为

```go
type ParamReq struct {
    g.Meta   `path:"/params" method:"post"`
    UserName string `p:"name" d:"林冲"`
    UserAge  int    `p:"age" d:"110"`
}
```

其中`p:`或`param:`用于指定该成员对应的请求参数名，`d:`或`default:`用于指定默认值。如果Query与Body中有相同名称的参数，则以Body中的参数优先。

<br>

# 响应输出

在控制器中新建如下方法，用来测试响应输出。以下所有代码均在此处修改。

```go
func (c *Controller) Resp(req *ghttp.Request) {
    // 以下代码在此写
}
```

<br>

## 文本数据返回

GoFrame中通过以下方法返回文本数据到客户端：

```go
func (r *Response) Write(content ...interface{})
func (r *Response) WriteExit(content ...interface{})
func (r *Response) Writef(format string, params ...interface{})
func (r *Response) WritefExit(format string, params ...interface{})
func (r *Response) Writeln(content ...interface{})
func (r *Response) WritelnExit(content ...interface{})
func (r *Response) Writefln(format string, params ...interface{})
func (r *Response) WriteflnExit(format string, params ...interface{})
```

以上方法中，带有`Exit`的表示执行完响应之后就退出本次请求，不再执行后面的内容。带有`ln`的表示会在响应内容的末尾追加换行符。

以上方法用于向客户端响应文本内容。内容格式为`text/html`或`text/plain`，参数可以是任意数据类型，非字符串类型通常会将内容进行json转为字符串后返回到客户端。

如果提供参数为文本，可以是普通文本也可以是HTML文本。

<br>

**响应简单文本**

```go
req.Response.Write("锦瑟无端五十弦")
```

<br>

**响应简单HTML**

```go
req.Response.Write("<h1>春蚕到死丝方尽</h1>")
```

<br>

**响应复杂HTML**

```go
html := `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Clock</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
            *
            {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
            }
            body 
            {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: #acbaca;
            }
            .clock 
            {
                position: relative;
                width: 300px;
                height: 300px;
                background: #c9d5e0;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50px;
                box-shadow: 30px 30px 30px -10px rgba(0,0,0,0.15),
                inset 15px 15px 10px rgba(255,255,255,0.75),
                -15px -15px 35px rgba(255,255,255,0.55),
                inset -1px -1px 10px rgba(0,0,0,0.2);
            }
            .clock::before 
            {
                content: '';
                position: absolute;
                width: 4px;
                height: 4px;
                background: #e91e63;
                border-radius: 50%;
                z-index: 1000;
                box-shadow: 0 0 0 1px #e91e63,
                0 0 0 3px #fff,
                0 0 5px 5px rgba(0,0,0,0.15);
            }
            .clock .numbers 
            {
                position: absolute;
                inset: 35px;
                background: #152b4a;
                border-radius: 50%;
                box-shadow: 5px 5px 15px #152b4a66,
                inset 5px 5px 5px rgba(255,255,255,0.55),
                -6px -6px 10px rgba(255,255,255,1);
            }
            .clock .numbers span 
            {
                position: absolute;
                inset: 5px;
                text-align: center;
                color: #fff;
                font-size: 1.25em;
                transform: rotate(calc(90deg * var(--i)));
            }
            .clock .numbers span b 
            {
                font-weight: 600;
                display: inline-block;
                transform: rotate(calc(-90deg * var(--i)));
            }
            .clock .numbers::before 
            {
                content: '';
                position: absolute;
                inset: 35px;
                background: linear-gradient(#2196f3,#e91e63);
                border-radius: 50%;
                animation: animate 2s linear infinite;
            }
            @keyframes animate 
            {
                0% 
                {
                    transform: rotate(360deg);
                }
                100% 
                {
                    transform: rotate(0deg);
                }
            }
            .clock .numbers::after 
            {
                content: '';
                position: absolute;
                inset: 38px;
                background: #152b4a;
                border-radius: 50%;
            }
            .clock .numbers .circle
            {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                z-index: 10;
            }
            .clock .numbers .circle i 
            {
                position: absolute;
                width: 3px;
                height: 50%;
                background: #fff;
                transform-origin: bottom;
            }
            .clock .numbers .circle#hr i 
            {
                transform: scaleY(0.3);
                width: 4px;
            }
            .clock .numbers .circle#mn i 
            {
                transform: scaleY(0.45);
            }
            .clock .numbers .circle#sc i 
            {
                width: 2px;
                transform: scaleY(0.55);
                background: #e91e63;
                box-shadow: 0 30px 0 #e91e63;
            }
        </style>
    </head>
    <body>
        <div class="clock">
            <div class="numbers">
                <span style="--i:0;"><b>12</b></span>
                <span style="--i:1;"><b>3</b></span>
                <span style="--i:2;"><b>6</b></span>
                <span style="--i:3;"><b>9</b></span>
                <div class="circle" id="hr"><i></i></div>
                <div class="circle" id="mn"><i></i></div>
                <div class="circle" id="sc"><i></i></div>
            </div>
        </div>
        <script>
            let hr = document.querySelector('#hr');
            let mn = document.querySelector('#mn');
            let sc = document.querySelector('#sc');

            setInterval(()=>{
                let day = new Date();
                let hh = day.getHours() * 30;
                let mm = day.getMinutes() * 6;
                let ss = day.getSeconds() * 6;

                hr.style.transform = 'rotateZ(' + hh+(mm/12) + 'deg)';
                mn.style.transform = 'rotateZ(' + mm + 'deg)';
                sc.style.transform = 'rotateZ(' + ss + 'deg)';
            })
        </script>
    </body>
    </html>
    `
    req.Response.Write(html)
```

<br>

**格式化数据填充**

```go
html := `
    <div>姓名：%s</div>
    <div>年龄：%d</div>
    `
req.Response.Writef(html, "林黛玉", 16)
```

<br>

## JSON数据返回

GoFrame中可以通过以下方法返回JSON数据：

```go
func (r *Response) WriteJson(content interface{})
func (r *Response) WriteJsonExit(content interface{})
```

通过以上方法，会直接将参数内容进行JSON转换之后返回到客户端，并且将响应头中`Content-Type`设置为 `application/json`。

<br>

## 模板内容返回

前面可以用`writef`将数据格式化到HTML内容当中，但这样的做法对于数据以及HTML文件较多的情况太过于麻烦，因此Web框架中一般会采用模板引擎，使用模板语言来进行数据渲染，简化HTML页面与后端数据的交互。

GoFrame中用以下方法进行模板解析和返回：

```go
func (r *Response) WriteTpl(tpl string, params ...gview.Params) error 
func (r *Response) WriteTplDefault(params ...gview.Params) error 
func (r *Response) WriteTplContent(content string, params ...gview.Params) error
```

其中最常用的是`WriteTpl`，详细内容后面模板引擎内容里面再说，现在简单理解为该方法可以读取一个html文件，并将其返回给客户端。默认模板文件存放在`resource/template`下面，因此`WriteTpl`的第一个参数为对应的模板html文件相对于`template`的路径

示例：

```go
req.Response.WriteTpl("index.html")
req.Response.WriteTpl("user/index.html")
```

<br>

## API数据返回

现在Web应用多是前后端分离，返回数据为JSON格式，前面所说的`WriteJson`这样的方法只是单纯将提供的数据进行JSON转换后返回，在实际开发中，返回的JSON数据通常为以 下结构（具体项目会有差异，但基本都是类似结构）：

```json
{
    "code":0, // 自定义编码，用来表示请求成功与失败
    "msg":"请求成功", // 提示信息，如果请求出错则为错误信息
    "data":{}  // 请求返回数据，请求出错一般为null
}
```

GoFrame为前后端分离的API开发提供了很好的支持，只需要借助`api`模块就可以方便完成类似的返回结构，不需要自行定义。

操作步骤如下：

- 在`api`中定义请求与响应数据结构

```go
type ApiReq struct {
    g.Meta `path:"/api" method:"all"`
}

type ApiRes struct {
    UserName string    `json:"name"`
    UserAge  int    `json:"age"`
    List     g.Array `json:"list"`
}
```

- 在控制器中定义对应的方法

```go
func (c *Controller) Api(ctx context.Context, req *api.ApiReq) (res *api.ApiRes, err error) {
    return
}
```

**实例化返回数据并返回**

```go
res = &api.ApiRes{
    UserName: "张三",
    UserAge:  120,
    List:     g.Array{1, 2, 3, 4},
}
return
```

**如果有错误，定义错误信息并直接返回**

```go
err = gerror.Newf("服务器开小差了")
return
```

用上述方法返回数据，会自动返回如下格式JSON数据

```json
{
    "code":0,
    "message":"",
    "data":{
        "name":"张三",
        "age":120,
        "list":[1,2,3,4]
    }
}
```

以上数据格式是通过中间件`ghttp.MiddlewareHandlerResponse`实现的，实际应用当中可以仿照这一中间件自行定义中间件来确定需要的数据返回格式。

<br>

<br>

# 数据库

## 数据库准备

需要先安装MySQL数据库(也可以使用其他数据库，本教程以MySQL为例)，安装过程如果不了解的可以在B站搜一下MySQL相关教程。

- 创建一个`goframe`数据库，字符集为`utf8`

- 运行下列SQL，创建测试数据表

```mysql
USE `goframe`;

/*Table structure for table `book` */

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` VARCHAR(50) NOT NULL COMMENT '书名',
  `author` VARCHAR(30) NOT NULL COMMENT '作者',
  `price` DOUBLE NOT NULL COMMENT '价格',
  `publish_time` DATE COMMENT '出版时间',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `book` */

INSERT  INTO `book`(`id`,`name`,`author`,`price`) VALUES 
(1,'MySQL数据库从入门到精通','王飞飞',59.8),
(2,'设计模式','刘伟',45),
(3,'数据库原理及应用','刘亮',33),
(4,'Linux驱动开发入门与实践','郑强',69),
(5,'Linux驱动开发入门与实践','郑强',69),
(6,'Linux驱动开发入门与实践','郑强',69);

/*Table structure for table `dept` */

DROP TABLE IF EXISTS `dept`;

CREATE TABLE `dept` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` INT(10) UNSIGNED DEFAULT NULL COMMENT '上级部门ID',
  `name` VARCHAR(30) DEFAULT NULL COMMENT '部门名称',
  `leader` VARCHAR(20) DEFAULT NULL COMMENT '部门领导',
  `phone` VARCHAR(11) DEFAULT NULL COMMENT '联系电话',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8;

/*Data for the table `dept` */

INSERT  INTO `dept`(`id`,`pid`,`name`,`leader`,`phone`) VALUES 
(100,0,'哪都通','赵方旭','10000000000'),
(101,100,'华北大区','徐四','10000000001'),
(102,100,'东北大区','高廉','10000000002'),
(103,100,'华东大区','窦乐','10000000003'),
(104,100,'华中大区','任菲','10000000004'),
(105,100,'华南大区',NULL,NULL),
(106,100,'西北大区','华风','10000000005'),
(107,100,'西南大区','郝意','10000000006');

/*Table structure for table `emp` */

DROP TABLE IF EXISTS `emp`;

CREATE TABLE `emp` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `dept_id` INT(10) UNSIGNED NOT NULL COMMENT '所属部门',
  `name` VARCHAR(30) NOT NULL COMMENT '姓名',
  `gender` TINYINT(1) DEFAULT NULL COMMENT '性别: 0=男 1=女',
  `phone` VARCHAR(11) DEFAULT NULL COMMENT '联系电话',
  `email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
  `avatar` VARCHAR(100) DEFAULT NULL COMMENT '照片',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `emp` */

INSERT  INTO `emp`(`id`,`dept_id`,`name`,`gender`,`phone`,`email`) VALUES 
(1,100,'赵方旭',0,'10000000000','zhaofx@nadoutong.com'),
(2,100,'毕游龙',0,'10000000007','biyoulong@nadoutong.com'),
(3,100,'黄伯仁',0,'10000000008','huangboren@nadoutong.com'),
(4,101,'徐四',0,'10000000001','xusi@nadoutong.com'),
(5,101,'徐三',0,'10000000009','xusan@nadoutong.com'),
(6,101,'冯宝宝',1,'10000000010','fengbaobao@nadoutong.com'),
(7,101,'张楚岚',0,'10000000011','zhangchulan@nadoutong.com'),
(8,102,'高廉',0,'10000000002','gaolian@nadoutong.com'),
(9,102,'高二壮',1,'10000000012','gaoerzhuang@nadoutong.com'),
(10,103,'窦乐',0,'10000000003','doule@nadoutong.com'),
(11,103,'肖自在',0,'10000000013','xiaozizai@nadoutong.com'),
(12,104,'任菲',0,'10000000004','renfei@nadoutong.com'),
(13,106,'华风',0,'10000000005','huafeng@nadoutong.com'),
(14,107,'郝意',0,'10000000006','huafeng@nadoutong.com');

DROP TABLE IF EXISTS `hobby`;

CREATE TABLE `hobby` (  
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `emp_id` INT UNSIGNED NOT NULL COMMENT 'EmpID',
  `hobby` VARCHAR(50) COMMENT '爱好',
  PRIMARY KEY (`id`) 
) ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `hobby` (`id`, `emp_id`, `hobby`) VALUES
(1, 6, '埋人'),
(2, 4, '看美女'),
(3, 7, '月下遛鸟');

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (  
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` VARCHAR(20) NOT NULL COMMENT '用户名',
  `nickname` VARCHAR(30) COMMENT '昵称',
  `password` VARCHAR(32) COMMENT '密码',
  `avatar` VARCHAR(100) COMMENT '头像',
  `created_at` DATETIME COMMENT '创建时间',
  PRIMARY KEY (`id`) 
) ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO 
`user` (`id`, `username`, `nickname`, `password`, `avatar`, `created_at`) VALUES
(1, 'libai', '李白', '123456', '', '2023-10-08 16:57:24'),
(2, 'dufu', '杜甫', '123456', '', '2023-10-08 16:57:24'),
(3, 'baijuyi', '白居易', '123456', '', '2023-10-08 16:57:24');
```

## 数据库配置

数据库内容准备完毕后，在配置文件中进行数据库配置，只需要添加如下的内容即可

`manifest/config/config.yaml`

```yaml
database:
  type: "mysql"
  host: "127.0.0.1"
  port: "3306"
  user: "root"
  pass: "root"
  name: "goframe"
  timezone: "Asia/Shanghai"
  debug: true
```

> - `type`：数据库类型 mysql/sqlite/pgsql/oracle等
> - `host`：数据库主机
> - `port`：数据库端口
> - `user`：数据库连接用户名
> - `pass`：数据库连接密码
> - `name`：需要连接的数据库名
> - `timezone`：数据库时区，设置为`Asia/Shanghai`或者`Local`，不设置的话会出现时间转换混乱
> - `debug`：是否开启调试，学习及开发阶段可开启调试，查看数据库操作相关信息输出

以上为连接数据库最简单的配置。如果需要进行更复杂的配置可查阅官方文档[ORM使用配置]()

上述配置可以简化为一个`link`，格式为`type:user:password@tcp(host:prot)/dbname?param1=value1&..`

```yaml
database:
  debug: true
  link: "mysql:root:root@tcp(127.0.0.1:3306)/goframe?loc=Local&parseTime=true"
```

或者也可以保留上述配置，写为

```yaml
database:
  type: "mysql"
  host: "127.0.0.1"
  port: "3306"
  user: "root"
  pass: "root"
  name: "goframe"
  timezone: "Local"
  debug: true
  link: "mysql:root:root@tcp(127.0.0.1:3306)/goframe?loc=Local&parseTime=true"
```

这样的写法使用的是`link`，其他的单项配置不会生效。

<br>

## 驱动添加与导入

- 在`main.go`中进行MySQL驱动初始化导入

```go
import (
    _ "github.com/gogf/gf/contrib/drivers/mysql/v2"
)
```

- 在`go.mod`中添加驱动库与版本

```go
require (
    github.com/gogf/gf/contrib/drivers/mysql/v2 v2.5.3
    github.com/gogf/gf/v2 v2.5.3
)
```

- 在命令行中进行依赖更新

```shell
go mod tidy
```

等等下载更新完成即可。

至此，在GoFrame中使用数据库的准备工作才准备完毕，正式进入数据库操作部分。

<br>

## 数据库基本操作

`github.com/gogf/gf/v2/frame/g"`包里的`Model`函数返回一个`gdb.Model`对象，提供了一系列对数据库的操作。`Model`函数接收一个参数，为数据表名：

```go
md := g.Model("book")
```

返回一个与表`book`关联的`Model`

### 查询数据

#### One/All/Count/Value/Array/Fields

**查询数据库中一条数据**

```go
md := g.Model("book")
bk, err := md.One()
if err == nil {
    req.Response.WriteJson(bk)
}
```

返回数据库中第一条数据。查询成功返回的数据为`map[string]*gvar.Var`类型，所以可以直接访问里面的每一字段：

```go
req.Response.WriteJson(bk["name"])  // 返回结果中"name"字段
```

可以用`gvar.Var`的方法对字符进行类型转换，转为需要的类型

```go
bk["name"].String() // 转为string类型
bk["price"].Float32() // 转为float32类型
```

<br>

**指定查询字段**

```go
bk, err := md.Fields("name, price").One() //只查询name price两个字符
// 也可以写为
bk, err := md.Fields("name", "price").One()
```

<br>

**查询多条数据**

```go
md := g.Model("book")
bk, err := md.All()
```

该方法以切片返回数据表中所有数据，可以进行循环操作每一条数据

```go
for _, v := range bk {
    req.Response.Writeln(v)
}
```

<br>

**查询数据数量**

```go
md := g.Model("book")
count, err := md.Count()
```

<br>

**查询一条数据指定字段**

```go
md := g.Model("book")
name, err := md.Value("name")
```

<br>

**查询指定列数据**

```go
md := g.Model("book")
name, err := md.Array("name")
```

<br>

#### Max/Min/Sum/Avg

GoFrame提供了最大最小值、求和、平均等方法

```go
md := g.Model("book")

max, err := md.Max("price")
min, err := md.Min("price")
sum, err := md.Sum("price")
avg, err := md.Avg("price")
```

#### Where/Where\*/WhereOr/WhereOr\*

查询数据时可以通过`Where`方法指定条件，如果有多个`Where`，则多个条件之间会用`AND`连接

**等于**

默认情况下条件会用<kbd>=</kbd>连接

```go
md := g.Model("book")
books, err := md.Where("id", 1).All()
```

**不等**

如果是不等关系，需要在字段后面加上不等符号

```go
md := g.Model("book")
books, err := md.Where("id>", 1).All()
```

**多个条件叠加**

有多个条件时可以多个`Where`进行链式调用，条件会用`AND`连接。

```go
md := g.Model("book")
books, err := md.Where("id>=?", 2).Where("id<?", 4).All()
```

<br>

**Where系列方法**

| 方法                                   | 生成的SQL条件表达式                                       |
|:------------------------------------:|:-------------------------------------------------:|
| WhereLT(column, value)               | column < value                                    |
| WhereLTE(column, value)              | column <= value                                   |
| WhereGT(column, value)               | column > value                                    |
| WhereGTE(column, value)              | column >= value                                   |
| WhereBetween(column, min, max)       | column BETWEEN min AND max                        |
| WhereNotBetween(column, min, max)    | column NOT BETWEEN min AND max                    |
| WhereLike(column, like)              | column LIKE like                                  |
| WhereIn(column, in)                  | column IN (in)                                    |
| WhereNotIn(column, in)               | column NOT IN (in)                                |
| WhereNot(column, value)              | column != value                                   |
| WhereNull(columns1, columns2... )    | columns1 IS NULL AND columns2 IS NULL...          |
| WhereNotNull(columns1, columns2... ) | columns1 IS NOT NULL AND columns2 IS NOT NULL ... |
|                                      |                                                   |
|                                      |                                                   |

使用示例：

```go
md := g.Model("book")
books, err := md.WhereIn("id", g.Array{1, 2, 3}).WhereLike("name", "%数据%").All()

// 生成如下SQL
// SELECT * FROM `book` WHERE (`id` IN (1,2,3)) AND (`name` LIKE '%数据%')
```

<br>

以上方法如果链式调用会生成以`AND`连接的条件，如果需要生成以`OR`连接的条件，则需要用到下列方法：

**WhereOr系列方法**

| 方法                                     | 生成的SQL条件表达式                                            |
|:--------------------------------------:|:------------------------------------------------------:|
| WhereOrLT(column, value)               | OR (column < value)                                    |
| WhereOrLTE(column, value)              | OR (column <= value)                                   |
| WhereOrGT(column, value)               | OR  (column > value)                                   |
| WhereOrGTE(column, value)              | OR (column >= value)                                   |
| WhereOrBetween(column, min, max)       | OR (column BETWEEN min AND max)                        |
| WhereOrNotBetween(column, min, max)    | OR (column NOT BETWEEN min AND max)                    |
| WhereOrLike(column, like)              | OR (column LIKE like)                                  |
| WhereOrIn(column, in)                  | OR (column IN (in))                                    |
| WhereOrNotIn(column, in)               | OR (column NOT IN (in))                                |
| WhereOrNot(column, value)              | OR (column != value)                                   |
| WhereOrNull(columns1, columns2... )    | OR (columns1 IS NULL AND columns2 IS NULL...)          |
| WhereOrNotNull(columns1, columns2... ) | OR (columns1 IS NOT NULL AND columns2 IS NOT NULL ...) |
| WhereOr(column, value)                 | OR (column = value)                                    |
|                                        |                                                        |

示例：

```go
md := g.Model("book")
books, err := md.WhereIn("id", g.Array{1, 2, 3}).WhereOrLike("name", "%数据%").All()
// 生成如下SQL
// SELECT * FROM `book` WHERE (`id` IN (1,2,3)) OR (`name` LIKE '%数据%')
```

<br>

<br>

#### Group/Order/Order*

**按字段分组**

```go
md := g.Model("book")
books, err := md.Group("name").All()
```

**按字段排序**

```go
md := g.Model("book")
books, err := md.Order("price", "DESC").All()
// 多字段排序
books, err := md.Order("price", "DESC").Order("id", "ASC").All()
// 排序封装方法
books, err := md.OrderDesc("price").OrderAsc("id").All()
```

<br>

#### Scan

`One`和`All`返回的数据为`Map`或者`Map`切片，在实际使用当中查询到的数据可能需要转换为特定的数据结构方便使用。

`Scan`方法可以将查询到的数据转为自定义结构体或结构体数组。该方法使用方式非常灵活，示例中只演示推荐写法。

**查询数据转为自定义结构体**

```go
type Book struct {
    Id          uint
    Name        string
    Author      string
    Price       float64
    PublishTime *gtime.Time
}

var book *Book

md := g.Model("book")
err := md.Scan(&book)
```

`Scan`会将数据库字段下划线命名对应到结构体中相应的驼峰命名上，如果对应不上，则该成员为`nil`或者零值。如果结构体中成员名称与数据表中字段不对应，可以用`orm:`标签来指定对应字段

```go
type Book struct {
    BookId     uint        `orm:"id"  `
    BookName   string      `orm:"name"`
    BookAuthor string      `orm:"author"`
    BookPrice  float64     `orm:"price"`
    PubTime    *gtime.Time `orm:"publish_time"`
}

var book *Book

md := g.Model("book")
err := md.Scan(&book)
```

**结构体数组**

`Scan`方法可以查询单独结构体，如上，也可以查询一个结构体数组，只需要将结构体指针改为结构体切片传入即可

```go
type Book struct {
    Id          uint
    Name        string
    Author      string
    Price       float64
    PublishTime *gtime.Time
}

var book []Book

md := g.Model("book")
err := md.Scan(&book)
```

查询结果为一个由`Book`组成的结构体数组，存放多条数据。

<br>

查询部分暂时就先了解这些，实际上只要SQL熟悉的话每种查询基本上都能找到对应的方法来实现。更复杂的查询见官方文档[ORM查询]()

#### 查询结果为空判断

**All**

```go
md := g.Model("book")
books, _ := md.All()
if len(books) == 0 {
    g.RequestFromCtx(ctx).Response.Writeln("结果为空")
}
// 或者
if books.IsEmpty() {
    g.RequestFromCtx(ctx).Response.Writeln("结果为空")
}
```

<br>

**One**

```go
md := g.Model("book")
book, _ := md.Where("id", 100).One()
if len(book) == 0 {
    g.RequestFromCtx(ctx).Response.Writeln("结果为空")
}
// 或者
if book.IsEmpty() {
    g.RequestFromCtx(ctx).Response.Writeln("结果为空")
}
```

<br>

**Value**

```go
md := g.Model("book")
name, _ := md.Where("id", 10).Value("name")
if name.IsEmpty() {
    g.RequestFromCtx(ctx).Response.Writeln("结果为空")
}
```

<br>

**Array**

```go
md := g.Model("book")
names, _ := md.WhereLT("id", 10).Array("name")
if len(names) == 0{
    g.RequestFromCtx(ctx).Response.Writeln("结果为空")
}
```

<br>

**Scan结构体对象**

```go
var book *Book
md := g.Model("book")
md.Scan(&book)
if book == nil {
    g.RequestFromCtx(ctx).Response.Writeln("结果为空")
}
md.Save(data)
```

<br>

**Scan结构体数组**

```go
var books []Book
md := g.Model("book")
md.Scan(&books)
if len(books) == 0 {
    g.RequestFromCtx(ctx).Response.Writeln("结果为空")
}
```

<br>

#### 分页

GoFrame中提供了`Page`方法可以很方便实现分页查询，只需提供页数和每页数据数量即可。

```go
md := g.Model("book")
books, err := md.Page(1, 5).All()
```

也有`Limit`方法可以用来限制查询条数以及自定义起始位置与数据限制

```go
md := g.Model("book")
// 限制条数
books, err := md.Limit(5).All()
// 指定起始位置与限制条数
books, err := md.Limit(3, 5).All()
```

### 插入数据

#### Insert/Replace/Save

这三个方法都可以向数据库中写入一条或者多条数据，区别在于当数据中主键字段在数据库中已经存在时，处理方式不同：

| 方法      | 主键在数据库中已存在时       |
|:-------:|:-----------------:|
| Insert  | 报错，主键冲突           |
| Repalce | 用提供的数据替换已存在同主键的数据 |
| Save    | 用提供的数据更新已存在的同主键数据 |

**写入单条数据**

```go
md := g.Model("book")
data := g.Map{
    "id":           8,
    "name":         "Linux驱动开发入门与实践",
    "author":       "郑强",
    "price":        69,
    "publish_time": "2023-10-10",
}
// Insert
result, err := md.Insert(data)
// Replace
result, err := md.Replace(data)
// Save
result, err := md.Save(data)
```

以上方法也可配合`Data`使用

```go
// Insert
result, err := md.Data(data).Insert()
// Replace
result, err := md.Data(data).Replace()
// Save
result, err := md.Data(data).Save()
```

除了使用`Map`类型之外，还可以用结构体。结构体成员名称与数据表字段名称不对应时，用`orm`标签指定

```go
type Book struct {
    Id      uint
    Name    string
    Author  string
    Price   float64
    PubTime *gtime.Time `orm:"publish_time"`
}


md := g.Model("book")
data := Book{
    Id:      8,
    Name:    "Linux驱动开发入门与实践",
    Author:  "郑强",
    Price:   69.3,
    PubTime: gtime.New("2023-10-10"),
}
result, err := md.Data(data).Save()
```

<br>

**批量写入数据**

上述方法也可以批量写入数据

```go
data := g.List{
    g.Map{
        "name":         "Linux驱动开发入门与实践",
        "author":       "郑强",
        "price":        69.3,
        "publish_time": gtime.New("2023-10-10"),
    },
    g.Map{
        "name":         "Linux驱动开发入门与实践",
        "author":       "郑强",
        "price":        69.3,
        "publish_time": gtime.New("2023-10-10"),
    },
    g.Map{
        "name":         "Linux驱动开发入门与实践",
        "author":       "郑强",
        "price":        69.3,
        "publish_time": gtime.New("2023-10-10"),
    },
}

result, err := md.Data(data).Save()
```

如果使用的是结构体，将`g.List`改为`g.Array`或者`g.Slice`

<br>

#### InsertAndGetId

写入数据并返回自增ID

```go
data := g.Map{
    "name":         "Linux驱动开发入门与实践",
    "author":       "郑强",
    "price":        69.3,
    "publish_time": gtime.New("2023-10-10"),
}

result, err := md.Data(data).InsertAndGetId()
```

<br>

#### gdb.Raw

对于有的字段，可能需要调用SQL里面的操作来获得结果，例如，`publish_time`字段可以用SQL中的`CURRENT_DATE()`来获取当前日期，这时就需要用到`Raw`：

```go
data := g.Map{
    "name":         "Linux驱动开发入门与实践",
    "author":       "郑强",
    "price":        69.3,
    "publish_time": gdb.Raw("CURRENT_DATE()"),
}

result, err := md.Data(data).InsertAndGetId()
```

<br>

### 更新数据

#### Update

```go
data := g.Map{
    "author": "郑强强",
    "price":  69.333,
}

result, err := md.Where("author", "郑强").Update(data)
```

也可以配合`Data`使用

```go
data := g.Map{
    "author": "郑强强",
    "price":  69.333,
}

result, err := md.Where("author", "郑强").Data(data).Update()
```

<br>

#### Increment/Decrement

用来给指定字段增加/减少指定值

```go
result, err := md.WhereBetween("id", 7, 10).Increment("price", 2.5)
result, err := md.WhereBetween("id", 7, 10).Decrement("price", 1.5)
```

<br>

### 删除数据

```go
result, err := md.WhereGT("id", 10).Delete()
```

<br>

## 时间维护与软删除

在实际应用当中，数据表中通常会有三个时间字段：创建时间、更新时间、删除时间。GoFrame支持这三个时间字段的自动填充，这三个字段支持的类型为`DATE`、`DATETIME`、`TIMESTAMP`。

- 创建时间：默认为`created_at`
- 更新时间：默认为`updated_at`
- 删除时间：默认为`deleted_at`，数据软删除时使用

如果不想使用默认名称，需要自行修改，可以在配置文件里数据库配置时修改，方式如下：

```yam
database:
    ....
    createdAt: "create_time"
    updatedAt: "update_time"
    deletedAt: "delete_time"
```

<br>

**软删除**

> 软删除并不是真正从数据库中把记录删除，而是通过特定的标记在查询时过滤掉这些数据，使这些数据在页面上看不到，但实际上在数据库中仍然存在。通常用于一些需要历史追踪而不能真正删除的数据。

当数据表中有`deleted_at`字段时，使用`Delete`方法时不会物理删除数据，只是更新`deleted_at`字段的值。查询数据时，会自动加上<kbd>WHERE \`deleted_at\` IS NULL</kbd>这一条件，过滤掉已被“删除”的数据。

如果需要查询所有数据，需要使用`Unscoped`方法

```go
ls, _ := md.Unscoped().All()
```

<br>

## 事务处理

**常规写法**

```go
tx, err := g.DB().Begin(ctx)

if err == nil {
    _, err := tx.Model("book").Data(data).Save()
    if err == nil {
        tx.Commit()
    } else {
        tx.Rollback()
    }
}
```

<br>

**闭包写法**(框架建议写法)

```go
g.DB().Transaction(context.TODO(), func(ctx context.Context, tx gdb.TX) error {
    _, err := tx.Model("book").Ctx(ctx).Save(data)
    return err
})
```

<br>

## 原生SQL的使用

由`Model`提供的方法能组合出绝大多数使用场景所需要的数据操作，但如果需要的操作过于复杂，可能就没法通过已有的方法组合出来，就需要使用写SQL来实现

**查询**

```go
db := g.DB()
books, err := db.Query(ctx, "SELECT * FROM `book` WHERE `id` > ? AND `id` < ?", g.Array{3, 7})
```

**新增数据**

```go
db := g.DB()
sql := "INSERT INTO `book` (`name`, `author`, `price`) VALUES (?, ?, ?)"
data := g.Array{"Go语言从入门到精通", "Go语言研讨组", 99.98}
result, err := db.Exec(ctx, sql, data)
```

更多操作查看官方文档[ORM方法操作(原生)]()

<br>

<br>

## DAO自动生成与使用

数据库相关的操作与数据结构放在`dao`与`model`中，在GoFrame中，`dao`与`model`的内容可以自动生成。生成步骤如下：

1. 配置`dao`

`hack/comfig.yaml`

```yaml
gfcli:
  gen:
    dao:
      link: "mysql:root:root@tcp(127.0.0.1:3306)/goframe"
      tables: "book, user, dept, emp, hobby"
      jsonCase: "Snake"
```

> - link: 数据库连接url
> - tables: 需要生成dao及model的数据表，多个表用逗号隔开
> - jsonCase: entity成员转为json时的转换方式，"Snake"为把驼峰转为下划线

以上为最简单配置，更多配置见官方文档[代码生成/数据规范 gen dao]()章节

2. 在命令行中执行如下命令

```shell
gf gen dao
```

该命令会生成`dao`以及`model`下各个表对应的结构与代码。

接下来使用各个表对应的Model对象时，不再用`g.Model`获取，而是用下面的的方式：

```go
md := dao.Book.Ctx(ctx)
books, err := md.All()
```

该Model对象可以多次叠加查询条件：

```go
md := dao.Book.Ctx(ctx)
md = md.WhereGT("id", 3)
md = md.WhereLT("id", 6)
books, err := md.All()

// 以上代码相当于
books, err := dao.Book.Ctx(ctx).WhereGT("id", 3).WhereLT("id", 6).All()
```

<br>

## 字段过滤

使用结构体数据进行创建或更新数据时，尤其是在更新数据的时候，有些字段可能不需要更新，因此对应的字段就不进行赋值，例如以下代码

```go
type Book struct {
    Id      uint
    Name    string
    Author  string
    Price   float64
    PubTime *gtime.Time `orm:"publish_time"`
}

data := Book{
    Name:    "Linux驱动开发入门与实践",
    PubTime: gtime.New("2023-10-11"),
}

_, err = dao.Book.Ctx(ctx).Where("id", 13).Data(data).Update()
```

直接这样更新，则`id`、`author`、`price`也会被对应类型的零值更新，分别被更新为0、""、0

要解决这样的问题，有以下几种解决方案：

<br>

**用Fields指定需要更新的字段**

```go
dao.Book.Ctx(ctx).Fields("name", "publish_time").Where("id", 13).Data(data).Update()
```

<br>

**用FieldsEx排除不需要更新的字段**

```go
dao.Book.Ctx(ctx).FieldsEx("id,author,price").Where("id", 13).Data(data).Update()
```

<br>

**用OmitEmpty过滤空值**

```go
data := Book{
    Name:    "Linux驱动开发入门与实践",
    Price:   0,
    PubTime: nil,
}
dao.Book.Ctx(ctx).Where("id", 13).OmitEmpty().Data(data).Update()
```

用这种方法如上数据中，0和`nil`也会被忽略，没法更新对应字段的值。

<br>

**使用do对象进行字段过滤**

使用`gf gen dao`时，每个表会生成一个对应的`do`对象，使用`do`对象作为参数传递，将会自动过滤空值

```go
data := do.Book{
    Name:        "Linux驱动开发入门与实践",
    Price:       0,
    PublishTime: nil,
}

dao.Book.Ctx(ctx).Where("id", 13).Data(data).Update()
```

使用这种方法，非`nil`的零值都可以更新。

`do`对象也可以用于传递查询条件， 也会自动过滤空值

```go
where := do.Book{
    Author:      "郑强",
    Id:          13,
    PublishTime: nil,
}

books, err := dao.Book.Ctx(ctx).Where(where).All()
// 相当于
books, err := dao.Book.Ctx(ctx).Where("id", 13).Where("author", "郑强").All()
```

<br>

## 关联查询

多表数据联查时可以用连接，但是数据量大时连接效率不高，GoFrame中提供了模型关联查询，可以简化一些多表联查操作。

以`dept`、`emp`、`hobby`三个表为例，每个部门可以有多个员工，每个员工只有一个部门，每个员工对应一条爱好。

**查询所有员工，并关联查询出其所在部门**

- 修改`entity.Emp`，加入关联信息

`internal/model/entity/emp.go`

```go
type Emp struct {
    Id     uint   `json:"id"      ` // ID
    DeptId uint   `json:"dept_id" ` // 所属部门
    Name   string `json:"name"    ` // 姓名
    Gender int    `json:"gender"  ` // 性别: 0=男 1=女
    Phone  string `json:"phone"   ` // 联系电话
    Email  string `json:"email"   ` // 邮箱
    Avatar string `json:"avatar"  ` // 照片

    Dept *Dept    `orm:"with:id=dept_id" json:"dept"`
}
```

- 使用`With`指定关联模型查询

```go
var emps []*entity.Emp
err = dao.Emp.Ctx(ctx).With(entity.Dept{}).Scan(&emps)
```

不用`With`指定关联的话，查询出的结果中`Dept`为`nil`

<br>

**查询所有员工，并关联查询出部门与爱好**

- 修改`entity.Emp`，加入关联信息

`internal/model/entity/emp.go`

```go
type Emp struct {
    Id     uint   `json:"id"      ` // ID
    DeptId uint   `json:"dept_id" ` // 所属部门
    Name   string `json:"name"    ` // 姓名
    Gender int    `json:"gender"  ` // 性别: 0=男 1=女
    Phone  string `json:"phone"   ` // 联系电话
    Email  string `json:"email"   ` // 邮箱
    Avatar string `json:"avatar"  ` // 照片

    Dept *Dept    `orm:"with:id=dept_id" json:"dept"`
    Hobby *Hobby `orm:"with:emp_id=id" json:"hobby"`
}
```

- 使用`With`指定需要关联的内容

```go
var emps []*entity.Emp
err = dao.Emp.Ctx(ctx).With(entity.Dept{}, entity.Hobby{}).Where("dept_id", 101).Scan(&emps)
```

也可以用`WithAll`关联所有

```go
var emps []*entity.Emp
err = dao.Emp.Ctx(ctx).WithAll().Where("dept_id", 101).Scan(&emps)
```

<br>

**查询部门，关联查询出每个部门的员工**

- 修改`entity.Dept`，加入关联信息

`internal/model/entity/dept.go`

```go
// Dept is the golang structure for table dept.
type Dept struct {
    Id     uint   `json:"id"     ` // ID
    Pid    uint   `json:"pid"    ` // 上级部门ID
    Name   string `json:"name"   ` // 部门名称
    Leader string `json:"leader" ` // 部门领导
    Phone  string `json:"phone"  ` // 联系电话

    Emps []*Emp      `orm:"with:dept_id=id" json:"emps"`
}
```

- 查询

```go
var depts []*entity.Dept
err = dao.Dept.Ctx(ctx).With(entity.Emp{}).Scan(&depts)
```

<br>

上述关联查询直接在实体类里面修改，但实体类里的内容是用工具自动生成的，一般情况下不要修改。所以在进行关联查询时，需要重新自定义结构体，只需要保留需要查询的字段即可（用于关联的字段必须存在）

```go
type MyDept struct {
    g.Meta `orm:"table:dept"`
    Id     uint   `json:"id"     ` // ID
    Name   string `json:"name"   ` // 部门名称
    Leader string `json:"leader" ` // 部门领导
    Phone  string `json:"phone"  ` // 联系电话
}

type MyEmp struct {
    g.Meta `orm:"table:emp"`
    Id     uint   `json:"id"      ` // ID
    DeptId uint   `json:"dept_id" ` // 所属部门
    Name   string `json:"name"    ` // 姓名
    Phone  string `json:"phone"   ` // 联系电话

    Dept *MyDept `orm:"with:id=dept_id" json:"dept"`
}

var emps []*MyEmp
err = dao.Emp.Ctx(ctx).With(MyDept{}).Scan(&emps)
```

自定义结构体时，需要用`g.Meta`及`orm`标签指定对应的数据表

<br>

<br>

# 模板引擎

前面我们提过可以用下面几个方法返回模板内容

```go
func (r *Response) WriteTpl(tpl string, params ...gview.Params) error 
func (r *Response) WriteTplDefault(params ...gview.Params) error 
func (r *Response) WriteTplContent(content string, params ...gview.Params) error
```

默认情况下模板文件目录是`resource/template`

- `WriteTpl`解析并返回模板文件内容，文件为相对于`resource/template`的路径
- `WriteTplDefault`解析并返回默认模板，为`resource/template/index.html`
- `WriteTplContent`解析并返回模板字符串

常用的为`WriteTpl`，其他两个方法简单了解即可

```go
func (c *Controller) Tpl(req *ghttp.Request) {
    req.Response.WriteTplDefault() // 解析并返回默认模板文件内容
    // 解析并返回模板字符串
    req.Response.WriteTplContent("<h1>你好, {{.name}} 欢迎学习{{.lang}}</h1>", g.Map{"name": "王道长", "lang": "GoFrame"})
}
```

<br>

## 简单使用示例

`resource/template/hello/index.html`

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <div>
        <h1>你好， {{.name}}</h1>
        <h2>欢迎来到{{.lesson}}的学习课程</h2>
        <p>本课程共{{.num}}小节，现在学习的是{{.what}}</p>
    </div>

</body>
</html>
```

`controller`

```go
func (c *Controller) Tpl(req *ghttp.Request) {
    data := g.Map{
        "name":   "王也道长",
        "lesson": "GoFrame入门课程",
        "num":    5,
        "what":   "模板引擎使用示例",
    }

    req.Response.WriteTpl("hello/index.html", data)
}
```

<br>

## 模板配置

模板使用当中一般情况使用默认配置即可，如果需要修改配置，则在`manifest/config/config.yaml`中进行修改

```yaml
viewer: # 模板配置
  paths: ["resource/template", "/www/template"] # 模板路径配置，可以配置多个路径
  defaultFile: "index.hmtl" # WriteTplDefault解析的文件
  delimiters: ["${", "}"] # 模板引擎变量分隔符，默认为["{{", "}}"]
```

<br>

## 静态资源

静态资源不属于模板引擎的内容，但在模板文件中也有需要用到静态资源的地方，因此进行一下补充。

静态资源一般指的是js/css/image文件或者静态HTML文件，在GoFrame的项目目录中，这些文件放在`resource/public`下，之后还需要开启静态资源服务才能在模板文件中对这些资源进行引用。开启方式有两种

- 配置文件

`manifest/config/config.yaml`

```yaml
server:

  serverRoot:  "resource/public"
  indexFolder: true # 这个可以不用配置，放在这里了解一下
```

- 用代码开启

`internal/cmd/cmd.go`

```go
s := g.Server()
s.SetServerRoot("resource/public")
s.SetIndexFolder(true)
```

`serverRoot`配置了静态资源根目录`resource/public`，对静态资源的引用url以`resource/public`为根目录

例如，在`resource/public/resource/css`中放置了一人`bootstrap.css`文件，引用时写为

```html
<link rel="stylesheet" href="/resource/css/bootstrap.css">
```

<br>

## 条件判断

在模板中可以进行条件判断，根据条件是否满足来显示不同内容，语法如下：

```html
{{if .condition}}
条件满足时显示内容
{{else}}
条件不满足时显示内容
{{end}}
```

可以嵌套写，也可以写多个{{else if  .condition}}

当`.condition`为空值，即`0`、`""`、`nil`这类值时，条件判断为假，其他值均为真（条件满足）。

用法示例：

`resource/template/hello/index.html`

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resource/css/bootstrap.css">
    <title>Document</title>
</head>
<body>

   {{if .name}}
   <h1>name的值: {{.name}}</h1>
   {{else}}
   <h1>name的值为false/""/0/nil等</h1>
   {{end}}

</body>
</html>
```

`controller`

```go
func (c *Controller) Tpl(req *ghttp.Request) {
    data := g.Map{
        "name":   "王也道长",
        "lesson": "GoFrame入门课程",
        "num":    5,
        "what":   "模板引擎使用示例",
    }

    req.Response.WriteTpl("hello/index.html", data)
}
```

<br>

**大于小于等于判断**

在模板中无法直接使用`>`、`<`、`==`等符号进行关系判断，因此需要使用条件函数

| 函数  | 对应符号 |
|:---:|:----:|
| eq  | ==   |
| ne  | !=   |
| lt  | <    |
| le  | <=   |
| gt  | >    |
| ge  | >=   |

使用示例

```html
{{if eq 5 .num}}
<h1>num == 5</h1>
{{else if lt 5 .num}}
<h1>num > 5</h1>
{{else}}
<h1>num < 5</h1>
{{end}}
```

上述函数还有一些拓展用法，这里只简单介绍基础用法

<br>

**逻辑判断**

模板语言中可以用`and`、`or`、`not`进行逻辑运算

```html
{{if and (gt .num 0) (lt .num 5)}}    if num > 0 && num < 5
{{if or (eq .num 0) (eq .num 5)}}    if num == 0 || num == 5
{{if not (eq .num 0)}}    if num != 0
```

<br>

## 循环

`range ... end`

**循环切片**

`controller/hello.go`

```go
data := g.Map{
    "slice": g.Array{1, 2, 3, "张楚岚", "诸葛青"},
}

req.Response.WriteTpl("hello/index.html", data)
```

`index.html`

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resource/css/bootstrap.css">
    <title>Document</title>
</head>
<body>

   {{range .slice}}
   <span>{{.}}</span> 
   {{end}}

   {{range $index, $value := .slice}}
   <p>index = {{$index}}, value = {{$value}}</p>
   {{end}}


</body>
</html>
```

<br>

**map数据**

`controller/hello.go`

```go
func (c *Controller) Tpl(req *ghttp.Request) {
    data := g.Map{
        "mp": g.Map{
            "name":   "冯宝宝",
            "gender": "女",
            "age":    100,
            "hobby":  "埋人",
        },
    }

    req.Response.WriteTpl("hello/index.html", data)
}
```

`index.html`

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resource/css/bootstrap.css">
    <title>Document</title>
</head>
<body>

   <div class="container">
    <p>姓名：{{.mp.name}}</p>
    <p>性别：{{.mp.gender}}</p>
    <p>年龄：{{.mp.age}}</p>
    <p>爱好：{{.mp.hobby}}</p>


    {{range .mp}}
    <p>{{.}}</p>
    {{end}}

    {{range $key, $value := .mp}}
    <p>{{$key}}: {{$value}}</p>
    {{end}}

    </div>


</body>
</html>
```

<br>

<br>

# 上传与下载

## 文件上传

文件上传可以通过表单上传，也可以通过Ajax上传，GoFrame框架后端处理都是一样的，所以只演示一下表单上传。

**单文件上传**

`html/upload.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>上传文件</title>
</head>
<body>

    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="ufile"> <br>
        <input type="file" name="ufiles" multiple> <br>
        <input type="submit" value="上传">
    </form>

</body>
</html>
```

`controller/hello.go`

```go
func (c *Controller) Upload(req *ghttp.Request) {
    file := req.GetUploadFile("ufile")
    if file != nil {
        file.Filename = "20231001.png" // 可以根据需要给文件重命名
        name, err := file.Save("./upload")
        if err == nil {
            req.Response.Writeln(name)
        }
    }
}
```

<br>

**多文件上传**

```go
func (c *Controller) Upload(req *ghttp.Request) {
    files := req.GetUploadFiles("ufiles")
    if files != nil {
        names, err := files.Save("./upload")
        if err == nil {
            req.Response.Writeln(names)
        }
    }
}
```

除了从请求中获取上传文件以外，如果用api规范路由，还可以用如下方式获取上传文件

```go
type UploadReq struct {
    g.Meta `path:"/upload" method:"post"`

    Ufile ghttp.UploadFile `json:"ufile"`

    UFiles ghttp.UploadFiles `json:"ufiles"`
}
```

使用这种方式，如果文件允许为空， 则可能会发生转换错误。

<br>

**文件上传应用实例**

- 在静态资源目录新建`upload`文件夹用于存放上传文件，示例中为`resource/public/upload`，绑定的静态目录为`resource/public`，因此可以用`/upload/<filename>`的形式访问指定文件
- 将上传文件名称修改为对应文件的哈希值，以防上传同名文件覆盖
- 返回文件的URL

```go
func (c *Controller) Upload(ctx context.Context, r *api.UploadReq) (res *api.UploadRes, err error) {
    req := g.RequestFromCtx(ctx)
    file := req.GetUploadFile("ufile")
    if file != nil {
        var md5str string
        md5str, err = gmd5.Encrypt(file)
        if err != nil {
            return
        }
        file.Filename = md5str + path.Ext(file.Filename)
        name, err := file.Save("resource/public/upload")
        if err == nil {
            res = &api.UploadRes{
                Data: "/upload/" + name,
            }
        }
    }
    return
}
```

<br>

## 文件下载

**ServeFile**

`ServeFile`向客户端返回一个文件内容，如果是文本或者图片，将会直接展示，不能直接在浏览器中展示的将进行下载

```go
func (c *Controller) Download(req *ghttp.Request) {
    req.Response.ServeFile("upload/1.png")
}
```

<br>

**ServeFileDownload**

该方法直接引导客户端进行下载，并且可以给下载文件重命名

```go
func (c *Controller) Download(req *ghttp.Request) {
    req.Response.ServeFileDownload("upload/1.png", "download.png")
}
```

<br>

## 上传限制

如果需要限制单次上传文件大小，可以用`clientMaxBodySize`配置。如果完全不需要限制，直接设为0即可

`config.yaml`

```yaml
server:
  clientMaxBodySize: "0"
```

<br>

# 数据校验

在使用中，经常需要验证前端提交过来的数据是否符合规则，比如非空、长度限制、是否为数字等一系列验证。在GoFrame中，基本上都不用手动写验证规则，框架里已经提供了很多内置的验证规则可以用来验证数据。验证规则详细内容见官方文档[数据校验/校验规则]()

<br>

**单个规则/错误提示信息**

```go
func (c *Controller) Valid(ctx context.Context, rq *api.ValidReq) (rs *api.ValidRes, err error) {
    type Data struct {
        Name  g.Map `v:"required#name不能为空"`
        Age   int    `v:"required"`
        Phone string `v:"required"`
    }

    data := Data{}
    err = g.Validator().Bail().Data(data).Run(ctx)

    rs = &api.ValidRes{Data: data}
    return
}
```

<br>

**多个规则**

```go
func (c *Controller) Valid(ctx context.Context, rq *api.ValidReq) (rs *api.ValidRes, err error) {
    type Data struct {
        Name  string
        Age   string `v:"required|integer|min:1#age不能为空|age必须为整数|age不能小于1"`
        Phone string
    }

    data := Data{Age: "1.1"}
    err = g.Validator().Bail().Data(data).Run(ctx)

    rs = &api.ValidRes{Data: data}
    return
}
```

<br>

**使用Map指定校验规则**

```go
func (c *Controller) Valid(ctx context.Context, rq *api.ValidReq) (rs *api.ValidRes, err error) {
    type Data struct {
        Name  string
        Age   int
        Phone string
    }

    rules := map[string]string{
        "Name":  "required|length:6,16",
        "Age":   "between:18,30",
        "Phone": "phone",
    }
    message := map[string]interface{}{
        "Name": map[string]string{
            "required": "Name不能为空",
            "length":   "长度只能为{min}到{max}个字符",
        },
        "Age": "年龄只能为18到30岁",
    }
    data := Data{Phone: "123"}
    err = g.Validator().Rules(rules).Messages(message).Data(data).Run(ctx)

    rs = &api.ValidRes{Data: data}
    return
}
```

<br>

**规范路由API数据校验**

如果输入数据直接在API里定义了结构，可直接将校验规则写上，在请求时会自动校验，不需要再手动调用校验函数。

`api/hello.go`

```go
type ValidReq struct {
    g.Meta `path:"/valid" method:"all"`

    Name  string `v:"required|length:6,16"`
    Age   int    `v:"required"`
    Phone string `v:"phone"`
}

type ValidRes struct {
    Data interface{} `json:"data"`
}
```

`controller/hello.go`

```go
func (c *Controller) Valid(ctx context.Context, rq *api.ValidReq) (rs *api.ValidRes, err error) {
    return
}
```

<br>

# Cookie/Session

Cookie是保存在浏览器的一些数据，在请求的时候会放在请求头当中一同发送，通常用来保存sessionid、token等一些数据。

```go
func (c *Controller) Cookie(req *ghttp.Request) {
    req.Cookie.Set("id", "kslfjojklcjkldjfsie")
    req.Cookie.Set("user_name", "诸葛青")

    name := req.Cookie.Get("user_name")
    req.Response.Writeln("name from cookie: " + name.String())

    req.Cookie.Remove("id")
}
```

Session机制用于判断请求由哪一用户发起，Session数据保存在服务器。

以前常用于保存登录数据，进行登录验证，不过现在只是有些比较小的，前后端不分离的项目还在使用。   

```go
func (c *Controller) Session(req *ghttp.Request) {
    op := req.GetQuery("op").String()
    if op == "set" {
        req.Session.Set("user", g.Map{"name": "张三", "id": 18})
    } else if op == "get" {
        req.Response.Writeln(req.Session.Get("user"))
    } else if op == "rm" {
        req.Session.Remove("user")
    }
}
```

<br>

# golang-jwt

前后端分离的项目更常用的登录验证是`JWT(JSON web token)`。GoFrame中没有提供相关生成与验证，需要添加第三方库，例如`golang-jwt`

简单使用方式如下：

- 添加

```shell
go get -u github.com/golang-jwt/jwt/v5
```

- 导入

```go
import "github.com/golang-jwt/jwt/v5"
```

- 生成token

```go
func (c *Controller) Jwt(req *ghttp.Request) {
    type UserClaims struct {
        UserID   uint
        UserName string
        jwt.RegisteredClaims
    }

    const key = "arandomstring"

    claim := UserClaims{
        UserID:   1011,
        UserName: "张之维",
        RegisteredClaims: jwt.RegisteredClaims{
            Subject:   "张之维",
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 10)),
        },
    }
    token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claim).SignedString([]byte(key))
    if err == nil {
        req.Response.Writeln(token)
    } else {
        req.Response.Writeln(err)
    }
}
```

- token验证

```go
func (c *Controller) Jwt(req *ghttp.Request) {
    type UserClaims struct {
        UserID   uint
        UserName string
        jwt.RegisteredClaims
    }

    const key = "arandomstring"

    token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEwMTEsIlVzZXJOYW1lIjoi5byg5LmL57u0Iiwic3ViIjoi5byg5LmL57u0IiwiZXhwIjoxNjk4NjcxMjA3fQ.r11R1_WcDueBU52BoUjDS94jqemgrhU-V4WW7YSvXWE"
    result, err := jwt.ParseWithClaims(token, &UserClaims{}, func(t *jwt.Token) (interface{}, error) {
        return []byte(key), nil
    })

    if err == nil && result.Valid {
        claim, ok := result.Claims.(*UserClaims)
        if ok {
            req.Response.Writeln("token验证成功")
            req.Response.Writeln(claim)
        }
        req.Response.Writeln(result.Claims)
    } else {
        req.Response.Writeln(err)
    }
}
```

<br>

`jwt.RegisteredClaims`

```go
type RegisteredClaims struct {
    // 发布者
    Issuer string `json:"iss,omitempty"`

    // token使用主体
    Subject string `json:"sub,omitempty"`

    // 
    Audience ClaimStrings `json:"aud,omitempty"`

    // 失效时间
    ExpiresAt *NumericDate `json:"exp,omitempty"`

    // 生效时间
    NotBefore *NumericDate `json:"nbf,omitempty"`

    // 发布时间
    IssuedAt *NumericDate `json:"iat,omitempty"`

    // 可以唯一标识这一jwt的字符串，用来防止数据相似的jwt哈希碰撞
    ID string `json:"jti,omitempty"`
}
```

<br>

# 中间件

中间件（拦截器）是在请求与响应的过程中，拦截下请求与响应并做一些操作，常见的用途是在请求前进行鉴权，在请求后对响应数据进行包装等

中间件的定义与普通路由函数一样，只是其中需要用`Next()`进行路由放行。

```go
func MiddleWare(r *ghttp.Request) {
    r.Middleware.Next()
}
```

**前置中间件**

在执行具体的路由函数之前进行操作的中间件称为前置中间件，例如进行登录验证的中间件：

```go
func (s *sMiddleware) Auth(r *ghttp.Request) {
    user := service.Session().GetUser(r.Context())
    if user.Id == 0 {
        _ = service.Session().SetNotice(r.Context(), &model.SessionNotice{
            Type:    consts.SessionNoticeTypeWarn,
            Content: "未登录或会话已过期，请您登录后再继续",
        })
        // 只有GET请求才支持保存当前URL，以便后续登录后再跳转回来。
        if r.Method == "GET" {
            _ = service.Session().SetLoginReferer(r.Context(), r.GetUrl())
        }
        // 根据当前请求方式执行不同的返回数据结构
        if r.IsAjaxRequest() {
            response.JsonRedirectExit(r, 1, "", s.LoginUrl)
        } else {
            r.Response.RedirectTo(s.LoginUrl)
        }
    }
    r.Middleware.Next()
}
```

<br>

**后置中间件**

在路由函数执行完成之后再进行操作的中间件称为后置中间件，例如对返回的数据格式进行统一封装的中间件：

```go
// 返回处理中间件
func (s *sMiddleware) ResponseHandler(r *ghttp.Request) {
    r.Middleware.Next()

    // 如果已经有返回内容，那么该中间件什么也不做
    if r.Response.BufferLength() > 0 {
        return
    }

    var (
        err             = r.GetError()
        res             = r.GetHandlerResponse()
        code gcode.Code = gcode.CodeOK
    )
    if err != nil {
        code = gerror.Code(err)
        if code == gcode.CodeNil {
            code = gcode.CodeInternalError
        }
        if r.IsAjaxRequest() {
            response.JsonExit(r, code.Code(), err.Error())
        } else {
            service.View().Render500(r.Context(), model.View{
                Error: err.Error(),
            })
        }
    } else {
        if r.IsAjaxRequest() {
            response.JsonExit(r, code.Code(), "", res)
        } else {
            // 什么都不做，业务API自行处理模板渲染的成功逻辑。
        }
    }
}
```

中件间的定义实际上就是如下：

```go
func MiddleWare(r *ghttp.Request) {
    // 前置中间件
    r.Middleware.Next()
    // 后置中间件
}
```

<br>

**SetCtxVar/GetCtxVar**

如果需要在一些请求流程中进行参数传递，可以用`SetCtxVar/GetCtxVar`进行存取

例如

```go
func MiddleWare(r *ghttp.Request) {
    r.SetCtxVar("UserName", "陆玲珑")
    r.Middleware.Next()
}
```

在具体路由函数中取用

```go
UserName := r.GetCtxVar("UserName")
```

<br>

# 组件

## 数据结构

GoFrame中提供了一些常用的数据结构，如列表、队列、集合、Map等，详细内容见官方文档。

<br>

## 时间

**当前时间**

```go
t := gtime.Now()
```

```go
t := gtime.Date()
```

```go
t := gtime.Datetime()
```

**创建时间对象**

```go
t := gtime.New("2023-11-03 21:45:22")
```

参数可以是字符串、时间戳、时间对象等数据

```go
t := gtime.NewFromStr("2023-11-03 21:50:25")
```

```go
t, err := gtime.StrToTime("2023-11-03 21:50:25")
```

将字符串转为时间对象，具体支持的时间格式见文档[时间管理/工具方法]()

**设置时区**

```go
gtime.SetTimeZone("Asia/Tokyo")
t := gtime.Now()
```

**时间戳**

```go
t1 := gtime.Timestamp()
t2 := gtime.TimestampMilli()
t3 := gtime.TimestampMicro()
t4 := gtime.TimestampNano()
```

返回为`int64`类型，也可以返回字符串类型

```go
t1 := gtime.TimestampStr()
t2 := gtime.TimestampMilliStr()
t3 := gtime.TimestampMicroStr()
t4 := gtime.TimestampNanoStr()
```

**格式化日期数据**

可以将日期格式化为指定的格式，具体格式化用到的符号见文档[时间管理/时间格式]()

```go
t := gtime.Now()
req.Response.Writeln(t.Format("Y-m-d H:i:s"))
req.Response.Writeln(t.Format("YmdHis"))
```

**获取年月日时分秒**

```go
t := gtime.Now()
req.Response.Writeln(t.Year())
req.Response.Writeln(t.Month())
req.Response.Writeln(t.Day())
req.Response.Writeln(t.Hour())
req.Response.Writeln(t.Minute())
req.Response.Writeln(t.Second())
```

更多操作方法见文档[时间管理/方法介绍]()

<br>

## 随机数

**随机整数**

```go
n := grand.Intn(100)
```

返回0 <= n < 100的随机数

```go
n := grand.N(100, 999)
```

返回100 <= n <= 999的随机数

<br>

**随机字符串**

```go
s := grand.S(10)
s := grand.S(10, true)
```

返回指定长度的随机字母/数字组合的字符串，第二个参数为`true`表示包括特殊符号

```go
s := grand.Digits(10)
```

返回指定长度的随机数字字符串

```go
s := grand.Letters(10)
```

返回指定长度的随机字母字符串

```go
s := grand.Symbols(10)
```

返回指定长度的随机特殊符号字符串

```go
s := grand.Str("日照香炉生紫烟，遥看瀑布挂前川。Oh Yeah", 5)
```

从给定的字符串中随机返回指定数量的字符，可以是汉字。

<br>

**全局唯一数**

```go
s := guid.S()
```

<br>

<br>

# 接口文档

用规范路由的写法，GoFrame会自动生成接口文档。所有接口信息会自动生成在`/api.json`中，遵循的是`OpenAPIv3`标准，框架默认使用的是`redoc`来生成文档前端页面，只能查看接口信息，不能进行请求测试。因此可以可以改为其他UI页面，例如`swaggerUI`或者自行实现UI页面。

- **注释掉`manifest/config/config.yml`中的`swaggerPath: "/swagger"`**
- **实现UI页面，引入`swaggerUI`组件**

`swagger.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/swagger-ui.css">
    <script src="/swagger-ui-bundle.js"></script>
    <title>API Doc</title>
</head>
<body>
    <div id="swagger-ui"></div>
</body>
</html>

<script type="text/javascript">
    window.ui = SwaggerUIBundle({
        url: '/api.json',
        dom_id: '#swagger-ui'
    })
</script>
```

引入的CSS与JS文件如果下载到项目中则用上述方式引入，或者可以通过下列CDN引入

```html
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@latest/swagger-ui.css" />

```

- **添加路由**

```go
group.GET("/swagger", func(req *ghttp.Request) {
                    req.Response.WriteTpl("/swagger.html")
                })
```

<br>

# 构建打包

GoFrame中静态资源也可以直接打包进可执行文件当中，发布时只需提供一个可执行文件即可。

- **配置**

`hack/config.yaml`

```yaml
gfcli:
  build:
    name: "hellogf"
    arch: "amd64"
    system: "linux"
    mode: "none"
    cgo: 0
    packSrc: "manifest/config,resource/public,resource/template"
    version: "1.0.0"
    output: "./bin"
    extra: ""
```

> - `name`：打包后的可执行文件名
> - `arch`：系统架构，可以有多个，用<kbd>,</kbd>分隔，用`all`表示编译所有支持的架构
> - `system`：编译平台，可以有多个，用<kbd>,</kbd>分隔，用`all`表示编译所有支持的系统
> - `packSrc`：需要打包的静态资源目录
> - `version`：版本号

- **打包**

```shell
gf build
```

以上操作会把指定的目录一起打包进可执行文件。通常情况例如配置文件等一些需要改动的文件不用打包进可执行文件。

<br>

# 综合示例

本示例简单实现下列功能的API：

1. 书本数据获取(分页)
2. 书本数据添加、编辑、删除
3. 用户名与密码登录
4. 书本数据展示与添加、编辑、删除需要登录才能访问

本示例用API实现，即只用JSON格式数据进行返回。如果需要用模板实现，核心部分都相同，只是需要将返回的数据自行组织到模板页面上。

## 

**1. 创建项目**

```shell
gf init gfbook
```

删除`api`、`controller`中自动生成的文件，删除`cmd.go`中的路由绑定。

添加依赖的库，`mysql`驱动和`jwt`

方法一（需要联网）：

```shell
go get github.com/gogf/gf/contrib/drivers/mysql/v2
go get github.com/golang-jwt/jwt/v5
```

`mysql`驱动初始化导入

`main.go`

```go
import (
    _ "github.com/gogf/gf/contrib/drivers/mysql/v2"
)
```

方法二（需要之前已经下载过对应版本的库，此次不需要联网）

需要先进行初始化导入，不然没法添加

`main.go`

```go
import (
    _ "github.com/gogf/gf/contrib/drivers/mysql/v2"
    _ "github.com/golang-jwt/jwt/v5" // 这行在go mod tidy运行之后删除
)
```

`go.mod`

```go
require (
    github.com/gogf/gf/contrib/drivers/mysql/v2 v2.5.3
    github.com/gogf/gf/v2 v2.5.3
    github.com/golang-jwt/jwt/v5 v5.0.0
)
```

执行以下指令更新

```shell
go mod tidy
```

**2. 配置**

`internal/config/config.yaml`

配置数据库连接

```yaml
server:
  address:     ":8000"
  openapiPath: "/api.json"
  swaggerPath: "/swagger"
  serverRoot:  "resource/public/resource"

database:
  link: "mysql:root:root@tcp(127.0.0.1:3306)/goframe?loc=Local&parseTime=true"

logger:
  level : "all"
  stdout: true
```

准备需要用到的资源文件

`hack/config.yaml`

配置DAO生成相关信息

```yaml
gfcli:
  gen:
    dao:
      link: "mysql:root:root@tcp(127.0.0.1:3306)/goframe"
      tables: "user,book"
      jsonCase: "Snake"
```

配置完成之后运行命令生成DAO相关文件

```shell
gf gen dao
```

**3.编写API数据结构**

`api/user/user.go`

```go
package user

import "github.com/gogf/gf/v2/frame/g"

type LoginReq struct {
    g.Meta   `path:"/login" method:"post"`
    Username string `p:"username" v:"required#请输入用户名" dc:"用户名"`
    Password string `p:"password" v:"required#请输入密码" dc:"密码"`
}

type UserInfo struct {
    Id       uint   `json:"id"         dc:"用户ID"`
    Username string `json:"username"   dc:"用户名"`
    Nickname string `json:"nickname"   dc:"昵称"`
    Avatar   string `json:"avatar"     dc:"用户头像"`
}

type LoginRes struct {
    Token    string    `json:"token" dc:"验证token"`
    UserInfo *UserInfo `json:"user_info"`
}
```

`api/book/book.go`

```go
package book

import (
    "gfbook/internal/model/entity"

    "github.com/gogf/gf/v2/frame/g"
    "github.com/gogf/gf/v2/os/gtime"
)

type IndexReq struct {
    g.Meta   `path:"/book" method:"get"`
    Page     uint `p:"page" v:"required|integer|min:1#数据页不能为空|数据页只能是整数|数据页不能小于1" dc:"页数"`
    PageSize uint `p:"page_size" v:"integer|min:1#数据大小只能为整数|数据大小不能小于1" d:"10" dc:"每页数据量"`
}

type IndexRes struct {
    Page     uint          `json:"page" dc:"页数"`
    PageSize uint          `json:"page_size" dc:"每页数据量"`
    Rows     []entity.Book `json:"rows" dc:"查询数据"`
}

type AddReq struct {
    g.Meta      `path:"/book" method:"post"`
    Name        string      `p:"name" v:"required#书名不能为空"  dc:"书名"      `
    Author      string      `p:"author" v:"required#作者不能为空"   dc:"作者"     `
    Price       float64     `p:"price" v:"required|float|min:0#价格不能为空|价格格式不正确|价格不能小于0" dc:"价格"       `
    PublishTime *gtime.Time `p:"publish_time" v:"date#出版时间格式不正确" dc:"出版日期"`
}

type AddRes struct {
}

type EditReq struct {
    g.Meta      `path:"/book" method:"put"`
    Id          uint        `p:"id" v:"required" dc:"书本ID"`
    Name        string      `p:"name"  dc:"书名"      `
    Author      string      `p:"author"   dc:"作者"     `
    Price       float64     `p:"price" v:"float|min:0#价格格式不正确|价格不能小于0"  dc:"价格"      `
    PublishTime *gtime.Time `p:"publish_time" v:"date#出版时间格式不正确" dc:"出版日期"`
}

type EditRes struct{}

type DelReq struct {
    g.Meta `path:"/book" method:"delete"`
    Id     uint `p:"id" v:"required" dc:"书本ID"`
}

type DelRes struct{}
```

**4. 控制器框架及路由绑定**

`internal/controller/user/user.go`

```go
package user

import (
    "context"
    "gfbook/api/user"
)

var UserController = &cUser{}

type cUser struct {
}

func (c *cUser) Login(ctx context.Context, req *user.LoginReq) (res *user.LoginRes, err error) {
    return
}
```

`internal/controller/book/book.go`

```go
package book

import (
    "context"
    "gfbook/api/book"
)

var BookController = &cBook{}

type cBook struct{}

func (c *cBook) Index(ctx context.Context, req *book.IndexReq) (res *book.IndexRes, err error) {
    return
}

func (c *cBook) Add(ctx context.Context, req *book.AddReq) (res *book.AddRes, err error) {
    return
}

func (c *cBook) Edit(ctx context.Context, req *book.EditReq) (res *book.EditRes, err error) {
    return
}

func (c *cBook) Del(ctx context.Context, req *book.DelReq) (res *book.EditRes, err error) {
    return
}
```

`internal/cmd/cmd.go`

```go
s := g.Server()
s.Group("/", func(group *ghttp.RouterGroup) {
    group.Middleware(ghttp.MiddlewareHandlerResponse)
    group.Group("/user", func(group *ghttp.RouterGroup) {
        group.Bind(user.UserController)
    })
    group.Group("/", func(group *ghttp.RouterGroup) {
        group.Bind(book.BookController)
    })
})
```

**5. 设计Book的Service接口并完善控制器**

`internal/service/book.go`

```go
package service

import (
    "context"
    "gfbook/internal/model/do"
    "gfbook/internal/model/entity"
)

type IBook interface {
    // 查询书本列表
    GetList(ctx context.Context, page uint, pageSize uint) (books []entity.Book, err error)
    // 添加书本信息
    Add(ctx context.Context, book do.Book) (err error)
    // 修改书本信息
    Edit(ctx context.Context, book do.Book) (err error)
    // 删除书本信息
    Del(ctx context.Context, id uint) (err error)
}

var localBook IBook

func Book() IBook {
    if localBook == nil {
        panic("IBook接口未实现或未注册")
    }
    return localBook
}

func RegisterBook(i IBook) {
    localBook = i
}
```

`internal/controller/book/book.go`

```go
package book

import (
    "context"
    "gfbook/api/book"
    "gfbook/internal/model/do"
    "gfbook/internal/service"
)

var BookController = &cBook{
    service: service.Book(),
}

type cBook struct {
    service service.IBook
}

func (c *cBook) Index(ctx context.Context, req *book.IndexReq) (res *book.IndexRes, err error) {
    books, err := service.Book().GetList(ctx, req.Page, req.PageSize)
    if err == nil {
        res = &book.IndexRes{
            Page:     req.Page,
            PageSize: req.PageSize,
            Rows:     books,
        }
    }
    return
}

func (c *cBook) Add(ctx context.Context, req *book.AddReq) (res *book.AddRes, err error) {
    err = c.service.Add(ctx, do.Book{
        Name:        req.Name,
        Author:      req.Author,
        Price:       req.Price,
        PublishTime: req.PublishTime,
    })
    return
}

func (c *cBook) Edit(ctx context.Context, req *book.EditReq) (res *book.EditRes, err error) {
    err = c.service.Edit(ctx, do.Book{
        Id:          req.Id,
        Name:        req.Name,
        Author:      req.Author,
        Price:       req.Price,
        PublishTime: req.PublishTime,
    })
    return
}

func (c *cBook) Del(ctx context.Context, req *book.DelReq) (res *book.EditRes, err error) {
    err = c.service.Del(ctx, req.Id)
    return
}
```

<br>

**6. Logic层Book操作具体实现**

- 新建`internal/logic/book/book.go`文件，实现上面的`IBook`接口

`internal/logic/book/book.go`

```go
package book

import (
    "context"
    "gfbook/internal/dao"
    "gfbook/internal/model/do"
    "gfbook/internal/model/entity"
    "gfbook/internal/service"
)

func init() {
    service.RegisterBook(New())
}

func New() *iBook {
    return &iBook{}
}

type iBook struct{}

// Add implements service.IBook.
func (*iBook) Add(ctx context.Context, book do.Book) (err error) {
    _, err = dao.Book.Ctx(ctx).Data(book).Insert()
    return
}

// Del implements service.IBook.
func (*iBook) Del(ctx context.Context, id uint) (err error) {
    _, err = dao.Book.Ctx(ctx).Where(dao.Book.Columns().Id, id).Delete()
    return
}

// Edit implements service.IBook.
func (*iBook) Edit(ctx context.Context, book do.Book) (err error) {
    _, err = dao.Book.Ctx(ctx).Where(dao.Book.Columns().Id, book.Id).Data(book).Update()
    return
}

// GetList implements service.IBook.
func (*iBook) GetList(ctx context.Context, page uint, pageSize uint) (books []entity.Book, err error) {
    err = dao.Book.Ctx(ctx).Page(int(page), int(pageSize)).Scan(&books)
    return
}
```

- 新建`internal/logic/logic.go`文件，并对上述实现进行初始化导入

```go
import (
    _ "gfbook/internal/logic/book"
)
```

- 在`main.go`中对logic进行初始化导入

`main.go`

```go
import (
    _ "gfbook/internal/logic"
)
```

<br>

**7. User的Service层设计与控制器完善**

`internal/service/user.go`

```go
package service

import (
    "context"
    "gfbook/internal/model/entity"
)

type IUser interface {
    Login(ctx context.Context, username string, password string) (user *entity.User, err error)
}

var localUser IUser

func User() IUser {
    if localUser == nil {
        panic("IUser接口未实现或未注册")
    }
    return localUser
}

func RegisterUser(i IUser) {
    localUser = i
}
```

`internal/controller/user/user.go`

```go
package user

import (
    "context"
    api_user "gfbook/api/user"
    "gfbook/internal/model/entity"
    "gfbook/internal/service"
    "time"

    "github.com/golang-jwt/jwt/v5"
)

var UserController = &cUser{}

type cUser struct {
}

func (c *cUser) Login(ctx context.Context, req *api_user.LoginReq) (res *api_user.LoginRes, err error) {
    user, err := service.User().Login(ctx, req.Username, req.Password)
    if err == nil {
        res = &api_user.LoginRes{
            Token: jwtToken(user),
            UserInfo: &api_user.UserInfo{
                Id:       user.Id,
                Username: user.Username,
                Nickname: user.Nickname,
                Avatar:   user.Avatar,
            },
        }
    }
    return
}

func jwtToken(user *entity.User) string {

    const JwtTokenKey = "zbvxMPp12fibPNnOaYmc0rviniaJCOVJ"
    // 实际使用中可将Key存于文件中或放在常量中 consts.JwtTokenKey

    claim := jwt.RegisteredClaims{
        Subject:   user.Username,
        ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
    }

    token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claim).SignedString([]byte(JwtTokenKey))

    if err != nil {
        panic("token生成出错")
    }

    return token
}
```

<br>

**8. User的Logic层实现**

`internal/logic/user/user.go`

```go
package user

import (
    "context"
    "gfbook/internal/dao"
    "gfbook/internal/model/do"
    "gfbook/internal/model/entity"
    "gfbook/internal/service"

    "github.com/gogf/gf/v2/errors/gerror"
)

type iUser struct{}

func New() *iUser {
    return &iUser{}
}

func init() {
    service.RegisterUser(New())
}

// Login implements service.IUser.
func (*iUser) Login(ctx context.Context, username string, password string) (user *entity.User, err error) {
    err = dao.User.Ctx(ctx).Where(do.User{
        Username: username,
        Password: password,
    }).Scan(&user)

    if user == nil {
        err = gerror.New("用户名或密码有误")
    }

    return
}
```

`internal/logic/logic.go`

```go
import (
    _ "gfbook/internal/logic/book"
    _ "gfbook/internal/logic/user"
)
```

<br>

**9. 添加登录验证中间件**

`internal/service/middware.go`

```go
package service

import "github.com/gogf/gf/v2/net/ghttp"

type IMiddleware interface {
    Auth(r *ghttp.Request)
}

var localMiddleware IMiddleware

func Middleware() IMiddleware {
    if localMiddleware == nil {
        panic("IMiddleware接口未实现或未注册")
    }
    return localMiddleware
}

func RegisterMiddleware(i IMiddleware) {
    localMiddleware = i
}
```

`internal/logic/middleware/middleware.go`

```go
package middleware

import (
    "gfbook/internal/consts"
    "gfbook/internal/service"

    "github.com/gogf/gf/v2/net/ghttp"
    "github.com/golang-jwt/jwt/v5"
)

func init() {
    service.RegisterMiddleware(New())
}

func New() *iMiddleware {
    return &iMiddleware{}
}

type iMiddleware struct {
}

// Auth implements service.IMiddleware.
func (*iMiddleware) Auth(r *ghttp.Request) {
    var res *ghttp.DefaultHandlerResponse
    tokenStr := r.Header.Get("Authorization")
    if tokenStr == "" {
        res = &ghttp.DefaultHandlerResponse{
            Code:    403,
            Message: "请登录后携带token访问",
        }
    } else {
        token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
            return []byte(consts.JwtTokenKey), nil
        })

        if err != nil || !token.Valid {
            res = &ghttp.DefaultHandlerResponse{
                Code:    403,
                Message: "token已失效，请重新登录",
            }
        }
    }
    if res != nil {
        r.Response.WriteJsonExit(res)
    }
    r.Middleware.Next()
}
```

`internal/logic/logic.go`

```go
package logic

import (
    _ "gfbook/internal/logic/book"
    _ "gfbook/internal/logic/middleware"
    _ "gfbook/internal/logic/user"
)
```

`internal/cmd/cmd.go`

```go
group.Group("/", func(group *ghttp.RouterGroup) {
                    group.Middleware(service.Middleware().Auth)
                    group.Bind(book.BookController)
                })
```

<br>

**10. 接口文档**

准备对应的JS与CSS文件放入静态资源对应的目录，或者可以用在线的CDN链接

`template/api.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resource/css/swagger-ui.css">
    <script src="/resource/js/swagger-ui-bundle.js"></script>
    <title>API Doc</title>
</head>
<body>
    <div id="swagger-ui"></div>
</body>
</html>

<script type="text/javascript">
    window.ui = SwaggerUIBundle({
        url: '/api.json',
        dom_id: '#swagger-ui'
    })
</script>
```

`internal/cmd/cmd.go`

```go
group.GET("/api", func(req *ghttp.Request) {
                    req.Response.WriteTpl("/api.html")
                })
```

<br>

# 后续学习项目

https://github.com/gogf/gf-demo-user

https://github.com/gogf/focus-single