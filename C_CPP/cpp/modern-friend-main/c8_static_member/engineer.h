#ifndef ENGINEER_H
#define ENGINEER_H
#include "person.h"
class Engineer : private Person // using
{
    friend std::ostream &operator<<(std::ostream &out, const Engineer &op);

public:
    Engineer() = default;
    ~Engineer() = default;
    void work()
    {
        m_name = "ff"; // private
        m_age = 23;    // private
    }

public:
    using Person::get_age;
    using Person::get_name;

protected:
    using Person::m_age;
};
#endif