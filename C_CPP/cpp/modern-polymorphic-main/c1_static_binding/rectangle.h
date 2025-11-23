#ifndef RECTANGLE_H
#define RECTANGLE_H
#include "shape.h"

class Rectangle : public Shape
{
public:
    Rectangle() = default;
    ~Rectangle() = default;
    Rectangle(double x, double y, std::string_view name);

    /**
     * @note
     * 派生类 Rectangle 的 draw 方法
     * 重写了父类 Shape 的 draw 方法
     */
    void draw() const
    {
        std::cout << "Rectangle Drawing " << m_name << std::endl;
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