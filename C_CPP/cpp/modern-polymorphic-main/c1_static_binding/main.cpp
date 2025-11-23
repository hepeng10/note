/**
 * @note
 * 在编译时就决定了调用 Shape::draw()
 * 只看指针的类型（Shape*），不看实际指向的对象
 */
#include <iostream>
#include "square.h"
#include "rectangle.h"
#include "shape.h"
using namespace std;

// Shape -> Rectangle -> Square
int main(int argc, char *argv[])
{
    /**
     * @note
     * 每个类自己的对象调用自己的 draw 方法没有问题
     */
    Shape s1("Shape1");
    s1.draw();
    Rectangle r1(1.0, 2.0, "Rectangle1");
    r1.draw();
    Square sq1(3.0, "Square1");
    sq1.draw();
    cout << "--------------" << endl;
    
    /**
     * @note
     * Shape 类型的基类指针调用自己的 draw 方法，正常
     */
    Shape *shape_ptr = &s1;
    shape_ptr->draw();
    /**
     * @note
     * 将基类指针指向子类对象（向上转型），但是调用的还是基类的 draw 方法
     */
    shape_ptr = &r1;
    shape_ptr->draw();
    /**
     * @note
     * 依然调用的是基类的 draw 方法
     */
    shape_ptr = &sq1;
    shape_ptr->draw();

    cout << "----- yz ------" << endl;
    return 0;
}