# 给二进制中的某些位赋值
（最右边的是第0位）
开发中使用的寄存器等通常为8位、16位、32位这样的位数，很多编译器下，我们不能通过 0b 的方式使用二进制数字，只能通过 0x 的方式使用16进制数字。如 0xFA 就是 1111 1010。然而我们很多时候却要给寄存器赋值，比如8位寄存器我们就可以使用16进制直接赋值，如`P0 = 0xFA`。但是当我们要修改其中某些位的时候却比较麻烦，比如 P0 本来的值是 0101 1000，我们要将第2、3位的10改为01，其它位不变。这时就有个技巧：
```c
/**
 * 一次性修改多位
 */
P0 = 0x58; // P0 原本的值是 0x58 即 0101 1100
/**
 * 先将要修改的位变成0，就需要使用一个对应位为0，其它位为1的变量，即 1111 0011 -> 0xF3
 * 将 P0 与这个数按位与后，对应的位就变成了0。结果为 0101 0000
 */
P0 &= 0xF3;
/**
 * 要将2、3位改为01，所以需要用到的二进制为 0000 0100 -> 0x04
 * 将这个数和 P0 再进行按位或运算就得到最终结果了 0101 0100
 */
P0 |= 0x04;
```
如果我们只改其中某一位为1或0，其它位不变，就更简单一些。
```c
/**
 * 一次只改一位
 */
P0 = 0x58; // P0 原本的值是 0x58 即 0101 1100

// 要将第1位改成1，即 0101 1110，就与 "0000 0010" 进行"或"运算即可
P0 |= 0x02; // 要改的位为1，其它位为0，或运算
P0 |= (1 << 1); // 效果和上面那句一样，1左移1位更能体现要修改的位

// 要将第2位改成0，即 0101 1000，就与 "1111 1011" 进行"与"运算即可
P0 &= 0xFB; // 要改的位为0，其它位为1，与运算
P0 &= ~(1 << 2); // 效果同上。1左移2位再取反，就得到 1111 1011，也能体现要修改的位

// 要将第3位进行翻转
P0 ^= 0x08; // 要改的位为1，其它位为0，异或运算
P0 ^= (1 << 3); // 效果同上。1左移3位
```
使用移位运算后再和原来的数进行操作，使用起来更简单，不用去计算具体的十六进制，如果要修改多位那就多操作几次也行。

# 获取二进制中某一位是否为1
如变量 IDR 的二进制为 0101 1010，我们想知道第3位的值是否为1，那么就应该拿一个第三位是1，其它位都是0的数进行位与操作，即 `0101 1010 & 0000 1000`，如果第三位是1，那么就会得到 0000 1000，如果第三位是0就会得到 0000 0000。
但是要注意的是，我们不能拿结果去和1进行比较，因为 0000 1000 不等于1，而在我们看来获取的那一位是1。所以应该和0比较，只要结果不为0，就说明要获取的那一位是1；如果那一位是0，按位与的结果必然是0。
```c
// IDR 为 0101 1010，IDR3 为 0000 1000
if ((IDR & IDR3) != 0) {
    // ...
}
```

# 原码补码转换
原码转补码和补码转原码都可以用“取反加一”的操作得到。补码转原码实际上应该“减一取反”，但是结果和“取反加一”是相同的。
* 补码是 0111，减一为 0110，再取反为 1001。
* 补码是 0111，取反为 1000，再加一为 1001。
结果是一样的。

#### 原码，反码，补码的关系
原码 1000，反码 0111，补码 1000。
原码 + 反码 = 全为1 -> 1111，即 $2^4 - 1$。
由于补码是反码+1，所以
原码 + 补码 = 原码 + 反码 + 1，即 $2^4 - 1 + 1$ 即 $2^4$。
所以原码+补码就是往前进一位，后面全是0，即 10000。
**补码之所以叫补码，就是和原码相加后把原码补成了2的整次幂的数。在十进制中，3+7=10,7叫做3的补数，3也是7的补数。所以，补码是原码的补码，原码也是补码的补码。所以补码是原码取反加一，原码也是补码取反加一**

# 秒调用毫秒注意点
```c
// 这是个微秒定时器，接收参数是 uint16
void delayUs(uint16_t us)
{
  SysTick->LOAD = (SystemCoreClock / 1000000) * us; // Set reload register
  SysTick->VAL = 0; // Clear current value register

  SysTick->CTRL |= SysTick_CTRL_ENABLE_Msk; // Start the timer
  // SysTick->CTRL |= 0x05;

  while (!(SysTick->CTRL & SysTick_CTRL_COUNTFLAG_Msk)); // Wait for the timer to expire

  SysTick->CTRL &= ~SysTick_CTRL_ENABLE_Msk; // Stop the timer
}

/**
 * 这是毫秒定时器，通过调用微秒实现，接收的类型也是 uint16_t
 */
void delayMs(uint16_t ms)
{
  // 如果直接 x1000 调用微秒，那么类型是相同的，x1000 后可能超过微秒的最大值
  // delayUs(ms * 1000);

  // 所以使用 while 循环每一毫秒调用一次微秒，定时1000微秒
  while (ms--)
  {
    delayUs(1000); // Call delayUs function with 1000
  }
  
}

// 秒的逻辑同毫秒调用微秒
void delayS(uint16_t s)
{
  while (s--)
  {
    delayMs(1000); // Call delayMs function with 1000
  }
  
}
```


# 宏函数
```c
#define GLOBAL_INT_DISABLE()             \
    uint32_t ui32IntStatus = 0;          \
    do {                                 \
        ui32IntStatus = __get_PRIMASK(); \
        __set_PRIMASK(1);                \
    } while (0)

#define GLOBAL_INT_RESTORE()          \
    do {                              \
        __set_PRIMASK(ui32IntStatus); \
    } while (0)

```
* 上面的代码定义了两个宏函数 `GLOBAL_INT_DISABLE` 和 `GLOBAL_INT_RESTORE`，后面的`\`是把一条逻辑行分隔成多条物理行，实际上是一行代码。
* `uint32_t ui32IntStatus = 0;` 定义了一个局部变量 `ui32IntStatus`，是一个终端禁用的标识符，因为在`GLOBAL_INT_RESTORE` 中还会使用，所以没定义在`do`代码块中。
* 使用`do { ... } while (0)` 结构是为了确保宏在使用时的语法正确性，避免潜在的错误。比如：
    ```c
    if (condition)
        GLOBAL_INT_DISABLE();
    else
        // do something
    ```
    如果没有 `do { ... } while (0)`，宏展开后会导致 `if` 语句后面只有一条语句，从而引发语法错误，而使用 `do { ... } while (0)` 可以确保宏在任何上下文中都能正确展开为一个完整的语句块。
    ***但是由于这个示例里的 GLOBAL_INT_DISABLE 宏在 do 外面定义了变量 `ui32IntStatus`，所以这个宏依然会面临 if 语句的问题。***
* 使用宏函数：
    ```c
    GLOBAL_INT_DISABLE();
    // 其它代码
    ...
    GLOBAL_INT_RESTORE();
    ```
    宏函数会替换为定义的代码。

再来解释下这两个宏函数的功能：
```c
    // 定义了一个局部变量 ui32IntStatus 用于保存当前中断状态
    uint32_t ui32IntStatus = 0;
    // 调用 __get_PRIMASK() 函数获取当前中断状态，并将其保存到 ui32IntStatus 变量中
    ui32IntStatus = __get_PRIMASK();
    // 调用 __set_PRIMASK(1) 函数禁用全局中断
    __set_PRIMASK(1);

    // 执行其它代码，这里的代码就不会被中断打断了
    ...

    // 调用 __set_PRIMASK(ui32IntStatus) 函数恢复之前的中断状态
    __set_PRIMASK(ui32IntStatus);
```

使用宏函数而不是普通函数的原因是：
1. **性能**：宏函数在预处理阶段展开，避免了函数调用的开销，适用于需要高性能的场景。
2. **灵活性**：宏函数可以操作调用它们的上下文中的变量，而不需要通过参数传递。

# #if #else #endif
## 基本概念
`#if`、`#else`、`#endif` 是C/C++语言中的**预处理器指令**，用于**条件编译**（Conditional Compilation）。这些指令在**编译前**由预处理器处理，根据条件决定哪些代码块会被包含在最终的编译过程中。
***符合条件的代码才会在编译后的可执行文件中保留，不符合的就没有了，执行时可以少执行 if else 逻辑***

## 在嵌入式系统中的主要用途

### 1. 平台适配与兼容性
使用 `#if defined(...)` 可以判断某个宏是否定义来进行特定操作。例如：
```c
#if defined(STM32F4)
    // STM32F4系列的特定代码
    #include "stm32f4xx.h"
#elif defined(N32WB43X)
    // N32WB43X系列的特定代码
    #include "n32wb43x.h"
#else
    // 默认平台或错误处理
    #error "Unsupported platform!"
#endif
```

### 2. 功能模块开关
可以定义一个供开发人员方便修改的宏来快速启用或禁用某些功能模块。例如：
```c
#define ENABLE_BLE      1 // 开发人员可以将此处改为 0 来禁用 BLE 功能
#define ENABLE_OTA      0
#define ENABLE_DEBUG    1

#if ENABLE_BLE // 这里只要 ENABLE_BLE 被定义为非零值，下面的代码就会被包含
    // BLE功能相关代码
    #include "ble_stack.h"
    void ble_init(void) {
        // BLE初始化代码
    }
#endif

#if ENABLE_OTA
    // OTA升级功能相关代码
    #include "ota_module.h"
#endif
```

### 3. 硬件配置适配
```c
#if BOARD_VERSION == 1
    #define LED_PIN    GPIO_PIN_0
    #define BUTTON_PIN GPIO_PIN_1
#elif BOARD_VERSION == 2
    #define LED_PIN    GPIO_PIN_2
    #define BUTTON_PIN GPIO_PIN_3
#endif
```

### 4. 优化与调试控制
```c
#if DEBUG_LEVEL >= 1
    #define LOG_INFO(fmt, ...) printf("[INFO] " fmt, ##__VA_ARGS__)
#else
    #define LOG_INFO(fmt, ...) /* 空宏，编译时会被删除 */
#endif

#if DEBUG_LEVEL >= 2
    #define LOG_DEBUG(fmt, ...) printf("[DEBUG] " fmt, ##__VA_ARGS__)
#else
    #define LOG_DEBUG(fmt, ...) /* 空宏，编译时会被删除 */
#endif
```

### 5. 内存管理
```c
#if defined(USE_EXTERNAL_RAM)
    #define BUFFER_SIZE  1024 * 1024  // 1MB缓冲区
    #define BUFFER_ADDR  EXTERNAL_RAM_BASE
#else
    #define BUFFER_SIZE  1024 * 64     // 64KB缓冲区
    #define BUFFER_ADDR  INTERNAL_RAM_BASE
#endif

uint8_t buffer[BUFFER_SIZE] __attribute__((at(BUFFER_ADDR)));
```

### 6. 编译器和工具链适配
```c
#if defined(__GNUC__)
    // GCC编译器特定代码
    #define ALIGNED(x) __attribute__((aligned(x)))
#elif defined(__ICCARM__)
    // IAR编译器特定代码
    #define ALIGNED(x) __attribute__((aligned(x)))
#elif defined(__CC_ARM)
    // ARMCC编译器特定代码
    #define ALIGNED(x) __align(x)
#endif
```

## 嵌入式系统中的特殊重要性
### 1. 资源受限环境的适配
嵌入式系统通常具有：
- 有限的ROM/FLASH空间
- 有限的RAM资源
- 不同的处理器架构

条件编译允许：
- 只包含必要的代码，减小固件大小
- 根据硬件资源调整功能实现
- 适配不同的处理器架构

### 2. 多版本产品的维护
```c
#define PRODUCT_VERSION_LITE   1
#define PRODUCT_VERSION_STANDARD 2
#define PRODUCT_VERSION_PRO    3

#define CURRENT_PRODUCT_VERSION  PRODUCT_VERSION_STANDARD

#if CURRENT_PRODUCT_VERSION >= PRODUCT_VERSION_STANDARD
    // 标准版及以上的功能
    void advanced_feature(void) {
        // 高级功能实现
    }
#endif

#if CURRENT_PRODUCT_VERSION >= PRODUCT_VERSION_PRO
    // 专业版专属功能
    void pro_feature(void) {
        // 专业功能实现
    }
#endif
```

### 3. 硬件抽象层（HAL）实现
```c
// 硬件抽象层示例
#if defined(HW_V1)
    #define UART_TX_PIN    GPIOA, GPIO_PIN_9
    #define UART_RX_PIN    GPIOA, GPIO_PIN_10
#elif defined(HW_V2)
    #define UART_TX_PIN    GPIOB, GPIO_PIN_6
    #define UART_RX_PIN    GPIOB, GPIO_PIN_7
#endif

// 统一的接口，底层实现根据硬件版本不同
void uart_init(void) {
    gpio_init(UART_TX_PIN, GPIO_MODE_AF_PP);
    gpio_init(UART_RX_PIN, GPIO_MODE_IN_PU);
    // 其他初始化代码
}
```

## 编译时效果
使用条件编译的代码在编译时：
1. 预处理器会根据条件评估结果
2. 包含符合条件的代码块
3. 排除不符合条件的代码块（这些代码不会被编译，也不会出现在最终的可执行文件中）

## 最佳实践
1. **定义清晰的宏名称**：使用有意义的宏名，避免魔法数字
2. **集中管理配置**：将条件编译的配置宏集中放在配置文件中
3. **添加注释**：为条件编译块添加说明，说明适用的条件和原因
4. **避免过度使用**：不要滥用条件编译，这会增加代码复杂度和维护难度
5. **测试所有配置**：确保测试各种条件组合下的代码正确性

## 总结
在嵌入式系统开发中，`#if`、`#else`、`#endif` 等预处理器指令是：

- **代码适配的关键工具**：实现不同平台、不同硬件版本的代码兼容
- **资源优化的重要手段**：根据需求包含或排除功能模块，优化固件大小
- **灵活配置的实现方式**：支持功能开关、调试级别等灵活配置
- **维护多版本产品的有效方法**：使用同一套代码库维护多个产品版本

这些指令使得嵌入式软件具有更强的可移植性、可维护性和灵活性，是嵌入式开发中不可或缺的工具。