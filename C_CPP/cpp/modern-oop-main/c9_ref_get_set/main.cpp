#include <iostream>
#include "cat.h"
using namespace std;

int main(int argc, char *argv[])
{
    /**
     * @note 可变对象
     * 调用 name 方法是非 const 重载的 name 方法
     */
    Cat mut_cat("cat2", 4);
    mut_cat.name() = "mimi"; // 调用 name() 方法返回的是 m_name 的引用，所以可以直接赋值
    mut_cat.age() += 1; // age 同理
    mut_cat.print_object();

    /**
     * @note 不可变对象
     * 调用 name 方法是 const 重载的 name 方法
     */
    const Cat cat("cat1", 2);
    cout << cat.name() << endl;
    // cat.name() = "mimi"; // 不能修改
    cat.print_object();
    return 0;
}