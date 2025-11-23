#ifndef CAT_H
#define CAT_H
#include <string>

class Cat
{
    /**
     * @note 友元函数
     * 用 friend 关键字声明友元函数
     * 在类的外部可以声明一个同名同参的函数 cat_info，它可以访问类的私有成员
     */
    friend void cat_info(const Cat &c);

public:
    Cat(const std::string &name, int age) : m_name(name), m_age(age)
    {
    }

private:
    std::string m_name;
    int m_age;
};

#endif