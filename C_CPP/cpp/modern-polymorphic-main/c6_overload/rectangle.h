#ifndef RECTANGLE_H
#define RECTANGLE_H
#include "shape.h"

class Rectangle : public Shape
{
public:
    Rectangle() = default;
    ~Rectangle() = default;
    Rectangle(double x, double y, std::string_view name);

    void draw() const override // final
    {
        std::cout << "Rectangle Drawing " << m_name << " m_x: " << get_x() << " m_y:" << get_y() << std::endl;
    }
    /**
     * @note 子类中也进行了函数重载
     */
    void draw(std::string_view color, int x) const
    {
        std::cout << "Shape Drawing " << m_name << " color " << color << " x " << x << std::endl;
    }

protected:
    double get_x() const
    {
        return m_x;
    }
    double get_y() const
    {
        return m_y;
    }

private:
    double m_x{0.0};
    double m_y{0.0};
};
#endif