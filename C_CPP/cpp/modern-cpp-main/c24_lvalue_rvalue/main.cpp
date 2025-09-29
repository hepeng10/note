/**
 * 左值：左边的值，左值是可以获取地址并在以后使用的东西
 * 右值：右边的值，右值本质上是暂时的或临时的值，无法获取地址
 * 左值可以获取地址所以不需要copy
 */
#include <iostream>
using namespace std;

// 右值
int add(int a, int b)
{
    return a + b;
}

int main(int argc, char *argv[])
{
    int a0{1};
    int a1{2};
    int a2{3};
    // 都是左值，都能获取到地址
    cout << &a0 << endl;
    cout << &a1 << endl;
    cout << &a2 << endl;

    // 左值的地址可以 copy 给另一个变量
    int *p{&a0};
    cout << *p << endl;

    int x{0};
    x = (a1 + a2); // (a1+a2) 是右值，地址不能获取 copy
    // int *p = &(a1 + a2); // 不能这样写，右值不能获取地址
    /**
     * @note &&result1 里的 && 叫右值引用，它只能绑定到右值（临时对象、将要销毁的对象）
     */
    int &&result1 = a0 + a1; // 不是值copy，这样写性能更高
    // int result1 = a0 + a1; // 是值copy
    // int &&res = x; // 不能这样写，左值不能绑定到右值引用
    cout << "a0 + a1 = " << result1 << endl;

    x = add(a1, a2); // copy
    int &&result2 = add(a1, a2); // 不是值copy
    cout << result2 << endl;

    cout << "----- yz ------" << endl;
    return 0;
}