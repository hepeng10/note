#include <stdio.h>
long add(int a, int b);
void changeParams(int *p1, int *p2);
long higherOrderFn(long (*fp)(int a, int b), int a, int b);
long multiply(int a, int b);
int (*getMinus(int a))(int b);

int x = 1;

int main(void)
{
    int a = 100;
    int b = 1000;
    long sum = add(a, b);
    printf("%d, %ld\n", x, sum);

    changeParams(&a, &b);
    printf("%d, %d\n", a, b);

    long c = higherOrderFn(add, a, b);
    printf("%ld\n", c);

    long d = higherOrderFn(multiply, a, b);
    printf("%ld\n", d);

    int (*minus)(int n) = getMinus(5);
    int e = minus(10);
    printf("%d\n", e);
}

long add(int a, int b)
{
    x = 10;
    return a + b + x;
};

void changeParams(int *p1, int *p2)
{
    *p1 = 10000;
    *p2 = 100000;
}

// 接收函数的函数
long higherOrderFn(long (*fp)(int a, int b), int x, int y)
{
    return (*fp)(x, y);
}

long multiply(int a, int b)
{
    return a * b;
}

// 返回函数的函数：getMinus(1) 调用后返回 int (*minus)(int b) 函数指针，调用函数指针 minus(2) 后返回 int 数值
int (*getMinus(int a))(int b)
{
    int minus(int n)
    {
        return n - a;
    };
    return minus;
}