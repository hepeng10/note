#include "person.h"

/**
 * @note 初始化静态变量
 */
int Person::m_count{0};

Person::Person(std::string_view name, int age, std::string_view address)
    : m_name(name), m_age{age}, m_address{address}
{
    /**
     * @note
     * 在类的成员函数内部（包括构造函数、析构函数、普通成员函数），可以直接访问该类的所有成员，包括静态成员和非静态成员，无需使用类名限定。
     */
    ++m_count;
    std::cout << "Person Constructor" << std::endl;
}

void Person::do_some() const
{
    std::cout << "Some" << std::endl;
}

std::ostream &operator<<(std::ostream &out, const Person &person)
{
    out << "Person name : " << person.get_name() << ", Age: " << person.get_age() << ", Address: " << person.get_address() << std::endl;
    return out;
}

Person::Person(const Person &source)
    : m_name(source.m_name), m_age(source.m_age), m_address(source.m_address)
{
    ++m_count;
    std::cout << "Person copy Constructor" << std::endl;
}

Person::~Person()
{
    --m_count;
    std::cout << "Person Deconstructor" << std::endl;
}