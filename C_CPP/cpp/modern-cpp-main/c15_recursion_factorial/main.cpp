#include <iostream>
using namespace std;

int Factorial(int);

int main(int argc, char *argv[])
{
    int count{0};
    cin >> count;
    cout << "Factorial " << count << " : " << Factorial(count) << endl;
    cout << "----- yz ------" << endl;
    return 0;
}

int Factorial(int number)
{
    // 终止条件
    if (number == 1)
    {
        return 1;
    }
    else
    {
        int result = number * Factorial(number - 1);
        // 1*2*3*4*5
        // 并不是 5*4*3*2*1
        return result;
    }
}