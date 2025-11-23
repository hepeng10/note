# lambda 的使用
C++中的lambda表达式是一个非常重要且强大的特性，它允许我们内联定义匿名函数对象。我将从基础到高级详细解释lambda表达式。

## 1. 基本语法结构

lambda表达式的基本语法如下：

```cpp
[capture] (parameters) -> return_type { body }
```

各个部分的含义：
- **`[capture]`**: 捕获列表，定义lambda可以访问的外部变量
- **`(parameters)`**: 参数列表，与普通函数参数类似
- **`-> return_type`**: 可选的返回类型声明
- **`{ body }`**: lambda函数体

## 2. 最简单的lambda示例

```cpp
// 最简单的lambda：无参数，无返回值
auto hello = []() { 
    std::cout << "Hello, Lambda!" << std::endl; 
};
hello();  // 输出: Hello, Lambda!

// 更简洁的写法（当无参数时，可以省略括号）
auto simple = [] { 
    std::cout << "Simple lambda" << std::endl; 
};
```

## 3. 捕获列表详解

捕获列表是lambda最独特的特性，它决定了lambda如何访问外部变量。

### 3.1 值捕获 `[=]`
```cpp
int x = 10, y = 20;

// 值捕获：创建外部变量的副本
auto lambda1 = [x, y]() {
    std::cout << "x = " << x << ", y = " << y << std::endl;
    // x++;  // 错误：值捕获的变量默认是const的
};

x = 100;  // 修改外部x
lambda1();  // 输出: x = 10, y = 20（使用的是捕获时的值）
```

### 3.2 引用捕获 `[&]`
```cpp
int x = 10, y = 20;

// 引用捕获：使用外部变量的引用
auto lambda2 = [&x, &y]() {
    std::cout << "x = " << x << ", y = " << y << std::endl;
    x++;  // 可以修改，因为是通过引用捕获
};

x = 100;
lambda2();  // 输出: x = 100, y = 20
std::cout << "x after lambda: " << x << std::endl;  // 输出: 101
```

### 3.3 混合捕获
```cpp
int a = 1, b = 2, c = 3, d = 4;

// a值捕获，b引用捕获，c和d不能访问
auto lambda3 = [a, &b]() {
    std::cout << a << ", " << b << std::endl;
    // std::cout << c;  // 错误：c未捕获
};

// 隐式捕获：让编译器自动推断
auto lambda4 = [=]() { /* 所有变量值捕获 */ };
auto lambda5 = [&]() { /* 所有变量引用捕获 */ };
auto lambda6 = [=, &b]() { /* 除了b是引用捕获，其他都是值捕获 */ };
auto lambda7 = [&, a]() { /* 除了a是值捕获，其他都是引用捕获 */ };
```

### 3.4 初始化捕获（C++14）
```cpp
// C++14: 在捕获时初始化变量
int x = 10;
auto lambda8 = [y = x + 5]() {  // y是lambda的成员变量，初始化为x+5
    return y;
};

// 移动语义的初始化捕获
std::unique_ptr<int> ptr = std::make_unique<int>(42);
auto lambda9 = [p = std::move(ptr)]() {  // 移动捕获
    return *p;
};
```

## 4. mutable关键字

默认情况下，值捕获的变量在lambda内是const的，使用`mutable`可以修改它们：

```cpp
int counter = 0;

// 使用mutable允许修改值捕获的变量
auto lambda = [counter]() mutable {
    counter++;
    std::cout << "Counter inside: " << counter << std::endl;
};

lambda();  // 输出: Counter inside: 1
lambda();  // 输出: Counter inside: 2
std::cout << "Counter outside: " << counter << std::endl;  // 输出: 0（外部不变）
```

## 5. 参数列表和返回类型

### 5.1 带参数的lambda
```cpp
// 带参数的lambda
auto add = [](int a, int b) {
    return a + b;
};
std::cout << add(5, 3) << std::endl;  // 输出: 8

// 泛型lambda（C++14）
auto generic_add = [](auto a, auto b) {
    return a + b;
};
std::cout << generic_add(5, 3.5) << std::endl;  // 输出: 8.5
```

### 5.2 返回类型推导和显式声明
```cpp
// 返回类型自动推导
auto square = [](int x) { return x * x; };  // 返回int

// 显式声明返回类型
auto safe_divide = [](int a, int b) -> double {
    if (b == 0) return 0.0;
    return static_cast<double>(a) / b;
};
```

## 6. Lambda的实际应用场景

### 6.1 STL算法中的使用
```cpp
#include <vector>
#include <algorithm>
#include <iostream>

std::vector<int> numbers = {1, 5, 3, 8, 2, 7};

// 使用lambda进行排序
std::sort(numbers.begin(), numbers.end(), [](int a, int b) {
    return a > b;  // 降序排序
});

// 使用lambda进行条件查找
auto it = std::find_if(numbers.begin(), numbers.end(), [](int n) {
    return n % 2 == 0;  // 查找第一个偶数
});

// 使用lambda进行转换
std::vector<int> squares;
std::transform(numbers.begin(), numbers.end(), std::back_inserter(squares),
               [](int n) { return n * n; });
```

### 6.2 回调函数
```cpp
#include <functional>
#include <iostream>

class Button {
public:
    void setOnClick(std::function<void()> callback) {
        onClick = callback;
    }
    
    void click() {
        if (onClick) onClick();
    }
    
private:
    std::function<void()> onClick;
};

int main() {
    Button btn;
    int clickCount = 0;
    
    // 使用lambda作为回调，捕获外部变量
    btn.setOnClick([&clickCount]() {
        clickCount++;
        std::cout << "Button clicked! Count: " << clickCount << std::endl;
    });
    
    btn.click();  // 输出: Button clicked! Count: 1
    btn.click();  // 输出: Button clicked! Count: 2
}
```

### 6.3 异步编程
```cpp
#include <future>
#include <iostream>

auto future_result = std::async(std::launch::async, []() {
    // 在后台线程中执行的计算
    std::this_thread::sleep_for(std::chrono::seconds(1));
    return 42;
});

// 主线程可以继续做其他工作
std::cout << "Waiting for result..." << std::endl;
int result = future_result.get();
std::cout << "Result: " << result << std::endl;
```

## 7. Lambda的实现原理

实际上，lambda表达式会被编译器转换成一个匿名类的对象：

```cpp
// 这个lambda：
auto lambda = [x](int y) { return x + y; };

// 大致相当于这个类：
class __anonymous_lambda_class {
private:
    int x;  // 捕获的变量
    
public:
    __anonymous_lambda_class(int captured_x) : x(captured_x) {}
    
    int operator()(int y) const {
        return x + y;
    }
};
```

## 8. C++14/17/20的Lambda增强

### 8.1 C++14: 泛型lambda和初始化捕获
```cpp
// 泛型lambda
auto pair_adder = [](auto a, auto b) {
    return std::make_pair(a + b, a - b);
};

// 初始化捕获
auto factory = [data = std::vector<int>{1, 2, 3}]() {
    return data.size();
};
```

### 8.2 C++17: constexpr lambda
```cpp
// constexpr lambda（可以在编译期计算）
constexpr auto square = [](int n) constexpr { return n * n; };
static_assert(square(5) == 25);  // 编译期断言
```

### 8.3 C++20: 模板lambda和更多特性
```cpp
// 模板lambda（C++20）
auto generic = []<typename T>(T a, T b) {
    return a + b;
};

// 允许在lambda中使用默认构造和赋值
auto lambda = [](auto&&... args) {
    return std::vector{std::forward<decltype(args)>(args)...};
};
```

## 9. 最佳实践和建议

### 9.1 捕获列表的最佳实践
```cpp
// 好：明确列出需要捕获的变量
auto good_lambda = [x, &y]() { /* ... */ };

// 避免：隐式捕获所有变量（可能意外捕获不需要的变量）
auto bad_lambda = [&]() { /* ... */ };  // 可能意外修改外部变量

// 使用初始化捕获避免悬空引用
std::unique_ptr<Data> data = get_data();
auto safe_lambda = [data = std::move(data)]() { /* 安全使用data */ };
```

### 9.2 性能考虑
```cpp
// 对于小lambda，直接内联使用（避免std::function的开销）
std::sort(vec.begin(), vec.end(), [](auto a, auto b) { return a < b; });

// 对于需要存储的lambda，考虑使用auto或具体的函数指针类型
auto stored_lambda = [](int x) { return x * x; };

// 避免在性能关键代码中捕获大对象（可能涉及拷贝开销）
```

## 10. 完整示例：Lambda的综合应用

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // 1. 过滤：只保留偶数
    numbers.erase(std::remove_if(numbers.begin(), numbers.end(),
                                [](int n) { return n % 2 != 0; }),
                 numbers.end());
    
    // 2. 转换：每个元素平方
    std::transform(numbers.begin(), numbers.end(), numbers.begin(),
                  [](int n) { return n * n; });
    
    // 3. 排序：降序排列
    std::sort(numbers.begin(), numbers.end(),
             [](int a, int b) { return a > b; });
    
    // 4. 累加：带初始值的累加
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0,
                             [](int acc, int n) { return acc + n; });
    
    // 5. 输出结果
    std::cout << "Processed numbers: ";
    std::for_each(numbers.begin(), numbers.end(),
                 [](int n) { std::cout << n << " "; });
    std::cout << "\nSum: " << sum << std::endl;
    
    return 0;
}
```

Lambda表达式是现代C++编程中不可或缺的工具，它使代码更简洁、更表达力强，并且与STL算法完美结合。掌握lambda的使用可以显著提高你的C++编程水平。

# lambda和函数的区别
**Lambda表达式不是传统意义上的函数，而是一个可以生成函数对象的语法糖**。让我详细解释这个重要的区别：

## 1. Lambda的本质：函数对象（Functor）

Lambda表达式在编译时会被转换成一个**匿名类的实例**，这个类重载了`operator()`，因此可以像函数一样被调用。

```cpp
// 这个lambda：
auto lambda = [x](int y) { return x + y; };

// 会被编译器转换成类似这样的类：
class __anonymous_lambda_class {
private:
    int x;  // 捕获的变量成为成员变量
    
public:
    __anonymous_lambda_class(int captured_x) : x(captured_x) {}
    
    // 重载函数调用运算符
    auto operator()(int y) const -> int {
        return x + y;
    }
};

// 然后实例化：
auto lambda = __anonymous_lambda_class(x);
```

## 2. Lambda vs 普通函数的关键区别

### 2.1 状态保持能力
```cpp
// 普通函数：无状态，相同输入总是得到相同输出
int add(int a, int b) { return a + b; }

// Lambda：可以保持状态（通过捕获列表）
int counter = 0;
auto counter_lambda = [&counter](int x) {
    counter++;
    return x + counter;
};

std::cout << counter_lambda(5) << std::endl;  // 输出: 6 (5 + 1)
std::cout << counter_lambda(5) << std::endl;  // 输出: 7 (5 + 2) - 状态改变了！
```

### 2.2 类型系统差异
```cpp
// 普通函数：有明确的函数指针类型
int (*func_ptr)(int, int) = add;

// Lambda：每个lambda都有唯一的匿名类型
auto lambda1 = [](int x) { return x * 2; };
auto lambda2 = [](int x) { return x * 2; };

// lambda1和lambda2的类型不同，即使代码完全相同！
static_assert(!std::is_same_v<decltype(lambda1), decltype(lambda2)>);

// 但都可以转换为std::function
std::function<int(int)> f1 = lambda1;
std::function<int(int)> f2 = lambda2;
```

### 2.3 捕获能力（最重要的区别）
```cpp
int external_var = 10;

// 普通函数：只能通过参数传递数据
int normal_function(int x) {
    // 无法直接访问external_var
    return x + external_var;  // 可以访问，但这是全局变量，不是"捕获"
}

// Lambda：可以捕获上下文变量
auto capturing_lambda = [external_var](int x) {  // 捕获external_var
    return x + external_var;  // 使用捕获的副本
};
```

## 3. Lambda的"函数-like"特性

尽管lambda不是传统函数，但它们确实表现出很多函数特性：

### 3.1 可调用性
```cpp
// 都可以像函数一样调用
int result1 = add(3, 4);           // 普通函数调用
int result2 = lambda1(5);          // Lambda调用

// 都可以作为回调传递
void process(int (*func)(int)) {
    func(10);
}

process([](int x) { return x * 2; });  // 传递lambda
```

### 3.2 参数传递和返回
```cpp
// Lambda支持完整的函数特性
auto complex_lambda = [](const std::string& s, int n) -> std::string {
    std::string result;
    for (int i = 0; i < n; ++i) {
        result += s;
    }
    return result;
};

std::cout << complex_lambda("Hi", 3);  // 输出: HiHiHi
```

## 4. Lambda的特殊类别

### 4.1 无捕获Lambda：最接近普通函数
```cpp
// 无捕获lambda可以隐式转换为函数指针
auto stateless = [](int x) { return x * x; };
int (*func_ptr)(int) = stateless;  // ✅ 可以转换

// 有捕获lambda不能转换为函数指针
int y = 5;
auto stateful = [y](int x) { return x + y; };
// int (*func_ptr2)(int) = stateful;  // ❌ 错误
```

### 4.2 泛型Lambda（C++14）：类似函数模板
```cpp
// 泛型lambda：可以接受不同类型的参数
auto generic = [](auto x, auto y) {
    return x + y;
};

std::cout << generic(5, 3) << std::endl;      // int: 8
std::cout << generic(2.5, 3.7) << std::endl;  // double: 6.2
std::cout << generic(std::string("a"), "b") << std::endl;  // string: ab
```

## 5. 实际应用中的区别

### 5.1 性能考虑
```cpp
#include <chrono>

// 普通函数调用：通常有较好的优化
int square(int x) { return x * x; }

// Lambda调用：编译器可以更好内联优化
auto lambda_square = [](int x) { return x * x; };

// 测试性能（通常lambda有轻微优势，因为编译器有更多优化信息）
void benchmark() {
    auto start1 = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < 1000000; ++i) {
        square(i);
    }
    auto end1 = std::chrono::high_resolution_clock::now();
    
    auto start2 = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < 1000000; ++i) {
        lambda_square(i);
    }
    auto end2 = std::chrono::high_resolution_clock::now();
    
    // 通常lambda版本稍快或相同
}
```

### 5.2 模板编程中的差异
```cpp
// 普通函数模板
template<typename T>
T template_func(T x) { return x * 2; }

// Lambda在模板中的使用
template<typename Callable>
void process_data(Callable func) {
    // func可以是函数指针、函数对象或lambda
    auto result = func(42);
}

// 使用lambda作为模板参数
process_data([](int x) { return x + 1; });  // 传递lambda
```

## 6. 总结：Lambda到底是什么？

| 特性 | 普通函数 | Lambda表达式 |
|------|----------|-------------|
| **本质** | 独立的代码单元 | 函数对象的语法糖 |
| **类型** | 函数指针类型 | 唯一的匿名类型 |
| **状态** | 无状态 | 可以通过捕获保持状态 |
| **定义位置** | 命名空间/类作用域 | 可以内联定义 |
| **转换** | 函数指针 | 无捕获lambda可转函数指针 |
| **优化** | 常规函数优化 | 更好的内联优化潜力 |

**准确的说法是：**

**Lambda表达式是一种生成匿名函数对象的便捷语法。它虽然不是传统意义上的函数，但创建的对象可以像函数一样被调用，因此常被称为"匿名函数"或"闭包"。**

### 更精确的类比：
- **普通函数** ≈ 数学中的纯函数（无副作用，无状态）
- **Lambda表达式** ≈ 带有环境的函数（可以捕获上下文，保持状态）

### 实际编程建议：
- 当需要**简单的、无状态的**操作时，两者都可以使用
- 当需要**捕获上下文变量**或**保持状态**时，必须使用lambda
- 当需要**内联定义、一次性使用**的回调时，lambda是更好的选择
- 当需要**接口兼容性**（函数指针）时，使用无捕获lambda或普通函数

理解lambda的本质是函数对象，而不仅仅是"匿名函数"，有助于更好地理解C++的语义和做出正确的设计决策。