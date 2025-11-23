#ifndef ENGINEER_H
#define ENGINEER_H
#include "person.h"

/**
 * @note
 * 使用 private 继承，父类中的 public 属性和 protected 属性在子类中都变成 private 属性
 */
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
    /**
     * @note
     * 在 public 中使用 using 将父类中的 public 属性和 protected 属性提升为 public 属性
     */
    using Person::get_age;
    using Person::get_name;

protected:
    /**
     * @note
     * m_age 被提升为 protected 属性，
     */
    using Person::m_age;
};
#endif