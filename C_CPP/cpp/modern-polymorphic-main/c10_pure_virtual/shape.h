#ifndef SHARE_H
#define SHARE_H
#include <string>
#include <string_view>
#include <iostream>
class Shape
{
public:
    Shape() = default;
    virtual ~Shape();
    Shape(std::string_view name);

    /**
     * @note 函数被赋值为0，说明它是一个纯虚函数
     */
    virtual void draw() const = 0;

protected:
    std::string m_name;
};
#endif