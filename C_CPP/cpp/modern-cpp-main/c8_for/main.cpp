#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    // 使用 size_t 比 int 更好，长度更长
    for (size_t i{0}; i <= 10; ++i)
    {
        cout << i << endl;
    }
    // 数组与for。声明数组并初始化
    int arr1[]{1, 2, 3, 4};
    // 数组的长度：总字节数/单个元素的字节数
    int arrSize{sizeof(arr1) / sizeof(arr1[0])};
    cout << "size : " << arrSize << endl;

    /**
     * @note 在C++中，使用++i比i++更快，因为++i不会创建临时变量。
     * 虽然效果是一样的，但是统一使用++i是一个良好的编程习惯，尤其是在循环中。
     */
    for (size_t i{0}; i < arrSize; ++i)
    {
        cout << arr1[i] << endl;
    }

    // for range 遍历，可以使用 auto
    for (auto x : arr1)
        cout << x << endl;

    for (size_t i{0}; i <= 20; ++i)
    {
        if ((i % 2) != 0)
        {
            cout << i << endl;
        }
    }

    cout << "----- yz ------" << endl;
    return 0;
}