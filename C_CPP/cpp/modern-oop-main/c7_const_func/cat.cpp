#include "cat.h"
#include <string>

Cat::Cat(std::string name, int age)
{
    this->name = name;
    this->age = age;
}

std::string Cat::get_name() const
{
    return this->name;
}

int Cat::get_age() const
{
    // this->name = "dd";
    return this->age;
}

// setter
void Cat::set_name(std::string name)
{
    this->name = name;
}

void Cat::set_age(int age)
{
    this->age = age;
}

void Cat::print_object() const
{
    std::cout << "Cat (" << this << ") : name : " << this->name << " age: " << this->age << std::endl;
}