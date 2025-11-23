#ifndef SQUARE_H
#define SQUARE_H
#include "rectangle.h"
class Square : public Rectangle
{
public:
    Square() = default;
    ~Square() = default;
    Square(double x, std::string_view name);
    virtual void draw() const
    {
        std::cout << "Square Drawing " << m_name << "with x: " << get_x() << std::endl;
    }
};

#endif