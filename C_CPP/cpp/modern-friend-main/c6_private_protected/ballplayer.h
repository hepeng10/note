#ifndef BALLPLAYER_H
#define BALLPLAYER_H
#include "player.h"
class BallPlayer : public Player
{
    friend std::ostream &operator<<(std::ostream &out, const BallPlayer &op);

public:
    BallPlayer() = default;
    ~BallPlayer() = default;
};
#endif