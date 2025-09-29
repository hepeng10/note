#include <iostream>
#include "product.h"
using namespace std;

int main(int argc, char *argv[])
{
    {
        Product p1("Box", "Toy");
        p1.print_object();
    }
    cout << "----------------" << endl;
    Product p1("Box");
    p1.print_object();
    /**
     * @note default 构造函数
     * 这里调用无参的构造函数，就调用到了 default 构造函数
     */
    Product p;
    /**
     * @note 由于p是使用default构造函数构造的，
     * 所以name、category为空，但是years为空指针，
     * print_object() 中 *(this->years) 就出错了
     */
    p.print_object();

    cout << "----- yz ------" << endl;
    return 0;
}