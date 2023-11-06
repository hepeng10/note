#include <stdio.h>
#define TWO 2           /* 可以使用注释 */
#define HW "C 语言有点意思，\
就是太灵活了不好把控。" /* 反斜杠把该定义延续到下一行 */
#define FOUR TWO *TWO
#define PX printf("X is %d.\n", x)
#define FMT "X is %d.\n"

int main(void)
{
    int x = TWO;
    PX;
    x = FOUR;
    printf(FMT, x);
    printf("%s\n", HW);
    printf("TWO: HW\n");

    int const a = 123;
    // a = 321;
    printf("%d\n", a);

    int arr[FOUR] = {1, 2, 3}; // 初始化数据的数组长度不能用 const 声明的 a
    printf("%d\n", arr[0]);

    int arr1[a]; // 变长数组：不初始化数据则可以使用变量来确定数组的长度
    arr1[0] = 111;
    printf("%d\n", arr1[0]);
}