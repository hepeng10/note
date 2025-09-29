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

    /**
     * @note
     * 使用 virtual 关键字将 draw 方法设置为虚函数
     */
    virtual void draw() const
    {
        std::cout << "Shape Drawing " << m_name << std::endl;
    }

protected:
    std::string m_name;
};
#endif