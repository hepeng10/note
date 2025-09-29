#include "square.h"

Square::Square(double x, std::string_view name)
    : Rectangle(x, x, name)
{
}

Square::~Square()
{
    std::cout << "Square deconstructor" << std::endl;
}