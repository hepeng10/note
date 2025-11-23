#ifndef CAT_H
#define CAT_H
#include <string>

class Cat
{
    // 友元函数
    friend void cat_info(const Cat &c);
    /**
     * @note 友元类
     * 友元类 Person 可以访问 Cat 的私有成员
     * 但是 Cat 不能访问 Person 的私有成员；友元是单向的
     */
    friend class Person;

public:
    Cat(const std::string &name, int age) : m_name(name), m_age(age)
    {
    }

private:
    std::string m_name;
    int m_age;
};

#endif