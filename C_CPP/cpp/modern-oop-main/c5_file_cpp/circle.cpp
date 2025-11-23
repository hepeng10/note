/**
 * @note
 * Circle 类，文件名就为 circle.cpp，头文件就是 circle.h
 */
#include "circle.h"

// 静态属性初始化
int Circle::number = 0;

/**
 * @note
 * 实现类中定义的成员方法
 * 需要在方法名前加上类名和作用域解析运算符 ::
 * 这里就是 Circle::
 */
void Circle::print_object()
{
    std::cout << "OBJECT address:" << this << std::endl;
    std::cout << "radius :" << this->get_radius() << std::endl;
}
// 指针object->a()->b()
Circle *Circle::set_radius_point(double radius)
{
    std::cout << "set point" << std::endl;
    this->radius = radius;
    return this;
}
Circle *Circle::print_radius_point()
{
    std::cout << "print : " << this->get_radius() << std::endl;
    return this;
}

// 引用object.a().b().c()
Circle &Circle::set_radius_ref(double radius)
{
    std::cout << "set point" << std::endl;
    this->radius = radius;
    return *this; // *this 实例
}
Circle &Circle::print_radius_ref()
{
    std::cout << "print : " << this->get_radius() << std::endl;
    return *this;
}