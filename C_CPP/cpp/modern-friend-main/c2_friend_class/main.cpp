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
    /**
     * @note 调用 Person 类的 cat_info1 方法
     * 可以访问 Cat 的私有成员
     */
    p1.cat_info1(c1);
    cout << "----- yz ------" << endl;
    return 0;
}