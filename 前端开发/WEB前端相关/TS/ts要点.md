## Record 的使用
通过 联合类型、枚举类型、对象类型 等快速创建具有相同类型值的对象类型：
```ts
// 我们有一个联合类型，想创建一个对象类型，key 是这些联合类型
type Option = 'one' | 'two' | 'three';
// 对象类型的值是这个类型
interface OptionRequirement {
  someBool: boolean;
  someString: string;
}

// 像这样的类型
type OptionRequirements = {
    one: OptionRequirement;
    two: OptionRequirement;
    three: OptionRequirement;
}

// 但是上面的写法明显很坑爹，那么我们可能会想到这样的写法
interface OptionRequirements {
  [key: Option]: OptionRequirement;
}
// 但是这样的写法 ts 不支持，索引签名不能是自定义类型，只能是 string, number 这些
// 这时就可以用 in 语法
type OptionRequirements = {
  [key in Options]: OptionRequirement;  // 是 in 不是 key in，key 可以改成任意名称
}

// 还有一个内置工具 Record，可以快速创建。内部其实也是使用的 in 语法
type OptionRequirements = Record<Option, OptionRequirement>
```