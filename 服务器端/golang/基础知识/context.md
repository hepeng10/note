# 什么是 context？
context 是本次请求的生命周期控制对象。


# 一、它主要负责两类事情

---

# 🥇 1️⃣ 生命周期控制（最核心）

这是 context 最本质的作用。

---

## 包括：

* 请求取消
* 超时
* 截止时间
* goroutine退出

---

比如：

```text id="i11u7h"
用户断开连接
```

↓

```text id="dmb83j"
context cancel
```

↓

```text id="2p9t9l"
数据库查询停止
goroutine退出
Redis请求取消
```

---

👉 这是 context 的核心价值。

---

# 🥈 2️⃣ 请求范围数据共享

也就是你说的：

```text id="d8v7wb"
获取当次请求的各种状态
```

---

比如：

* userId
* traceId
* token
* 权限信息

---

middleware：

```go id="0af3m6"
ctx = context.WithValue(ctx, "userId", 1001)
```

---

service：

```go id="tspjlwm"
userId := ctx.Value("userId")
```

---

👉 本质：

```text id="jjlwm1"
请求链路中的共享数据
```

---

# 三、context 本身不直接操作 HTTP 请求

它不像：

## Gin

```go id="3jlwm2"
c.JSON()
c.Query()
```

---

## GoFrame

```go id="jlwm3"
r.Get()
r.Response.Write()
```

---

这些是真正的：

```text id="jlwm4"
HTTP请求对象
```

---

# 四、Context 更像“控制器 + 数据容器”

它：

✅ 可以：

* 控制生命周期
* 通知取消
* 共享数据

---

❌ 不负责：

* 写响应
* 解析参数
* 操作 Header

---

# 五、你可以这样区分（非常重要）

---

## HTTP Request 对象

负责：

```text id="jlwm5"
HTTP协议相关
```

比如：

* Query
* Header
* Response

---

## Context

负责：

```text id="jlwm6"
请求生命周期相关
```

比如：

* cancel
* timeout
* trace
* userId

---

# 六、在 GoFrame 中为什么容易混？

因为：

```go id="jlwm7"
func (c *User) List(ctx context.Context, req *v1.ListReq)
```

---

GoFrame 会：

```text id="jlwm8"
把 HTTP Request 的部分能力封装进 ctx
```

---

比如：

```go id="jlwm9"
g.RequestFromCtx(ctx)
```

---

于是你感觉：

```text id="jlwm10"
ctx 好像就是 request
```

---

但实际上：

```text id="jlwm11"
ctx ≠ request
```

只是：

```text id="jlwm12"
request 被挂载到了 ctx 体系里
```

---

# 七、一个非常经典的理解方式（推荐你记住）

---

## request 是：

```text id="jlwm13"
“请求内容”
```

---

## context 是：

```text id="jlwm14"
“请求生命周期”
```

---

# 八、一个很形象的比喻（很好理解）

---

## request

像：

```text id="jlwm15"
快递包裹
```

里面有：

* Header
* Body
* Query

---

## context

像：

```text id="jlwm16"
快递运输单
```

负责：

* 是否取消运输
* 超时时间
* 追踪ID

---

# 九、为什么 Go 这么重视 Context？

因为 Go：

```text id="jlwm17"
goroutine 太轻量
```

---

于是：

```text id="jlwm18"
很容易创建大量后台任务
```

---

如果没有 context：

```text id="jlwm19"
goroutine 根本不知道什么时候该退出 ❌
```

---

所以：

> ❗context 的核心其实是：
>
> ```text
> goroutine 生命周期管理
> ```
