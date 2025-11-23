#include <iostream>
using namespace std;

void addTwo(int *const);
void addThree(int &);

int main(int argc, char *argv[])
{
    int number{13};
    cout << "number: " << number << " &number : " << &number << endl;
    addTwo(&number);
    cout << "number: " << number << " &number : " << &number << endl;

    cout << "number: " << number << " &number : " << &number << endl;
    addThree(number);
    cout << "number: " << number << " &number : " << &number << endl;

    cout << "----- yz ------" << endl;
    return 0;
}

/**
 * @note 指针参数通常都要在*后加const，因为通常都不会改变指针的指向，而只是改变值
 */
void addTwo(int *const number)
{
    *number += 2;
}

void addTwo1(const int *const number)
{
    // *number += 2; // * 左边有 const，则解引用的值不可变
    // 内部只能使用 number，而不能改变 number
}

void addThree(int &number)
{
    number += 3;
}

void addThree2(const int &number)
{
    // number += 3; // 引用左边有 const，则引用的值不可变
    // 内部只能使用 number，而不能改变 number
}