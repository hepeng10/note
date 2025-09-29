#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    size_t Count{0};
    cin >> Count;
    for (size_t i{0}; i < Count; ++i)
    {
        if (i == 5)
            continue;
        if (i == 8)
            break;
        cout << "index : " << i << endl;
    }

    cout << "----- yz ------" << endl;
    return 0;
}