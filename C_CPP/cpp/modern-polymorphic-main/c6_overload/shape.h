#ifndef SHARE_H
#define SHARE_H
#include <string>
#include <string_view>
#include <iostream>
class Shape
{
public:
    Shape() = default;
    ~Shape() = default;
    Shape(std::string_view name);

    virtual void draw() const
    {
        std::cout << "Shape Drawing " << m_name << std::endl;
    }
    /**
     * @note 新增了一个参数进行函数重载
     */
    virtual void draw(std::string_view color) const
    {
        std::cout << "Shape Drawing " << m_name << " color " << color << std::endl;
    }

protected:
    std::string m_name;
};
#endif