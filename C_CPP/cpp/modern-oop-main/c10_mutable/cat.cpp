#include "cat.h"
#include <string>

Cat::Cat(std::string name, int age)
{
    this->m_name = name;
    this->m_age = age;
}

/**
 * @note 在 const 方法中，可以修改 mutable 修饰的成员属性
 */
void Cat::print_object() const
{
    this->print_cout++;
    std::cout << "Cat (" << this << ") : name : " << this->m_name << " age: " << this->m_age << std::endl;
    std::cout << "Address : " << this << ": print count:" << this->print_cout << std::endl;
}