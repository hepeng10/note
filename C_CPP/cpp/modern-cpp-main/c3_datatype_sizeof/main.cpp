/**
sizeof(对象/类型)，返回对象或类型的字节大小。
所有指针类型的大小都是相同的，都是 sizeof(void *)，一般是 8 字节。
auto 关键字，编译器会根据初始化值的类型自动推导变量的类型。
 */

#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    int x{0}; // int类型不给初始值默认为0
    cout << sizeof(x) << endl; // 4
    cout << "Integer  " << sizeof(int) << endl; // 4
    cout << "Char " << sizeof(char) << endl; // 1
    cout << "Short  " << sizeof(short) << endl; // 2
    cout << "Bool  " << sizeof(bool) << endl; // 1
    cout << "Float  " << sizeof(float) << endl; // 4
    cout << "Double  " << sizeof(double) << endl; // 8
    cout << "Long  " << sizeof(long) << endl; // 4
    cout << "Long Long  " << sizeof(long long) << endl; // 8
    cout << "Long Double  " << sizeof(long double) << endl; // 16
    cout << "Unsigned long " << sizeof(unsigned long) << endl; // 4
    cout << "Size_t " << sizeof(size_t) << endl; // 8

    // 指针都是8字节，32位电脑是4字节
    cout << "----- Pointer -----" << endl;
    cout << "Bool*  " << sizeof(bool *) << endl;
    cout << "Float*  " << sizeof(float *) << endl;
    cout << "Double*  " << sizeof(double *) << endl;
    cout << "Long*  " << sizeof(long *) << endl;

    // auto 自动推断类型
    cout << "----- auto -----" << endl;
    auto value1{12};  // int
    auto value2{2.4}; // double，不是float

    cout << "Int " << sizeof(value1) << endl;
    cout << "Double " << sizeof(value2) << endl;

    auto value3{123ll}; // long long
    long long value3{123}; // 也是 long long。但是使用 auto 加类型后缀可以更简洁
    auto value4{1.2f}; // float
    auto value5{123ul}; // unsigned long
    auto value6{1.3l}; // long double，不是 long

    cout << "Long Long " << sizeof(value3) << endl;
    cout << "Float " << sizeof(value4) << endl;
    cout << "Unsigned Long " << sizeof(value5) << endl;
    cout << "Long Double " << sizeof(value6) << endl;

    cout << "----- yz ------" << endl;
}