#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    int x{0};
    cin >> x;
    x % 2 == 0 ? cout << "Even" << endl : cout << "Odd" << endl;

    // 三元表达式用于赋值
    int y{0};
    cin >> y;
    string temperature = y > 24 ? " Hot " : "Cool";
    cout << temperature << endl;

    cout << "----- yz ------" << endl;
}