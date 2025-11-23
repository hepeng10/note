/**
 * @note 这里的判断真假函数都是返回非0表示真，而不一定是返回1
 */
#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    cout << "isalnum" << endl;
    // isalnum是否为字母或数字。返回非0表示真
    cout << isalnum('A') << endl;
    cout << isalnum('e') << endl;
    cout << isalnum('1') << endl;
    cout << isalnum('^') << endl;

    cout << "isalpha" << endl;
    // isalpha是否为字符
    cout << isalpha('A') << endl;
    cout << isalpha('e') << endl;
    cout << isalpha('1') << endl;
    cout << isalpha('^') << endl;

    cout << "isdigit" << endl;
    // isdigit是否为数字
    cout << isdigit('A') << endl;
    cout << isdigit('e') << endl;
    cout << isdigit('1') << endl;
    cout << isdigit('^') << endl;

    cout << "isblank" << endl;
    string msg{"HSello yzzy yz!"};
    int blankNum{0};
    for (auto i : msg)
    {
        if (isblank(i))
        {
            blankNum++;
        }
    }
    // 2个空字符
    cout << "blankNum: " << blankNum << endl;

    cout << "islower isupper" << endl;

    cout << isupper('a') << endl;
    cout << isupper('e') << endl;
    cout << isupper('L') << endl;
    cout << isupper('1') << endl;
    cout << endl;

    cout << islower('a') << endl;
    cout << islower('e') << endl;
    cout << islower('L') << endl;
    cout << islower('1') << endl;
    cout << endl;
    // 用引用进行修改
    for (auto &i : msg)
    {
        i = toupper(i); // 将字符转换为大写
    }
    cout << msg << endl;
    // 用数组索引的方式修改
    for (size_t i = 0; i < msg.size(); i++)
    {
        msg[i] = tolower(msg[i]); // 将字符转换为小写
    }
    cout << "msg: " << msg << endl;
    cout << "----- yz ------" << endl;
    return 0;
}