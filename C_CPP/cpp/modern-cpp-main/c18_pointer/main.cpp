#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    // 指针类型要匹配
    // int intValue{13};
    // double *pDouble{&intValue}; // int类型的地址不能赋值给double类型的指针

    // 指针的初始化
    // 指向栈
    int n{12};
    int *pNumber{&n};
    // int *pNumber = &n; // 使用 = 赋值是一样的
    cout << *pNumber << endl;

    // 指向堆
    int *pNumber{new int{13}}; // 使用 new 分配堆内存
    delete pNumber;    // 只是放弃控制，pNumber 指向的内存泄漏
    pNumber = nullptr; // 清空

    // pNumber = new int{19}; // 指针依然能继续使用

    // 可以通过与 nullptr 进行比较判断指针是否为空。指向堆的指针使用时都建议加上
    if (pNumber != nullptr)
    {
        cout << *pNumber << endl;
    }

    // 内存泄漏演示
    // int *pNumber2{new int{14}}; // 14泄漏
    // pNumber2 = new int{32};
    {
        int *pNumber3{new int{45}}; // 没有delete，会泄漏
    } // 在scope后 泄漏45

    // 这样就不泄漏了
    int *pNumber2{new int{14}}; // 14泄漏
    delete pNumber2;
    pNumber2 = nullptr;
    pNumber2 = new int{32};
    delete pNumber2;
    pNumber2 = nullptr;

    cout << "----- yz ------" << endl;
    return 0;
}