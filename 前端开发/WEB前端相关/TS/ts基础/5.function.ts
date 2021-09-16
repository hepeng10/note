// 箭头函数申明方式
const add = (a: number, b: number): number => {
    return a + b;
}
console.log(add(1, 2));

// 剩余参数
function buildName(firstName: string, ...restName: string[]): string {
    return firstName + ' ' + restName.toString();
}
console.log(buildName('He', 'Peng', 'Tirion'))

// 函数类型定义
let fn: (a: string, b: string, ...c: string[]) => string;  // 定义函数的参数和返回值
fn = buildName;  // buildName 的参数和返回值类型都相同，所以可以赋值
let fn2: (a: string, b: string, ...c: string[]) => string = buildName;  // 定义并赋值
let fn3: (a: string, b: string, ...c: string[]) => string = function(firstName, lastName, ...restName): string {  // 定义并实现
    return firstName + ' ' + restName.toString();
}



// this 和箭头函数
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // 当使用普通函数时，下面的 cardPicker() 调用会报错，因为普通函数是在调用时确定 this 值，指向调用的对象。
        // return function() {
        // 这里改成了箭头函数，箭头函数在创建时就确定了 this 值，而不是在调用时。
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
let cardPicker = deck.createCardPicker();
cardPicker();



// this 参数。放在所有参数的最前面，是一个假参数，主要用来确定 this 指向，方便编辑器的代码提示，但并不能避免指向错误。。。
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck2: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // 指定 this 必须是 Deck 对象
    createCardPicker: function(this: Deck) {
        // return function() {  // 使用普通函数并不会提示错误
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            // 只是在使用 this 的时候代码提示更友好。。。
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker2 = deck2.createCardPicker();
cardPicker2();



// 重载：某些函数可以接收多种参数返回多种类型，在函数定义的时候并不能一次性进行定义，就需要通过重载功能来定义这个函数的接收类型和返回类型。
let suits = ["hearts", "spades", "clubs", "diamonds"];
// 使用重载定义 pickCard 函数，可以接收两种类型，返回两种类型
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
// 实现 pickCard 函数
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
