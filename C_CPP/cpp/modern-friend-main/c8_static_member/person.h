#ifndef PERSON_H
#define PERSON_H
#include <string>
#include <string_view>
#include <iostream>
class Person
{
    friend std::ostream &operator<<(std::ostream &out, const Person &person);

public:
    Person()
    {
        ++m_count;
    };
    Person(std::string_view fullname, int age, std::string_view address);
    Person(const Person &source);
    ~Person();
    void do_some() const;

    // Getter
    std::string get_name() const
    {
        return m_name;
    }
    int get_age() const
    {
        return m_age;
    }
    std::string get_address() const
    {
        return m_address;
    }
    // 属性
public:
    std::string m_name{"None"};
    /**
     * @note 使用 static 声明静态变量
     * 需要在 .cpp 文件中初始化
     */
    static int m_count;

protected:
    int m_age{0};

private:
    std::string m_address{"None"};
};

#endif