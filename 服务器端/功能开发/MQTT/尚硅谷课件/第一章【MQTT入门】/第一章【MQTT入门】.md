# MQTT入门

# 1 MQTT概述

## 1.1 MQTT简介

MQTT（Message Queuing Telemetry Transport）由IBM于1999年开发的一种基于**"发布订阅模式"的轻量级的消息传输协议**！

发布订阅模式是一种传统的客户端-服务器架构的`替代方案`，因为一般传统的客户端-服务器是客户端能够直接和服务器进行通信完成消息的传输。发布订阅模式会将发送消

息的发布者publisher与接收消息的订阅者subscribers进行`分离`，publisher与subscribers 并不会直接通信，他们甚至都不清楚对方是否存在，他们之间的交流由

第三方组件`broker`代理。

![image-20240522234104355](assets/image-20240522234104355.png) 

pub/sub 最重要的方面是 publisher 与 subscriber 的解藕，这种耦合度有下面二个维度：

1、空间解耦：publisher 与 subscriber 并不知道对方的存在。

2、时间解藕：publisher 与 subscriber 并不一定需要同时运行。

MQTT它在**物联网**应用中广受欢迎，能够实现传感器、执行器和其它设备之间的高效通信。非常适用于资源受限的设备和低带宽、高延迟或不稳定的网络环境。

## 1.2 MQTT特性

它的主要特点包括：

1、**轻量级：**物联网设备通常在处理能力、内存和能耗方面受到限制。`MQTT开销低、报文小`的特点使其非常适合这些设备，因为它消耗更少的资源，即使在有限的能力下也

能实现高效的通信。

2、**可靠：**物联网网络常常面临高延迟或连接不稳定的情况。`MQTT支持多种QoS等级、会话感知和持久连接`，即使在困难的条件下也能保证消息的可靠传递，使其非常适合

物联网应用。

3、**安全通信：**安全对于物联网网络至关重要，因为其经常涉及敏感数据的传输。为确保数据在传输过程中的机密性，`MQTT提供传输层安全（TLS）和安全套接层（SSL）`

`加密功能`。此外，MQTT 还通过用户名/密码凭证或客户端证书提供身份验证和授权机制，以保护网络及其资源的访问。

4、**双向通信：**MQTT的发布-订阅模式为设备之间提供了无缝的双向通信方式。`客户端既可以向主题发布消息，也可以订阅接收特定主题上的消息`，从而实现了物联网生态

系统中的高效数据交换，而无需直接将设备耦合在一起。这种模式也简化了新设备的集成，同时保证了系统易于扩展。

5、**语言支持：**物联网系统包含使用各种编程语言开发的设备和应用。`MQTT具有广泛的语言支持`，使其能够轻松与多个平台和技术进行集成，从而实现了物联网生态系统中

的无缝通信和互操作性。常见编程语言的支持：PHP、Node.js、Python、Golang、Node.js、java等。

## 1.3 MQTT核心概念

> MQTT客户端

任何运行`MQTT客户端库[MQTT开发工具包]`的应用或设备都是MQTT客户端。例如使用MQTT的即时通讯应用是客户端，使用MQTT上报数据的各种传感器是客户端，各种MQTT

测试工具也是客户端。

> MQTT Broker

MQTT Broker是负责处理客户端请求的关键组件，包括建立连接、断开连接、订阅和取消订阅等操作，同时还负责消息的转发。一个高效强大的MQTT Broker能够轻松应

对海量连接和百万级消息吞吐量，从而帮助物联网服务提供商专注于业务发展，快速构建可靠的MQTT应用。

> 主题

MQTT主题本质上是一个UTF-8编码的字符串，是MQTT协议进行消息路由的基础。可以理解为就是通过主题`对消息进行分类`。MQTT主题类似URL路径，使用斜杠`/`进行分 

层：

```shell
chat/room/1
sensor/10/temperature
```

为了避免歧义且易于理解，通常不建议主题以`/`开头或结尾，例如 `/chat` 或 `chat/`。MQTT主题不需要提前创建。MQTT 客户端在订阅或发布时即自动的创建了主题，开

发者无需再关心主题的创建，并且也不需要手动删除主题。



# 2 MQTT快速入门

## 2.1 EMQX概述

**EMQX**，是一款实现了MQTT协议的，开源的MQTT`消息代理软件`。MQTT定义了消息通讯的规则和流程，而EMQX则是遵循这些规则的软件，使得设备能够依据MQTT协议进行有

效通信。在新版本的EMQX中同时支持MQTT`3.1.1协议和5.0协议`。

官网地址：https://www.emqx.com/zh

其他代理软件：https://www.emqx.com/en/blog/the-ultimate-guide-to-mqtt-broker-comparison

## 2.2 EMQX部署

选择EMQX企业版进行部署：https://docs.emqx.com/zh/enterprise/latest/deploy/install-docker.html

购买火山引擎服务器，安装Docker：

```shell
# 移除旧版本docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 配置docker yum源。
sudo yum install -y yum-utils
sudo yum-config-manager \
--add-repo \
http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo


# 安装 最新 docker
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动& 开机启动docker； enable + start 二合一
systemctl enable docker --now

# 配置加速
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://82m9ar63.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```



```shell
docker run -d --name emqx-enterprise \
  -p 1883:1883 -p 8083:8083 \
  -p 8084:8084 -p 8883:8883 \
  -p 18083:18083 \
  -v emqx_data:/opt/emqx/data \
  -v emqx_log:/opt/emqx/log \
  -v emqx_etc:/opt/emqx/etc \
  emqx/emqx-enterprise:5.6.1
```

常见端口介绍：

| 端口号 | 说明                        |
| ------ | --------------------------- |
| 1883   | TCP端口                     |
| 8083   | WebSocket端口               |
| 8084   | WebSocket Secure 端口       |
| 8883   | SSL/TLS 端口                |
| 18083  | Broker的Dashboard访问端口号 |

## 2.3 Dashboard介绍

EMQX 提供了一个内置的管理控制台，即 EMQX Dashboard。方便用户通过 Web 页面就能轻松管理和监控 EMQX 集群，并配置和使用所需的各项功能。

![image-20240525100106915](assets/image-20240525100106915.png) 

**主要功能：**

`1、监控和管理EMQX中的相关信息与数据` ：支持查看运行中的EMQX集群的整体连接数，订阅主题数，消息收发数量和流入流出速率，还包括节点列表和节点信息和一些系

统指标信息，同时也可以对一些客户端连接与订阅数据进行查看与管理。

`2、访问控制（认证与授权）管理` ：支持通过可视化的方式来新增和配置管理 EMQX 中的认证与授权机制。

`3、数据集成` ：使用强大的基于SQL的规则引擎和数据桥或流量编辑器的可视化功能进行低代码数据处理和集成，以帮助实时提取、过滤、丰富、转换和存储 MQTT 数据。

`4、在线配置热更新`：支持在线修改和更新包括 MQTT、日志，监听器等配置项，更新成功后即刻生效。

**首次访问：**

访问地址：http://localhost:18083/

用户名和密码：`admin/pubic`

可以通过CLI的`admins`命令进行密码重置:

```shell
./bin/emqx ctl admins passwd <Username> <Password>
```

## 2.4 EMQX客户端

### 2.4.1 MQTTX简介

**MQTTX** 是EMQX开源的一款跨平台 MQTT 5.0 客户端工具，它支持 macOS, Linux 并且支持自定义脚本模拟测试、MQTT 消息格式转换、日志记录等多个功能。

MQTTX 包含三种类型的工具：

1、MQTTX Desktop：MQTTX Desktop是一款跨平台的 MQTT 桌面客户端工具。

2、MQTTX CLI：MQTTX CLI是EMQ开源的一款 MQTT 5.0 命令行客户端工具

3、MQTT Web：MQTTX Web是一款基于浏览器访问客户端工具。

官网地址：https://mqttx.app/zh

### 2.4.2 MQTTX Desktop的使用

具体步骤：

1、下载并安装MQTTX Desktop： https://mqttx.app/zh/downloads?os=windows

2、新建链接

![image-20240525102233610](assets/image-20240525102233610.png) 

3、输入主题名称发送消息

![image-20240525102655977](assets/image-20240525102655977.png) 

4、创建新链接订阅主题

![image-20240525103152895](assets/image-20240525103152895.png) 

注意：

1、发送消息的时候没有选择Retain，那么在订阅该主题之前所发送的消息不能被客户端接收到

2、可以通过Dashboard来管理链接和订阅信息

![image-20240525103928304](assets/image-20240525103928304.png) 

### 2.2.3 MQTTX CLI的使用

具体步骤：

1、下载MQTTX CLI：https://mqttx.app/zh/downloads?os=windows

2、建立链接订阅主题

```sell
mqttx-cli-win-x64.exe sub -t 'test/1' -h 192.168.136.147 -p 1883  -v
```

`-t`：订阅主题

`-h`：服务器地址，填写对应监听器的IP地址，默认为`localhost`

`-p`：服务器端口，默认为`1883`

`-v`：在接收到的Payload前显示当前Topic

3、向主题发送消息

```shell
mqttx-cli-win-x64.exe pub -t 'test/1' -q 0 -h 192.168.136.147 -p 1883 -m "from MQTTX CLI"
```

### 2.2.4 MQTTX Web的使用

使用 MQTTX Web 进行测试操作基本上与使用MQTTX Desktop相同。

```shell
docker pull emqx/mqttx-web
docker run -d --name mqttx-web -p 80:80 emqx/mqttx-web
```

# 3 MQTT控制报文

## 3.1 控制报文简介

报文是网络中交换与传输的数据最小单元，通俗来讲就是站点一次性要发送的`数据块`。它包含了将要发送的完整数据信息，其长短不一致，长度不限且可变。MQTT 客户端

和服务端通过交换控制报文来完成它们的工作，比如订阅主题和发布消息。

## 3.2 常见的控制报文

MQTT 目前定义了 15 种控制报文类型，如果按照功能进行分类，我们可以将这些报文分为连接、发布、订阅三个类别：

![image-20240525153700196](assets/image-20240525153700196.png)  

## 3.3 MQTT报文格式

在 MQTT 中，无论是什么类型的控制报文，它们都由**固定报头、可变报头和有效载荷**三个部分组成。

`固定报头固定存在于所有控制报文中`，`而可变报头和有效载荷是否存在以及它们的内容则取决于具体的报文类型。`例如用于维持连接的 PINGREQ 报文就只有一个固定报

头，用于传递应用消息的 PUBLISH 报文则完整地包含了这三个部分。

![image-20240529102926011](assets/image-20240529102926011.png) 

### 3.3.1 固定报头

固定报头由报文类型、标识位和报文剩余长度三个字段组成。

![image-20240529103200978](assets/image-20240529103200978.png) 

> 报文类型

占4个bit位，是一个无符号的整数

常见的报文类型：https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc3901022

> 标识位

占4个bit位，不过到 MQTT 5.0 为止，只有 `PUBLISH` 报文的这四个比特位被赋予了明确的含义：

1、Bit 3：DUP，表示当前 PUBLISH 报文是否是一个重传的报文。

2、Bit 2,1：QoS，表示当前 PUBLISH 报文使用的服务质量等级。

3、Bit 0：Retain，表示当前 PUBLISH 报文是否是一个保留消息。

其他所有的报文中，这 4 位都仍是保留的。

> 剩余长度

剩余长度指示了当前控制报文剩余部分的字节数，也就是`可变报头和有效载荷`这两个部分的长度。MQTT 控制报文的总长度= 固定报头的长度 + 剩余长度。

![image-20240529104426686](assets/image-20240529104426686.png) 

### 3.3.2 可变报头

`可变报头的内容取决于具体的报文类型。`

举例：

1、CONNECT 报文的可变报头按顺序包含了协议名、协议级别、连接标识、Keep Alive 和属性这五个字段

2、PUBLISH 报文的可变报头则按顺序包含了主题名、报文标识符和属性这三个字段。

![image-20240529110540217](assets/image-20240529110540217.png) 

属性是 MQTT 5.0 引入的一个概念。属性字段基本上都是可变报头的最后一部分，`由属性长度和紧随其后的一组属性组成`，这里的属性长度指的是后面所有属性的总长度

![image-20240529111101494](assets/image-20240529111101494.png) 

所有的属性都是可选的，因为它们通常都有一个默认值，如果没有任何属性，那么属性长度的值就为0。属性通常都是为了某个专门的用途而设计的，不同的报文所支持的属

性都是不一样的，具体的对应情况可以查看官网地址：https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc3901027

### 3.3.3 有效载荷

有效载荷是用于实现对应报文的核心功能。

举例：

1、在 PUBLISH 报文中，Payload 用于承载具体的应用消息内容，这也是 PUBLISH 报文最核心的功能。

2、在 SUBSCRIBE 报文中，Payload 包含了想要订阅的主题以及对应的订阅选项，这也是 SUBSCRIBE 报文最主要的工作。

## 3.4 报文验证

接下来我们通过**Wireshark**工具，抓取一下各种通讯操作所涉及到的报文。

**链接相关报文验证:**

![image-20240529163032511](assets/image-20240529163032511.png) 

![image-20240529163521163](assets/image-20240529163521163.png) 

![image-20240529163707428](assets/image-20240529163707428.png) 

**发布相关报文:**

![image-20240529164130090](assets/image-20240529164130090.png) 

上述发布的消息QoS的值设置为0，因此看不到发布消息的时候的其他的报文数据，如果此时把消息的QoS等级设置为1、2就可以看到发送消息的时候其他的报文：

![image-20240529164404067](assets/image-20240529164404067.png) 

QoS的值设置为2以后，抓取的报文数据如下所示：

![image-20240529165107620](assets/image-20240529165107620.png) 

**订阅相关报文：**

![image-20240529165811104](assets/image-20240529165811104.png) 

![image-20240529165907644](assets/image-20240529165907644.png) 