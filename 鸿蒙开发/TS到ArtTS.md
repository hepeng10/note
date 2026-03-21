[官方详细的适配指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/typescript-to-arkts-migration-guide)，下面主要记录容易出错的地方：

1. 变量声明时尽量初始化，如果变量确实可以为undefined，在类型声明中加上undefined，如`let a: number | undefined`。
2. 禁止 import 循环依赖。
3. 允许使用科学计数法，如`let a: number = 1e3`。
4. 禁止使用 any, unknown 类型。
5. 禁止运行时修改对象布局，如给对象添加/删除属性或方法，因此对象声明时就要确定好属性和方法。
6. 类型（类、接口、枚举）和命名空间的名称必须唯一，并且不能与其他名称（如变量名、函数名）重复。**所以建议使用类型前缀等方式避免冲突。**

    ```ts
    let name: string
    type TName = number[] // 为避免名称冲突，此处不允许使用name
    ```

7. 不支持交叉类型，如`type T = A & B`。可以使用接口继承来实现类似功能，如`interface T extends A, B {}`。
8. 不支持this类型，如：

    ```ts
    class C {
        m(c: C) { // 不能写成 m(c: this)
            // ...
        }
    }
    ```

9. 不支持在构造函数中声明类成员，必须在类中显示声明。

    ```ts
    class C {
        a: number // 需要在类中显示声明
        constructor(a: number) {
            this.a = a
            // this.b = 1 // 不能在构造函数中声明成员b
        }
    }
    ```

10. 不支持索引访问字段，例如（obj.field），不支持索引访问（obj['field']）。
11. 支持通过索引访问TypedArray（例如Int32Array）中的元素。

    ```ts
    let arr: Int32Array = new Int32Array(10)
    let value: number = arr[0] // 允许通过索引访问TypedArray中的元素
    ```

12. 不支持 structural typing（结构化类型），即使两个类型的结构相同，如果它们的名称不同，也被视为不同的类型。

    ```ts
    type A = { x: number }
    type B = { x: number }
    
    let a: A = { x: 1 }
    let b: B = a // 错误，A和B是不同的类型，不能直接赋值
    ```

13. 需要显式标注对象字面量的类型，例如：

    ```ts
    interface Point { // 需要先定义接口来描述对象的结构
        x: number
        y: number
    }
    let p: Point = { x: 1, y: 2 } // 无法进行类型推断，必须显式标注对象字面量的类型
    ```

14. 不支持使用对象字面量声明类型，建议使用类或接口声明类型。

    ```ts
    // 错误，不能使用对象字面量声明类型
    let o: {x: number, y: number} = {
        x: 2,
        y: 3
    }
    ```

15. 类型转换只支持 as 语法，不支持尖括号语法。

    ```ts
    let a: number = 5
    let b: string = a as string // 允许使用 as 语法进行类型转换
    // let c: string = <string>a // 错误，不支持尖括号语法进行类型转换
    ```

16. 一元运算符+、-和~仅适用于数值类型。

    ```ts
    let b = +'5';    // 编译时错误
    console.log('sdf' + 'sdf'); // 这样可以，是作为二元运算符使用的
    ```

17. 不允许使用 typeof 作为类型。

    ```ts
    let a: number = 5
    let b: typeof a = 10 // 错误，不允许使用 typeof 作为类型
    ```

18. 不支持解构赋值。

    ```ts
    let obj = { x: 1, y: 2 }
    let { x, y } = obj // 错误，不支持解构赋值
    ```

19. 不支持 for...in 循环。使用 for 循环替代。

    ```ts
    let arr = [1, 2, 3]
    for (let i in arr) { // 错误，不支持 for...in 循环
        console.log(arr[i])
    }
    ```

20. 不支持映射类型。

    ```ts
    // 错误，不支持映射类型
    type OptionsFlags<Type> = {
        [Property in keyof Type]: boolean
    }
    ```

21. 不支持在函数内使用 function 声明函数。可以使用 const 声明箭头函数。

22. 不支持接口声明合并。需要写到一个接口里。

    ```ts
    interface A {
        x: number
    }
    interface A { // 错误，不支持接口声明合并
        y: number
    }
    ```

23. 不支持一些utility类型：仅支持Partial、Required、Readonly和Record，不支持TypeScript中其他的Utility Types。