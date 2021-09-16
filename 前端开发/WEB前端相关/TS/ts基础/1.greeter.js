// 接收的 person 需要符合 IPerson 接口格式
function greeter(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
var user = {
    firstName: 'He',
    lastName: 'Peng'
};
console.log(greeter(user));
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName2 = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
    }
    return User;
}());
var user1 = new User('He', 'Peng');
console.log(greeter(user1));
