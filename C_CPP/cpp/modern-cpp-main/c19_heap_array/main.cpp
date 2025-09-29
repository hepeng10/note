/**
 * @note 现代C++中建议使用 vector 等容器代替堆数组。
 * 堆数组注意点：
 * 1. 堆数组申请的内存需要手动释放，否则会泄漏。
 * 2. 堆数组申请的内存需要使用delete[] 释放，而不是delete。
 * 3. delete[] 后还是要将指针设置为 nullptr，避免悬空指针。
 * 4. 堆数组不支持很多数组的操作，比如 size, auto 等。
 */

#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    /**
     * @note 使用 new 申请堆数组
     * 要初始化赋值，否则会随机值。初始化赋值后后面未赋值的索引值为0
     */
    double *pArray{new double[13]{1, 3.1}};
    if (pArray != nullptr)
    {
        for (size_t i = 0; i < 13; i++)
        {
            cout << "index : " << i << " value : " << pArray[i] << endl;
        }
    }

    double arr[13]{123, 34, 2};
    /**
     * @note 栈数组 sizeof 计算后是数组元素的大小，而堆数组 sizeof 计算后是指针的大小。
     * 所以没法使用 sizeof 计算堆数组的大小。
     */
    cout << "arr sizeof : " << sizeof(arr) / sizeof(arr[0]) << " p Array sizeof : " << sizeof(pArray) / sizeof(pArray[0]) << endl;

    // c++ 17 开始支持 size 函数。也只能用在栈数组上。
    cout << "arr size : " << size(arr) << endl;

    // 栈数组可以使用 range base for 循环遍历
    for (auto i : arr)
        cout << i << endl;

    // 销毁堆数组
    delete[] pArray;
    pArray = nullptr;

    if (pArray != nullptr)
    {
        for (size_t i = 0; i < 13; i++)
        {
            cout << "index : " << i << " value : " << pArray[i] << endl;
        }
    }
    cout << "----- yz ------" << endl;
    return 0;
}