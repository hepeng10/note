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
    Player p1;
    Engineer e1;
    p1.play();
    e1.work();
    cout << p1 << endl;
    cout << e1 << endl;

    cout << "-----------------" << endl;
    BallPlayer b1;
    Programmer p2;
    cout << b1 << endl;
    cout << p2 << endl;

    cout << "----- yz ------" << endl;
    return 0;
}
