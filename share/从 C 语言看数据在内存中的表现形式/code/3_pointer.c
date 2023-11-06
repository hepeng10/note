#include <stdio.h>

int main(void)
{
    int arr[] = {1, 2};
    printf("数组中两个 int 的地址是：%p, %p\n", &arr[0], &arr[1]);

    int *p = arr;
    printf("指针 p 的指向的地址：%p, %p\n", p, arr); // 为什么这里没有使用 &

    char ch = 'A';
    char *p1 = &ch;
    printf("%c, %c\n", *p1, ch);

    char **p2 = &p1;
    printf("%p, %c\n", *p2, **p2);
    printf("%p, %p\n", *p2, p1);

    // 通过指针修改变量的值
    *p1 = 'B';
    printf("%c\n", ch);
}