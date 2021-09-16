// 泛型代表某一个相同类型
// <T> 是告诉编译器，这里定义了一个泛型变量叫做 T，当然也可以用其它变量名，只是通常都用 T 表示。
// 这里的 T 可以是 number，可以是 string，可以是 boolean，可以是自定义类型。但是接收的参数 arg 是啥类型，返回值就是啥类型，因为它们都用的 T。
function id<T>(arg: T):T {
    return arg;
}
id<number>(123)  // 显示声明泛型类型
// id<number>('123')  // 声明了类型就不能传错误的类型
id('abc')  // 类型推断泛型类型



// 泛型接口
interface IGenerateId {
    <T>(arg: T): T  // 定义了一个泛型的函数调用签名
}
function id2<T>(arg: T): T {
    return arg;
}
let myId: IGenerateId = id2;  // id2 符合 IGenerateId 接口

// 另一种泛型接口定义方式。定义接口的时候声明接收一个泛型，接口里面各个地方就能使用这个泛型变量了
interface IGenerateId2<T> {
    (arg: T): T;  // 接口里面使用接口接收的泛型变量
}
function id3<T>(arg: T): T {
    return arg;
}
let myId2: IGenerateId2<number> = id3;  // 注意，这里在使用接口的时候就要显示传入泛型的类型，告诉接口接收的泛型类型。



// 泛型约束
interface ILengthwise {  // 定义的接口中包含 length 属性
    length: number;
}
function loggingIdentity<T extends ILengthwise>(arg: T): T {  // 定义泛型继承具有 length 属性的接口
    console.log(arg.length);    // 调用 arg 的 length 属性就不会报错了，因为接收的泛型 T 继承了带有 length 属性的接口，所以必然有 length 属性
    return arg;
}
// loggingIdentity(123)  // 当我们传入数字时，编译器知道数字没有 length 属性，所以会提示错误
loggingIdentity('abc')  // 传入字符串就正确了
loggingIdentity({ length: 5, value: 'asdfg' })  // 传入一个带有 length 属性的对象也没问题


// 泛型约束中使用类型参数
// 这里定义了另一个泛型 K，而这个泛型 K 使用了关键字 extends keyof，表示 K 是 T 的一个 key
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // 传入的第二个参数 a 是 x 的 key，正常
// getProperty(x, "m"); // 传入的第二个参数 m 不是 x 的 key，报错



// 在泛型里使用类类型
// { new(): T } 是构造器接口，用于描述一个类的构造器类型。详见 3.interface.ts
// 这是一个工厂函数，接收的参数 c 是一个类，它的构造器返回值的类型为 T，也就是实例化的对象类型为 T
function create<T>(c: { new(): T }): T {
    return new c();  // 实例化 c 类，得到类型 T 的实例
}
