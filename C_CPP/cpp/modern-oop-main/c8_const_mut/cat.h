#ifndef CAT_H
#define CAT_H
#include <iostream>
#include <string>
class Cat
{
public:
    Cat(std::string name, int age);
    // Getter
    std::string get_name() const;
    int get_age() const;
    // Setter
    void set_name(std::string name);
    void set_age(int age);

    // print
    void print_object() const;

private:
    std::string name;
    int age;
};

#endif