#include <iostream>
#include "product.h"
using namespace std;

int main(int argc, char *argv[])
{
    {
        /**
         * @note 调用三个参数的构造函数
         * 在单独的作用域中调用，
         * 当作用域结束时，p1 会被销毁，调用析构函数，释放 years 占用的内存
         */
        Product p1("Box", "Toy", 1);
        p1.print_object();
    }
    {
        /**
         * @note 调用两个参数的构造函数
         */
        Product p1("Box", "Toy");
        p1.print_object();
    }
    cout << "----------------" << endl;
    /**
     * @note 调用一个参数的构造函数
     */
    Product p1("Box");
    p1.print_object();
    cout << "----- yz ------" << endl;
    return 0;
}