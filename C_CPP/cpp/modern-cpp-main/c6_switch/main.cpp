#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    // a+b a-b a*b a/b
    int a{0}, b{0};
    char op{' '};
    /**
     * 这里需要输入3个参数，分别是a、运算符、b
     * 如：1 + 2，空格不是必须的，cin有自己的解析规则
     * 若只输入1回车后，程序不会运行，仍在等待输入，可以继续输入+，回车，再输入2，回车
     */
    cin >> a >> op >> b;
    switch (op)
    {
    case '+':
        cout << a + b << endl;
        break;
    case '-':
        cout << a - b << endl;
        break;
    case '*':
        cout << a * b << endl;
        break;
    case '/':
        cout << a / b << endl;
        break;
    default:
        cout << "Sorry I can't understand!" << endl;
        break;
    }

    cout << "----- yz ------" << endl;
}