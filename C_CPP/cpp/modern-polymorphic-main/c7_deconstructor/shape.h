#ifndef SHARE_H
#define SHARE_H
#include <string>
#include <string_view>
#include <iostream>

class Shape
{
public:
    Shape() = default;
    Shape(std::string_view name);

    virtual void draw() const
    {
        std::cout << "Shape Drawing " << m_name << std::endl;
    }
    /**
     * @note 将父类中析构函数设置为了虚函数，子类中重新才会被调用
     */
    virtual ~Shape();

protected:
    std::string m_name;
};
#endif