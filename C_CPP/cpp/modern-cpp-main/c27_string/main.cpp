/**
 * @note 需要引入 string 头文件
 */
#include <iostream>
#include <string>
using namespace std;

int main(int argc, char *argv[])
{
    // 可以使用 + 拼接字符串
    string h{"hello"};
    string y{"yz"};
    string hello{h + " " + y};
    cout << hello << endl;

    // 使用 append 拼接字符串。从abcdef中从索引2开始，截取2个字符即cd追加到s后
    string s{"123456"};
    string hello2{s.append("abcdef", 2, 2)};
    cout << "append: " << s << " " << hello2 << endl;

    // size
    cout << "size: " << hello2.size() << endl; // 长度：为字符串个数
    cout << "capacity: " << hello2.capacity() << endl; // 容量：会根据字符串长度动态调整，会比长度更长一些

    // 可以使用 for range 遍历字符串
    for (auto i : hello2)
    {
        cout << "for range: " << i << ", ";
    }
    cout << endl;
    // at：返回指定位置的字符，越界会抛出异常。类似[i]
    for (size_t i = 0; i < hello2.size(); i++)
    {
        cout << "for index: " << hello2.at(i) << " ";
    }
    cout << endl;
    cout << "front: " << hello2.front() << endl; // front：获取首个字符
    cout << "back: " << hello2.back() << endl; // back：获取最后一个字符

    if (hello2.find("c") != string::npos) // find：查找子字符串，返回子字符串的第一个字符的索引，未找到返回 string::npos
    {
        cout << "get position " << hello2.find("c") << endl;
    }

    cout << "----- yz ------" << endl;
    return 0;
}