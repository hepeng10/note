#include <stdio.h>
#define HW "Hello World"

int main(void)
{
    char str1[] = "Hello World";
    char str2[] = HW;
    char *p1 = "Hello World";
    char *p2 = "Hello World";
    char *p3 = HW;

    printf("%p, %p, %p, %p, %p\n", &str1, &str2, p1, p2, p3);

    str1[0] = 'N';
    printf("%s\n", str1);
    // p1[0] = 'N'; 不能修改
}