#include "person.h"

void Person::cat_info1(const Cat &c) const
{
    std::cout << "Cat name : " << c.m_name << ", age : " << c.m_age << std::endl;
}

/**
 * @note 实现友元函数 operator<< 可以打印 Person 对象的信息
 * 打印 person 的地址
 */
std::ostream &operator<<(std::ostream &out, const Person &person)
{
    /**
     * @note 引用需要加 & 才能获取到地址，指针就直接打印就是地址
     */
    out << "Person address " << &person << std::endl;
    return out;
}