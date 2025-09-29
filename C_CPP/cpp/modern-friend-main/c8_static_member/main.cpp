/**
 * @note
 * 此节主要看 Person 类和 Worker 类
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
    Person p1;
    Person p2;
    Worker w1;
    Worker w2;
    cout << "Worker count " << Worker::m_count << endl;

    cout << "----- yz ------" << endl;
    return 0;
}
