#ifndef PERSON_H
#define PERSON_H
#include <iostream>
#include "cat.h"

class Person
{
    /**
     * @note 将 &operator<< 函数设为友元函数
     * @param out 输出流
     * @param person Person 类对象
     * @return std::ostream& 输出流
     */
    friend std::ostream &operator<<(std::ostream &out, const Person &person);

public:
    Person() = default;
    void cat_info1(const Cat &c) const;
};

#endif