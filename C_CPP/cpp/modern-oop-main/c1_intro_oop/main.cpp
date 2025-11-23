#include <iostream>
using namespace std;

class Vector2
{
public:
    // 构造函数
    Vector2(int x, int y) : x(x), y(y)
    {
        cout << "Construct Vector2" << endl;
    }
    /**
     * @note 虚函数析构函数
     * 要被子类重写的函数，通常定义为虚函数
     */
    virtual ~Vector2() { cout << "virtual destruct" << endl; }
    /**
     * @note 使用 const 关键字修饰的函数，不能修改类的成员变量
     */
    virtual void print() const
    {
        cout << "(" << x << ", " << y << ")" << endl;
    }

protected:
    int x;
    int y;
};

class Vector3 : public Vector2
{
public:
    /**
     * @note 子类的构造函数，需要调用父类的构造函数
     */
    Vector3(int x, int y, int z) : Vector2(x, y), z(z)
    {
        cout << "Constructor Vector3" << endl;
    }
    void print() const
    {
        cout << "[" << x + y + z << "]" << endl;
    }

private:
    int z;
};

int main(int argc, char *argv[])
{
    /**
     * @note 创建在栈上的对象，会自动调用析构函数
     */
    Vector2 ex(1, 3);
    Vector3 ex3(2, 3, 4);
    ex3.print();

    /**
     * @note 使用 new 创建在堆上的对象，需要手动调用析构函数
     */
    Vector2 *demo2d = new Vector2(1, 2);
    delete demo2d; // 手动调用析构函数
    demo2d = nullptr;

    Vector3 *demo3d = new Vector3(3, 2, 3);
    demo3d->print(); // 调用 Vector3 类重写的 print 函数
    delete demo3d; // 手动调用析构函数
    demo3d = nullptr;

    cout << "----- yz ------" << endl;
    return 0;
}