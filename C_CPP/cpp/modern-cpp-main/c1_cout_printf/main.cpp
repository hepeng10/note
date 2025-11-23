/**
# 两种打印方式
* cout
    * 来自 `#include <iostream>`
    * 还有 cin, endl, cerr, clog 等
    * cout 实际上是调用了成员运算符函数 operator<<
    * endl是一个操纵符，并不只是执行了换行的操作，还对输出的缓冲区进行刷新
* printf
    * 继承自C语言
 */
#include <iostream>
#include <string>
using namespace std;

/**
 * @note C++中输入输出流cin cout和C语言的printf
 * @param argc 命令行参数的数量
 * @param argv 命令行参数字符串列表
 * @return int
 * `./main.exe 3 4 5` 这样使用时传参，argc 和 argv 才会有值
 */
int main(int argc, char *argv[])
{
    // cout 输出到控制台，cin 接收控制台输入
    string num1, num2;
    cout << "Enter number 1 : ";
    cin >> num1;
    cout << "Enter number 2 : ";
    cin >> num2;
    // stoi 将字符串转换为整数，无法转换时会抛出异常
    int number1 = stoi(num1);
    int number2 = stoi(num2);

    cout << number1 << " + " << number2 << " = " << number1 + number2 << endl;

    // printf，和C语言的printf一样
    printf("%d + %d = %d\n", number1, number2, number1 + number2);

    // argc 参数的数量 argv为命令行参数字符串列表
    if (argc != 1)
    {
        cout << "You input " << argc << " arguments" << endl;
        // 打印字符串时使用 size_t，避免 int 长度不够
        for (size_t i = 0; i < argc; i++)
        {
            cout << "arg: " << i << " : " << argv[i] << endl;
        }
    }

    cout << "yz" << endl;
}