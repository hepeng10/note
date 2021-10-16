// TS 的高级类型
// 交叉类型：将多个类型合并为一个类型。
;
(function () {
    // 这里的 extend 函数作用是合并两个对象。可以看到函数的返回值用了 T & U 交叉类型
    function extend(first, second) {
        var result = {}; // 通过类型断言的方式将 result 的类型断言为 T & U
        for (var id in first) {
            // result[id] = first[id];  // 这里不能直接赋值，因为 first 的类型为 T，result 的类型为 T & U
            result[id] = first[id]; // 类型断言后赋值解决类型问题
        }
        for (var id in second) {
            if (!result.hasOwnProperty(id)) {
                result[id] = second[id];
            }
        }
        return result; // 返回 T & U 类型的 result
    }
    var Person = /** @class */ (function () {
        // 通过构造函数直接声明成员属性
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var ConsoleLogger = /** @class */ (function () {
        function ConsoleLogger() {
        }
        ConsoleLogger.prototype.log = function () {
            // ...
        };
        return ConsoleLogger;
    }());
    // 使用 extend 函数。返回值 jim 就是个交叉类型，交叉了 Person 和 Loggable 两个类型。
    var jim = extend(new Person("Jim"), new ConsoleLogger());
    // 交叉类型 jim 可以调用两个源类型的属性和方法而不会报错
    jim.name;
    jim.log();
})();
(function () {
    // 这里 padding 就是可以接收 string 或 number 的联合类型
    function padLeft(value, padding) {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error("Expected string or number, got '" + padding + "'.");
    }
})();
(function () {
    function getSmallPet() {
        var bird = {
            fly: function () {
            }
        };
        var fish = {
            swim: function () {
            }
        };
        return Math.random() > .5 ? bird : fish;
    }
    var pet = getSmallPet();
    // 在 JS 中，我们通常会这样判断。但是 TS 中会提示错误，因为 pet 是 Fish 的时候就没有 fly，是 Bird 的时候就没有 swim
    // if (pet.swim) {
    //     pet.swim();
    // } else if (pet.fly) {
    //     pet.fly();
    // }
    // 我们可以使用类型断言让其正常工作，但是这样很啰嗦，每个地方都得断言一次。
    if (pet.swim) {
        pet.swim();
    }
    else {
        pet.fly();
    }
    // 下面我们就使用自定义类型保护来进行优化。这里函数的返回值是一个"类型谓词"，表示 pet.swim 不是 undefined，则 pet 的类型就是 Fish
    function isFish(pet) {
        return pet.swim !== undefined; // 返回一个用于判断 pet 是否为 Fish 类型的 boolean 值
    }
    if (isFish(pet)) { // 这里使用自定义类型保护，确定 pet 的类型是不是 Fish
        pet.swim(); // 条件判断为 true，说明 pet 的类型是 Fish，所以可以直接调用 swim
    }
    else {
        // 由于 pet 的类型只有 Fish 和 Bird 两种可能，编译器还能知道条件判断为 false，则 pet 类型是 Bird，可以直接调用 fly
        pet.fly();
    }
    // typeof 类型保护。当类型可以用过 typeof 直接判断的时候，使用 typeof 就可以做类型保护。
    function padLeft2(value, padding) {
        // string, number 这些基本类型可以通过 typeof 直接判断，那么就不需要使用自定义类型来判断了。
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error("Expected string or number, got '" + padding + "'.");
    }
    var SpaceRepeatingPadder = /** @class */ (function () {
        function SpaceRepeatingPadder(numSpaces) {
            this.numSpaces = numSpaces;
        }
        SpaceRepeatingPadder.prototype.getPaddingString = function () {
            return Array(this.numSpaces + 1).join(" ");
        };
        return SpaceRepeatingPadder;
    }());
    var StringPadder = /** @class */ (function () {
        function StringPadder(value) {
            this.value = value;
        }
        StringPadder.prototype.getPaddingString = function () {
            return this.value;
        };
        return StringPadder;
    }());
    function getRandomPadder() {
        return Math.random() < 0.5 ?
            new SpaceRepeatingPadder(4) :
            new StringPadder("  ");
    }
    // 类型为SpaceRepeatingPadder | StringPadder
    var padder = getRandomPadder();
    if (padder instanceof SpaceRepeatingPadder) {
        padder; // 类型细化为'SpaceRepeatingPadder'
    }
    if (padder instanceof StringPadder) {
        padder; // 类型细化为'StringPadder'
    }
})();
(function () {
    function char0(name) {
        return name.charAt(0);
    }
    function get0(name) {
        return char0(name || 'tirion');
    }
    get0();
    get0('hepeng');
})();
var UIElement = /** @class */ (function () {
    function UIElement() {
    }
    // easing 的类型是个字符串字面量类型，也就是个联合类型
    UIElement.prototype.animate = function (dx, dy, easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // 这里不可能执行到
        }
    };
    return UIElement;
}());
var button = new UIElement();
button.animate(0, 0, "ease-in"); // 传入3种字符串之一能正常运行
// button.animate(0, 0, "uneasy"); // 其它字符串报错
