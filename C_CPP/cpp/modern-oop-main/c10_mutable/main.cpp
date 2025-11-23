#include <iostream>
#include "cat.h"
using namespace std;

int main(int argc, char *argv[])
{
    Cat mut_cat("cat2", 4);
    mut_cat.name() = "mimi";
    mut_cat.age() += 1;
    /**
     * @note 调用 const 修饰的 print_object 方法，
     * 修改 mutable 修饰的成员属性 print_cout
     */
    mut_cat.print_object();
    mut_cat.print_object();
    mut_cat.print_object();

    const Cat cat("cat1", 2);
    cout << cat.name() << endl;
    // cat.name() = "mimi";
    cat.print_object();
    cat.print_object();
    return 0;
}