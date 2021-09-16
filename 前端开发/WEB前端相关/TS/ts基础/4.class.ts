class Person {
    name: string;
    protected age: number;
    private _sex: string;  // 私有属性一般在前面加下划线
    readonly weight: number;
    private _height: number;
    static planet: string = 'Earth';

    constructor(name: string, age: number, _sex: string, weight: number, height: number) {
        this.name = name;
        this.age = age;
        this._sex = _sex;
        this.weight = weight;
        this._height = height;
    }

    // tsc 默认编译到 ES3，使用存取器的时候需要编译到 ES5 及以上，需要加参数：tsc 4.class.ts --target es5
    get height(): number {
        return this._height;
    }
    set height(h) {
        this._height = h + 10;
    }
}

const p1 = new Person('Tirion', 34, 'male', 60, 170);
console.log(p1.name)
// console.log(p1.age)  // 私有属性只能在类内部使用
// console.log(p1._sex)  // 受保护属性只能在类和其继承类中使用
console.log(p1.weight)
// p1.weight = 70  // readonly 只能读不能改
console.log(p1.height)
p1.height = 180
console.log(p1.height)
Person.planet = 'Mars'



// 抽象类：不能实例化，用于定义类的成员属性和方法，给其它类继承
// 抽象类类似于接口但又不同于接口，都对派生类进行了约束，但是接口抽象类中可以包括具体的实现，也就是可以实现一些公共方法供子类使用。而接口只能做定义。
abstract class Animal {
    abstract sound(): void;  // 抽象方法：子类必须实现
    move(): void {
        console.log('move');
    }
}
class Cat extends Animal{
    sound(): void {  // 必须实现 sound 方法
        console.log('喵');
    }
}
class Garfield extends Cat {
    say(): void {
        console.log('加菲猫会说话');
    }
}
let cat: Animal;
// cat = new Animal();  // 不能实例化抽象类
cat = new Cat();  // cat 定义的 Animal 类型，但是也能赋值 Cat 类型。TS 中子类可以赋值给父类，类似向上转型。
cat.sound();
cat.move();
let garf: Garfield;
// garf = new Cat();  // 因为子类中可能拥有父类没有的成员属性和方法，所以不能将父类赋值给子类。
garf = new Garfield();
garf.say();
