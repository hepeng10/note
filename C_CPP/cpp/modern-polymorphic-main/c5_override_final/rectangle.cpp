#include "rectangle.h"

Rectangle::Rectangle(double x, double y, std::string_view name)
    : Shape(name), m_x(x), m_y(y)
{
}