#include <stdio.h>
#include <string.h>

enum Sex
{
    Female,
    Male
};

struct Person
{
    char name[20];
    int age;
    enum Sex sex;
};

int main(void)
{
    struct Person Tom = {
        "Tom",
        20,
        Male};
    printf("name: %s, age: %d, sex: %d\n", Tom.name, Tom.age, Tom.sex);

    // 指向结构的指针（必须使用地址符）
    struct Person *pTom = &Tom;
    printf("name: %s, age: %d, sex: %d\n", pTom->name, pTom->age, pTom->sex);

    struct House
    {
        struct Person owner;
        char addr[100];
        char *name;
        int unit;
        int floor;
        struct House *next;
    };

    struct House TomHouse1;
    TomHouse1.owner = Tom;
    // 就像数组不能赋值给另一个数组一样，也不能将字符串赋值给字符串数组，只能拷贝
    strcpy(TomHouse1.addr, "美国华盛顿哥伦比亚特区西北区宾夕法尼亚大道1600号");
    TomHouse1.name = "白宫";
    TomHouse1.unit = 3;
    TomHouse1.floor = 2;
    printf("age: %d, addr: %s, name: %s\n", TomHouse1.owner.age, TomHouse1.addr, TomHouse1.name);

    struct House TomHouse2 = {
        Tom,
        "北京市丰台区花乡张家路口121号",
        "你猜",
        12,
        10,
        &TomHouse1};
    TomHouse1.next = &TomHouse2;
    printf("addr1: %s, addr2: %s, %s, %p\n", TomHouse2.next->addr, TomHouse1.next->addr, TomHouse1.next->next->next->next->addr, TomHouse1.next->next->next->next);
}