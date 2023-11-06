#include <stdio.h>

/** demo1 */
int main(void)
{
    char ch1 = 'A';
    char ch3[] = "你好";
    char ch4[] = {'A', 'B', '\0'};

    printf("%c, %s, %s\n", ch1, ch3, ch4);
};

/** demo2 */
// int main(void)
// {
//     char ch = '你';

//     printf("%c\n", ch);
// };

/** demo3 */
// int main(void)
// {
//     char ch1 = 'A';
//     char ch2[] = "你好";
//     char ch3[] = {'A', 'B'};
//     char ch4[] = {'C', 'D'};

//     printf("%c, %s, %s, %s\n", ch1, ch2, ch3, ch4);
//     printf("%p, %p, %p\n", ch2, ch3, ch4);
// };
