// 箭头函数申明方式
var add = function (a, b) {
    return a + b;
};
console.log(add(1, 2));
// 剩余参数
function buildName(firstName) {
    var restName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restName[_i - 1] = arguments[_i];
    }
    return firstName + ' ' + restName.toString();
}
console.log(buildName('He', 'Peng', 'Tirion'));
// 函数类型定义
var fn; // 定义函数的参数和返回值
fn = buildName; // buildName 的参数和返回值类型都相同，所以可以赋值
var fn2 = buildName; // 定义并赋值
var fn3 = function (firstName, lastName) {
    var restName = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        restName[_i - 2] = arguments[_i];
    }
    return firstName + ' ' + restName.toString();
};
// this 和箭头函数
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        // 当使用普通函数时，下面的 cardPicker() 调用会报错，因为普通函数是在调用时确定 this 值，指向调用的对象。
        // return function() {
        // 这里改成了箭头函数，箭头函数在创建时就确定了 this 值，而不是在调用时。
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker();
cardPicker();
var deck2 = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // 指定 this 必须是 Deck 对象
    createCardPicker: function () {
        return function () {
            // return () => {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker2 = deck2.createCardPicker();
cardPicker2();
