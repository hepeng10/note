#include "engineer.h"
std::ostream &operator<<(std::ostream &out, const Engineer &op)
{
    out << "Engineer address : " << &op << std::endl;
    out << "Enginner name : " << op.get_name() << ", Age: " << op.m_age << std::endl;
    return out;
}