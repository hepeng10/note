/**
 * @note lambda表达式
 * lambda 表达式是在声明的时候就会对外部变量进行捕获，
 * 捕获的方式有值捕获和引用捕获。
 * [=] 表示lambda表达式内部使用的所有外部变量都被值捕获。
 * [&] 表示lambda表达式内部使用的所有外部变量都被引用捕获。
 */
#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    // 最基本的lambda表达式，没有值捕获什么的
    auto func = []()
    {
        cout << "yz" << endl;
    };

    int a{10};

    // 捕获外部变量a，值捕获
    auto func0 = [a]()
    {
        // a 的值就是此lambda定义时的值，不会变化
        cout << "func0 a : " << a << endl;
        // a++; // error，值捕获的变量不能修改
    };

    int b{20};

    // 引用捕获b，值捕获a
    auto func1 = [&b, a]()
    {
        cout << "func1 a :" << a << endl;
        cout << "func1 b :" << b << endl;
        // b 的值可以修改，外面的b也会改变
        b++;
    };

    // [=] 表示lambda表达式内部使用的所有外部变量都被值捕获。
    auto func2 = [=]()
    {
        cout << "func2 a :" << a << endl;
        cout << "func2 b :" << b << endl;
    };

    // [&] 表示lambda表达式内部使用的所有外部变量都被引用捕获。
    auto func3 = [&]()
    {
        cout << "func3 a :" << a << endl;
        cout << "func3 b :" << b << endl;
        a++;
        b++;
    };
    func();
    func0();
    func1();
    func2();
    func3();
    cout << a << endl;
    cout << b << endl;
    cout << "----- yz ------" << endl;
    return 0;
}