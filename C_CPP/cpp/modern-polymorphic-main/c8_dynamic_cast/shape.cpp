#include "shape.h"

Shape::Shape(std::string_view name)
    : m_name(name)
{
}

Shape::~Shape()
{
    std::cout << "Shape deconstructor" << std::endl;
}