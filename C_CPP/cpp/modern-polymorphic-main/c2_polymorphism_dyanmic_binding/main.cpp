#include <iostream>
#include "square.h"
#include "rectangle.h"
#include "shape.h"
using namespace std;

// Shape -> Rectangle -> Square
int main(int argc, char *argv[])
{
    Shape s1("Shape1");
    Rectangle r1(1.0, 2.0, "Rectangle1");
    Square sq1(3.0, "Square1");
    cout << "--------------" << endl;
    /**
     * @note
     * 实现了多态，根据指针或引用指向的对象的类型来确定调用的方法
     * ！！！将子类对象的地址赋值给父类指针，实际上就是向上转型
     */
    Shape *shape_ptr = &s1;
    shape_ptr->draw();
    shape_ptr = &r1;
    shape_ptr->draw();
    shape_ptr = &sq1;
    shape_ptr->draw();

    cout << "----- yz ------" << endl;
    return 0;
}