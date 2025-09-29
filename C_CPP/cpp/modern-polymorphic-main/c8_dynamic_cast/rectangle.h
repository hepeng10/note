#ifndef RECTANGLE_H
#define RECTANGLE_H
#include "shape.h"

class Rectangle : public Shape
{
public:
    Rectangle() = default;
    virtual ~Rectangle();
    Rectangle(double x, double y, std::string_view name);

    virtual void draw() const override // final
    {
        std::cout << "Rectangle Drawing " << m_name << " m_x: " << get_x() << " m_y:" << get_y() << std::endl;
    }
    virtual void draw(std::string_view color, int x) const
    {
        std::cout << "Shape Drawing " << m_name << " color " << color << " x " << x << std::endl;
    }
    /**
     * @note 子类中新增了 get_x() 方法
     * 由于要通过对象实例调用，所以需要将方法定义为 public
     * protected 和 private 方法都不能通过类的对象实例调用
     */
    double get_x() const
    {
        return m_x;
    }

protected:
    // double get_x() const
    // {
    //     return m_x;
    // }
    double get_y() const
    {
        return m_y;
    }

private:
    double m_x{0.0};
    double m_y{0.0};
};
#endif