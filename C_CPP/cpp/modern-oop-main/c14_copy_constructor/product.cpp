#include "product.h"
Product::Product(const std::string &name, const std::string &category, int years) : name(name), category(category), years(new int(years))
{
    std::cout << "three" << std::endl;
}
Product::Product(const std::string &name, const std::string &category) : Product(name, category, 0)
{
    std::cout << "two" << std::endl;
}
Product::Product(const std::string &name) : Product(name, "")
{
    std::cout << "one" << std::endl;
}

/**
 * @note 浅拷贝构造函数
 * p.get_name() 和 p.get_category() 是字面量值，拷贝到新的对象中是值传递，会新生成一份，所以拷贝没问题；
 * p.get_years() 是new int()分配到堆上的一个引用，拷贝到新的对象中也是引用传递，所以拷贝的是引用，不是值，从而会导致共享 years，不是真正的拷贝
 * 浅拷贝和深拷贝只用一个，所以注释掉
 */
// Product::Product(const Product &p) : name(p.get_name()), category(p.get_category()), years(p.get_years())
// {
// }

/**
 * @note 深拷贝构造函数
 * years 调用传入的对象获取到的years，再用 new int()重新创建个堆上的值，这就不会共享了
 */
Product::Product(const Product &p) : name(p.get_name()), category(p.get_category()), years(new int(*p.get_years()))
{
}

Product::~Product()
{
    std::cout << "delete" << std::endl;
    delete years;
}