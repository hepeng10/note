#include <stdio.h>
#include "multiply.h"

int main(void)
{
    char ch = 'A';
    char chs[] = "你好";
    int n = 10;
    char name[20];
    int age;
    char *p1;
    int *p2;

    printf("请输入你的名字：");
    scanf("%s", name);
    printf("请输入你的年龄：");
    scanf("%d", &age);

    printf("你的名字是：%s\n", name);
    printf("你的年龄是：%d\n", age);

    p1 = name;
    p2 = &age;
    printf("你的名字是：%s\n", p1);
    printf("你的年龄是：%d\n", *p2);

    long x = multiply(age, n);
    printf("乘积为：%ld\n", x);

    printf("字符长度：%zd, 字符串长度：%zd\n", sizeof(ch), sizeof(chs));
};

// gcc 1_base.c multiply.c
