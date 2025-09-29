#ifndef PRODUCT_H
#define PRODUCT_H
#include <iostream>
#include <string>
class Product
{
public:
    /**
     * @note 声明 default 构造函数
     * 默认构造函数 C++ 屏蔽掉了的，需要显示声明后才有
     * 调用 default 构造函数后，name 为空，category 为空，years 为空指针
     */
    Product() = default;
    Product(const std::string &name, const std::string &category, int years);
    Product(const std::string &name, const std::string &category);
    Product(const std::string &name);
    ~Product();

    // setter
    void set_name(const std::string &name) { this->name = name; }
    void set_category(const std::string &category) { this->category = category; }
    void set_years(int years) { *(this->years) = years; }
    // getter
    const std::string &get_name() const { return this->name; }
    const std::string &get_category() const { return this->category; }
    int *get_years() const { return this->years; }

    void print_object()
    {
        std::cout << "Product : " << this
                  << " name: " << this->name
                  << " category: " << this->category
                  << ", years: " << *(this->years)
                  << ", years address: " << this->years << std::endl;
    }

private:
    std::string name{};
    std::string category{};
    int *years{};
};

#endif
