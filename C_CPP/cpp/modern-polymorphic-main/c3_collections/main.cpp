#include <iostream>
#include "square.h"
#include "rectangle.h"
#include "shape.h"
using namespace std;

/**
 * @note 函数多态
 * 函数接收一个父类类型，根据指针指向的子类对象，调用子类自己的 draw 方法
 */
void draw_shape(Shape *s)
{
    s->draw();
}

// Shape -> Rectangle -> Square
int main(int argc, char *argv[])
{
    // 静态绑定的不足
    Shape s1("Shape1");
    Rectangle r1(1.0, 2.0, "Rectangle1");
    Square sq1(3.0, "Square1");
    cout << "--------------" << endl;
    /**
     * @note 将子类地址赋值给父类指针，实现向上转型，
     * 然后传给 draw_shape 函数，根据指针指向的对象类型，调用对应的 draw 方法
     */
    Shape *shape_ptr = &s1;
    draw_shape(shape_ptr);
    shape_ptr = &r1;
    draw_shape(shape_ptr);
    shape_ptr = &sq1;
    draw_shape(shape_ptr);
    cout << "-------------" << endl;
    
    /**
     * @note 普通的集合，传入的是各自类型的对象，不符合多态
     * 向上转型为 Shape 类型后，调用的是 Shape 类的 draw 方法
     */
    Shape shapes[]{s1, r1, sq1};
    for (Shape &s : shapes)
    {
        s.draw();
    }

    // Shape ref
    // Shape &shape_ref[]{s1, r1, sq1};
    cout << "point" << endl;
    /**
     * @note 指针集合，将子类对象的地址赋值给父类指针，实现向上转型，
     * 然后调用 draw 方法，是子类中自己的 draw 方法
     */
    Shape *shapes_ptr[]{&s1, &r1, &sq1};
    for (Shape *s : shapes_ptr)
    {
        s->draw();
    }

    cout << "----- yz ------" << endl;
    return 0;
}