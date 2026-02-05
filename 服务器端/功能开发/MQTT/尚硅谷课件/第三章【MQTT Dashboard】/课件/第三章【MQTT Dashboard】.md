# MQTT Dashboard

# 1 Dashboard简介

EMQX 提供了一个内置的`管理控制台`，即 EMQX Dashboard。方便用户通过 Web 页面就能轻松管理和监控 EMQX 集群，并配置和使用所需的各项功能。

访问地址：http://ip:18083

首次登录访问账号：admin/public

重置密码：

```shell
./bin/emqx ctl admins passwd <Username> <Password>
```

# 2 访问控制

## 2.1 认证

### 2.1.1 创建认证器

认证：就是验证客户端的身份。

创建认证器大致步骤：

1、选择认证方式

2、配置数据源

3、配置数据源相关参数



**认证方式说明**

目前 EMQX 提供了三种认证方式，包含有：

1. Password-Based，使用客户端 ID 或用户名加密码的认证方式；
2. JWT，客户端可以在用户名或密码字段中携带 JWT token 来进行认证；
3. SCRAM，MQTT 5.0 中的增强认证，可以实现对客户端和服务器的双向认证。



**数据源说明**

> Password-Based

当选择 `Password-Based` 的认证方式后，用户可以选择存储认证数据的数据库或提供认证数据功能的 HTTP 服务器，数据库包含两类：

- EMQX 的内置数据库，即选择 `Built-in Database`；
- 外部数据库，支持选择并连接到一些主流数据库，包括：`MySQL`、`PostgreSQL`、`MongoDB`、`Redis` 等。

除数据库外，还可以直接使用能够提供认证数据的 HTTP 服务，即选择 `HTTP Server`。

![image-20240624182616727](assets/image-20240624182616727.png) 

> JWT

如果选择了 JWT 的认证方式，将无需选择数据源。

> SCRAM 

MQTT 5.0 中的增强认证功能，如果选择了该认证方式的话，目前仅提供了使用 `Built-in Database` 数据源。



**配置参数说明**

> 内置数据库

例如使用内置数据库的话需要选择使用用户名还是客户端 ID，选择密码的加密方式等；如果是选择了 MQTT 5.0 的增强认证，使用内置数据库的话，只需要配置加密方式

即可。

![image-20240624182942241](assets/image-20240624182942241.png) 

> 外部数据库

选择外部数据库的话，需要配置能访问到的数据库地址，数据库名称，用户名密码，以及认证相关配置，填写如何从数据库中获取数据的 SQL 语句或其它查询语句等。以 

MySQL 为例：

![image-20240624183100920](assets/image-20240624183100920.png) 

数据库环境准备：

```dockerfile
# 创建数据库
docker run -d \
-p 3306:3306 \
-v mysql8_conf:/etc/mysql/conf.d \
-v mysql8_data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=1234 \
--name mysql8 \
--restart=always \
--privileged=true \
mysql:8.0.30

# 导入资料中的mqtt_user.sql脚本
```

> HTTP Server

选择使用 HTTP 服务的话，需要配置请求该 HTTP 服务的请求方式，POST 或 GET 方法。请求地址 URL，注意 URL  内需要填写协议是 http 或 https，如果有端

口号的话需要在 URL 中携带端口号。然后是 HTTP 请求的 Headers  配置，携带认证信息的内容需要和请求 HTTP 服务的数据格式相同，然后配置到 `Body` 字段

中，例如将 `username` 和 `password` 填写到 JSON 数据中。

![image-20240624183622897](assets/image-20240624183622897.png) 

### 2.1.2 认证列表

创建认证器成功后，可以在认证列表中查看和管理。认证列表的每一栏都可以通过鼠标来拖动`调整顺序`，或通过操作栏调整列表顺序，顺序对于认证列表来说有一定的重要

性，因为EMQX允许创建多个认证器，这些`认证器将按照在认证链中的位置顺序运行`，如果在当前认证器中未检索到匹配的认证信息，将会切换至链上的下一个认证器继续

认证过程。

![image-20240624184950515](assets/image-20240624184950515.png) 

**认证链的认证流程**，以密码认证为例，通常这会产生以下 2 种情况：

1. 当前认证器执行时检索到了匹配的认证信息，例如用户名一致： 

   1.1 密码完全匹配，则客户端认证通过，允许连接。

   1.2 密码无法匹配，则客户端认证失败，拒绝连接。

2. 当前认证器执行时没有检索到匹配的认证信息，例如数据源中没有查找到数据： 

   2.1 当前认证器之后还有认证器：忽略认证，交由下一认证器继续认证。

   2.2 当前认证器已经是链中最后一个认证器：客户端认证失败，拒绝连接。

### 2.1.3 用户管理 

对于使用`内置数据库`的用户来说，在认证列表页点击 `用户管理`，可以来到用户管理页面，在该页面，可以管理认证信息，例如添加或删除用户名和密码，也可以通过下载

模版，在模版内填充好相关的认证信息，点击 `导入` 来批量创建认证相关的用户信息。

![image-20240624185100211](assets/image-20240624185100211.png) 

### 2.1.4 客户端连接

当在MQTT的服务端创建完认证器以后，那么此时客户端在进行连接的时候就需要出示认证信息，如果未出示认证信息，那么此时就会报错`Error: Connection `

`refused: Bad User Name or Password`

![image-20240628181419834](assets/image-20240628181419834.png) 

## 2.2 授权

### 2.2.1 授权简介

通常情况下，认证只是验证了客户端的身份是否合法，而该客户端是否具备发布、订阅某些主题的权限，还需要由`授权系统`来判断。在 EMQX 中，**授权是指对 MQTT 客户**

**端的发布和订阅操作进行权限控制**。



授权检查器链：

1、EMQX支持多种授权检查机制：基于ACL文件(默认配置)、基于内置数据库、基于MySQL进行授权、基于 MongoDB 进行授权 、基于 PostgreSQL 进行授权 、基于

Redis进行授权、基于HTTP应用进行授权 ...

2、EMQX 支持用户通过配置多个授权检查器构成`授权链`，以实现更灵活的授权检查。EMQX 将按照授权链中配置的检查器顺序依次执行授权检查。如果在当前授权检查

器中未检索到权限数据，将会切换至链上的下一个启用的授权检查器继续权限检查。

### 2.2.2 ACL文件授权演示

> 1、ACL授权说明

EMQX 支持基于 ACL 文件中存储的规则进行授权检查。您可在文件中配置多条授权检查规则，在收到客户端的操作请求后，EMQX 会按照从上到下的顺序进行授权规则匹

配；在成功匹配到某条规则后，EMQX 将按设定允许或拒绝当前请求，并停止后续规则的匹配。

![image-20240628183056294](assets/image-20240628183056294.png) 

> 2、文件格式介绍

基本语法和概念如下：

- 一组授权规则一个花括号包起来，花括号内的各个元素用逗号分隔
- 每条规则应以 `.` 结尾
- 注释行以 `%%` 开头，在解析过程中会被丢弃

代码示例：

```shell
%% 允许用户名是 dashboard 的客户端订阅 "$SYS/#" 这个主题
{allow, {user, "dashboard"}, subscribe, ["$SYS/#"]}.

%% 允许来自127.0.0.1 的用户发布和订阅 "$SYS/#" 以及 "#"
{allow, {ipaddr, "127.0.0.1"}, all, ["$SYS/#", "#"]}.

%% 拒绝其他所有用户订阅 `$SYS/#`，`#` 和 `+/#` 主题
{deny, all, subscribe, ["$SYS/#", {eq, "#"}, {eq, "+/#"}]}.

%% 如果前面的规则都没有匹配到，则允许所有操作
%% 注意：在生产环境中，最后一条规则应该设置为 `{deny, all}`，并且配置 `authorization.no_match = deny`
{allow, all}.
```

在每一组授权规则中：

1、第一个元素表示该条规则对应的权限；可选值：

- `allow` （允许）
- `deny`（拒绝）

2、第二个元素用来指定适用此条规则的客户端，比如：

- `{username, "dashboard"}`：用户名为 `dashboard` 的客户端；也可写作`{user, "dashboard"}`

- `{username, {re, "^dash"}}`：用户名匹配 正则表达式 `^dash` 的客户端

- `{clientid, "dashboard"}`：客户端 ID 为 `dashboard` 的客户端，也可写作`{client, "dashboard"}`

- `{clientid, {re, "^dash"}}`：客户端 ID 匹配 正则表达式 `^dash` 的客户端

- `{ipaddr, "127.0.0.1"}`：源地址为 `127.0.0.1` 的客户端；支持 CIDR 地址格式。注意：如果 EMQX 部署在负载均衡器后侧，建议为 EMQX 的监听器开启 

  `proxy_protocol` 配置 ，否则 EMQX 可能会使用负载均衡器的源地址。

- `{ipaddrs, ["127.0.0.1", ..., ]}`：来自多个源地址的客户端，不同 IP 地址之间以 `,` 区分

- `all`：匹配所有客户端

- `{'and', [Spec1, Spec2, ...]}` ：满足列表中所有规范的客户端。

- `{'or', [Spec1, Spec2, ...]}` ：满足列表中任何规范的客户端。

3、第三个元素用来指定该条规则对应的操作：

- `publish`：发布消息

- `subscribe`：订阅主题

- `all`：发布消息和订阅主题

- 从 v5.1.1 版本开始，EMQX 支持检查发布与订阅操作中的 QoS 与保留消息标志位，您可以在第三个元素中加上 `qos`或者`retain`来指定检查的 QoS 或保留消息

  标志位，例如： 

  - `{publish, [{qos, 1}, {retain, false}]}`：拒绝发布 QoS 为 1 的保留消息
  - `{publish, {retain, true}}`：拒绝发布保留消息
  - `{subscribe, {qos, 2}}`：拒绝以 QoS2 订阅主题

4、第四个元素用于指定当前规则适用的 MQTT 主题，支持通配符（主题过滤器），可以使用`主题占位符`：

- `"t/${clientid}"`：使用了主题占位符，当客户端 ID 为 `emqx_c` 的客户端触发检查时，将精确匹配 `t/emqx_c` 主题
- `"$SYS/#"`：通过通配符匹配 `$SYS/` 开头的所有主题，如 `$SYS/foo`、 `$SYS/foo/bar`
- `{eq, "foo/#"}`：精确匹配 `foo/#` 主题，主题 `foo/bar` 将无法匹配，此处 `eq` 表示全等比较（equal）

另外还有 2 种特殊的规则，通常会用在 ACL 文件的末尾作为默认规则使用。

- `{allow, all}`：允许所有请求
- `{deny, all}`：拒绝所有请求



> 3、配置演示

在Dashboard的中权限配置文件中添加如下的配置：

```shell
# 拒绝任意的客户端订阅test/#这种规则的主题
{deny, all, subscribe, ["test/#"]}.
```

如下所示：

![image-20240628190132677](assets/image-20240628190132677.png) 

### 2.2.3 基于内置数据库授权演示

EMQX 通过内置数据库为用户提供了一种低成本、开箱即用的授权规则存储方式。可以通过 Dashboard 设置使用内置数据库作为数据源。

通过 Dashboard 配置：

1、在 EMQX Dashboard 页面，点击左侧导航栏的 **访问控制** -> **授权**，在 **授权** 页面，添加 **Built-in Database** 作为 **数据源**， 点击**下一步 **进入 **配置参数 **

页签。由于无需配置其他参数，可直接点击 **创建** 完成配置。

2、通过 Dashboard 配置：在 Dashboard 的 **授权** 页面，点击 **Built-in Database** 数据源对应的 **操作 **栏下的 **权限管理**，即可进行授权检查规则的配置。

您可根据需要从客户端 ID、用户名或直接从主题角度设置授权检查。

- **客户端 ID**：见 **客户端 ID** 页签，指定适用此条规则的客户端
- **用户名**：见 **用户名** 页签，指定适用此条规则的用户名
- **权限**：是否允许当前客户端/用户的某类操作请求；可选值：**允许**、**拒绝**
- **操作**：配置该条规则对应的操作；可选值：**发布**、**订阅**、**发布与订阅**
- **主题**：配置该条规则对应的主题

EMQX 支持针对单个客户端或用户配置多条授权检查规则，您可通过页面的 **上移**、**下移** 调整不同规则的执行顺序和优先级。

![image-20240628191103040](assets/image-20240628191103040.png) 

注意：可以通过主题订阅来验证消息是否发送成功

# 3 黑名单与连接抖动检测

## 3.1 黑名单

EMQX 为用户提供了黑名单功能来`禁止`某些客户端的访问，除了可以`封禁客户端 ID `以外，还支持直接`封禁用户名甚至 IP `地址。

封禁还可以通过规则来实现，这些规则包括：

1、使用正则表达式匹配客户端标识符和用户名。

2、使用 CIDR 范围匹配源 IP 地址。



**创建黑名单：**

1. 在 EMQX Dashboard 页面，点击左侧导航栏的**访问控制** -> **黑名单**，在随即打开的页面，单击**创建**。

2. 在弹出的**创建**页面，按照页面提示配置：

   2.1 **禁用对象**：通过下拉列表选择封禁客户端的方式，可以指定**客户端 ID**、**用户名**、**IP 地址**、**客户端 ID 模式**、**用户名模式**或 **IP 地址范围**，然后提供相应的值。

   2.2 **到期时间**（可选）：设置该规则的到期时间。

   2.3 **原因**（可选）：说明为该对象设置黑名单的原因。

3. 点击**创建**完成配置。

![image-20240628192509083](assets/image-20240628192509083.png) 

## 3.2 连接抖动检测

EMQX 支持`自动封禁那些被检测到短时间内频繁登录的客户端，并且在一段时间内拒绝这些客户端的登录，以避免此类客户端过多占用服务器资源而影响其他客户端的正常`

`使用。`

需要注意的是，连接抖动检测功能`只会封禁客户端 ID，并不封禁用户名和 IP 地址`，即该机器只要更换客户端标 ID 就能够继续登录。

抖动检测功能默认关闭，您可以通过 EMQX Dashboard 或配置文件开启该功能。



通过 Dashboard 开启:

前往 Dashboard，从左侧导航菜单点击**访问控制** -> **连接抖动** 进入**连接抖动**页面。通过点击切换按钮启用抖动检测功能。

1、**检测时间窗口**：您可以指定系统监视客户端抖动行为的持续时间。默认值为 `1` 分钟。

2、**最大断连次数**：您可以指定在检测窗口时间内允许的 MQTT 客户端的最大断开连接次数。它允许您设定准确的标准来识别和响应表现出抖动行为的客户端。默认值为 

`15`。

3、**封禁时长**：您可以指定客户端被封禁的时间长度。默认值为 `5` 分钟。

点击**保存更改**以完成设置。

![image-20240628194412235](assets/image-20240628194412235.png) 



配置完毕进行测试：

# ![image-20240628194525336](assets/image-20240628194525336.png) 4 数据集成

## 4.1 数据集成概述

思考问题：如何将一个物联网设备产生的数据传输到业务系统中?

![image-20240701194402270](assets/image-20240701194402270.png)

上述方案的弊端：较为麻烦



**数据集成**：为 EMQX 引入了与外部数据系统的连接，从而以实现设备与其他业务系统的无缝集成。

![image-20240701194619574](assets/image-20240701194619574.png) 



EMQX的数据集成功能不单单可以快速的将物联网设备产生的数据传递到业务系统中，也可以和其他的**外部数据系统**进行集成，实现数据的快速传输。比如：从Kafka某一个

主题中获取数据，然后将数据写入到Redis中。

## 4.2 工作原理介绍

**sink和source组件**：

数据集成使用 `Sink` 与 `Source` 组件与外部数据系统对接。

1、Sink 用于将消息发送到外部数据系统，例如 MySQL、Kafka 或 HTTP  服务等。

2、Source 则用于从外部数据系统接收消息，例如 MQTT、Kafka 或 GCP PubSub。

**连接器**：

连接器负责与外部数据系统的连接，用户可以为不同的外部数据系统创建不同的连接器，一个连接器可以为多个 Sink/Source 提供连接。

![image-20240701201253557](assets/image-20240701201253557.png) 

**规则引擎**：

规则引擎是 EMQX 内置基于 SQL 的数据处理组件，搭配数据集成无需编写代码即可实现一站式的 IoT 数据提取、过滤、转换、存储与处理，以加速应用集成和业务创

新。

![image-20240701201806662](assets/image-20240701201806662.png) 

规则的组成：规则描述了 **数据来源**、**数据处理过程**、**处理结果去向** 三个方面：

![image-20240701201908568](assets/image-20240701201908568.png) 

1、数据来源：规则的数据源可以是消息或事件，也可以是外部的数据系统 (**source**)。规则通过 SQL 的 FROM 子句指定数据的来源；

2、数据处理过程：规则通过 `SQL` 语句和`函数`来描述数据的处理过程。SQL 的 WHERE 子句用于过滤数据，SELECT 子句以及 SQL 函数用于提取和转换数据；

3、处理结果去向：规则可以定义一个或多个动作来处理 SQL 的输出结果。如果 SQL 执行通过，规则将按顺序执行相应的动作，比如将处理结果存储到数据库、或者重新

发布到另一个 MQTT 主题等。支持的动作如下： 

- 消息重发布：将结果发布到指定 MQTT 主题
- 控制台输出：将结果输出到控制台或日志中
- 发送到各类 Sink：将结果发送到外部数据系统中，如 MQTT 服务，Kafka，PostgreSQL 等

## 4.3 数据集成入门

需求：将客户端发往't/a'主题中的消息输出到EMQX的控制台

具体步骤：

1、进入到Dashboard中，依次点击"集成" ----> "规则" ----> "创建" 进入到创建规则的表单页面

![image-20240701203132927](assets/image-20240701203132927.png) 

2、配置好规则source和sink组件以后，可以点击对规则进行调试

![image-20240701203307741](assets/image-20240701203307741.png) 

3、启动MQTTX客户端和服务端建立连接，并且向`t/a`主题发布消息，查看EMQX控制台的日志输出

![image-20240701203704692](assets/image-20240701203704692.png) 

## 4.4 连接器使用

### 4.4.1 案例一

需求：将客户端发往't/b'主题中的消息输出到EMQX的控制台和Redis中

```shell
# Docker部署Redis
docker run -d -p 6379:6379 --restart=always \
-v redis_config:/etc/redis/config \
-v redis_data:/data \
--name redis redis:7.0.10 \
redis-server /etc/redis/config/redis.conf
 
#redis启动的使用 redis-server 自定义加载一个配置文件

# 在redis_config数据卷所对应的磁盘目录下创建一个redis.conf文件，文件的内容如下所示
appendonly yes      # 开启持久化， redis的持久化方式：rdb、aof
port 6379			# 配置Redis进程对应的端口号为6379
requirepass 1234	# 配置Redis访问密码
bind 0.0.0.0		# 允许任意的客户端进行链接访问
```



具体步骤：

1、进入到Dashboard中，依次点击"集成" ----> "规则" ----> "创建" 进入到创建规则的表单页面，点击`动作输出`添加一个sink

![image-20240702183739258](assets/image-20240702183739258.png) 

备注：

Redis的命令模板：`HSET emqx_messages:${clientid} username ${username} payload ${payload} timestamp ${timestamp}`

2、点击"+"号添加连接器

![image-20240702183859148](assets/image-20240702183859148.png) 

3、添加完毕以后效果如下图所示

![image-20240702184142350](assets/image-20240702184142350.png) 

也可以通过flow设计器查看对应的拓扑图

![image-20240702184310235](assets/image-20240702184310235.png) 

4、使用MQTTX向't/b'主题中发送消息进行测试，观察Redis中的数据状态

### 4.4.1 案例二

需求：将发往Kafka中的`test_mqtt_topic`主题中的消息输出到EMQX的控制台和Redis中

```java
使用课程资料中的docker-compose.yml文件搭建kafka环境。
注意服务器端需要在安全组中开放对应的端口号：2181、8048、9092
```



具体步骤：

1、在Kafka中创建`test_mqtt_topic`主题

![image-20240702185615761](assets/image-20240702185615761.png) 

2、进入到Dashboard中，依次点击"集成" ----> "规则" ----> "创建" 进入到创建规则的表单页面，点击`数据输入`添加一个source

![image-20240702190308414](assets/image-20240702190308414.png) 

3、在添加source动作的页面，添加连接器"+"号，添加kafka的连接器

![image-20240702190448097](assets/image-20240702190448097.png) 

4、在创建规则的表单页面，点击`动作输出`添加控制台输出和Redis输出的sink

Redis的命令模板如下所示：

```shell
HSET kafka_mqtt:${topic} offset ${offset} value ${value}
```

命令参数可以通过控制台输出进行确定。

5、向Kafka中的`test_mqtt_topic`发送消息

具体步骤：

5.1、创建一个基于spring boot 3.0.5构建的web项目，加入如下依赖

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.0.5</version>
</parent>

<dependencies>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.kafka</groupId>
        <artifactId>spring-kafka</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>

</dependencies>
```

5.2、在application.yml文件中添加如下配置

```yaml
spring:
  kafka:
    producer:
      bootstrap-servers: 192.168.136.147:9092
```

5.3、编写启动类

```java
@SpringBootApplication
public class MqttKafkaApplication {

    public static void main(String[] args) {
        SpringApplication.run(MqttKafkaApplication.class , args) ;
    }

}
```

5.4 编写测试类，发送消息

```java
@SpringBootTest(classes = MqttKafkaApplication.class)
public class MqttKafkaProducerTest {

    @Autowired
    private KafkaTemplate<String , String> kafkaTemplate;

    @Test
    public void sendMsg() {
        kafkaTemplate.send("test_mqtt_topic" , "mqtt kafka producer msg....") ;
    }

}
```

发送消息进行测试，观察Redis中的数据状态：

![image-20240702202053676](assets/image-20240702202053676.png) 

## 4.5 SQL语法介绍

SQL 处理结果将以 JSON 形式呈现在**输出结果**部分。SQL 处理结果中的所有字段都可以通过后续操作（内置操作或 Sink）以 `${key}`的形式进行引用。

### 4.5.1 FROM、SELECT 和 WHERE 子句

规则的 SQL 语句基本格式为:

```shell
SELECT <字段名> FROM <主题> [WHERE <条件>]
```

举例：

```shell
## SELECT 语句用于决定最终的输出结果里的字段。比如:
## 下面 SQL 的输出结果中将只有两个字段 "a" 和 "b":
SELECT a, b FROM "t/#"

# 选取 username 为 'abc' 的终端发来的消息，输出结果为所有可用字段:
SELECT * FROM "#" WHERE username = 'abc'

## 选取 clientid 为 'abc' 的终端发来的消息，输出结果将只有 cid 一个字段。
## 注意 cid 变量是在 SELECT 语句中定义的，故可在 WHERE 语句中使用:
SELECT clientid as cid FROM "#" WHERE cid = 'abc'

## 选取 username 为 'abc' 的终端发来的消息，输出结果将只有 cid 一个字段。
## 注意虽然 SELECT 语句中只选取了 cid 一个字段，所有消息发布事件中的可用字段 (比如 clientid、username 等) 仍然可以在 WHERE 语句中使用:
SELECT clientid as cid FROM "#" WHERE username = 'abc'

## 但下面这个 SQL 语句就不能工作了，因为变量 xyz 既不是消息发布事件中的可用字段，又没有在 SELECT 语句中定义:
SELECT clientid as cid FROM "#" WHERE xyz = 'abc'
```

FROM 语句用于选择事件来源。如果是消息发布则填写消息的主题，如果是事件则填写对应的事件主题。

### 4.5.2 FOREACH、DO 和 INCASE 子句

#### 语法介绍

如果对于一个数组数据，想针对数组中的每个元素分别执行一些操作并执行 Actions，需要使用 `FOREACH-DO-INCASE` 语法。其基本格式为:

```shell
FOREACH <字段名> [DO <条件>] [INCASE <条件>] FROM <主题> [WHERE <条件>]

FOREACH 子句用于选择需要做 foreach 操作的字段，注意选择出的字段必须为数组类型
DO 子句用于对 FOREACH 选择出来的数组中的每个元素进行变换，并选择出感兴趣的字段
INCASE 子句用于对 DO 选择出来的某个字段施加条件过滤


FOREACH
    payload.sensors as e ## 选择出的字段必须为数组类型
DO                       ## DO 相当于针对当前循环中对象的 SELECT 子句，决定最终的输出结果里的字段
    clientid,
    e.name as name,
    e.idx as idx
INCASE                  ## INCASE 相当于针对当前循环中对象的 WHERE 语句
    e.idx >= 1          ## 对DO选择出来的某个字段施加条件过滤
FROM "t/#"              ## 子句将规则挂载到某个主题上
```

#### 案例演示

假设有 ClientID 为 `c_steve`、主题为 `t/1` 的消息，消息体为 JSON 格式，其中 sensors 字段为包含多个 Object 的数组:

```shell
{
    "date": "2024-07-05",
    "sensors": [
        {"name": "a", "idx":0},
        {"name": "b", "idx":1},
        {"name": "c", "idx":2}
    ]
}
```

**示例 1：要求将 sensors 里的各个对象，分别作为数据输入重新发布消息到 `sensors/${idx}` 主题，内容为 `${name}`。即最终规则将会发出 3 条消息:**

1. 主题：sensors/0 内容：a
2. 主题：sensors/1 内容：b
3. 主题：sensors/2 内容：c

要完成这个规则，我们需要配置如下动作：

1、动作类型：消息重新发布 (republish)

2、目的主题：sensors/${idx}

3、目的 QoS：0

4、消息内容模板：${name}

以及如下 SQL 语句：

```shell
FOREACH
    payload.sensors
FROM "t/#"
```

示例解析:

这个 SQL 中，FOREACH 子句指定需要进行遍历的数组 sensors，则选取结果为(json):

```
[
  {
    "name": "a",
    "idx": 0
  },
  {
    "name": "b",
    "idx": 1
  },
  {
    "name": "c",
    "idx": 2
  }
]
```

FOREACH 语句将会对于结果数组里的每个对象分别执行 `消息重新发布` 动作，所以将会执行重新发布动作 3 次。

输出动作添加如下所示：

![image-20240705195734828](assets/image-20240705195734828.png) 



也可以对上述的案例进行改造，使用DO字句指定选择出感兴趣的字段，如下所示：

```sql
FOREACH
    payload.sensors as e
DO 
    e.name as name , 
    e.idx as idx
FROM "t/1"
```

此时在指定输出动作的时候可以省略item：

![image-20240705200134886](assets/image-20240705200134886.png) 

**示例 2：要求将 sensors 里的 `idx` 值大于或等于 1 的对象，分别作为数据输入重新发布消息到 `sensors/${idx}` 主题，内容为**

**`clientid=${clientid},name=${name},date=${date}`。即最终规则将会发出 2 条消息:**

1. 主题：sensors/1 内容：clientid=c_steve,name=b,date=2020-04-24
2. 主题：sensors/2 内容：clientid=c_steve,name=c,date=2020-04-24

要完成这个规则，我们需要配置如下动作：

1、动作类型：消息重新发布 (republish)

2、目的主题：sensors/${idx}

3、目的 QoS：0

4、消息内容模板：**`clientid=${clientid},name=${name},date=${date}`**

以及如下 SQL 语句：

```sql
FOREACH
    payload.sensors as e
DO
  clientid , 
  payload.date as date,
  e.idx as idx ,
  e.name as name
INCASE
  e.idx >= 1  
FROM "t/#"
```

此时在指定输出动作的时候可以省略item：

![image-20240705200134886](assets/image-20240705200134886.png) 

### 4.5.3 CASE-WHEN 语法示例 

CASE-WHEN语法和MySQL中的很类似，当满足某一个条件的时候，取指定的数据值，如下所示：

**示例：将消息中 x 字段的值范围限定在 0~7 之间。**

```shell
SELECT
  CASE WHEN payload.x < 0 THEN 0
       WHEN payload.x > 7 THEN 7
       ELSE payload.x
  END as x
FROM "t/#"
```

假设消息为:

```json
{"x": 8}
```

则上面的 SQL 输出为:

```json
{"x": 7}
```

### 4.5.4 内置SQL函数

规则引擎提供了各种内置函数，您可以在 SQL 中使用这些函数实现基本的数据处理，包括 数学运算、数据类型判断、数据类型转换、字符串操作、映射操作、数组操作、

哈希、压缩与解压缩、位操作、位序列操作、编解码 以及 日期与时间转换。

官网地址：https://docs.emqx.com/zh/emqx/v5.6/data-integration/rule-sql-builtin-functions.html

举例说明：

```sql
FOREACH
    payload.sensors as e
DO 
    abs(-1) as abs,
    concat(e.name , 'xian') as address ,
    clientid ,
    e.name as name , 
    e.idx as idx
INCASE
    e.idx >= 1
FROM "t/1"
```

向主题't/1'发送如下消息：

```sql
{
    "date": "2024-07-05",
    "sensors": [
        {"name": "a", "idx":0},
        {"name": "b", "idx":1},
        {"name": "c", "idx":2}
    ]
}
```

观察控制台日志输出：

![image-20240705205958080](assets/image-20240705205958080.png) 

## 4.6 Webhook

### 4.6.1 Webhook简介

Webhook 提供了一种将 EMQX 客户端消息和事件集成到外部 HTTP 服务器的方法。

Webhook 是 EMQX 中开箱即用的功能。当客户端向特定主题发布消息，或执行特定操作时就会触发 Webhook，将事件数据和消息数据转发到预设的 HTTP 服务器中。

![image-20240712182359564](assets/image-20240712182359564.png) 

### 4.6.2 Webhook演示

具体步骤：

1、定义http的请求接口

```java
@RestController
@RequestMapping(value = "/webHook")
public class WebHookController {

    @PostMapping(value = "/notify")
    public void notify(@RequestBody Map<Object , Object> body) {
        System.out.println(body);
    }

}
```

2、在Dashboard中创建Webhook

![image-20240712183924394](assets/image-20240712183924394.png) 

3、通过MQTTX向`a/1`主题发布消息，观察http服务控制台输出

# 5 日志管理

## 5.1 日志简介

通过 EMQX 的日志功能，您可查看`客户端访问、操作系统或网络异常等问题`，如登录错误，异常访问，性能故障等等，并基于日志信息进行问题排查或系统性能优化。

EMQX  支持两种不同的日志输出方式：

1、控制台输出日志(默认值)

2、文件输出日志。



日志级别：

EMQX 日志包含 8 个等级，默认为 warning 级别，由低到高分别为：

```console
debug < info < notice < warning < error < critical < alert < emergency
```

每一种日志输出的内容如下所示：

![image-20240712185122750](assets/image-20240712185122750.png) 

EMQX只会输出比配置日志级别高的日志数据。

## 5.2 日志配置

通过EMQX Dashboard 可以方便的修改日志配置。`保存修改后将立即生效，无需重启节点。`点击左侧导航栏的 **管理**-> **日志**。选择相应的页签配置控制台输出日志或文

件输出日志。

### 5.2.1 控制台日志配置

![image-20240712192052189](assets/image-20240712192052189.png) 

配置控制台日志处理进程的选项：

1、**启用日志处理进程**：单击切换开关以启用控制台日志处理进程。

2、**日志级别**：从下拉列表中选择要使用的日志级别。可选值为：`debug`, `info`, `notice`, `warning`, `error`, `critical`, `alert`, `emergency` 。默认值

为：`warning`。

3、**日志格式类型**：从下拉列表中选择日志格式。可选值为：`text` 和 `json`。默认值为 `text`。

4、**时间戳格式**：从下拉列表中选择日志时间戳格式。可选值为：

- `auto`: 根据所使用的日志格式类型自动确定时间戳格式。对于文本格式类型，使用 `rfc3339` 格式；对于 JSON 格式类型，则使用 `epoch`格式。
- `epoch`: 时间戳以微秒精度的 Unix 纪元时间格式表示。
- `rfc3339`: 时间戳使用符合 RFC3339 标准的日期时间字符串格式，格式示例为 `2024-03-26T11:52:19.777087+00:00`。

- **时间偏移量**：定义日志中时间相对 UTC 的偏移量，默认情况下跟随系统，默认值为 `system`。

完成配置后，点击 **保存更改**。

### 5.2.2 文件输出日志配置

在日志页面，选择文件日志页签：

![image-20240712192449191](assets/image-20240712192449191.png) 

配置文件日志处理进程的选项：

1、**启用日志处理进程**：单击切换开关以启用文件日志处理进程。

2、**日志文件名字**：填写日志文件的名称。默认为`/opt/emqx/log/emqx.log`。

3、**最大日志文件数**：轮换的最大日志文件数。默认值为`10`。

4、**日志文件轮换大小**：设置日志文件大小，达到设定的值时日志文件将进行轮换。如果禁用，则日志文件将无限增长。可在文本框输入设定的值，在下拉列表中选择单

位，可选值为：`MB`, `GB`, `KB`。

5、**日志级别**：从下拉列表中选择要使用的日志级别。可选值为：`debug`, `info`, `notice`, `warning`, `error`, `critical`, `alert`, `emergency` 。默认值

为：`warning`。

6、**日志格式类型**：从下拉列表中选择日志格式。可选值为：`text` 和 `json`。默认值为 `text`。

7、时间戳格式

从下拉列表中选择日志时间戳格式。可选值为： 

- `auto`: 根据所使用的日志格式类型自动确定时间戳格式。对于文本格式类型，使用 `rfc3339` 格式；对于 JSON 格式类型，则使用 `epoch`格式。
- `epoch`: 时间戳以微秒精度的 Unix 纪元时间格式表示。
- `rfc3339`: 时间戳使用符合 RFC3339 标准的日期时间字符串格式，格式示例为 `2024-03-26T11:52:19.777087+00:00`。

- **时间偏移量**：定义日志中时间相对 UTC 的偏移量，默认情况下跟随系统，默认值为 `system`。

完成配置后，点击**保存修改**。



在文件日志启用后，日志目录下会有如下几种文件:

- **emqx.log.N:** 以 emqx.log 为前缀的文件为日志文件，包含了 EMQX 的所有日志消息。比如 `emqx.log.1`、`emqx.log.2` ...
- **emqx.log.siz 和 emqx.log.idx:** 用于记录日志滚动信息的系统文件，**请不要手动修改**。













































