# 编译器
c 的编译器包括 GCC、Clang 等，编译 c 文件使用 cc （compile c）命令进行编译。安装了 GCC 和 Clang 的系统中，也可以使用 gcc 或 clang 命令进行编译。通常系统中带有 GCC 或 Clang 编译器，cc 命令是作为他们之一的别名使用。  
可以使用 `cc -v`, `gcc -v`, `clang -v` 来查看它们的版本。  
在 Windows 中需要安装 Cygwin 或 MinGW 来编译 c 代码，编译中生成的中间文件代码为 .obj，并且通常编译完成后不会删除。

# main 函数
main 函数是 c 程序的入口，标准写法为：
```c
int main(void) {
    return 0;
}
```
这里要注意几点：
1. main 函数返回值为 int.
2. main 函数没有参数，所以参数为 void.
3. 由于返回值为 int 所以 return 0.
4. 但是编译器会自动给 main 函数加 return 0，所以可以省略写 return 0。注意只有 main 函数会这样，其它函数会 return void.

在某些教程中使用 void main 其实是不标准的，虽然大多数情况它能正常运行。

# 字面量后缀
在数字的后面可以添加字面量后缀来表示此数字的类型，如：100L、123U、12.3F 等。
```c
#include <stdio.h>
int main(void) {
    long n1 = 100L;
    unsigned n2 = 123U;
    float n3 = 12.3F;

    // 4294967295 是 unsigned int 的最大值
    int n3 = 4294967295; // 编译器会报错，值超过了 int 的最大值
    int n4 = 4294967295U; // 编译器通过，并且 n4 实际上是 unsigned int 类型，存储下了这个值
    int n5 = 1.2F; // 将一个指定为 float 的类型的数赋值给 int 类型，编译器会报错，并不会改变 n5 的类型为 float

    printf("%zd\n", sizeof(1.2)); // 输出8，浮点数默认为 double 类型
    printf("%zd\n", sizeof(1.2F)); // 输出4，指定了使用 float 类型来存储

    // 这里就比较特别了。
    // 由于使用了无符号整数 1U，此处会变成 有符号数 和 无符号数 的二元运算，导致的结果就是条件为正，但是实际上 -2 + 1U 的值是 -1
    // 所以要注意不要将无符号数和有符号数进行运算
    if (-2 + 1U > 0)
    {
        long a = 100L - 1;
        printf("%ld\n", a);
        printf("%d\n", -2 + 1U); // 输出-1
        printf("%d\n", -2 + 1U > 0); // 输出1
    }
}
```

# 整数溢出
可以把整数看作是汽车的里程表。当达到它能表示的最大值时，会重新从起始点开始。无符号和有符号整数它们主要的区别是，在超过最大值时，unsigned int 类型的变量从0开始；而 int 类型的变量则从−2147483648开始（即 int 类型的最小值，根据类型不同也会有所不同）。

# 查看各种类型占用字节
以下是在 Mac 中的占用
```c
#include <stdio.h>

int main(void) {
    printf("%zd \n", sizeof(short)); // 2
    printf("%zd \n", sizeof(int));  // 4
    printf("%zd \n", sizeof(long)); // 8
    printf("%zd \n", sizeof(long long)); // 8
    printf("%zd \n", sizeof(float)); // 4
    printf("%zd \n", sizeof(double)); // 8
    printf("%zd \n", sizeof(char)); // 1
    printf("%zd \n", sizeof(_Bool)); // 1
    
    return 0;
}
```

# 转换说明
请求printf()函数打印数据的指令要与待打印数据的类型相匹配。例如，打印整数时 使用%d，打印字符时使用%c。这些符号被称为转换说明（conversion specification），它们指定了如何把数据转换成可显示的形式。  
**如果类型不匹配，那么输出的内容可能就会显得很莫名其妙。**  
具体的转换说明符参考：[转换说明表](https://www.cnblogs.com/ilegend/articles/2258701.html)

# 字符串
```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char c = 'A'; // 基本类型 char
    char s[40] = "这是个字符串"; // 派生类型 char 数组
    printf("%c\n", c); // 使用 %c 输出字符
    printf("%s\n", s); // 使用 %s 输出字符串
    printf("%d\n", c); // 会输出 A 对应的 ASCII 码
    printf("%d\n", s); // 会输出莫名的数值（所以类型必须要匹配）
    printf("%zd\n", strlen(s)); // 输出18
    return 0;
}
```
### 基本类型 char
基本类型 char 实际上是整数类型，存储的是一个字符的 ASCII 码，值用单引号，并且只能有一个在 ASCII 码中的字符。如中文不在 ASCII 码中，赋值给 char 会报错。

### 字符串 char 数组
当声明字符串时，应该使用 char 数组进行声明，并且使用双引号。由于字符串最后会有个 \0 结束符，所有实际上能存储的字符长度比声明时的长度少一位。**（但是我在 Mac 中测试，并未发现需要少输入一位，可能编译器不同？）**

### char 数组长度和中文
上面我们使用 `char s[40]` 定义了 s 的长度为40，由于1个 char 类型元素占用1字节，所以表示的是40字节。上面的内容为 `这是个字符串` 是6个中文字符，40个字节可以容纳6个中文字符，但是当我们改为 `char s[10]` 时，编译器就会发出警告，说我们的字符串太长了，是因为1个中文并不是只占用1个字节，中文不在 ASCII 编码中，属于 Unicode 编码，经测试1个中文字符占用的是3个字节，所以需要 `char s[18]` 才能正常编译。（上面 strlen(s) 输出18也能看出一个中文占用3个字节）
**Unicode 编码中的中文等字符存储在内存中也是二进制数字，一个汉字对应一个数值，3个字节足以表示各种语言的文字了。（计算机读取到 Unicode 编码内存位置时，应该会有某种机制告诉计算机这里存储的是 Unicode 编码，而不是普通的数字，读取后会使用 Unicode 编码进行解析成汉字输出。）**

# 常量
### 使用 #define 定义常量
\#define 又叫做宏，定义的常量又叫宏常量
```c
#include <stdio.h>
#define MAX 100 // 定义宏常量
#define ADD 1+2

int main(void) {
    int value1 = MAX * 2; // 使用宏常量
    int value2 = ADD * 3; // 替换后就会变成 1+2*3，结果不合预期
    return 0;
}
```
以上是使用 #define 定义了一个常量，在预处理时就会将使用的地方替换成定义的值，内存中并不会有一个叫 MAX 的常量。

### 使用 const 定义常量
const 定义的常量又叫不可变变量
```c
#include <stdio.h>

int main(void) {
    const int MAC = 100;
    const int ADD = 1 + 2;
    int value1 = MAC * 2;
    int value2 = ADD * 3; // 会是 3*3
    return 0;
}
```
具体区别可参考：[常量（const 和 #define 的区别）](https://blog.csdn.net/Mikchy/article/details/107072337)

# 运算
### 除法
c 语言中，整数除法返回的也是整数，这就导致整数相除产生的小数部分会被丢弃，所有在会使用到除法时，应该将变量定义为 float 或 double 等浮点数类型，而不应该定义为 int 这样的整数类型。
```c
#include <stdio.h>
int main(void)
{
    int a = 5;
    int b = 2;
    float c = 5;
    float d = 2;
    printf("%d\n", a / b); // 只会输出 2
    printf("%f\n", c / d); // 正常输出 2.500000
    printf("%f\n", a / d); // 正常输出 2.500000（整型与浮点型运算得到浮点型）
    printf("%d\n", a / d); // 这里用 %d 会导致编译器警告，并且输出的值错误
    return 0;
}
```
混合整数和浮点数计算的结果是浮点数。实际上，计算机不能真正用整数除以浮点数，编译器会把两个运算对象转换成相同的类型。本例中，在进行除法运算前，整数会被转换成浮点数。

# 运算符
除了常用的 + - * / % 之外，c 语言还提供了一些函数进行一些特定的运算操作。

### 求模运算
负数求模如何进行？如果第1个运算对象是负数，那么求模的结果为负数；如果第1个运算对象是正数，那么求模的结果也是正数：
11 / 5 得2，11 % 5 得1 
11 / -5 得-2，11 % -2 得1 
-11 / -5 得2，-11 % -5 得-1 
-11 / 5 得-2，-11 % 5 得-1

### sizeof 和 size_t
sizeof运算符以字节为单位返回运算对象的大小，运算对象可以是具体的数据对象（如，变量名）或类型。
**（在C中，1字节定义为char类型占用的空间大小。过去，1字节通常是8位，但是一些字符集可能使用更大的字节）。**
```c
#include <stdio.h>
int main(void)
{
    char str[10] = "你好";
    float f[10];
    printf("%zd\n", sizeof(str)); // 输出10
    printf("%zd\n", sizeof(char)); // 输出1
    printf("%zd\n", sizeof(int)); // 输出4
    printf("%zd\n", sizeof(f)); // 输出40，因为 float 占4个字节，10个 float 占40字节
    return 0;
}
```
C 语言规定，sizeof 返回 size_t 类型的值。而 size_t 并不是个新类型，而是某个标准类型的别名，使用 typedef 定义。C 头文件系统可以使用 typedef 把 size_t 作为 unsigned int 或unsigned long 的别名。这样，在使用 size_t 类型时，编译器会根据不同的系统替换标准类型。我们可以使用 %zd 转换说明来表示接受 size_t 类型。
（上面实例中如果使用 %d 接收 sizeof 返回值，编译器会提示应该使用 %lu 接收，即 unsigned long 类型，所以在 Mac 系统下 size_t 是 unsigned long 的别名。当然 Mac 中也可以使用 %lu 来接收 sizeof 返回值。）

# 类型转换
在使用不同类型进行运算时，C 语言会对类型进行转换后再运算，但是最好的做法是不要使用不同的类型进行运算。

### 类型转换规则
表达式中使用不同类型的转换规则：
1. 当类型转换出现在表达式时，无论是 unsigned 还是 signed 的 char 和 short 都会被 自动转换成 int，如有必要会被转换成 unsigned int。
2. 涉及两种类型的运算，两个值会被分别转换成两种类型的更高级别。
3. 类型的级别从高至低依次是 long double、double、float、unsigned long long、long long、unsigned long、long、unsigned int、int。例外的情况是，当 long 和 int 的大小相同时，unsigned int 比 long 的级别高。之所以 short 和 char 类型没有列出，是因为它们已经被升级到 int 或 unsigned int。
4. 在赋值表达式语句中，计算的最终结果会被转换成被赋值变量的类型。
5. 当作为函数参数传递时，char 和 short 被转换成 int，float 被转换成 double。

**类型降级**——不同类型赋值时，被赋值类型比赋值类型更低级的转换规则：
1. 目标类型是无符号整型，且待赋的值是整数时，额外的位将被忽略。例如，如果目标类型是8位 unsigned char，待赋的值是原始值求模256。（260赋值给 unsigned char 会输出4）
2. 如果目标类型是一个有符号整型，且待赋的值是整数，结果因实现而异。
3. 如果目标类型是一个整型，且待赋的值是浮点数，该行为是未定义的。（通常的实现是直接截断小数部分。）

### 强制类型转换运算符
使用 (type)value 可以将 value 强制转换为 type 类型。
```c
#include <stdio.h>
int main(void)
{
    int a = 1.6 + 1.7;
    int b = (int)1.6 + (int)1.7;
    printf("%d\n", a); // 输出3
    printf("%d\n", b); // 输出2
    return 0;
}
```
本质上，两种类型转换都好不到哪里去，要考虑程序的具体情况再做取舍。

# 关系运算符
c 语言的关系运算符包括 `>, <, >=, <=, ==, !=` 6种，注意没有 JS 中 `===, !==` 这样的关系运算符，强类型语言都没有。
关系运算符可以使用 char 类型和 int 类型进行比较，因为 char 类型实际上也是 int 类型，会转换成 ASCII 中的数值。**但是字符串类型不能使用关系运算符进行比较，有专门的函数用于比较字符串，如 strcmp 函数。**

### 浮点数比较
虽然关系运算符也可用来比较浮点数，但是要注意：比较浮点数时，尽量只使用 < 和 >。因为浮点数的舍入误差会导致在逻辑上应该相等的两数却不相等。例如，3乘以1/3的 积是1.0。如果用把1/3表示成小数点后面6位数字，乘积则是.999999，不等于1。使用 fabs() 函数（声明在math.h头文件中）可以方便地比较浮点数，该函数返回一个浮点值的绝对值（即，没有代数符号的值）。

### 什么是真
在 C 语言中，1表示真，0表示假。实际上非0的整数都是真，无论正负。而浮点数放到条件语句中编译器会给出警告，及时能作为真值继续运行。
```c
#include <stdio.h>
int main(void) {
    if (1) {} // 正常运行，为真
    if (0) {} // 正常运行，为假
    if (10) {} // 正常运行，为真
    if (-10) {} // 正常运行，为真
    if ('a') {} // 正常运行，为真
    if ('0') {} // 正常运行，为真
    if ('\0') {} // 正常运行，为假，char 类型的 \0 实际就是0
    if ("aaa") {} // 正常运行，为真
    if (1.2) {} // 编译器给出警告，为真
    // C 语言中没有 true 和 false
    if (true) {} // 编译器报错，中断运行
    if (false) {} // 编译器报错，中断运行
    int true = 1; // 我们甚至可以声明变量名为 true
}
```
**C 语言默认没有关键字 true 和 false，C99 提供了一个头文件 <stdbool.h> 定义了 bool 代表 _Bool，true 代表 1，false 代表 0。**
```c
#include <stdio.h>
#include <stdbool.h> // 布尔相关头文件
int main(void)
{
    bool a = true;
    if (a)
    {
        printf("%d\n", 'a' > 3);
    }
}
```

# 函数
C 语言中，函数通常使用先声明再定义的写法。
```c
#include <stdio.h>
// 函数声明（函数原型）：函数的返回类型，名称，参数个数及类型 
int getN(int n);

int main(void)
{
    // 函数调用
    int n = getN(10);
    printf("%d", n);
}

// 函数定义：对函数的实现
int getN(int n) {
    return n;
}
```
C 语言中，函数需要先声明再调用。
1. 上面代码中如果删除函数声明，但是保留函数定义，编译器会给出警告。编译器在运行到 getN(10) 时，此时发现并没有 getN 函数，会产生一个函数的隐式声明，也就是编译器会帮我们声明 getN 函数，由于我们后面实现了 getN，所以程序没有出错。但是隐式声明是有风险的，程序员应该避免这样的错误。
2. 如果将函数声明和函数定义都删除，则会直接报错。虽然编译器会帮我们生成隐式声明，但是函数没有实现，所以无法调用。
3. 将 getN 函数定义放在 main 函数之前，此时不写函数声明也没问题，但是这不符合规范，通常是将 main 函数放在最前面，函数定义可能放在 main 后面或其它文件中。

# 字符处理
### getchar 和 putchar
getchar 和 putchar 是 stdio.h 中定义的预处理宏，用于专门读取和打印字符，因为只针对字符，所以比通用的 scanf 和 printf 更高效。
```c
#include <stdio.h>

int main(void)
{
    char ch;
    ch = getchar(); // 读取一个字符
    
    while (ch != '\n') { // 当前读取的字符不是换行符则继续循环（控制台输入完字符后敲回车，实际上还会在末尾输入个 \n）
        if (ch == ' ') {
            putchar(ch); // 空格则正常打印
        } else {
            putchar(ch + 1); // 非空格+1后再打印，如字符 a 会+1后变成字符 b 打印（ASCII 码的下个字符）
        }

        ch = getchar(); // 读取下一个字符
    }

    putchar(ch); // 打印最后一个 \n
    printf("%c", ch);
}
```
以上代码运行后，我们在控制台输入一串字符后，字符会进入缓冲区，程序会从缓冲区一个一个的读取字符进行操作。
**注意：一个中文占用3个字符，如果我们只读取一个字符，存到 char 变量中，然后输出，则会是乱码。而如果使用循环不断读取并输出，则3个字符会作为一个中文输出。**
下面我们使用 scanf 和 printf 来验证：
```c
#include <stdio.h>
int main(void) {
    char c;
    int i = 0; // 循环计数器
    scanf("%c", &c); // 这里我们输入一个中文
    while (c != '\n') { // 循环读取控制台的输入
        i++;
        printf("%c", c); // 打印每次的输入
        scanf("%c", &c); // 读取下一个输入
    }
    printf("%d", i); // 输入一个中文，会输出3，说明一个中文循环了3次才完整输出
}
```

### ctype.h
ctype.h 包含一系列用于判断字符类别的函数。如： isalpha() 判断传入的字符是否是字母；ispunct() 判断是否是标点符号等。
具体查看：[ctype.h 标准库](https://www.runoob.com/cprogramming/c-standard-library-ctype-h.html)