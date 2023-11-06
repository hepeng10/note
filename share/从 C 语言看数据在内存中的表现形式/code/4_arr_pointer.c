#include <stdio.h>

int main(void)
{
    int arr1[6] = {1, 3, 8, 12, 32};
    printf("%p, %p, %p, %p, %p, %p\n", arr1, &arr1[0], &arr1[1], &arr1[2], &arr1[3], &arr1[4]);
    printf("%p, %p, %p\n", arr1, &arr1, &arr1[0]); // 三个的值都相同，都是数组首元素的地址

    // int arr2[6] = arr1; 不能将数组赋值给另一个数组。数组变量的值是地址，将地址赋值给数组类型不匹配；另一点是 arr2 的长度可能比 arr1 小，所以 c 语言不允许这样做。
    int *p1 = arr1;
    printf("%p, %d, %d\n", p1, p1[0], p1[1]);
    p1++; // 为什么 p1++ 后就能指向第二个元素？
    printf("%d\n", p1[0]);

    // int *p2 = {3, 7, 10}; 类型不匹配
}