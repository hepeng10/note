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
    Rectangle r1(1.2, 3.4, "R1");
    Shape *s_p = &r1;
    draw_shape(s_p);

    Square s1(1.2, "S1");
    s_p = &s1;
    draw_shape(s_p);

    cout << "----- yz ------" << endl;
    return 0;
}