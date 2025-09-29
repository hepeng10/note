#include <iostream>
#include <string>
using namespace std;

/**
 * @note 使用引用效率比普通的形参效率更高，没有将实参的值拷贝给形参的过程
 * 加密就是将传入字符的 ASCII 码 +13
 */
char encrypt(const char &param)
{
    return param - 13;
}

// 解密就是将传入字符的 ASCII 码 -13
char decrypt(const char &param)
{
    return param + 13;
}

/**
 * @note 函数指针作为参数，可以接收一个函数
 */
void change(string &stringItem, char (*callbackFunction)(const char &))
{
    for (size_t i = 0; i < stringItem.size(); i++)
    {
        stringItem[i] = callbackFunction(stringItem[i]);
    }
}

int main(int argc, char *argv[])
{
    string msg{"yzzy"};
    // encrypt char - 13
    change(msg, encrypt); // 传入一个函数
    cout << "encrypt: " << msg << endl;

    change(msg, decrypt); // 传入一个函数
    cout << "msg : " << msg << endl;
    // decrypt char + 13
    cout << "----- yz ------" << endl;
    return 0;
}