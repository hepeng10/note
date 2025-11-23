#ifndef PRODUCT_H
#define PRODUCT_H
#include <iostream>
#include <string>
class Product
{
public:
    Product(int i);
    Product(const Product &p);
    /**
     * @note move 构造函数
     * &&p 是右值引用。接收一个临时对象来创建对象，可以提升性能
     */
    Product(Product &&p);

    ~Product();

    // setter
    void set_years(int years) { *(this->years) = years; }
    // getter
    int *get_years() const { return this->years; }

    /**
     * @note move years 函数
     * 把 years 指向的内存地址给 new_years，然后把 years 指向 nullptr
     * 返回新的 years 指针
     */
    int *move_years()
    {
        int *new_years{years};
        years = nullptr;
        return new_years;
    }

    void print_object()
    {
        std::cout << "Product : " << this
                  << ", years: " << *(this->years)
                  << ", years address: " << this->years << std::endl;
    }

private:
    int *years{};
};

#endif
