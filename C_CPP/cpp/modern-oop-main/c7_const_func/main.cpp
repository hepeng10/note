#include <iostream>
#include "cat.h"
using namespace std;

/**
 * @note 参数未加 const，可以调用 cat 的方法修改 cat 的属性
 */
void function_take_cat(Cat cat)
{
    cat.set_name("good cat");
    cat.print_object();
}

/**
 * @note 参数加 const，不能调用非 const 成员方法
 */
void function_take_cat_const(const Cat cat)
{
    /**
     * @note set_name 是非 const 成员方法
     */
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
    // cat->set_name(""); // 报错
    cat->print_object();
}

void function_take_cat_ref(Cat cat)
{
    cat.set_name("good cat");
    cat.print_object();
}

void function_take_cat_ref_const(const Cat cat)
{
    // cat.set_name(""); // 报错
    cat.print_object();
}

int main(int argc, char *argv[])
{
    Cat cat1("oo", 3);
    function_take_cat(cat1);
    function_take_cat_const(cat1);
    Cat *cat_point{&cat1};
    function_take_cat_point(cat_point);
    function_take_cat_point_const(cat_point);
    Cat &cat_ref{cat1};
    function_take_cat_ref(cat_ref);
    function_take_cat_ref_const(cat_ref);

    return 0;
}