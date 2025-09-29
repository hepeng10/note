#include "product.h"

/**
 * @note 使用构造函数初始化列表来初始化成员属性
 *  : name(name), category(category), years(new int(years))
 * 大部分情况下都可以使用 {} 来初始化成员属性
 *  : name{name}, category{category}, years{new int(years)}
 */
// Product::Product(const std::string &name, const std::string &category, int years) : name(name), category(category), years(new int(years))
Product::Product(const std::string &name, const std::string &category, int years) : name{name}, category{category}, years{new int(years)}
{
    std::cout << "three" << std::endl;
}
/**
 * @note 这里使用了委托构造函数，将构造函数的调用委托给了其他构造函数
 * 调用三个参数的 Product(name, category, 0) 来初始化对象，并给第三个参数赋值为0
 */
Product::Product(const std::string &name, const std::string &category) : Product(name, category, 0)
{
    std::cout << "two" << std::endl;
}
/**
 * @note 同样为委托构造函数
 * 调用两个参数的 Product(name, "") 来初始化对象，并给第二个参数赋值为空字符串，
 * 然后两个参数的构造函数会调用三个参数的构造函数，给第三个参数赋值为0
 */
Product::Product(const std::string &name) : Product(name, "")
{
    std::cout << "one" << std::endl;
}

/**
 * @note 析构函数
 * 析构函数在对象被销毁时调用，用于释放对象占用的资源
 * years 在构造函数中使用了 new int()，将内存分配在堆上，
 * 所以需要在析构函数中使用 delete 释放
 */
Product::~Product()
{
    std::cout << "delete" << std::endl;
    delete years;
}