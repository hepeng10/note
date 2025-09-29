#ifndef SQUARE_H
#define SQUARE_H
#include "rectangle.h"

class Square : public Rectangle
{
public:
    /**
     * @note 使用 using 显示引入父类的所有 draw 方法
     * 也就可以调用父类中两个参数的 draw 方法了
     */
    // using Rectangle::draw;
    Square() = default;
    ~Square();
    Square(double x, std::string_view name);
    /**
     * @note 重写了 draw 方法，所以父类 Rectangle 中两个参数的 draw 方法也被隐藏了
     */
    void draw() const override
    {
        std::cout << "Square Drawing " << m_name << "with x: " << get_x() << std::endl;
    }
};

#endif