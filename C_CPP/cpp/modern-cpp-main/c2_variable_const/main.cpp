/**
=，() 和 {} 三种初始化方式
C++11 新增 {} 初始化方式，推荐使用此方式，可防止窄化转换（比如double赋值给int会报错）
如果需要使用窄化转换，可以使用 ()，但要加上注释说明
 */

#include <iostream>
#include <string>
using namespace std;

// #define 宏定义，和 C 语言一样，所以最好加上括号
#define DPI 44

// 全局 一般不要用
int a = 1; // 使用 = 初始化
int b(2);  // 使用 () 初始化
int c{3};  // 使用 {} 初始化，C++11 新增，推荐
int RandNum{0};
const double PI{3.1415926};

int main(int argc, char *argv[])
{
    cout << "Random Num : " << RandNum << endl;
    RandNum = 3;
    cout << "Random Num : " << RandNum << endl;
    // PI = 4.15; // 常量不能进行修改
    const int age = 45;
    const float oldWeight{88};

    float nowWeight{oldWeight + 30};
    cout << "age : " << age << endl;
    cout << "Weight : " << nowWeight << endl;

    int dpi_int{DPI};       // 宏定义的值44，会自动转换为int
    // 宏定义的值44，会自动转换为string
    // 但是是ascii码44对应的字符串，所以打印出来是','
    string dpi_string{DPI};

    cout << "dpi int " << dpi_int + 2 << endl;
    cout << "dpi string " << dpi_string << endl; // 打印出来是','

    cout << "----- yz ------" << endl;
}