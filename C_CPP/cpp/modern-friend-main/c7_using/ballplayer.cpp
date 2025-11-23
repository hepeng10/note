#include "ballplayer.h"
std::ostream &operator<<(std::ostream &out, const BallPlayer &op)
{
    out << "BallPlayer address : " << &op << std::endl;
    out << "BallPlayer Age: " << op.m_age << std::endl;
    return out;
}