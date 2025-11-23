/**
 * @note
 * 此节主要看 Person 类、Engineer 类、Programmer 类
 * engineer 类是 person 类的 private 子类
 * 使用 using 关键字可以访问父类中的 public 属性和 protected 属性
 */
#include <iostream>
#include "person.h"
#include "worker.h"
#include "engineer.h"
#include "player.h"
#include "ballplayer.h"
#include "programmer.h"
using namespace std;

// person -> public worker
// person -> private engineer -> public programmer
// person -> protected player -> public ballplayer
int main(int argc, char *argv[])
{
    /**
     * @note
     * programmer 类是 engineer 类的 public 子类，
     * 可以访问 engineer 类中的 public 属性和 protected 属性。
     * 虽然 engineer 类是 person 类的 private 子类，
     * 但是 engineer 使用了 using 将 get_age 和 get_name 方法提升为 public 方法，
     * 所以 programmer 类可以访问 engineer 类中的 get_age 和 get_name 方法。
     */
    Programmer p2;
    cout << p2.get_age() << endl;
    cout << p2.get_name() << endl;
    cout << p2 << endl;

    cout << "----- yz ------" << endl;
    return 0;
}
