#include "product.h"

Product::~Product()
{
    delete years;
}

Product::Product(int i) : years(new int(i))
{
}

// 深拷贝
Product::Product(const Product &p) : years(new int(*p.get_years()))
{
}

/**
 * @note move 构造函数
 * 创建新对象的时候会将老对象的
 */
Product::Product(Product &&p) : years(p.move_years())
{
}