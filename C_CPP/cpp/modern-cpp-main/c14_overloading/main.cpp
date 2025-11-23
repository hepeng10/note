/**
 * @note 参数类型不同、参数个数不同都能重载
 * 调用的时候根据参数的类型和个数来确定调用哪个函数
 */
#include <iostream>
using namespace std;

int max(int, int);
double max(double, double);
int main(int argc, char *argv[])
{
    double x{1.3};
    double y{2.4};
    int a{1};
    int b{45};

    cout << max(x, y) << endl;
    cout << max(a, b) << endl;
    cout << "----- yz ------" << endl;
    return 0;
}

int max(int a, int b)
{
    return (a > b) ? a : b;
}

double max(double a, double b)
{
    return (a > b) ? a : b;
}