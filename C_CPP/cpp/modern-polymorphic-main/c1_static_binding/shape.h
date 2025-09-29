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
     * 基类 Shape 的 draw 方法，是普通成员方法，静态绑定
     * 子类会重写此方法
     */
    void draw() const
    {
        std::cout << "Shape Drawing " << m_name << std::endl;
    }

protected:
    std::string m_name;
};
#endif