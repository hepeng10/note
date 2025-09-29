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
     * @note 使用的是 Square 类实例化对象
     */
    Shape *p = new Square(1.0, "Square1");
    /**
     * @note 在销毁时会先调用 Square 的，
     * 再调用 Rectangle 的，最后调用 Shape 的析构函数
     */
    delete p;
    p = nullptr;

    cout << "----- yz ------" << endl;
    return 0;
}