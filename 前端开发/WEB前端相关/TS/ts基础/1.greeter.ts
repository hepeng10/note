interface IPerson {  // 在 TS 里使用接口来定义对象的类型
    firstName: string;
    lastName: string;
}

// 接收的 person 需要符合 IPerson 接口格式
function greeter(person: IPerson) {
    return `Hello ${person.firstName} ${person.lastName}`;
}

let user: IPerson = {  // user 对象类型为 IPerson
    firstName: 'He',
    lastName: 'Peng',
}

console.log(greeter(user))

class User {
    firstName: string;
    lastName: string;
    fullName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`;
    }
}

const user1 = new User('He', 'Peng');
console.log(greeter(user1));  // 因为 User 类的实例对象有 firstName 和 lastName，符合 IPerson 接口，所以可以传给 greeter
