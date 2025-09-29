/**
 * @note 实参和形参之间是值拷贝
 */
#include <iostream>
using namespace std;

int factorial(int);

int main(int argc, char *argv[])
{
    int number{0};
    cin >> number;

    // 实参
    cout << factorial(number) << endl;
    cout << "----- yz ------" << endl;
    return 0;
}

// n! n(n-1)(n-2)...1
int factorial(int number) // 形参
{
    int result = 1;
    for (size_t i = 1; i <= number; i++)
    {
        result = result * i;
    }
    return result;
}