#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    int scores{0};
    cout << "Please input your scores: " << endl;
    cin >> scores;
    if (scores > 90)
    {
        cout << " A " << endl;
    }
    else if (scores > 75)
    {
        cout << " B " << endl;
    }
    else if (scores > 60)
    {
        cout << " C " << endl;
    }
    else
    {
        cout << "You must work hard!!!" << endl;
    }

    cout << "----- yz ------" << endl;
}