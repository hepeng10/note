#include <iostream>
using namespace std;
#include "cat.h"

/**
 * @note
 * 和类里的 friend 友元函数同名同参
 * 可以访问类的私有成员
 */
void cat_info(const Cat &c)
{
    /**
     * @note 能访问私有成员 m_name 和 m_age
     */
    cout << "Cat name : " << c.m_name << ", age: " << c.m_age << endl;
}

int main(int argc, char *argv[])
{
    Cat c1("mimi", 3);
    cat_info(c1);
    cout << "----- yz ------" << endl;
    return 0;
}