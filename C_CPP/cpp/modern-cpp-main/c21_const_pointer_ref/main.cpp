/**
 * @note
 * 指针与 const：
 * 1. double const* p; 解引用值不可变
 * 2. const double* p; 等同于 double const* p 解引用值不可变
 *      如果指向常量，必须设定解引用不可变
 * 3. const double* const p; 即不可动，也不可变
 * ！！！即 const 在*前面，解引用的值不可变；在*后面，指针的指向不可变
 * 
 * 引用与 const：const 修饰引用只有一种方式
 * const double& r; 即不可动，也不可变
 * double const& r; 和上一句相等
 */
#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    // const 与指针
    double n{1.4};
    const double* p{&n}; // const 在最前面，修饰的是指针指向的值，即解引用的值
    double m{1.5};
    cout << "p address: " << p << endl;
    // *p = m; // 解引用的值不可变
    p = &m; // 指针的指向可以变

    // a 是 const 的，所以指针*左边必须有 const 修饰
    const double a{1.6};
    const double *pa = &a; // 指向常量，必须设定解引用不可变
    double const *pb = &a; // 和上一句相同
    // double* pa = &a; // 错误

    cout << "p address: " << p << endl;

    double n1{1.4};
    double* const p1{&n1}; // const 在指针变量名前面，修饰的是指针变量，即指针的指向不可变
    double m1{1.5};
    cout << "p1 address: " << p1 << endl;
    // p1 = &m1; // 指针的指向不可变
    *p1 = m1; // 解引用的值可以变
    cout << "p1 address: " << p1 << endl;
    cout << "p1 " << *p1 << endl;

    const double* const const_p{&n1}; // 两个都不可变
    // *const_p = m1;
    // const_p = &m1;

    double q{1.8};
    double &ref_n{n1};
    const double& const_ref_n{n1};
    ref_n = q; // 普通引用，可以修改
    // const_ref_n = q; // const 修饰的引用，不能修改
    cout << n1 << ":" << &n1 << ":" << ref_n << endl;

    cout << "----- yz ------" << endl;
    return 0;
}