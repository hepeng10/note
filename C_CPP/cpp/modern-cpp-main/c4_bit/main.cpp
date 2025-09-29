#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    int a{5};
    int b{3};

    // and
    // 不能直接在cout中使用位运算符，因为操作符优先级问题会导致错误
    // cout << "a & b = " << a & b << endl;
    cout << "a & b = " << (a & b) << endl; // 通过括号改变优先级就行了
    int aAndB{a & b}; // 将 a & b 的结果赋值给 aAndB 再使用
    cout << "a & b = " << aAndB << endl;
    // or
    int aOrB{a | b};
    cout << "a | b = " << aOrB << endl;
    // xor
    int aXorB{a ^ b};
    cout << "a ^ b = " << aXorB << endl;
    // ~
    int x1{0};
    cout << (~x1) << endl;
    int x2{1};
    cout << (~x2) << endl;

    // 位移：左移1位相当于乘以2，右移1位相当于除以2
    int left = {a << b}; // 乘以8
    cout << "left " << left << endl;

    int right = {a >> b}; // 除以8。但是5是101，右移3位结果为0
    cout << "right " << right << endl;
    cout << "----- yz ------" << endl;
}