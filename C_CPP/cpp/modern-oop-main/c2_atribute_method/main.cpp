#include <iostream>
using namespace std;

const double PI{3.1415926};

class Circle
{
public:
    /**
     * @note 静态属性
     * 静态属性是类的所有对象共享的，所有对象的静态属性值都相同
     * 这里的 number 用来存储实例化了多少个对象
     */
    static int number;
    // 构造函数
    Circle()
    {
        // 可以直接访问静态属性，不需要使用类名
        number++; // 每次实例化一个对象，静态属性就会增加一
        radius = 1.0;
        cout << "constructor default" << endl;
    }
    // 重载构造函数
    Circle(double param_radius)
    {
        number++;
        radius = param_radius;
    }
    // 析构函数
    ~Circle()
    {
        number--; // 每次销毁一个对象，静态属性就会减少一
        cout << " destructor " << endl;
        cout << "~number:" << Circle::number << endl;
    }
    // 面积
    double area()
    {
        return PI * radius * radius;
    }

private:
    double radius{0};
};

/**
 * @note 静态属性的初始化，需要在类外初始化，而且不能在main函数中初始化
 * 通过 类名::属性名 直接访问静态属性
 */
int Circle::number = 0;

int main(int argc, char *argv[])
{
    // 栈上的对象
    Circle circle(2);
    cout << "area1:" << circle.area() << endl;

    /**
     * @note 堆上，需要自己删除
     * ！！！堆上实例化的对象需要使用指针类型来接收
     */
    Circle *c = new Circle(3);
    /**
     * @note 堆上实例化的对象，需要使用 -> 来访问成员属性和方法
     */
    cout << "area2:" << c->area() << endl;
    cout << Circle::number << endl; // 通过 类名::属性名 直接访问静态属性
    delete c;
    c = nullptr;

    cout << "number:" << Circle::number << endl;
    cout << "----- yz ------" << endl;
    return 0;
}