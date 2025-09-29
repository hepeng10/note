#include <iostream>
#include "product.h"
using namespace std;

/**
 * @note 比较两个 Product 对象的 years 成员变量
 */
bool compare(const Product &product1, const Product &product2)
{
    cout << *(product1.get_years()) << " : " << *(product2.get_years()) << endl;
    return (*(product1.get_years()) > *(product2.get_years())) ? true : false;
}

int main(int argc, char *argv[])
{
    Product p1("Box", "Toy", 2);
    Product p2("ff");
    std::string s1{"dd"};
    /**
     * @note 
     * 1. 当没添加 explicit 关键字时，
     * 可以使用 std::string 类型的对象调用 Product 类的构造函数
     * 这时候会发生隐式转换，将 std::string 类型的对象转换为 Product 类型的对象
     * 调用的是 Product(const std::string &name) 构造函数
     * 2. 当添加了 explicit 关键字时，
     * 就不能使用 std::string 类型的对象调用 Product 类的构造函数
     * 这时候会编译错误
     */
    // cout << compare(p1, s1) << endl;
    cout << compare(p1, p2) << endl; // 这两个都是 Product 对象，能正常比较

    cout << "----- yz ------" << endl;
    return 0;
}