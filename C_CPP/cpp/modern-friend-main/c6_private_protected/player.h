#ifndef PLAYER_H
#define PLAYER_H
#include "person.h"
class Player : protected Person
{
    friend std::ostream &operator<<(std::ostream &out, const Player &op);

public:
    Player() = default;
    ~Player() = default;
    void play()
    {
        m_name = "ff";
        m_age = 23;
    }
};
#endif