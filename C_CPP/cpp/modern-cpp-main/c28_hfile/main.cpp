/**
 * @note
 * 使用命令行进行多文件编译：
 *  g++ -o main.exe main.cpp yourfile.cpp
 *  这样就将两个文件一起编译为了 main.exe
 * 实际上是这两条语句的合并写法：
 *  g++ -c main.cpp yourfile.cpp // -c 编译后生成 .o 文件
 *  g++ -o main.exe main.o yourfile.o // -o 进行链接等操作，生成可执行文件
 * 
 * vscode 编译需要修改 .vscode/tasks.json 文件
 * ！！！使用 vscode 进行多文件编译时需要单独打开此项目进行编译，而不能在 note 目录中进行编译
 */
#include <iostream>
// 引入另一个文件的头文件
#include "yourfile.h"
using namespace std;

int main(int argc, char *argv[])
{
    cout << add(1, 2) << endl;
    cout << "----- yz ------" << endl;
    return 0;
}