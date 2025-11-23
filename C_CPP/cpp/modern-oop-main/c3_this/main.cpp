/**
 * @note
 * 需要根据实际需要来决定创建在栈上还是堆上
 * 栈上运行效率更高，堆上生命周期更长
 * 对象如果创建出来会很大，应该创建在堆上
 * 栈上地址在内存中比较靠前，堆上地址在内存中比较靠后
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
        /**
         * @note this 是指针，调用成员属性需要使用 -> 运算符
         * 也可以使用 (*this).radius 来调用成员属性
         */
        this->radius = radius;
    }
    // 析构
    ~Circle()
    {
        number--;
        cout << " destructor " << endl;
        // cout << Circle::number << endl;
    }
    // 面积
    double area()
    {
        return PI * radius * radius;
    }
    void print_object()
    {
        cout << "OBJECT address:" << this << endl;
        cout << "radius :" << this->radius << endl;
    }

    /**
     * @note 返回 this 指针
     * 可以使用 object->a()->b() 这样调用
     * 函数名前加 * 表示返回指针
     */
    Circle *set_radius_point(double radius)
    {
        cout << "set point" << endl;
        this->radius = radius;
        /**
         * @note 返回 this 指针
         */
        return this;
    }
    Circle *print_radius_point()
    {
        cout << "print : " << this->radius << endl;
        return this;
    }

    /**
     * @note 返回 this 引用
     * 可以使用 object.a().b().c() 这样调用
     * 函数名前加 & 表示返回引用
     */
    Circle &set_radius_ref(double radius)
    {
        cout << "set point" << endl;
        this->radius = radius;
        /**
         * @note this 是指针，*this 是引用
         */
        return *this;
    }
    Circle &print_radius_ref()
    {
        cout << "print : " << this->radius << endl;
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
    // 指针链式调用
    c->print_radius_point()->set_radius_point(4)->print_radius_point();
    cout << "-----" << endl;
    /**
     * 引用链式调用
     * c是指针，使用 -> 调用成员函数，返回this引用，使用 . 继续调用
     */
    c->print_radius_ref().set_radius_ref(5).print_radius_ref();

    // 栈上
    Circle c1(3);
    c1.print_object();
    /**
     * c1 是对象实例，使用 . 调用成员函数，返回this指针，使用 -> 继续调用
     */
    c1.print_radius_point()->set_radius_point(4)->print_radius_point();
    cout << "-----" << endl;
    c1.print_radius_ref().set_radius_ref(5).print_radius_ref();

    cout << "----- yz ------" << endl;
    return 0;
}