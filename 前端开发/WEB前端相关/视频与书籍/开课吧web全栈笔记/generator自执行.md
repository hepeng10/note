## generator 函数自执行
**源：12 react全家桶2**

redux-saga 中使用 generator 函数来进行流程控制。通常的 generator 函数在 yield 的地方中止后，需要使用 next 来继续执行，但是 saga 使用中我们并没有调用 next，说明 saga 已经在内部进行了处理，那么它是怎么处理的呢？

首先我们来看一个 generator 函数是怎样的：
```js
function* gen() {
    yield 'a';
    yield 'b';
    return 'c';
}
const g = gen();
g.next();  // { value: a, done: false }
g.next();  // { value: b, done: false }
g.next();  // { value: c, done: true }
```
以上是一个基本的 generator 函数，我们需要使用 next 来执行。
那么如何让它自执行呢？
```js
function next(g) {
    const { value, done } = g.next();
    if (!done) next(g);  // done 为 false，则递归调用 next
}
const g = gen();
next(g);
```
这样我们就能自执行上面那个简单的 generator 函数了。

但是，通常情况下，generator 函数中 yield 后面会是一个异步操作，通常是一个 promise 对象来进行，那么又是个什么情况呢？
```js
// 首先声明一个异步调用方法，该方法返回一个 promise 对象
const asyncAdd = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            num++;
            console.log('异步请求完成');
            resolve(num);
        }, 1000);
    });
};

function* add(num) {
    const res = yield asyncAdd(num);
    yield asyncAdd(res);
}
```
上面这个 generator 手动调用该怎么做呢？
```js
const g = add(10);
// 调用 next 后获取到的 value，这时就是一个 promise 对象：{value: promise, done: false}
// 我们就需要调用 promise 的 then 方法来继续执行
g.next().value.then(num => g.next(num));
```
通过观察，我们就可以实现一个异步调用的自执行 generator 函数：
```js
// 增加了一个 data 参数，作为 generator 内部 yield 的返回值
// 首次调用 next 的时候，值是在调用 generator 函数就传了，而不是在 .next 时传，所以 data 为 undefined 即可
function next(g, data) {
    // 通过调用 next 传入数据作为 generator 内部 yield 的返回值
    const { value, done } = g.next(data);
    // 按理来说需要判断 value 类型
    if (!done) value.then(res => next(g, res));
}
const g = add(10);  // 首次传参
next(g);
```
这样，就实现了带 promise 的 generator 自执行函数。