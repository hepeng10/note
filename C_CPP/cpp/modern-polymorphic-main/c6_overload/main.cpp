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
// draw()
int main(int argc, char *argv[])
{
    // 静态绑定的不足
    Shape s1("Shape1");
    Rectangle r1(1.0, 2.0, "Rectangle1");
    Square sq1(3.0, "Square1");
    cout << "--------------" << endl;

    Shape *shape_ptr = &r1;
    shape_ptr->draw();
    // 父类
    shape_ptr->draw("red");
    /**
     * @note 想调用子类重载的 draw 方法，但是报错
     * ！！！因为子类向上转型后，只有父类中的方法，重载的方法实际上也是在子类中新增的方法，所以无法调用
     */
    // shape_ptr->draw("red", 2);

    cout << "----- yz ------" << endl;
    return 0;
}