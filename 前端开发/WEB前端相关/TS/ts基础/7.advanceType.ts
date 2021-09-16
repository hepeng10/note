// TS 的高级类型

// 交叉类型：将多个类型合并为一个类型。
;(() => {
    // 这里的 extend 函数作用是合并两个对象。可以看到函数的返回值用了 T & U 交叉类型
    function extend<T, U>(first: T, second: U): T & U {
        let result = <T & U>{};  // 通过类型断言的方式将 result 的类型断言为 T & U
        for (let id in first) {
            // result[id] = first[id];  // 这里不能直接赋值，因为 first 的类型为 T，result 的类型为 T & U
            (<any>result)[id] = (<any>first)[id];  // 类型断言后赋值解决类型问题
        }
        for (let id in second) {
            if (!result.hasOwnProperty(id)) {
                (<any>result)[id] = (<any>second)[id];
            }
        }
        return result;  // 返回 T & U 类型的 result
    }

    class Person {
        // 通过构造函数直接声明成员属性
        constructor(public name: string) {
        }
    }

    interface Loggable {
        log(): void;
    }

    class ConsoleLogger implements Loggable {
        log() {
            // ...
        }
    }

    // 使用 extend 函数。返回值 jim 就是个交叉类型，交叉了 Person 和 Loggable 两个类型。
    var jim = extend(new Person("Jim"), new ConsoleLogger());
    // 交叉类型 jim 可以调用两个源类型的属性和方法而不会报错
    jim.name;
    jim.log();

})()


// 联合类型：表示几种类型之一，使用 | 隔开
;(() => {
    // 这里 padding 就是可以接收 string 或 number 的联合类型
    function padLeft(value: string, padding: string | number) {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
    }
})()


// 类型保护：用来确保变量是某个类型。可以避免多次使用类型断言
;(() => {
    interface Bird {
        fly();
    }

    interface Fish {
        swim();
    }

    function getSmallPet(): Fish | Bird {
        const bird: Bird = {
            fly() {
            }
        }
        const fish: Fish = {
            swim() {
            }
        }
        return Math.random() > .5 ? bird : fish;
    }

    let pet = getSmallPet();
    // 在 JS 中，我们通常会这样判断。但是 TS 中会提示错误，因为 pet 是 Fish 的时候就没有 fly，是 Bird 的时候就没有 swim
    // if (pet.swim) {
    //     pet.swim();
    // } else if (pet.fly) {
    //     pet.fly();
    // }

    // 我们可以使用类型断言让其正常工作，但是这样很啰嗦，每个地方都得断言一次。
    if ((<Fish>pet).swim) {
        (<Fish>pet).swim();
    } else {
        (<Bird>pet).fly();
    }

    // 下面我们就使用自定义类型保护来进行优化。这里函数的返回值是一个"类型谓词"，表示 pet.swim 不是 undefined，则 pet 的类型就是 Fish
    function isFish(pet: Fish | Bird): pet is Fish {
        return (<Fish>pet).swim !== undefined;  // 返回一个用于判断 pet 是否为 Fish 类型的 boolean 值
    }

    if (isFish(pet)) {  // 这里使用自定义类型保护，确定 pet 的类型是不是 Fish
        pet.swim();  // 条件判断为 true，说明 pet 的类型是 Fish，所以可以直接调用 swim
    } else {
        // 由于 pet 的类型只有 Fish 和 Bird 两种可能，编译器还能知道条件判断为 false，则 pet 类型是 Bird，可以直接调用 fly
        pet.fly();
    }


    // typeof 类型保护。当类型可以用过 typeof 直接判断的时候，使用 typeof 就可以做类型保护。
    function padLeft2(value: string, padding: string | number) {
        // string, number 这些基本类型可以通过 typeof 直接判断，那么就不需要使用自定义类型来判断了。
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
    }


    // instanceof 类型保护。类似 typeof 类型保护
    interface Padder {
        getPaddingString(): string
    }

    class SpaceRepeatingPadder implements Padder {
        constructor(private numSpaces: number) {
        }

        getPaddingString() {
            return Array(this.numSpaces + 1).join(" ");
        }
    }

    class StringPadder implements Padder {
        constructor(private value: string) {
        }

        getPaddingString() {
            return this.value;
        }
    }

    function getRandomPadder() {
        return Math.random() < 0.5 ?
            new SpaceRepeatingPadder(4) :
            new StringPadder("  ");
    }

    // 类型为SpaceRepeatingPadder | StringPadder
    let padder: Padder = getRandomPadder();

    if (padder instanceof SpaceRepeatingPadder) {
        padder; // 类型细化为'SpaceRepeatingPadder'
    }
    if (padder instanceof StringPadder) {
        padder; // 类型细化为'StringPadder'
    }
})()


// 字符串字面量类型
// 使用 type 关键字定义类型，值是字符串，所以叫字符串字面量类型。值是数字就叫数字字面量类型。
type Easing = "ease-in" | "ease-out" | "ease-in-out";  // 这里还使用了联合类型进行配合。
class UIElement {
    // easing 的类型是个字符串字面量类型，也就是个联合类型
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        } else if (easing === "ease-out") {
        } else if (easing === "ease-in-out") {
        } else {
            // 这里不可能执行到
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");  // 传入3种字符串之一能正常运行
// button.animate(0, 0, "uneasy"); // 其它字符串报错
