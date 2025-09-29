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

    /**
     * @note 静态绑定比动态绑定更小
     */
    cout << "sizeof(Shape) : " << sizeof(Shape) << endl; // s-32 d-40
    cout << "sizeof(Rectangle) : " << sizeof(Rectangle) << endl; // s-48 d-56
    cout << "sizeof(Square) : " << sizeof(Square) << endl; // s-48 d-56

    cout << "----- yz ------" << endl;
    return 0;
}