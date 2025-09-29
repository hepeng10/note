#include <iostream>
#include "person.h"
#include "worker.h"
using namespace std;

int main(int argc, char *argv[])
{
    Worker w1("F", 45);
    // w1.m_name = "Hello"; // 可以通过对象修改 public 属性
    // w1.m_age = 1; // 不可以通过对象修改 protected 属性
    // w1.m_address = "dd"; // 不可以通过对象修改 private 属性

    cout << w1 << endl;
    w1.do_some();
    cout << "----- yz ------" << endl;
    return 0;
}