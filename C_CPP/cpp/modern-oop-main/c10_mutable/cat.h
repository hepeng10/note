#ifndef CAT_H
#define CAT_H
#include <iostream>
#include <string>
class Cat
{
public:
    Cat(std::string name, int age);

    // 可变引用
    std::string &name()
    {
        return this->m_name;
    }
    // 不可变引用
    const std::string &name() const
    {
        return this->m_name;
    }
    int &age()
    {
        return this->m_age;
    }
    const int &age() const
    {
        return this->m_age;
    }
    // print
    void print_object() const;

private:
    /**
     * @note mutable 关键字，表示这个成员属性是可变的
     * 可以在 const 方法中修改成员变量
     */
    mutable size_t print_cout{0};
    std::string m_name;
    int m_age;
};

#endif