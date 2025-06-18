
# 开发步骤
1. 根据要做的事在电路图中找到对应的电路，观察控制这里的引脚是哪个。如需要点亮一个 LED 灯，先找到相应电路，分析如何才能点亮，比如需要 PA0 是低电平就能点亮。
2. 在芯片引脚中找到对应引脚，比如 PA0，在 32MCU 上一个引脚通常有多个功能，就需要根据需求对这个引脚进行配置。比如这里是要 PA0 输出低电平，那么就把它当成一个通用输出就行了。
3. 对引脚工作模式的配置。这里我们要把 PA0 引脚当作通用输出，那么就要把这个引脚配置为通用输出模式，在 GPIO 端口模式寄存器中就能对相应端口的模式进行配置。
4. 对输出速度进行配置，在 GPIO 端口输出速度寄存器中可以修改引脚的输出速度。（不同的芯片设计不同，输出速度寄存器可能合并在工作模式寄存器中。）
5. 对输出类型进行配置，在 GPIO 端口输出类型寄存器中，修改 PA0 的输出类型，这里我们可以配置为推挽输出。
6. 对输出数据进行配置，在 GPIO 端口输出数据寄存器中，修改 PA0 的输出数据为0，即低电平输出。
寄存器的地址是当前模块的基地址加上偏移地址，如：
```c
/**
 * PA0输出低电平，其它保持高电平
 * 将 0x40010800 + 0x0C 这个数字，使用 uint32_t * 强转为地址，
 * 再使用 * 得到地址值的变量进行赋值，从而修改寄存器数据。
 * 0xfffe 是因为高位的16位为保留位，不用赋值，如果需要赋值则为 0xfffffffe
 */
*(uint32_t *)(0x40010800 + 0x0C)= 0xfffe;

// 等同于
uint32_t *p = (uint32_t *)(0x40010800 + 0x0C);
*p = 0xfffe;
```
### 基地址
这是 py32 和 stm32 的芯片手册中的表示方法。
![图 0](assets/1747387205177.png)  
![图 1](assets/1747387231600.png)  
### 偏移量
偏移量可以在每个分类下看，也可以在总表看。
![图 3](assets/1747387629167.png)  
![图 2](assets/1747387560648.png)  

# 寄存器宏定义
上面用到的基地址、偏移量等，芯片商已经定义好了宏提供给我们使用，我们只需要使用这些宏即可。如：
```c
// RCC 模块名，ODR 寄存器名称
RCC->ODR = 0xfffe;
```
RCC 就是指向基地址的指针，并且是个结构体指针，里面每个成员就是个32位的寄存器，访问到对应的寄存器进行赋值就能更方便的修改寄存器了。

### 只改需要的位
上面的写法导致我们是一次性修改整个32位的寄存器，实际上我们只需要修改其中某些位，那么就可以这样写：
```c
/**
 * RCC_ODR_ODR0 是对应位的宏定义，我们对其进行 按位与 或 按位或 运算就能达到修改具体位的目的
 * 宏定义里面就是将对应位定义为1：如 0x00000003，就是32位寄存器的最后两位为1，
 * 即00...0011。要将这两位改为0就取反再按位与，改为1就按位或即可。
 */
// 改为0，取反后就是 11...1100
RCC->ODR &= ~RCC_ODR_ODR0;
// 改为1
RCC->ODR |= RCC_ODR_ODR0;
```

# 系统架构
不同型号架构会有不同，需要自己看手册的系统架构图。
### 被动单元
*  内部 SRAM
    * 存储程序执行时用到的变量。
*  内部闪存存储器
    * 存储下载的程序。
    * 程序执行时用到的常量。
* AHB 到 APB 的桥（AHB to APBx）
    * 通过 APB 总线连接到 APB 上的外设。
    * 通常分为两条线，一条是高速线，连接告诉外设。一条是低速线，连接低速外设。

### 驱动（主动）单元
* CORTEX-M 内核 DCode 总线（D-Bus）（PY32F003 里没有）
    * 通过外部的 DCode 总线连接到总线矩阵然后与闪存存储器的数据接口相连接，实现从 Flash 常量加载和调试访问。
* 内部系统总线（S-bus）
    * 通过外部的 System 总线连接到总线矩阵。
* 通用 DMA
    * 通过 DMA 总线连接到总线矩阵，作用就是降低 CPU 的负担，由 DMA 实现内存和外设之间的数据传输。

# 中断
### 中断和异常
中断分为内部中断（内核中断）和外部中断，但在上古时代，内部中断叫做异常，外部中断才叫中断。因此如果看到“异常”和“中断”的描述，要能明白表示的是内部中断和外部中断。

### NVIC
嵌套向量中断控制器。中断系统的大总管，接近于内核中用于管理所有中断的一个模块，可以通过 NVIC 配置各种中断类型的优先级。
* 抢占优先级：抢占优先级越高，内核越先执行。在执行低优先级的中断任务时，来了个高优先级的中断，会暂停低优先级中断任务去执行高优先级的。
* 响应优先级：当一个高优先级的中断任务在执行时，来了几个低优先级的中断任务，等高优先级任务执行完后先执行等待中的哪个，就要看它们哪个的响应优先级更高。相同的话内核内部还有一个根据不同中断类型的优先级。

NVIC 由于太接近内核，我们一般都使用库函数配置，而不使用寄存器操作的方式。下面的 EXTI 就可以方便的使用寄存器的方式进行配置。

### EXTI
外部中断控制器，EXT-external，I-interrupt。当外部硬件触发中断时，通过电路连接到 MCU 的针脚，针脚通过我们的配置等知道是个外部中断，就会将它交给 EXTI。EXTI 接收到中断信号后，会通过 EXTI 的相关寄存器配置判断这个中断信号是上升沿/下降沿中断，是否屏蔽此类型中断等，决定是否交给 NVIC 执行。

#### 中断分类
* 内核中断：编写在内核中的那些优先级最高的中断，如复位（系统异常导致复位）、系统滴答定时器等。
* 片上外设：集成在 MCU 上的中断，如串口、定时器、IIC等。
* 外部中断：没在 MCU 上，通过引脚连接的按键等产生的中断。外部中断可以被使能或禁止，通过 EXTI 交给 NVIC 来处理。
![图 0](assets/1750078521108.png)  

### 中断优先级
优先级值设置的越小的，优先级越高。中断优先级分为抢占优先级和响应优先级。
* 抢占优先级：优先级高的中断可以打断优先级低的中断，先执行优先级高的。
* 响应优先级：当有个高优先级的正在执行，来了很多个低优先级的，那么当高优先级的执行完后，在这些等待执行的中断中的执行顺序是：优先级高的先执行，如果优先级相同则按照中断向量表中的排序来决定谁先执行（而不是先来的先执行）。

实际在配置时是配置优先级组，每组里面又分子优先级（可选的）。分组可以看做是抢占优先级，子优先级看做响应优先级。通常配置为只有组优先级就行，这样简单易控制。
![图 1](assets/1750081689410.png)  

```c
// 5. NVIC配置示例
NVIC_SetPriorityGrouping(3);    // 全部都是抢占优先级。3->0b011
NVIC_SetPriority(EXTI15_10_IRQn, 3); // EXTI15_10_IRQn 是10-15条线的中断定义
NVIC_EnableIRQ(EXTI15_10_IRQn);
```

### EXTI 原理
![图 2](assets/1750082975186.png)  
需要注意两点：
1. 中断屏蔽寄存器中没有配置屏蔽此类型中断，才能执行。
2. 中断执行完成后需要手动复位请求挂起寄存器。

### 中断开发流程
需要根据芯片配置对应的寄存器，根据电路设计配置对应的 GPIO 模式等。
##### 一、时钟使能
```c
    // APB2 外设时钟使能寄存器(RCC_APB2ENR)
    /* 1 开启时钟 (EXTI和NVIC时钟始终开启，无需手动开启)*/
    /* 1.1 开启 GPIOF 时钟 */
    RCC->APB2ENR |= RCC_APB2ENR_IOPFEN;
    /* 1.2 开启AFIO时钟 */
    RCC->APB2ENR |= RCC_APB2ENR_AFIOEN;
```
##### 二、GPIO 模式配置
```c
    /* 2 配置GPIO  设置为输入 下拉(cnf: 10 mode: 00) 。另外还需要把ODR寄存器对应的位设为0  (1=上拉)*/
    GPIOF->CRH &= ~GPIO_CRH_MODE10;
    GPIOF->CRH |= GPIO_CRH_CNF10_1;
    GPIOF->CRH &= ~GPIO_CRH_CNF10_0;
    GPIOF->ODR &= ~GPIO_ODR_ODR10;
```
##### 三、配置 AFIO 引脚复用选择器
AFIO 即引脚 N 合1的那个功能模块，由于引脚比较多，所以需要使用多个寄存器才能对每个引脚进行配置，如教程中的芯片就分为 AFIO_EXTICR1、AFIO_EXTICR2、AFIO_EXTICR3、AFIO_EXTICR4 每个寄存器里可配置4个共16个。每个寄存器里的每一个可配置 0000-0110 共7种。
教程中要配置 PF10 为引脚复用，则需要配置 EXTICR[2]（即AFIO_EXTICR3） 中的 EXTI10 配置为 0101（即PF引脚）。也就是在7个10号引脚中选择了 GPIOF。
**\* 注意这里 PF10 中的10就是 AFIO 到 EXTI 的第10条线。**
```c
/* 3  配置 AFIO, 用于引脚复用为外部中断  PF10 */
AFIO->EXTICR[2] |= AFIO_EXTICR3_EXTI10_PF;
```
##### 四、配置 EXTI
```c
    /* 4. 配置 EXTI */
    /* 4.1 RTSR 上升沿触发中断寄存器中将 TR10 打开   */
    EXTI->RTSR |= EXTI_RTSR_TR10;
    /* 4.2 IMR 中断屏蔽寄存器中开启 EXTI10 线（使其不屏蔽） */
    EXTI->IMR |= EXTI_IMR_MR10;
```
##### 五、清除中断标志位
在中断程序处理完成后需要手动清除中断标志位。
```c
    /* 在 PR 寄存器中清除中断标志. 写1清除中断 */
    EXTI->PR |= EXTI_PR_PR10;
```

### 注意
##### 开启芯片功能
没使用 CubeMX 创建项目，使用自己拷贝的 startupxxxx.s, stm32xxxx.h 进行开发时，文件中使用的默认芯片配置，可能会和我们使用的芯片有区别，从而有些功能无法使用，比如这里 `RCC_APB2ENR_IOPFEN` 没有，最多只有 `RCC_APB2ENR_IOPEEN`，我们就需要去文件中修改，将芯片配置打开。
这里就将 `#define STM32F10X_HD` 这行注释打开了，这款芯片的相关功能就生效了。
![图 3](assets/1750130330855.png)  

##### 系统滴答定时器优先级
![图 4](assets/1750138524160.png)  
系统滴答定时器默认优先级是15，优先级很低，但是我们在中断中需要调用 delay 方法，delay 方法就是使用的系统滴答定时器，这就导致了在中断中调用另一个中断，而调用的中断如果哦优先级比当前中断更低的话，则无法打断当前中断，从而调用失败程序卡死。所以需要将系统滴答定时器的优先级配置来比我们使用 EXTI 中断优先级更高才行。

##### 中断程序要尽可能短
中断程序里执行的逻辑要尽可能的精简，如果中断程序太长，则会阻塞主程序，也可能被其它中断打断。如果逻辑复杂，则可以优化为使用一个变量标识符，中断发生后修改此标识符，在主程序中判断标识符的变化来执行逻辑。

### 中断示例代码
##### 寄存器方式：
```c
void Key_Init()
{
    // 1. 配置时钟
    RCC->APB2ENR |= RCC_APB2ENR_IOPFEN;
    RCC->APB2ENR |= RCC_APB2ENR_AFIOEN;

    // 2. GPIO工作模式配置，PF10：CNF - 10，MODE - 00
    GPIOF->CRH &= ~GPIO_CRH_MODE10;
    GPIOF->CRH |= GPIO_CRH_CNF10_1;
    GPIOF->CRH &= ~GPIO_CRH_CNF10_0;

    GPIOF->ODR &= ~GPIO_ODR_ODR10;

    // 3. AFIO配置引脚复用选择
    AFIO->EXTICR[2] |= AFIO_EXTICR3_EXTI10_PF;

    // 4. 配置EXTI
    EXTI->RTSR |= EXTI_RTSR_TR10;
    EXTI->IMR |= EXTI_IMR_MR10;

    // 5. NVIC配置
    NVIC_SetPriorityGrouping(3);    // 全部都是抢占优先级
    NVIC_SetPriority(EXTI15_10_IRQn, 3);
    NVIC_EnableIRQ(EXTI15_10_IRQn);
}

// 中断服务程序
void EXTI15_10_IRQHandler(void)
{
    // 先清除中断挂起标志位
    EXTI->PR |= EXTI_PR_PR10;

    // 防抖延迟
    Delay_ms(10);

    // 判断如果依然保持高电平，就翻转LED1
    if ((GPIOF->IDR & GPIO_IDR_IDR10) != 0)
    {
        LED_Toggle(LED1);
    }
}
```

##### HAL 库方式
使用 CubeMX 生成的项目就有了基础的中断相关代码：
gpio.c 中生成的代码，主要是 NVIC 相关配置：
```c
/** gpio.c 中的代码 */
void MX_GPIO_Init(void)
{

  GPIO_InitTypeDef GPIO_InitStruct = {0};

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOC_CLK_ENABLE();
  __HAL_RCC_GPIOF_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(LED1_GPIO_Port, LED1_Pin, GPIO_PIN_SET);

  /*Configure GPIO pin : KEY3_Pin */
  GPIO_InitStruct.Pin = KEY3_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_IT_RISING;
  GPIO_InitStruct.Pull = GPIO_PULLDOWN;
  HAL_GPIO_Init(KEY3_GPIO_Port, &GPIO_InitStruct);

  /*Configure GPIO pin : LED1_Pin */
  GPIO_InitStruct.Pin = LED1_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH;
  HAL_GPIO_Init(LED1_GPIO_Port, &GPIO_InitStruct);

  /* EXTI interrupt init*/
  HAL_NVIC_SetPriority(EXTI15_10_IRQn, 3, 0); // 生成了 NVIC 中断优先级配置
  HAL_NVIC_EnableIRQ(EXTI15_10_IRQn); // 中断使能

}
```
stm32f1xx_it.c 中生成的代码，主要是中断回调执行：
```c
/** stm32f1xx_it.c 中生成的中断相关代码。中断发生时执行这里的中断服务程序 */
void EXTI15_10_IRQHandler(void)
{
  /* USER CODE BEGIN EXTI15_10_IRQn 0 */

  /* USER CODE END EXTI15_10_IRQn 0 */
  HAL_GPIO_EXTI_IRQHandler(KEY3_Pin); // 中断中调用了个 HAL 库提供的回调函数，我们实现回调函数即可
  /* USER CODE BEGIN EXTI15_10_IRQn 1 */

  /* USER CODE END EXTI15_10_IRQn 1 */
}

/** HAL_GPIO_EXTI_IRQHandler 的实现 */
/**
  * @brief  This function handles EXTI interrupt request.
  * @param  GPIO_Pin: Specifies the pins connected EXTI line
  * @retval None
  */
void HAL_GPIO_EXTI_IRQHandler(uint16_t GPIO_Pin)
{
  /* EXTI line interrupt detected */
  if (__HAL_GPIO_EXTI_GET_IT(GPIO_Pin) != 0x00u)
  {
    __HAL_GPIO_EXTI_CLEAR_IT(GPIO_Pin);
    HAL_GPIO_EXTI_Callback(GPIO_Pin); // 调用了 HAL_GPIO_EXTI_Callback
  }
}

/**
  * @brief  EXTI line detection callbacks.
  * @param  GPIO_Pin: Specifies the pins connected EXTI line
  * @retval None
  */
 /** 
  * __weak 是 C++ 的关键字，C 语言中没有，ARMCC 编译器实现了。功能是可以进行函数重写。
  * 我们可以重写此函数，HAL_GPIO_EXTI_IRQHandler 中调用的就是我们重新的函数了
  */
__weak void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
  /* Prevent unused argument(s) compilation warning */
  UNUSED(GPIO_Pin);
  /* NOTE: This function Should not be modified, when the callback is needed,
           the HAL_GPIO_EXTI_Callback could be implemented in the user file
   */
}
```
编写 HAL_GPIO_EXTI_Callback 回调，这里就不再加 `__weak` 关键字了，就会调用我们自己的实现：
```c
// GPIO_Pin 就收到的就是 KEY3_Pin
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin) {
  // 检查是否是 KEY3 按键的中断，即 EXTI10 传来的中断请求
  if (GPIO_Pin == KEY3_Pin) {
    // EXTI->PR = KEY3_Pin; // 不在需要手动清除中断标志位，HAL_GPIO_EXTI_IRQHandler 中已经帮我们清除了

    HAL_Delay(10); // 延时 10 毫秒，防止按键抖动
    // 判断如果是高电平，则翻转 LED1
    if (HAL_GPIO_ReadPin(KEY3_GPIO_Port, KEY3_Pin) == GPIO_PIN_SET) {
      // 按键按下，执行相应的操作
      HAL_GPIO_TogglePin(LED1_GPIO_Port, LED1_Pin); // 切换 LED 状态
    }
  }
}
```
# USART 串口通讯
### 串行 VS 并行
虽然并行一次性可以发送多位，理论上传输速度更快。但是并行在长距离传输时更容易受干扰，并且传输速率达到一定程度后就没法再往上提升，再提升就很容易出错，某一位受干扰或晚了一点点到达都会导致问题。而串行就没有这么多问题，而且设计更简单，成本更低，并且可以通过高速的传输速率来抹平传输速率的劣势。
比如显卡曾经也是使用 PCI 接口，这是一个并行的接口，但是现在使用的 PCIe 是串行接口，只是每个引脚传输的是不同的数据，而不是多个引脚并行传输统一数据。并且随着频率的提升，速度还快于曾经并行的 PCI。另外硬盘以前的 ATA 接口也是并行，现在的 SATA 接口是串行，也更快。
现在并行通常都用在芯片内部总线这些地方，距离很短，提升速率才不会导致错误。

### 同步 VS 异步
* 同步：有时钟信号的是同步通信。如果是单工通信，那么就只需要一根时钟信号线和一根数据信号线。如果是全双工通信那么就需要两根时钟信号线和两根数据信号线。
* 异步：没有时钟信号的是异步通信，通过特定的电平变化来通知开始和结束。

### UART VS USART
UART 是个基础的传输协议，USART 是基于 UART 的改进版。除了 USART 外，在其之上还可以添加更多的电气化标准，实现了更多的传输功能，如远距离传输的 RS-232, RS-485 等。电脑上通常把串口叫做 COM 口，所以我们在串口工具里看到的也是 COMx 这样的名称。

* UART：（Universal Asynchronous Receiver/Transmitter）通用异步收发传输器，是一种异步收发传输器，是电脑硬件的一部分。它将要传输的资料在串行通信与并行通信之间加以转换。作为把并行输入信号转成串行输出信号的芯片，UART通常被集成于其他通讯接口的连结上。
用于异步通信。该总线双向通信，可以实现全双工传输和接收。在嵌入式设计中，UART用于主机与辅助设备通信，如汽车音响与外接AP之间的通信，与PC机通信包括与监控调试器和其它器件，如EEPROM通信。
具体实物表现为独立的模块化芯片，或作为集成于微处理器中的周边设备。一般是RS-232C规格的，与类似Maxim的MAX232之类的标准信号幅度变换芯片进行搭配，作为连接外部设备的接口。

* USART：（Universal Synchronous/Asynchronous Receiver/Transmitter）通用同步/异步串行接收/发送器USART是一个全双工通用同步/异步串行收发模块，该接口是一个高度灵活的串行通信设备。
USART收发模块一般分为三大部分：时钟发生器、数据发送器和接收器。控制寄存器为所有的模块共享。
时钟发生器由同步逻辑电路（在同步从模式下由外部时钟输入驱动）和波特率发生器组成。发送时钟引脚XCK仅用于同步发送模式下，
发送器部分由一个单独的写入缓冲器（发送UDR）、一个串行移位寄存器、校验位发生器和用于处理不同桢结构的控制逻辑电路构成。使用写入缓冲器，实现了连续发送多帧数据无延时的通信。
接收器是USART模块最复杂的部分，最主要的是时钟和数据接收单元。数据接收单元用作异步数据的接收。除了接收单元，接收器还包括校验位校验器、控制逻辑、移位寄存器和两级接收缓冲器（接收UDR）。接收器支持与发送器相同的帧结构，同时支持帧错误、数据溢出和校验错误的检测。

### 串口介绍
串口通讯（Serial Communication）是一种设备间非常常用的串行通讯方式，因为它简单便捷，因此大部分电子设备都支持该通讯方式，电子工程师在调试设备时也经常使用该通讯方式输出调试信息。
![图 5](assets/1750164406071.png)  
烧录器通常就使用串口通讯。

### 串口通讯协议
![图 6](assets/1750164655847.png)  
从高电平变为低电平表示开始，然后发送8位字节数据流（可约定其它位长），先发送低位后发送高位，然后可以跟一个可选的奇偶校验位，最后恢复高电平结束。

##### 波特率
如果传输的数据都是1，那么就一直是高电平，如果识别到底是发了多少个1呢？这时就需要使用波特率了，在二进制中等于比特率。常见的波特率为 4800、9600、115200等。

### 串口的设计
STM32 芯片提供了多个串口，其中 USART1 接在高速外设上，速度比其它几个都更快。
![图 7](assets/1750169862346.png)  

### USART 功能框图原理
![图 8](assets/1750211393875.png)  
##### 引脚含义
1. TX：输出引脚，用于发送数据
2. RX：输入引脚，用于接收数据
3. SW_RX：输入引脚，用于单线和智能卡模式，属于内部引脚，没有具体外部引脚引出。（极少使用）
4. IRDA_OUT：输出引脚，用于发送红外数据
5. IRDA_IN：输入引脚，用于接收红外数据
6. nRTS：请求以发送(Request To Send)，请求别人给我发送数据。n表低电平有效。若使能RTS硬件流控制，当USART接收器准备好接收数据时，nRTS有效，即它为低电平；当接收寄存器已满时，nRTS被设置为高电平
7. nCTS：清除以发送(Clean To Send)，别人告诉我可以发送数据。n表低电平有效。若使能CTS硬件流控制，发送器在发送下一帧数据前会检测nCTS引脚状态，若为低电平表可以发送数据，若为高电平则在发送完当前数据帧之后停止发送。
8. SCLK：发送器时钟输出引脚，仅适用于同步模式。

##### RX/TX 的流程
使用移位寄存器完成 串并/并串 转换。
接收数据时，通过 RX 接收到串行数据，然后交给接收移位寄存器，接收移位寄存器先收到的是低位，放入移位寄存器的高位，再收到时往低位移动。移位寄存器装满后，通过并行发送到接收数据寄存器，然后将数据并行交给内核处理。
发送数据时，先将数据并行写入发送数据寄存器，然后并行交给发送移位寄存器进行并串转换，一位一位的通过 TX 进行发送，先发送低位。

##### 其它
CR（control register）控制寄存器。
SR（status register）状态寄存器。
USART_BRR 波特率寄存器，配置的波特率存储在这里。

### 波特率
![图 9](assets/1750213425934.png)  
波特率配置在 Div_Mantissa 和 Div_Fraction 中，前面的是整数位，后面的是小数位。
USARTDIV 计算公式为：USARTDIV = Div_Mantissa + (Div_Fraction / 16)
最终波特率计算公式为：$Tx/Rx波特率 = \frac{f_{ck}}{16 * USARTDIV}$，fck 是时钟频率，如72MHz。

常见波特率的值：
![图 10](assets/1750214613346.png)  
*36MHz 是低速外设总线的速度，72MHz 是高速外设总线的速度（USART1）。*
假设我们需要的波特率是115200，则对应的分频值应该是：39.0625，把这个值写入到BRR寄存器中。39.0625的小数部分：0.0625 * 16 = 1, 整数部分是：39(0x27)。所以写入到BRR寄存器的值是：0x0271。