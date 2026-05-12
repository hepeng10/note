# middleware 的基本原理
# 一、先给你一句话理解

> 👉 middleware 本质上是“一层套一层的函数调用”

---

# 二、你看到的代码

比如 GoFrame：

```go id="gq8c44"
func Auth(r *ghttp.Request) {
    token := r.GetHeader("Authorization")

    if token == "" {
        r.Response.Write("unauthorized")
        return
    }

    r.Middleware.Next()
}
```

---

你会疑惑：

```text id="z43om6"
为什么不调用 Next 就不会继续？
```

---

# 三、核心原理（重点）

框架内部其实维护了：

```text id="e38klr"
一个 middleware 数组
```

比如：

```go id="5q2d0o"
middlewares := []Handler{
    Logger,
    Auth,
    Controller,
}
```

---

# 四、Next() 本质是什么？

👉 本质就是：

```text id="kqsr4d"
执行“下一个 handler”
```

---

# 五、伪代码实现（非常重要）

我给你写一个“极简版 GoFrame/Gin”：

---

## 1️⃣ 定义 Context

```go id="24z80t"
type Context struct {
    handlers []Handler
    index    int
}
```

---

## 2️⃣ Handler 类型

```go id="6v96rq"
type Handler func(*Context)
```

---

## 3️⃣ Next()

```go id="8q8vf3"
func (c *Context) Next() {
    c.index++

    if c.index < len(c.handlers) {
        c.handlers[c.index](c)
    }
}
```

---

# 六、执行过程（关键）

---

## middleware 链：

```text id="m32klp"
Logger
Auth
Controller
```

---

## 开始执行

```go id="n3bx3i"
ctx.index = 0
handlers[0](ctx)
```

---

# 七、Logger 执行

```go id="qz9lpz"
func Logger(c *Context) {
    fmt.Println("before logger")

    c.Next()

    fmt.Println("after logger")
}
```

---

执行：

```text id="b7r01o"
before logger
```

然后：

```go id="66jlwm"
c.Next()
```

👉 index++

```text id="u3ybsn"
进入 Auth
```

---

# 八、Auth 执行

```go id="g7r0h9"
func Auth(c *Context) {
    fmt.Println("before auth")

    c.Next()

    fmt.Println("after auth")
}
```

---

执行：

```text id="6ddmcm"
before auth
```

然后：

```go id="90bqzm"
c.Next()
```

👉 进入 Controller

---

# 九、Controller 执行

```go id="3tt3zb"
func Controller(c *Context) {
    fmt.Println("controller")
}
```

---

输出：

```text id="2gggln"
controller
```

---

# 十、返回调用栈（非常关键）

然后会：

```text id="vqwb0f"
返回 Auth
```

执行：

```text id="0c1i2q"
after auth
```

再返回：

```text id="tyk0gq"
Logger
```

执行：

```text id="y5o7df"
after logger
```

---

# 十一、最终输出（经典）

```text id="sxcr2f"
before logger
before auth
controller
after auth
after logger
```

---

# 十二、如果不调用 Next() 呢？

---

## Auth：

```go id="g2d85j"
func Auth(c *Context) {
    fmt.Println("auth failed")
    return
}
```

---

👉 不会进入：

```text id="hchjlwm"
Controller
```

---

因为：

```text id="92vjlwm"
middleware 链断了
```

---

# 十三、这就是“拦截器”

所以 middleware 可以：

---

## ✅ 放行

```go id="fjlwm1"
c.Next()
```

---

## ❌ 拦截

```go id="pjlwm2"
return
```

---

# 十四、GoFrame / Gin / Koa 都一样吗？

本质几乎一样。

---

## Gin

```go id="rjlwm3"
c.Next()
```

---

## Koa（Node.js）

```js id="1jlwm4"
await next()
```

---

## Express

```js id="jlwm5"
next()
```

---

👉 本质：

```text id="mjlwm6"
责任链模式（Chain of Responsibility）
```

---

# 十五、你可以这样理解（最形象）

---

## middleware 像洋葱：

```text id="jlwm7"
Logger
  └── Auth
        └── Controller
```

---

进入：

```text id="jlwm8"
一层层进去
```

---

返回：

```text id="jlwm9"
再一层层出来
```

---

# 十六、为什么这个设计这么强？

因为 middleware 可以：

---

## ✅ 统一处理

* 登录校验
* 日志
* 限流
* CORS
* Recover

---

## 不需要每个 controller 重复写

---

# 十七、GoFrame 中的 Next()

你之前看到：

```go id="jlwm10"
r.Middleware.Next()
```

---

实际上内部原理就是：

```text id="jlwm11"
handlers[index+1](ctx)
```

---

# 十八、一句话总结

> 👉 middleware 的 Next() 本质是“执行责任链中的下一个 handler”**
