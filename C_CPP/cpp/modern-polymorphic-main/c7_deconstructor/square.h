#ifndef SQUARE_H
#define SQUARE_H
#include "rectangle.h"
class Square : public Rectangle
{
public:
    Square() = default;
    Square(double x, std::string_view name);
    void draw() const override
    {
        std::cout << "Square Drawing " << m_name << "with x: " << get_x() << std::endl;
    }
    /**
     * @note 子类中重写父类的析构函数，在 .cpp 文件中实现
     */
    ~Square() override;
};

#endif