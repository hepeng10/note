/**
 * @note move 构造函数主要用于极限提升性能，非必要不使用
 */
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
    /**
     * @note 使用 std::move 可以将左值转换为右值引用
     * 创建一个临时对象 Product(2)，
     * 然后调用 move 构造函数将临时对象的 years 指向的内存地址给 p.years，
     * 然后把临时对象的 years 指向 nullptr
     */
    Product p(std::move(Product(2)));
    p.print_object();

    cout << "----- yz ------" << endl;
    return 0;
}