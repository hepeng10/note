#include <iostream>
#include "cat.h"
using namespace std;

/**
 * @note 可变参数
 * 不可变的 const 值类型也可以传入，
 * 但是不可变的指针和引用类型不能传入
 * 
 * ！！！因为值传递是拷贝，函数内对参数的修改不会影响到外部的对象，
 * 所以不可变的 const 值类型可以传入，
 * 但是 const 的指针和引用类型是地址，传到非 const 类型的参数中，
 * 函数内对参数的修改会影响到外部的对象，这背离了 const 的初衷，
 * 所以 const 的指针和引用类型不能传入可变参数函数
 */
void function_take_cat(Cat cat)
{
    cat.set_name("good cat");
    cat.print_object();
}

void function_take_cat_const(const Cat cat)
{
    // cat.set_name(""); // 报错
    cat.print_object();
}

void function_take_cat_point(Cat *cat)
{
    cat->set_name("good cat");
    cat->print_object();
}

void function_take_cat_point_const(const Cat *cat)
{
    cat->print_object();
}

void function_take_cat_ref(Cat &cat)
{
    cat.set_name("good cat");
    cat.print_object();
}

void function_take_cat_ref_const(const Cat &cat)
{
    cat.print_object();
}

int main(int argc, char *argv[])
{
    // 值类型
    const Cat cat("cat1", 2);
    // 值不可变可以传入可变参数函数
    function_take_cat(cat);
    function_take_cat_const(cat);

    // 指针类型
    const Cat *cat_point{&cat};
    // 指针类型不可以传入可变参数函数
    // function_take_cat_point(cat_point);
    function_take_cat_point_const(cat_point);

    // 引用类型
    const Cat &cat_ref{cat};
    // function_take_cat_ref(cat_ref);
    function_take_cat_ref_const(cat_ref);

    return 0;
}