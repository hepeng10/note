/**
 * @note
 * 栈：
 *  * 存储本地变量和函数调用
 *  * 变量的生命周期由作用域决定
 * 
 * 堆：
 *  * 运行时动态分配内存
 *  * 生命周期由程序员管理，与作用域无关
 *  * 使用 new 分配内存，使用 delete 释放内存。删除后建议将指针设置为 nullptr。多次 delete 会导致未定义行为使程序出错。
 *  * 内存泄漏和空指针问题
 */

#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    // 在栈上应用指针
    int number{50};
    int *pNumber = &number; // 创建指针的时候必须初始化
    // 不能这样
    // int *pNumber;
    // *pNumber = &number;

    cout << number << ": " << *pNumber << endl; // 解引用
    cout << &number << ": " << pNumber << endl; // 指针的值就是地址

    // 堆上
    int *pNumber0{nullptr}; // 初始化为 nullptr，和不初始化是不一样的
    /**
     * @note new 会在堆上分配内存，返回的是一个指向该内存的指针
     */
    pNumber0 = new int; // 这个地址就是固定的 我们就可以将这个地址的值设置为一个数
    *pNumber0 = 13;

    cout << *pNumber0 << endl;

    /**
     * @note delete 会释放堆上的内存，但是不会将指针设置为 nullptr，所以建议删除后将指针设置为 nullptr。
     */
    delete pNumber0;
    // delete pNumber0; // 多次 delete 会导致未定义行为使程序出错
    pNumber0 = nullptr; // 不设置为 nullptr 可能会导致悬空指针问题（类似野指针）

    // cout << *pNumber0 << endl; // 删除了就不要再使用了
    cout << "----- yz ------" << endl;
    return 0;
}