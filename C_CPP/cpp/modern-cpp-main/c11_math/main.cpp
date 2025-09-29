/**
使用 cmath 库中的数学函数
 */

#include <iostream>
#include <cmath> // 需要包含 cmath 头文件
using namespace std;

int main(int argc, char *argv[])
{
    cout << "abs(-19) = " << abs(-19) << endl; // 绝对值
    cout << "max(5, 4) = " << max(5, 4) << endl; // 最大值
    cout << "min(5, 4) = " << min(5, 4) << endl; // 最小值
    cout << "round(10.45) = " << round(10.5) << endl; // 四舍五入
    cout << "floor(10.45) = " << floor(10.5) << endl; // 向下取整
    cout << "ceil(10.45) = " << ceil(10.5) << endl; // 向上取整
    cout << "pow(2, 3) = " << pow(2, 3) << endl; // 2的3次方
    cout << "sqrt(100) = " << sqrt(100) << endl; // 100的平方根

    cout << endl;

    cout << "exp(1)" << exp(1) << endl; // e的1次方
    cout << "exp2(1)" << exp2(1) << endl; // 2的1次方
    cout << "exp2(2)" << exp2(2) << endl; // 2的2次方

    cout << "log(20)" << log(20) << endl; // 20的自然对数
    cout << "log2(8)" << log2(8) << endl; // 8的以2为底的对数

    // 随机函数
    srand(time(NULL)); // 设置随机数种子
    for (size_t i = 0; i < 10; i++)
    {
        int secret = rand() % 10; // 生成0-9的随机数
        cout << "secret : " << secret << endl;
    }

    cout << "----- yz ------" << endl;
    return 0;
}