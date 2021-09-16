var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name, age, _sex, weight, height) {
        this.name = name;
        this.age = age;
        this._sex = _sex;
        this.weight = weight;
        this._height = height;
    }
    Object.defineProperty(Person.prototype, "height", {
        // tsc 默认编译到 ES3，使用存取器的时候需要编译到 ES5 及以上，需要加参数：tsc 4.class.ts --target es5
        get: function () {
            return this._height;
        },
        set: function (h) {
            this._height = h + 10;
        },
        enumerable: false,
        configurable: true
    });
    Person.planet = 'Earth';
    return Person;
}());
var p1 = new Person('Tirion', 34, 'male', 60, 170);
console.log(p1.name);
// console.log(p1.age)  // 私有属性只能在类内部使用
// console.log(p1._sex)  // 受保护属性只能在类和其继承类中使用
console.log(p1.weight);
// p1.weight = 70  // readonly 只能读不能改
console.log(p1.height);
p1.height = 180;
console.log(p1.height);
Person.planet = 'Mars';
// 抽象类：不能实例化，用于定义类的成员属性和方法，给其它类继承
// 抽象类类似于接口但又不同于接口，都对派生类进行了约束，但是接口抽象类中可以包括具体的实现，也就是可以实现一些公共方法供子类使用。而接口只能做定义。
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function () {
        console.log('move');
    };
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.sound = function () {
        console.log('喵');
    };
    return Cat;
}(Animal));
var cat = new Cat();
cat.sound();
cat.move();
