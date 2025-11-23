#ifndef CAT_H
#define CAT_H
#include <iostream>
#include <string>

class Cat
{
public:
    Cat(std::string name, int age);

    /**
     * @note 返回可变引用，调用后获取到 m_name 的引用，外部可以直接修改 m_name
     * 最好返回引用，而不是返回指针，指针操作风险更大
     */
    std::string &name()
    {
        return this->m_name;
    }

    /**
     * @note 重载 name 方法，返回不可变引用，有 const 修饰
     * 注意是前后两个 const
     * 1. 只保留第一个 const，可以编译，但是不能在 const 对象上调用此方法，只能使用非 const 对象调用
     * 2. 只保留第二个 const，编译报错，因为是 const 函数，不能修改成员变量，但是却返回了成员变量的引用，在外部就可以修改了，这违背了第二个 const 的初衷
     * 所以要返回一个引用，又不让外部修改，就必须有两个 const
     */
    const std::string &name() const
    {
        return this->m_name;
    }
    int &age()
    {
        return this->m_age;
    }
    const int &age() const
    {
        return this->m_age;
    }
    // print
    void print_object() const;

private:
    std::string m_name;
    int m_age;
};

#endif