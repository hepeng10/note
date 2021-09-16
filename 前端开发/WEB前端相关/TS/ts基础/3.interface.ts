interface ISquare {
    color: string;
    area: number;
    borderColor: string;
}

interface ISquareConfig {
    color?: string;  // ?: 表示可选类型
    width: number;
    readonly borderColor?: string;  // 只读属性
    [propName: string]: any;  // 索引签名：接收额外数据
}

function createSquare(config: ISquareConfig): ISquare {
    const { color = 'red', width, borderColor = 'black' } = config;
    // config.borderColor = 'yellow';  // 不能对只读属性进行修改
    return { color, area: width * width, borderColor };
}

createSquare({ color: 'blue', width: 200, borderColor: 'black' });
createSquare({ width: 300 });  // 接口中定义 color 是可选的，所以可以不用传
createSquare({ color: 'blue', width: 200, borderColor: 'black', radius: 10, other: 'xxx' });  // 传入额外的数据。接口中必须定义索引签名


// 函数的接口定义
interface ISearchFun {
    // (接收的参数和类型): 返回值类型
    (source: string, subStr: string): boolean  // 定义函数调用签名
}
let mySearch: ISearchFun;  // 创建函数的时候要先声明函数类型，再实现函数
// 实现时，参数名不用保持一致，但是数目和类型要一致
mySearch = (source:string, sub:string): boolean => {
    const res = source.search(sub);
    return res > -1;
}
// 不写类型，TS 会自动推断
mySearch = (source, sub) => {
    const res = source.search(sub);
    // return res;  // 返回值不是布尔值，也会过不了类型推断
    return res > -1;
}

// readOnly 只读，在首次赋值后不可修改
interface IReadOnly {
    readonly [index: number]: string  // 使用 readOnly 定义一个索引签名
}
let myArr: IReadOnly = ['a', 'b', 'c'];
// myArr[0] = 'd';  // 进行修改会提示错误



// 类类型：接口作为类似 Java 的接口使用
interface IClock {  // 实例接口，提供给类来实现其中定义的公共属性和方法
    currentTime: Date;
    setTime(d: Date);
}
interface IClockConstructor {  // 构造器接口，用于描述一个类的构造器类型。（不是提供给类来实现的，只是用于描述）
    new(hour: number, minute: number): IClock  // 构造器签名，定义类的构造器接收的参数类型和返回的类型（构造器返回的类型即类实例化后得到的对象实例的类型）
}
class MyClock implements IClock{  // 类实现接口，就必须实现接口中定义的属性和方法
    currentTime: Date;
    h: number;
    m: number;
    constructor(h: number, m: number) {
        this.h = h;
        this.m = m;
    }
    setTime(d: Date) {
        this.currentTime = d;
    }
}
const createClock = (Con: IClockConstructor, h: number, m: number): IClock => {
    return new Con(h, m);  // 接收的 Con 类是 IClockConstructor 类型，所以在 new 的时候必须接收两个 number 类型参数；返回的实例类型要满足 IClock 接口定义。
}
createClock(MyClock, 10, 20);



// 混合类型：通常用于给第三方库定义类型，正常情况不怎么会用
interface ICounter {  // 同时描述函数和对象
    // 描述函数签名
    (start: number): string;
    // 描述对象成员
    interval: number;
    reset(): void;
}
function getCounter(): ICounter{
    const counter = <ICounter>function(s){};  // 将函数强制转换为 ICounter 类型。这个函数必须符合 ICounter 里的函数签名
    counter.interval = 10;  // 给 counter 添加 ICounter 中定义的成员
    // counter.interval1 = 10;  // ICounter 中没定义，所以乱加会提示错误信息
    counter.reset = function () {
        this.interval = 0;
    }
    return counter;
}
getCounter();
