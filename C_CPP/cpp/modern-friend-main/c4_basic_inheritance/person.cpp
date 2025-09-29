#include "person.h"

Person::Person(std::string_view name, int age, std::string_view address)
    : m_name(name), m_age{age}, m_address{address}
{
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

Person::~Person()
{
}