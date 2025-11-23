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
};
#endif