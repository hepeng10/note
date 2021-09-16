// 数组：元组
;(() => {
    let arr:[number, string]
    arr = [2, 'hello'];
    arr.push(6);  // 往元组中添加数据，数据类型必须是元组定义时有的数据类型。这里就可以添加 number 和 string
    arr.push('world');
    // arr.push(true)  // 添加其它类型则报错
    // arr[5] = 'world'  // 使用下标添加也会报错
})()


// 枚举
;(() => {  // 自执行函数前加 ; 是为了避免代码压缩后导致语法错误。比如这里去掉就会报错，压缩后就是 (() => {})()(() => {})() 有语法错误；加了分号就正常 (() => {})();(() => {})();
    enum Color {
        green,
        blue = 3,
        red = 5,
        yellow,  // 会根据前面的值自动增加，值就为6
        pink = 'a',
        // gray,  // 前一个的值为字符串，这里就不能自增了，所以不赋值会报错
    }
    console.log(Color.green)
    console.log(Color.blue)
    console.log(Color.yellow)
    console.log(Color[5])  // 具有反查功能
})()


// void 函数
;(() => {
    function fn(): void {
        console.log('void 函数没有返回值')
        // return 1;  // return 了值就会报错
        // return undefined;  // 可以 return undefined 和 null，但是没啥意义
    }
})()


// null 和 undefined
// null 和 undefined 可以相互赋值
;(() => {
    let n: null = undefined
    let u: undefined = null
    // n = 1 // 其它类型赋值给 null 或 undefined 类型就不行了
    let num: number = 123;
    num = null;  // null 和 undefined 可以赋值给其它类型，因为它们是所有类型的子类型。ts 中子类型可以赋值给父类型。可以通过开启 strictNullChecks 来拒绝 null 或 undefined 赋值给其它类型
})()


// never 类型
;(() => {
    function error(msg: string): never {  // never 类型的函数没有返回值。只能无限循环或抛出异常
        throw new Error(msg);
    }
    function fail() {
        error('something failed');
    }
})()


// object：非原始数据类型
;(() => {
    let o: object;
    // o = 1  // 赋值原始类型就会报错
    // o = '123'
    o = [1, 2, 3]
    o = { a: 1 }
})()


// 类型强制转换
;(() => {
    let v: any = 'this is a string';
    // <type> 和 as 两种方式强制类型转换
    let s: string = <string>v;
    let n: number = (<string>v).length;
    let s1: string = v as string;
    let n2: number = (v as string).length;
})()
