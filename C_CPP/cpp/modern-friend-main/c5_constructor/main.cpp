#include <iostream>
#include "person.h"
#include "worker.h"
using namespace std;

int main(int argc, char *argv[])
{
    Worker w1("G", "Address", "F", 45);
    cout << w1 << endl;

    /**
     * @note 将 Worker 对象 w1 作为构造函数参数
     */
    Worker w2(w1);
    cout << w2 << endl;

    cout << "----- yz ------" << endl;
    return 0;
}
