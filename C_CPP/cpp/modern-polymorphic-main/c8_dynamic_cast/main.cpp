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
    Shape *p = new Rectangle(1.0, 2.0, "Square1");
    p->draw();
    /**
     * @note 直接调用子类中新增的方法不行
     */
    // cout << p->get_x() << endl;
    /**
     * @note 使用 dynamic_cast 可以将父类指针转换为子类指针
     * 就能调用子类中新增的方法
     */
    Rectangle *r_p = dynamic_cast<Rectangle *>(p);
    cout << r_p->get_x() << endl;

    cout << "----- yz ------" << endl;
    return 0;
}