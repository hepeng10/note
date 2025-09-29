#ifndef SHARE_H
#define SHARE_H
#include <string>
#include <string_view>
#include <iostream>

/**
 * @note 只有纯虚函数，没有成员属性，模拟接口式的抽象类
 */
class Shape
{
public:
    virtual void draw() const = 0;
};
#endif