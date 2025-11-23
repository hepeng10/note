#ifndef CAT_H
#define CAT_H
#include <string>

class Cat
{
    // 友元函数
    friend void cat_info(const Cat &c);
    /**
     * @note 将 &operator<< 函数设为友元函数
     * @param out 输出流
     * @param cat Cat 类对象
     * @return std::ostream& 输出流
     */
    friend std::ostream &operator<<(std::ostream &out, const Cat &cat);
    // 友元类
    friend class Person;

public:
    Cat(const std::string &name, int age);

private:
    std::string m_name;
    int m_age;
};

#endif