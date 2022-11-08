# Record
通过 联合类型、枚举类型、对象类型 等快速创建具有相同类型值的对象类型：
```ts
// 我们有一个联合类型，想创建一个对象类型，key 是这些联合类型
type Option = 'one' | 'two' | 'three';
// 对象类型的值是这个类型
interface OptionRequirement {
  someBool: boolean;
  someString: string;
}

// 希望得到的类型
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

# keyof
生成某个类型的属性名组成的联合类型。
```ts
type Person = {
  name: string;
  age: number;
}
type PersonProps = keyof Person;  // 'name' | 'age'
```

# typeof
对于已经存在的变量，可以通过 typeof 获取其类型（注意和 js 中 typeof 做区分）：
```ts
const obj = {
  name: "name",
  age: 12,
};

type Person = typeof obj;

// 等价于
type Person = {
  name: string;
  age: number;
};
```
```ts
function foo(name: string): void {}
type Foo = typeof foo;

// 等价于
type Foo = (name: string) => void；
```
```ts
class Person {
  name = "st";
  age = 12;
  static lifetime = 100;
  static staticMethod() {}
  method() {}
}

type PersonConstructor = typeof Person;

// 等价于
type PersonConstructor = {
  new (): Person;
  lifetime: number;
  staticMethod(): void;
};
```

# 索引访问操作符
访问一个类型中的索引类型。
```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {  // 这里的 T[K] 就是索引访问操作符
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```
通过以上示例可以看出，我们可以通过索引获取类型中的类型，那么就可以这样用了：
```ts
type Person = {
  name: string;
  age: number;
}
const name: Person['name'] = 'Tirion';
```

# loader
在 webpack 中编译 ts，可以使用 ts-loader 或 babel-loader 进行编译。
* ts-loader: 编译的时候可以进行类型检查
* babel-loader @babel/preset-typescript: 不能进行类型检查

建议使用 ts-loader。

# 使用泛型替代 any
在函数或类中，当接收的类型可能为很多种情况的时候就该使用泛型，而不是使用 any。

如 react 中的函数组件类型定义，接收的 props 不能确定类型，我们可能会这样使用 any 来定义。
```ts
// 因为不知道 props 是啥类型，所以使用了 any
interface FunctionComponent {
  (props: any): ReactElement | null;
}
```

实际上我们应该使用泛型来定义，这样加强了类型的定义，能方便类型声明的扩展和推断。
```ts
interface FunctionComponent<P = {}> {
  (props: P): ReactElement | null;
}
```
比如我们想扩展类型定义：
```ts
interface FunctionComponent<P = {}> {
  (props: P): ReactElement | null;
  defaultProps?: Partial<P>;
}
```

# ReturnType
获取函数返回值类型
```ts
function add(x: number, y: number): number {
  return x + y;
}
// 使用 typeof 获取到函数的类型，再使用 ReturnType 获取到返回值类型
type AddReturn = ReturnType<typeof add>;
const a: AddReturn = 123;
const b: AddReturn = '123';  // ts 提示错误，类型应该为 number
```

# ??
```ts
let a = 0;
let b =  a || 1;  // 前面只要类型转换后是 false 就会取后面的值，所以 b 是 1
let c = a ?? 1;  // 前面为 null 或 undefined 才会取后面的值，所以 c 是 0
```

# unknown
尽量使用 unknown 替代 any，因为当我们使用 any 的时候实际上是没有进行任何类型限制的，我们可以：
```ts
const a: any = 1;
a.b = 2;
```
以上代码 ts 不会有任何提示。但是当我们使用 unknown 时：
```ts
const a: unknown = 1;
a.b = 2;
```
ts 会有错误提示。我们不能直接操作 unknown 类型的内部属性。所以我们在使用 unknown 的时候实际上需要先将 unknown 类型进行类型断言后再使用：
```ts
let a: unknown = { b: 1 };
type A = {
  b: number
};
(a as A).b = 2;  // 进行类型断言后再使用，因为我们知道 a 的类型应该是 A
```
```ts
let a: unknown;
a = 'aaa';
// a.trim();  // 这里会提示错误
if (typeof a === "string") {
    a.trim();  // ok
}
```
这样的一个强制要求就保证了类型安全，因为我们在进行类型断言的时候是应该知道能不能转换的。

# 全局类型和模块
> 在 TS 项目中，无论是以 .js 还是以 .ts 命名的文件，只要文件中"根级别"没有使用 import 或 export 进行导入或导出，那么文件中声明的变量、函数、类型等都是全局的。只要"根级别"使用了 import 或 export，那么这个文件就变成了一个模块。
**下面 namespace 中使用 import export 就不是"根级别"。**

声明全局类型可以像下面这样：
```ts
declare namespace Abc {
  type MyType = xxx;
}
```
但是如果在声明全局类型的文件中使用了 import export 这样的语句，这个文件就会变成模块，其中的全局类型就失效了。如：
```ts
declare namespace Abc {
  type MyType = xxx;
}
export type User = xxx;
```
但是在命名空间内部可以使用 import export，如：
```ts
declare namespace Abc {
  export type MyType = xxx;
}

declare namespace Express {
  interface Request {
    user: import("./user").User;
  }
}
```
> 全局类型声明通常用在给老项目补充类型描述，新项目中不建议使用，直接使用模块更好。不过像图片，\_\_DEV__ 这样的全局常量也可以使用全局声明。

# .d.ts
通常以 .d.ts 命名的文件，是用来给非 TS 项目进行类型描述的，在里面可以方便的定义全局类型。使用 TS 开发的类库等可以使用工具在编译的时候生成 .d.ts 文件。

# @types
在 node_modules 中有个特殊的目录叫 @types，这个目录是专门用来存放一些第三方库的全局类型声明的，但是我们需要安装对应库的 @types。
例如添加 jQuery 的声明文件：
```
npm install @types/jquery --save-dev
```
在 tsconfig.json 中配置 typesRoots:
```json
    "typeRoots": [
      "node_modules/@types",  // 添加 @types 目录
      "global.d.ts",  // 其它文件/目录
    ],
```
typeRoots 默认指向 node_modules/@types，但是手动配置了其它目录就会覆盖默认配置，也就没有 node_modules/@types 了，所以如果还希望使用 node_modules/@types 那么也得手动配置 node_modules/@types。

# interface 索引签名的 BUG
```ts
// 声明一个索引签名
interface Obj {
  [key: string]: string;
};
// interface 声明类型
interface Person1 {
  name: string;
}
// type 声明类型
type Person2 = {
  name: string;
};
// interface 声明类型的变量
const tmpPerson1: Person1 = { name: 'Tirion' };
// error: interface 赋值给索引签名会提示错误
const person1: Obj = tmpPerson1;
// type 声明类型的变量
const tmpPerson2: Person2 = { name: 'Tirion' };
// success: type 赋值给索引签名正常
const person2: Obj = tmpPerson2;


// interface 声明类型并添加索引签名
interface Person3 {
  name: string;
  [key: string]: string;
}
const tmpPerson3: Person3 = { name: 'Tirion' };
// success: interface 中有索引签名所以正常
const person3: Obj = tmpPerson3;
```

# 内置对象原型上添加方法
TS 不推荐在原型上添加属性或方法，如果硬是要加可以这样写：
```ts
let a = 1.23123123;
(Number as any).prototype.toFixed2 = function () {
  return this.toFixed(2);
};
console.log((a as any).toFixed2());
```

# Parameters
获取函数的参数类型。  
[TypeScript 获取函数的参数类型、返回值类型](https://lzw.me/a/typescript-parameters-and-returntype.html)
```ts
function add(a: number, b: number): number {
  return a + b;
}
type AddParams = Parameters<typeof add>; // 获取所有参数类型
type A = AddParams[0]; // 取出第一个参数的类型
type A = Parameters<typeof add>[0]; // 也是取出第一个参数的类型
```