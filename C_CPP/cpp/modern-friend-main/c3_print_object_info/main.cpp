#include <iostream>
using namespace std;
#include "cat.h"
#include "person.h"

void cat_info(const Cat &c)
{
    cout << "friend function" << endl;
    cout << "Cat name : " << c.m_name << ", age : " << c.m_age << endl;
}

int main(int argc, char *argv[])
{
    Cat c1("mimi", 3);
    cat_info(c1);
    cout << "________________" << endl;
    Person p1;
    p1.cat_info1(c1);
    cout << "________________" << endl;
    /**
     * @note 可以直接使用 << 运算符打印 Cat 类的信息
     * 打印 cat 的 m_name 和 m_age
     */
    cout << c1 << endl;
    /**
     * @note 可以直接使用 << 运算符打印 Person 类的信息
     * 打印 person 的地址
     */
    cout << p1 << endl;
    cout << "----- yz ------" << endl;
    return 0;
}