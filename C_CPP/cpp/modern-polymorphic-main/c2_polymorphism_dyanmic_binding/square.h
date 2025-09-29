#ifndef SQUARE_H
#define SQUARE_H
#include "rectangle.h"
class Square : public Rectangle
{
public:
    Square() = default;
    ~Square() = default;
    Square(double x, std::string_view name);

    /**
     * @note 孙子类中重写 draw 方法时，也可使用 override 关键字来表示重写
     */
    void draw() const override
    {
        std::cout << "Square Drawing " << m_name << "with x: " << get_x() << std::endl;
    }
};

#endif