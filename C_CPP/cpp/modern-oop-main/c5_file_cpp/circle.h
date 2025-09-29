#ifndef CIRCLE_H
#define CIRCLE_H
#include <iostream>
#include "constants.h"
class Circle
{
public:
    static int number;
    // constructor
    Circle()
    {
        // 实例增加一
        number++;
        radius = 1.0;
        std::cout << "constructor default" << std::endl;
    }
    Circle(double radius)
    {
        number++;
        this->radius = radius;
    }
    // 析构
    ~Circle()
    {
        number--;
        std::cout << " destructor " << std::endl;
        // cout << Circle::number << endl;
    }

    // Setter and Getter
    double get_radius()
    {
        return radius;
    }

    void set_radius(double radius)
    {
        this->radius = radius;
    }

    // 面积
    double area()
    {
        return PI * radius * radius;
    }

    void print_object();

    /**
     * @note
     * 这些成员方法在类中只定义，不实现，实现都在 cpp 文件中
     */
    // 指针object->a()->b()
    Circle *set_radius_point(double radius);
    Circle *print_radius_point();

    // 引用object.a().b().c()
    Circle &set_radius_ref(double radius);
    Circle &print_radius_ref();

private:
    double radius{0};
};

/**
 * @note 静态成员不要在头文件中初始化，否则会导致重复定义
 */
// int Circle::number = 0;
#endif