#include <iostream>
#include "constants.h"
#include "circle.h"
using namespace std;

// 初始化类属性

int main(int argc, char *argv[])
{
    // 堆上
    Circle *c = new Circle(3);
    c->print_object();
    c->print_radius_point()->set_radius_point(4)->print_radius_point();
    cout << "-----" << endl;
    c->print_radius_ref().set_radius_ref(5).print_radius_ref();
    cout << "get set :" << endl;
    c->set_radius(6);
    cout << "get radius: " << c->get_radius() << endl;

    // 栈上 gdb
    Circle c1(3);
    c1.print_object();
    c1.print_radius_point()->set_radius_point(4)->print_radius_point();
    cout << "-----" << endl;
    c1.print_radius_ref().set_radius_ref(5).print_radius_ref();
    cout << "get set :" << endl;
    c1.set_radius(6);
    cout << "get radius: " << c1.get_radius() << endl;

    cout << "----- yz ------" << endl;
    return 0;
}