#ifndef PERSON_H
#define PERSON_H
#include <string>
/**
 * @note 这里使用了 string_view
 * string_view 是 C++17 引入的，它是一个只读的字符串视图（引用），不会分配内存
 * 所以它的性能要比 string 好很多
 * string_view 是只读的，不能修改它指向的字符串
 */
#include <string_view>
#include <iostream>
/**
 * @note 基类 Person
 */
class Person
{
    friend std::ostream &operator<<(std::ostream &out, const Person &person);

public:
    Person() = default;
    Person(std::string_view fullname, int age, std::string_view address);
    ~Person();
    void do_some() const;

    // Getter
    /**
     * @note 对属性通过 getter, setter 封装后访问更符合规范
     */
    std::string get_name() const
    {
        return m_name;
    }
    int get_age() const
    {
        return m_age;
    }
    /**
     * @note 对私有属性 m_address 提供一个 get 访问接口
     * 子类中可以通过此方法访问父类中的 private 属性
     */
    std::string get_address() const
    {
        return m_address;
    }
    // 属性
public:
    std::string m_name{"None"};

protected:
    int m_age{0};

private:
    std::string m_address{"None"};
};

#endif