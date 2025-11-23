/**
如何通过调用函数修改值：
1. 通过返回值修改
2. 通过引用修改（推荐）
3. 通过指针修改（不推荐）
 */
#include <iostream>
using namespace std;

int addAge(int);
void addAgePoint(int &);

int main(int argc, char *argv[])
{
    int age{45};
    int newAge{addAge(45)}; // 通过返回值修改
    cout << newAge << endl;
    cout << "age: " << age << endl;
    cout << "&: " << &age << endl;
    addAgePoint(age); // 能直接在函数内修改 age

    cout << age << endl;
    cout << "----- yz ------" << endl;
    return 0;
}

/**
 * @note 返回一个新值
 */
int addAge(int age)
{
    int result{age + 1};
    return result;
}

/**
 * @note 通过引用修改值
 */
void addAgePoint(int &age)
{
    ++(age);
    cout << "age: " << age << " & :" << &age << endl;
}
