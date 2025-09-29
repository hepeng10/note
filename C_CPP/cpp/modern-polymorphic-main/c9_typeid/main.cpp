#include <iostream>
#include "square.h"
#include "rectangle.h"
#include "shape.h"
using namespace std;

void draw_shape(Shape *s)
{
    s->draw();
}

// Shape -> Rectangle -> Square
int main(int argc, char *argv[])
{
    /**
     * @note 不同编译器返回的类型名称可能有区别
     */
    cout << "typeid(float) : " << typeid(float).name() << endl; // f
    cout << "typeid(int) : " << typeid(int).name() << endl; // i
    /**
     * @note 因为不同编译器名称不同，可以使用此方法可以确定变量的类型
     */
    if (typeid(1) == typeid(int))
    {
        cout << "1 is a int " << endl;
    }
    else
    {
        cout << "1 is not a int" << endl;
    }

    Rectangle r1(1.0, 3.0, "Rectangle1");
    Shape *shape_ptr = &r1;
    Shape &shape_ref = r1;
    /**
     * @note 返回 P5Shape
     * P 表示 pointer
     * 5 表示类型字符是5个——Shape 的字符个数
     */
    cout << "typeid ptr: " << typeid(shape_ptr).name() << endl; // P5Shape
    /**
     * @note
     * ！！！使用引用，类型就不相同了，和指针解引用后相同，没有向上转型为 Shape
     * 所以使用多态时不要使用引用
     */
    cout << "typeid ref: " << typeid(shape_ref).name() << endl; // 9Rectangle
    cout << "typeid *ptr: " << typeid(*shape_ptr).name() << endl; // 9Rectangle

    cout << "----- yz ------" << endl;
    return 0;
}