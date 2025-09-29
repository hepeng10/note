#include "programmer.h"
std::ostream &operator<<(std::ostream &out, const Programmer &op)
{
    out << "Programmer address : " << &op << std::endl;
    /**
     * @note
     * m_age 在 engineer 类中被提升为 protected 属性，
     * 所以 programmer 类可以访问 engineer 类中的 protected 属性 m_age。
     */
    out << "Programmer Age: " << op.m_age << std::endl;
    return out;
}