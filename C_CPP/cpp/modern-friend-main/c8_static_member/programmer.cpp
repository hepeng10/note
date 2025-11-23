#include "programmer.h"
std::ostream &operator<<(std::ostream &out, const Programmer &op)
{
    out << "Programmer address : " << &op << std::endl;
    out << "Programmer Age: " << op.m_age << std::endl;
    return out;
}