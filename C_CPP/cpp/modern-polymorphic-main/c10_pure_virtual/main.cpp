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
     * @note Shape 是抽象类，不能实例化
     */
    // Shape s1;
    Rectangle r1(10.0, 20.0, "r1");
    r1.draw("red", 10);
    Square s1(10.0, "s1");
    /**
     * @note Square 的对象调用不了父类 Rectangle 中两个参数的 draw 方法
     * ！！！是因为由于 C++ 的函数隐藏（name hiding）机制，当子类声明了与父类同名但参数不同的函数（draw），父类的所有同名函数（包括重载版本）都会被隐藏，
     * 要么子类中重写两个参数的 draw 方法，要么使用 using 显示引入父类中的 draw 方法
     */
    // s1.draw("blue", 20);
    cout << "----- yz ------" << endl;
    return 0;
}