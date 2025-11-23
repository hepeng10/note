#ifndef PERSON_H
#define PERSON_H
#include <iostream>

class Person
{
public:
    Person() = default;
    /**
     * @note 友元函数 cat_info1 可以访问 Cat 的私有成员
     * 不需要在 Cat 类中声明为友元函数
     */
    void cat_info1(const Cat &c) const
    {
        std::cout << "friend class function" << endl;
        std::cout << "Cat name : " << c.m_name << ", age : " << c.m_age << endl;
    }
};

#endif