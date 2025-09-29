#ifndef PROGRAMMER_H
#define PROGRAMMER_H
#include "engineer.h"
class Programmer : public Engineer
{
    friend std::ostream &operator<<(std::ostream &out, const Programmer &op);

public:
    Programmer() = default;
    ~Programmer() = default;
};
#endif