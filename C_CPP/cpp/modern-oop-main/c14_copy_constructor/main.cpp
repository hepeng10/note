#include <iostream>
#include "product.h"
using namespace std;

bool compare(const Product &product1, const Product &product2)
{
    cout << *(product1.get_years()) << " : " << *(product2.get_years()) << endl;
    return (*(product1.get_years()) > *(product2.get_years())) ? true : false;
}

int main(int argc, char *argv[])
{
    Product p1("box", "toy", 1);
    /**
     * @note 调用拷贝构造函数，使用p1拷贝为p2
     */
    Product p2(p1);
    p1.print_object();
    p2.print_object();

    cout << "----- yz ------" << endl;
    return 0;
}