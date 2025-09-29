/**
 * @note 就是将对成员属性的获取和修改封装起来，避免直接访问成员属性
 * 如果后面有啥统一要修改的地方，比如验证属性值的合法性，就可以在getter函数中做统一处理
 */
#include <iostream>
using namespace std;

const double PI{3.1415926};

class Circle
{
public:
    static int number;
    // constructor
    Circle()
    {
        // 实例增加一
        number++;
        radius = 1.0;
        cout << "constructor default" << endl;
    }
    Circle(double radius)
    {
        number++;
        this->radius = radius;
    }
    // 析构
    ~Circle()
    {
        number--;
        cout << " destructor " << endl;
        // cout << Circle::number << endl;
    }

    // getter 函数
    double get_radius()
    {
        return radius;
    }

    // setter 函数
    void set_radius(double radius)
    {
        this->radius = radius;
    }

    // 面积
    double area()
    {
        return PI * radius * radius;
    }

    void print_object()
    {
        cout << "OBJECT address:" << this << endl;
        cout << "radius :" << this->get_radius() << endl;
    }
    // 指针object->a()->b()
    Circle *set_radius_point(double radius)
    {
        cout << "set point" << endl;
        this->radius = radius;
        return this;
    }
    Circle *print_radius_point()
    {
        cout << "print : " << this->get_radius() << endl;
        return this;
    }

    // 引用object.a().b().c()
    Circle &set_radius_ref(double radius)
    {
        cout << "set point" << endl;
        this->radius = radius;
        return *this; // *this 实例
    }
    Circle &print_radius_ref()
    {
        cout << "print : " << this->get_radius() << endl;
        return *this;
    }

private:
    double radius{0};
};

// 初始化类属性
int Circle::number = 0;

int main(int argc, char *argv[])
{
    // 堆上
    Circle *c = new Circle(3);
    c->print_object();
    c->print_radius_point()->set_radius_point(4)->print_radius_point();
    cout << "-----" << endl;
    c->print_radius_ref().set_radius_ref(5).print_radius_ref();
    cout << "get set :" << endl;
    c->set_radius(6);
    cout << "get radius: " << c->get_radius() << endl;

    // 栈上 gdb
    Circle c1(3);
    c1.print_object();
    c1.print_radius_point()->set_radius_point(4)->print_radius_point();
    cout << "-----" << endl;
    c1.print_radius_ref().set_radius_ref(5).print_radius_ref();
    cout << "get set :" << endl;
    c1.set_radius(6);
    cout << "get radius: " << c1.get_radius() << endl;

    cout << "----- yz ------" << endl;
    return 0;
}