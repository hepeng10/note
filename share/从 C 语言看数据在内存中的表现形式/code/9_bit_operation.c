#include <stdio.h>
#include <stdlib.h>
#define uint32 unsigned int
#define uint8 unsigned char

void ShortDivOutputBin(char *str, uint32 input)
{
    uint8 temp[33] = {0};
    int i = 0;
    printf("%s", str);
    while (input)
    {
        temp[i] = input % 2;       // 取余数存放到数组中，此为得到的二进制数
        input = (uint32)input / 2; // 短除，while中判断是否除尽
        i++;                       // 存储了一个二进制数，自加存储下一个
    }
    for (i--; i >= 0; i--) // 由于最后一次input为0无效，i还是自加了，因此最后一次自加的值是无用的，所以先自减，然后将余数从后往前读取
    {
        printf("%d", temp[i]);
    }
    printf("\r\n");
}

int main(void)
{
    int data = 0b1111;
    ShortDivOutputBin("原始数据：", data);

    // 掩码
    int mask = 0b1000;
    int res = data & mask;
    ShortDivOutputBin("掩码：", res);

    // 打开位
    data = 0b0000;
    mask = 0b0110;
    res = data | mask;
    ShortDivOutputBin("打开位：", res);

    // 关闭位
    data = 0b1011;
    mask = 0b0011;
    res = data & ~mask;
    ShortDivOutputBin("关闭位：", res);

    // 切换位
    data = 0b0110;
    mask = 0b1100;
    res = data ^ mask;
    ShortDivOutputBin("切换位：", res);

    // 判断某位是0还是1
    data = 0b1000;
    mask = 0b0100;
    res = (data & mask) >> 2;
    printf("当前位是：%d\n", res);
}