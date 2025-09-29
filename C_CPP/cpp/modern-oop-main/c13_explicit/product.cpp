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

Product::~Product()
{
    std::cout << "delete" << std::endl;
    delete years;
}