#ifndef SQUARE_H
#define SQUARE_H
#include "rectangle.h"
class Square : public Rectangle
{
public:
    Square() = default;
    ~Square();
    Square(double x, std::string_view name);
    /**
     * @note 子类中实现纯虚函数
     */
    void draw() const override
    {
        std::cout << "Square Drawing " << m_name << "with x: " << get_x() << std::endl;
    }
};

#endif