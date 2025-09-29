/**
 * 用 string，不要用 cstring
 */
#include <iostream>
#include <cstring>
using namespace std;

int main(int argc, char *argv[])
{
    const char *stringName0{"yzzy"};
    char stringName1[]{"yzzy"};
    char stringName2[]{"yzzz"};
    cout << "len : " << strlen(stringName1) << endl;
    cout << "len : " << strlen(stringName2) << endl;

    // 比较大小
    cout << strcmp(stringName1, stringName2) << endl;
    if (strcmp(stringName1, stringName2) > 0)
    {
        cout << stringName1 << endl;
    }
    else
    {
        cout << stringName2 << endl;
    }

    cout << "strcat && strcpy" << endl;

    cout << strcat(stringName1, stringName2) << endl;
    cout << stringName1 << ":" << stringName2 << endl;
    // cout << strcpy(stringName1, stringName2) << endl;
    // cout << stringName1 << ":" << stringName2 << endl;

    // 查找
    cout << strchr(stringName1, 'z') << endl; // const char*
    cout << strrchr(stringName1, 'z') << endl;

    const char *pChar{stringName1};
    int index{0};
    while ((pChar = strchr(pChar, 'z')) != nullptr)
    {
        ++index;
        cout << "get index at " << index << " -> " << pChar << endl;
        ++pChar;
    }

    cout << "----- yz ------" << endl;
    return 0;
}