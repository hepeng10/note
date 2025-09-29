#include "square.h"

Square::Square(double x, std::string_view name)
    : Rectangle(x, x, name)
{
}