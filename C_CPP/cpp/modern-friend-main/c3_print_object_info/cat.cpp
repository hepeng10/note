#include <iostream>
#include "cat.h"

Cat::Cat(const std::string &name, int age) : m_name(name), m_age(age)
{
}

/**
 * @note 实现友元函数 operator<< 可以打印 Cat 对象的信息
 * 这里打印 cat 的 m_name 和 m_age
 */
std::ostream &operator<<(std::ostream &out, const Cat &cat)
{
    out << "Cat " << cat.m_name << " " << cat.m_age << std::endl;
    return out;
}
