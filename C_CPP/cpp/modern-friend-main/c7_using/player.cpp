#include "player.h"
std::ostream &operator<<(std::ostream &out, const Player &op)
{
    out << "Player address : " << &op << std::endl;
    out << "Player name : " << op.get_name() << ", Age: " << op.m_age << std::endl;
    return out;
}