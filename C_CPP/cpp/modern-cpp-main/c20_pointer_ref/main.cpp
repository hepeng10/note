/**
 * @note
 * 引用：
 * 1. 引用变量是变量的别名，引用变量和被引用的变量指向的是同一个内存地址。
 * 2. 不可改变为其他值的引用
 * 3. 不需要解引用“*”就可以读取和写入数据
 * 4. 必须初始化（因为是其它变量的别名，不初始化就不是其它变量的别名了）
 */
#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
     // 引用与指针的不同
     double value{13.13};
     double &refValue{value}; // 引用，refValue 是 value 的别名
     double *pValue{&value}; // 指针，pValue 指向 value 的内存地址
     // 读取：指针需要解，引用不需要解引用
     cout << pValue << endl;
     cout << "value : " << value << "    "
          << "pointer : " << *pValue << "     "
          << "ref : " << refValue << endl;
     // 修改 value
     *pValue = 13.1;
     cout << "value : " << value << "    "
          << "pointer : " << *pValue << "     "
          << "ref : " << refValue << endl;

     // 引用就是个别名，可以直接修改
     refValue = 13.13;
     cout << "value : " << value << "    "
          << "pointer : " << *pValue << "     "
          << "ref : " << refValue << endl;

     // 引用可以变成其他值的引用吗
     cout << "value address : " << &value << " : " << pValue << endl;
     double otherValue = 1.3;
     refValue = otherValue; // 只是赋值，而不是改变引用
     cout << "value : " << value << "    " // value 被赋值为 otherValue 的值
          << "pointer : " << *pValue << "     "
          << "ref : " << refValue << "    " // refValue 也是 otherValue 的值
          << "pointer address : " << pValue << endl;

     // 指针解引用后被赋值是修改指针指向的值，而不是修改引用
     double otherValue0 = 1.7;
     *pValue = otherValue0;
     cout << "value : " << value << "    " // value 也被修改为 otherValue0 的值
          << "pointer : " << *pValue << "     "
          << "ref : " << refValue << "    " // refValue 也被修改为 otherValue0 的值
          << "pointer address : " << pValue << endl;

     // 将指针指向不同的值
     double otherValue1 = 1.8;
     pValue = &otherValue1; // 指针被指向了 otherValue1 的内存地址
     cout << "otherValue1 address : " << &otherValue1 << endl;
     cout << "value : " << value << "    " // value 没有被修改，还是 otherValue0 的值
          << "value address : " << &value << "   "
          << "pointer : " << *pValue << "     "
          << "ref : " << refValue << "    " // refValue 也没有被修改，还是 otherValue0 的值
          << "pointer address : " << pValue << endl;

     cout << "----- yz ------" << endl;
     return 0;
}