#include <iostream>
#include "cat.h"
using namespace std;

int main(int argc, char *argv[])
{
    /**
     * @note const 对象只能调用 const 方法
     */
    // 值类型
    const Cat cat1("moon", 3);
    cout << cat1.get_name() << endl;
    cout << cat1.get_age() << endl;
    // cat1.set_name("dd"); // 无法调用非 const 方法 set_name
    cat1.print_object();

    /**
     * @note 通过值cat1的地址创建
     */
    // 指针
    const Cat *cat_point{&cat1};
    // Cat *cat_point{&cat1}; // 指针必须使用 const
    cout << cat_point->get_name() << endl;
    cout << cat_point->get_age() << endl;
    // cat1.set_name("dd"); // 无法调用非 const 方法 set_name
    cat_point->print_object();

    /**
     * @note 通过值cat1创建
     */
    // 引用
    const Cat &cat_ref{cat1};
    // Cat &cat_ref{cat1}; // 引用也必须使用 const
    cout << cat_ref.get_name() << endl;
    cout << cat_ref.get_age() << endl;
    // cat1.set_name("dd"); // 无法调用非 const 方法 set_name
    cat_ref.print_object();

    /**
     * @note 非 const 对象可以调用 const 方法
     */
    Cat cat2("dd", 4);
    cat2.get_name();

    cout << "----- yz ------" << endl;
    return 0;
}