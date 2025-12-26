# MQTT 客户端编程

# 1 在VUE中使用MQTT

具体步骤如下所示：

1、初始化vue项目

```javascript
// 创建一个使用vite构建的前端项目
npm create vite@latest

// 进入到项目中，执行如下命令安装项目依赖
npm install 
```

2、安装element plus

```javascript
// 安装element plus
npm install element-plus --save

// 安装mqtt.js依赖
npm install mqtt --save

// 在main.js中添加如下代码
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

3、导入课程资料中的MqttDemo.vue页面到components文件夹下

4、更改App.vue页面代码如下所示

```vue
<script setup>
import MqttDemo from "./components/MqttDemo.vue";
</script>

<template>
  <MqttDemo/>
</template>

<style>
</style>
```

**5、建立和关闭连接**

```vue
<script setup>
import mqtt from "mqtt";

// 定义链接信息对象
const connectionInfo = ref({
  protocol: 'ws',
  host: "192.168.136.147",
  port: 8083,
  clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
  username: "zhangsan",
  password: "123",
  clean: true,
  connectTimeout: 10 * 1000, // ms
  reconnectPeriod: 4000, // ms
})

// 创建链接对象
const client = ref({})
const clientInitData = ref({      // 链接初始化相关数据
  connnected: false
})

// 建立连接事件处理函数
const createConnection = () => {

  const { protocol, host, port , ...options } = connectionInfo.value;
  const connectUrl = `${protocol}://${host}:${port}/mqtt`;
  console.log(connectUrl)
  client.value = mqtt.connect(connectUrl , options);   // 建立连接
  clientInitData.value.connnected = true ;
  console.info("createConnection successful...")

}

// 端口链接事件处理函数
const closeConnection = () => {

  // 关闭链接
  client.value.end(false , () => {   // 如果设置为true，将会立即关闭套接字，并且不发送MQTT DISCONNECT包。如果设置为false（默认值），则会发送MQTT DISCONNECT包给代理，然后关闭套接字。
    clientInitData.value.connnected = false;
    console.info("closeConnection successful...")
  })

}
</script>

<template>
  <div class="mqtt-demo">
    <el-card>
      <h1>配置信息</h1>
      <el-form label-position="top" >
        <el-row :gutter="20">

          <el-col :span="8">
            <el-form-item prop="protocol" label="选择协议">
              <el-select v-model="connectionInfo.protocol">
                <el-option label="ws://" value="ws"></el-option>
                <el-option label="wss://" value="wss"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="host" label="主机地址">
              <el-input v-model="connectionInfo.host" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="port" label="端口号">
              <el-input type="number" v-model="connectionInfo.port" placeholder="8083/8084"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="clientId" label="客户端ID">
              <el-input v-model="connectionInfo.clientId"> </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="username" label="用户名">
              <el-input v-model="connectionInfo.username"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="password" label="密码">
              <el-input v-model="connectionInfo.password"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button type="primary" :disabled="clientInitData.connnected" @click="createConnection">建立连接</el-button>
            <el-button type="danger" :disabled="!clientInitData.connnected" @click="closeConnection">断开连接</el-button>
          </el-col>

        </el-row>
      </el-form>
    </el-card>
   </div>
</template>
```

**6、订阅和取消订阅**

```vue
<script setup>
    
// 消息质量取值数组
const qosList = [0, 1, 2];
const receivedMessages = ref(null)
const subscriptionInfo = ref({     // 订阅参数数据模型
  topic: '' ,
  qos: 0
})
const subscriptionInitData = ref({	// 订阅初始化数据
  subscription: false
})

// 定义定义主题的事件处理函数
const subscriptionTopicHandler = () => {

  const { topic, qos } = subscriptionInfo.value
  console.info(qos)
  client.value.subscribe(topic, { qos } , (error , res) => {
    if(error) {
      console.info("subscriptionTopic Error:", error);
      return ;
    }
    subscriptionInitData.value.subscription = true ;
    console.info("subscriptionTopic successful.... ");

    // 订阅成功以后，监听发送消息事件
    client.value.on('message' , (topic , message) => {
      console.info("topic -----> " + topic + ", message -----> " + message)
      receivedMessages.value = "topic -----> " + topic + ", message -----> " + message ;
    })

  })

}

// 定义取消订阅的事件处理函数
const unSubscriptionTopicHandler = () => {
  const {topic, qos } = subscriptionInfo.value
  client.value.unsubscribe(topic, { qos } , (error , res) => {
    if(error) {
      console.info("unSubscriptionTopic Error:", error);
      return ;
    }
    subscriptionInitData.value.subscription = false ;
    console.info("unSubscriptionTopic successful.... ");

  })
}

</script>

<template>

    	<el-card>
          <h1>订阅主题</h1>
          <el-form label-position="top" >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item prop="topic" label="Topic">
                  <el-input v-model="subscriptionInfo.topic"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="qos" label="QoS">
                  <el-select v-model="subscriptionInfo.qos">
                    <el-option
                        v-for="qos in qosList"
                        :key="qos"
                        :label="qos"
                        :value="qos"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button  type="primary" class="sub-btn" :disabled="subscriptionInitData.subscription" @click="subscriptionTopicHandler">订阅主题</el-button>
                <el-button type="primary" class="sub-btn" :disabled="!subscriptionInitData.subscription" @click="unSubscriptionTopicHandler">取消订阅</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

</template>
```

**7、发布消息**

```vue
<script setup>
    
// 发布消息参数
const publishInfo = ref({
  topic: '' ,
  qos: 0,
  payLoad: ''
})
    
// 定义发布消息的事件处理函数
const doPublish = () => {
  const {topic , payLoad , qos } = publishInfo.value ;
  client.value.publish(topic , payLoad , { qos } , (error , res) => {
    if(error) {
      console.info("publish msg info error...." , error)
      return ;
    }
    console.info("publish msg info successful....")
  }) ;

}

</script>
<template>

	<el-card>
      <h1>发布消息</h1>
      <el-form label-position="top" >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic">
              <el-input v-model="publishInfo.topic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="payload" label="Payload">
              <el-input v-model="publishInfo.payLoad"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS">
              <el-select v-model="publishInfo.qos">
                <el-option
                    v-for="qos in qosList"
                    :key="qos"
                    :label="qos"
                    :value="qos"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-col :span="24" class="text-right">
        <el-button type="primary" @click="doPublish">发布消息</el-button>
      </el-col>
    </el-card>

</template>
```

# 2 在Java中使用MQTT

## 2.1 Eclipse Paho Java Client

具体步骤：

1、创建一个Spring Boot项目，添加如下依赖

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.0.5</version>
</parent>

<dependencies>

    <!-- spring boot整合junit单元测试的起步依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>

    <!-- mqtt java客户端依赖 -->
    <dependency>
        <groupId>org.eclipse.paho</groupId>
        <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
        <version>1.2.5</version>
    </dependency>

</dependencies>
```

2、建立连接代码实现

```java
@Test
public void createConnection() throws MqttException {

    // 定义链接相关参数
    String broker = "tcp://192.168.136.147:1883";
    String username = "zhangsan";
    String password = "123";
    String clientid = "mqtt_java_client_01";

    // 创建MqttJava客户端对象
    // MqttClientPersistence: 代表一个持久的数据存储，用于在传输过程中存储出站和入站的信息
    MqttClient client = new MqttClient(broker, clientid , new MemoryPersistence());   
    MqttConnectOptions options = new MqttConnectOptions();
    options.setUserName(username);
    options.setPassword(password.toCharArray());
    client.connect(options);

    // 阻塞当前线程
    while (true) ;
}
```

3、发布消息代码演示

```java
@Test
public void sendMessage() throws MqttException {

    // 定义链接相关参数
    String broker = "tcp://192.168.136.147:1883";
    String username = "zhangsan";
    String password = "123";
    String clientid = "mqtt_java_client_01";

    // 创建MqttJava客户端对象
    MqttClient client = new MqttClient(broker, clientid , new MemoryPersistence());
    MqttConnectOptions options = new MqttConnectOptions();
    options.setUserName(username);
    options.setPassword(password.toCharArray());
    client.connect(options);

    // 创建消息对象QoS
    String content = "hello mqtt";
    MqttMessage message = new MqttMessage(content.getBytes());
    message.setQos(2);
    message.setRetained(true);

    // 发送消息
    client.publish("a/c" , message);

    // 关闭链接释放资源
    client.disconnect();
    client.close();

}
```

4、订阅主题获取消息

```java
@Test
public void receiveMessage() throws MqttException {

    // 定义链接相关参数
    String broker = "tcp://192.168.136.147:1883";
    String username = "zhangsan";
    String password = "123";
    String clientid = "mqtt_java_client_02";

    // 创建MqttJava客户端对象
    MqttClient client = new MqttClient(broker, clientid , new MemoryPersistence());
    MqttConnectOptions options = new MqttConnectOptions();
    options.setUserName(username);
    options.setPassword(password.toCharArray());

    // 添加回调函数获取主题消息
    client.setCallback(new MqttCallback() {
        
        @Override
        public void connectionLost(Throwable cause) {  // 连接丢失时被调用
            System.out.println("connectionLost: " + cause.getMessage());
        }

        @Override
        public void messageArrived(String topic, MqttMessage message) throws Exception {  // 接收到消息时被调用
            System.out.println("topic: " + topic);
            System.out.println("Qos: " + message.getQos());
            System.out.println("message content: " + new String(message.getPayload()));
        }

        @Override
        public void deliveryComplete(IMqttDeliveryToken token) {  // 消息接收完成时被调用
            System.out.println("deliveryComplete---------" + token.isComplete());
        }
        
    });

    // 订阅主题
    client.connect(options);
    client.subscribe("a/d" , 2);

    while(true) ;

}
```

## 2.2 spring-integration-mqtt

### 2.2.1 基础环境搭建

1、创建一个Spring Boot项目，并加入如下依赖：

```xml
<dependencies>
	
    <!-- spring boot项目web开发的起步依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

	<!-- spring boot项目集成消息中间件基础依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-integration</artifactId>
    </dependency>

	<!-- spring boot项目和mqtt客户端集成起步依赖 -->
    <dependency>
        <groupId>org.springframework.integration</groupId>
        <artifactId>spring-integration-mqtt</artifactId>
        <version>5.4.3</version>
    </dependency>

    <!-- lombok依赖 -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>

    <!-- fastjson依赖 -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.83</version>
    </dependency>

</dependencies>
```

2、编写启动类

```java
@EnableConfigurationProperties(value = MqttConfigurationProperties.class)
@SpringBootApplication
public class MqttDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MqttDemoApplication.class , args) ;
    }

}
```

3、在application.yml文件中添加如下配置

```yaml
spring:
  mqtt:
    username: zhangsan
    password: 123
    url: tcp://192.168.136.147:1883
    subClientId: sub_client_id_123
    subTopic: atguigu/iot/lamp/line
    pubClientId: pub_client_id_123
```

4、创建实体类读取自定义配置

```java
@Data
@ConfigurationProperties(prefix = "spring.mqtt")
public class MqttConfigurationProperties {

    private String username;
    private String password;
    private String url;
    private String subClientId ;
    private String subTopic ;
    private String pubClientId ;

}
```

5、创建配置类配置链接工厂

```java
@Configuration
public class MqttConfiguration {

    @Autowired
    private MqttConfigurationProperties mqttConfigurationProperties ;

    @Bean
    public MqttPahoClientFactory mqttClientFactory(){

        // 创建客户端工厂
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();

        // 创建MqttConnectOptions对象
        MqttConnectOptions options = new MqttConnectOptions();
        options.setCleanSession(true);
        options.setUserName(mqttConfigurationProperties.getUsername());
        options.setPassword(mqttConfigurationProperties.getPassword().toCharArray());
        options.setServerURIs(new String[]{mqttConfigurationProperties.getUrl()});
        factory.setConnectionOptions(options);

        // 返回
        return factory;
    }

}
```

### 2.2.2 订阅主题获取消息

具体步骤：

1、配置入站适配器

```java
@Configuration
public class MqttInboundConfiguration {

    @Autowired
    private MqttConfigurationProperties mqttConfigurationProperties ;

    @Autowired
    private ReceiverMessageHandler receiverMessageHandler;

    /**
     * 配置消息传输通道
     * @return
     */
    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    /**
     * 配置入站适配器
     */
    @Bean
    public MessageProducer messageProducer(MqttPahoClientFactory mqttPahoClientFactory) {
        MqttPahoMessageDrivenChannelAdapter adapter  =
                new MqttPahoMessageDrivenChannelAdapter(mqttConfigurationProperties.getUrl() ,
                        mqttConfigurationProperties.getSubClientId() ,
                        mqttPahoClientFactory , mqttConfigurationProperties.getSubTopic().split(",")) ;
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter ;
    }

    /**
     * 配置入站消息处理器
     * @return
     */
    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler messageHandler() {
        return this.receiverMessageHandler ;
    }

}
```

2、定义监听主题消息的处理器

```java
@Component
public class ReceiverMessageHandler implements MessageHandler {

    @Override
    public void handleMessage(Message<?> message) throws MessagingException {
        MessageHeaders headers = message.getHeaders();
        String receivedTopicName = (String) headers.get("mqtt_receivedTopic");
        if("atguigu/iot/lamp/line".equals(receivedTopicName)) {
            System.out.println("接收到消息：" + message.getPayload());
        }
    }

}
```

测试：通过MQTTX向`atguigu/iot/lamp/line`主题发送消息

### 2.2.3 向指定主题发送消息

具体步骤：

1、配置出站消息处理器

```java
@Configuration
public class MqttOutboundConfiguration {

    @Autowired
    private MqttConfigurationProperties mqttConfigurationProperties ;

    @Autowired
    private MqttPahoClientFactory pahoClientFactory ;

    @Bean
    public MessageChannel mqttOutputChannel() {
        return new DirectChannel();
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttOutputChannel")
    public MessageHandler mqttOutboundMassageHandler() {
        MqttPahoMessageHandler messageHandler = new MqttPahoMessageHandler(mqttConfigurationProperties.getUrl() ,
                mqttConfigurationProperties.getPubClientId() , pahoClientFactory ) ;
        messageHandler.setAsync(true);
        messageHandler.setDefaultQos(0);
        messageHandler.setDefaultTopic("default");
        return messageHandler ;
    }

}
```

2、定义发送消息的网关接口

```java
@MessagingGateway(defaultRequestChannel = "mqttOutputChannel")
public interface MqttGateway {

    /**
     * 发送mqtt消息
     * @param topic 主题
     * @param payload 内容
     */
    void sendToMqtt(@Header(MqttHeaders.TOPIC) String topic, String payload);

    /**
     * 发送包含qos的消息
     * @param topic 主题
     * @param qos 对消息处理的几种机制。
     *          * 0 表示的是订阅者没收到消息不会再次发送，消息会丢失。<br>
     *          * 1 表示的是会尝试重试，一直到接收到消息，但这种情况可能导致订阅者收到多次重复消息。<br>
     *          * 2 多了一次去重的动作，确保订阅者收到的消息有一次。
     * @param payload 消息体
     */
    void sendToMqtt(@Header(MqttHeaders.TOPIC) String topic, @Header(MqttHeaders.QOS) int qos, String payload);
    
}
```

3、定义发送消息的服务类

```java
@Component
@AllArgsConstructor
public class MqttMessageSender {

    private MqttGateway mqttGateway;

    /**
     * 发送mqtt消息
     * @param topic 主题
     * @param message 内容
     */
    public void send(String topic, String message) {
        mqttGateway.sendToMqtt(topic, message);
    }

    /**
     * 发送包含qos的消息
     * @param topic 主题
     * @param qos 质量
     * @param message 消息体
     */
    public void send(String topic, int qos, byte[] message){
        mqttGateway.sendToMqtt(topic, qos, message);
    }
}
```

# 3 智能灯泡案例

需求：

1、智能灯泡设备上线以后向MQTT服务端发送消息，后端服务从MQTT中获取消息记录设备信息到数据库中

2、后端微服务向MQTT服务端发送开灯或者关灯消息，设备端从MQTT中获取消息控制灯泡的开和关

3、设备端对灯泡进行开和关操作的时候向MQTT中发送消息，后端服务获取MQTT消息记录灯泡的开关状态

## 3.1 服务端获取设备上线消息

### 3.1.1 环境准备

具体步骤：

1、创建对应的数据库表

```sql
-- 智能灯泡设备表
CREATE TABLE `tb_lamp` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `deviceId` varchar(50) DEFAULT NULL,
  `status` int DEFAULT NULL COMMENT '1：上线  0：下线',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 智能灯泡设备状态表
CREATE TABLE `tb_lamp_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `deviceId` varchar(50) DEFAULT NULL,
  `status` int DEFAULT NULL COMMENT '0: 关灯   1：开灯',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

2、在spring-integration-mqtt案例中加入如下依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.3.1</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.32</version>
</dependency>
```

3、在application.yml文件中加入如下依赖

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://192.168.136.147:3306/lamp_test?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: 1234

mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    map-underscore-to-camel-case: true
  mapper-locations: classpath*:mapper/*Mapper.xml
```

4、通过mybatis的逆向工程生成tb_lamp和tb_lamp_status表对应的基础代码

5、在启动类上添加`@MapperScan`注解指定Mapper接口的包路径

### 3.1.2 接口说明

> 接口一：设备上线

当终端设备连接上EMQX以后，发送上线消息到EMQX服务端，说明如下：

```shell
主题: atguigu/iot/lamp/line
消息内容：
    {
        "deviceId": "xxxxxx",
        "online": 1
    }
数据说明：
	deviceId: 设备id
	online:   上线状态，1表示上线，0表示离线
```

### 3.1.3 业务代码

对`ReceiverMessageHandler`类的代码进行如下改造：

```java
@Component
public class ReceiverMessageHandler implements MessageHandler {

    @Autowired
    private TbLampService tbLampService ;

    @Override
    public void handleMessage(Message<?> message) throws MessagingException {
        MessageHeaders headers = message.getHeaders();
        String receivedTopicName = (String) headers.get("mqtt_receivedTopic");
        if("atguigu/iot/lamp/line".equals(receivedTopicName)) {
            tbLampService.updateLampOnlineStatus(message.getPayload().toString()) ;        // 更新智能灯泡的上线状态
        }
    }

}
```

对`TbLampServiceImpl`类的代码进行如下改造：

```java
@Service
public class TbLampServiceImpl extends ServiceImpl<TbLampMapper, TbLamp> implements TbLampService {

    @Override
    public void updateLampOnlineStatus(String jsonInfo) {

        // 解析消息获取设备id和上线状态
        Map<String ,  Object> map = JSON.parseObject(jsonInfo, Map.class);
        String deviceId = map.get("deviceId").toString();
        Integer status = Integer.parseInt(map.get("online").toString());

        // 根据设备的id查询设备数据
        LambdaQueryWrapper<TbLamp> lambdaQueryWrapper = new LambdaQueryWrapper<>() ;
        lambdaQueryWrapper.eq(TbLamp::getDeviceid , deviceId) ;
        TbLamp tbLamp = this.getOne(lambdaQueryWrapper);
        if(tbLamp == null) {        // 设备不存在，新增设备
           tbLamp = new TbLamp() ;
           tbLamp.setDeviceid(deviceId);
           tbLamp.setStatus(status);
           this.save(tbLamp) ;
        }else {     // 设备已经存在，修改设备的状态
            tbLamp.setStatus(status);
            tbLamp.setUpdateTime(new Date());
            this.updateById(tbLamp) ;
        }
    }

}
```

## 3.2 服务端发送关灯开灯消息到MQTT

### 3.2.1 接口说明

> 接口三：后端发送消息控制智能灯泡开关

后端可以发送控制灯泡状态消息到EMQX中，设备端监听指定主题获取消息，控制灯泡的开关状态，说明如下：

```shell
主题: atguigu/iot/lamp/server/status
消息内容：
	{
		"deviceId": "xxxxxx",
		"status": 0
	}
数据说明：		
	status：	0：关灯   ， 1：开灯
```

### 3.2.2 业务代码

在spring-integration-mqtt案例中添加如下controller接口方法

```java
@RestController
@RequestMapping(value = "/api/lamp")
public class LampApiController {

    @Autowired
    private MqttMessageSender mqttMessageSender;

    @GetMapping(value = "/{deviceId}/{status}")
    public String sendStatusLampMsg(@PathVariable(value = "deviceId") String deviceId , @PathVariable(value = "status") Integer status) {
        Map<String , Object> map = new HashMap<>() ;
        map.put("deviceId" , deviceId) ;
        map.put("status" , status) ;
        String json = JSON.toJSONString(map);
        mqttMessageSender.send("atguigu/iot/lamp/server/status" , json);
        return "ok" ;
    }

}
```

## 3.3 服务端获取设备开灯关灯消息

### 3.3.1 接口说明

> 接口四：设备端改变智能灯泡开关的状态，状态发给给后端，后端记录状态	

```shell
主题：atguigu/iot/lamp/device/status
消息内容：
	{
		"deviceId": "xxxxx"  
		"status": 0
	}
数据说明：	
	deviceId：设备id
	status：0：关灯   ， 1：开灯
```

### 3.3.2 业务代码

对`ReceiverMessageHandler`类的代码进行如下改造：

```java
// com.atguigu.mqtt.receiver.ReceiverMessageHandler
@Override
public void handleMessage(Message<?> message) throws MessagingException {
    MessageHeaders headers = message.getHeaders();
    String receivedTopicName = (String) headers.get("mqtt_receivedTopic");
    if("atguigu/iot/lamp/line".equals(receivedTopicName)) {
        tbLampService.updateLampOnlineStatus(message.getPayload().toString()) ;        // 更新智能灯泡的上线状态
    }else if("atguigu/iot/lamp/device/status".equals(receivedTopicName)) {
        tbLampStatusService.saveDeviceStatus(message.getPayload().toString()) ;
    }
}
```

对`TbLampStatusServiceImpl`类的代码进行如下改造：

```java
@Service
public class TbLampStatusServiceImpl extends ServiceImpl<TbLampStatusMapper, TbLampStatus> implements TbLampStatusService {

    @Override
    public void saveDeviceStatus(String json) {

        // 获取消息内容
        Map<String , Object> map = JSON.parseObject(json, Map.class);
        String deviceId = map.get("deviceId").toString();
        Integer status = Integer.parseInt(map.get("status").toString());

        // 创建对象封装消息
        TbLampStatus tbLampStatus = new TbLampStatus() ;
        tbLampStatus.setDeviceid(deviceId);
        tbLampStatus.setStatus(status);
        this.save(tbLampStatus) ;

    }

}
```













