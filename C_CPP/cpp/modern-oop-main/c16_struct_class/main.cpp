/**
 * @note struct 与 class 的区别
 * struct 与 class 唯一的区别就是默认的访问权限不同，struct 默认是 public，class 默认是 private
 * struct 拥有 class 的所有功能，所以技术上它们可以互换使用，看团队如何选择
 * ！！！所以，C++中的struct和C中的struct是相当不同的，就像C++中的class和C中的struct是相当不同的
 */
#include <iostream>
#include <string>
using namespace std;

class Person
{
public: // class 默认是 private，所以要显式声明为 public 才能访问
    std::string name{"yz"};
};

struct Cat
{
    std::string name{"mimi"};
private: // struct 同样可以改变访问权限
    int age{1};
};

int main(int argc, char *argv[])
{
    Cat c;
    c.name = "mi"; // struct 可以直接访问成员变量
    cout << c.name << endl;
    Person p;
    cout << p.name << endl;

    cout << "----- yz ------" << endl;
    return 0;
}