## 使用 reduce 实现 compose 函数，函数的洋葱化
**源：11 react全家桶1**

redux 中可以通过中间件来实现很多功能，中间件是一种洋葱模型，而实现这种洋葱模型通常会用到 reduce 函数，下面就来讲讲这个 reduce 函数如何实现中间件功能。

首先我们思考一个问题
```js
compose(a,b,c,d)(input)

上面的 compose 函数执行后，希望像下面那样，将数组中的函数一层层的执行，应该怎么实现呢？

d(c(b(a(input))))
```
可以看出，compose 函数调用后会返回一个函数，这个函数再次调用就会按照传入 compose 中的函数一层层执行。
我们可以通过数组的 reduce 方法来实现这个 compose 函数：
```js
// compose 函数，接收多个函数，返回洋葱模型的函数
function compose(...funcs) {
    // 数组中没有函数时，返回一个函数，此函数只做接收参数返回接收的参数功能
    if (funcs.length === 0) {
       return arg => arg
    }
    // 只有一个函数时，返回这个函数
    if (funcs.length === 1) {
      return funcs[0]
    }

    // 多个函数时，使用 reduce 进行累计操作。fn1为第一个函数/累计函数，fn2为当前函数
    const fn = funcs.reduce((fn1, fn2) => {
        // 每次 reduce 返回一个累计函数，这个函数将作用于下一个函数
        return function(...args) {
            // 使用当前函数包裹累计函数
            return fn2(fn1(...args))
        }
    })
    return fn;
    // 或使用下面的简洁写法
    return funcs.reduce((fn1, fn2) => (...args) => fn2(fn1(...args)))
}
```
这样我们就实现了 compose 函数。

但是在 redux 中实现有些不同：
```js
export default function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }

    if (funcs.length === 1) {
      return funcs[0]
    }
    // 这里是 b 在里面，a 在外面
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```
区别就是我们的 compose 是从内往外一层层包裹，而 redux 的是从外往内一层层塞进去。所以执行顺序正好相反。那么，redux 中的中间件就是从右往左执行。
```js
// applyMiddleware 中我们传入各种 middleware
export default function applyMiddleware(...middlewares) {
    // 返回一个函数，返回的函数调用后还将返回一个函数
    return (createStore) => (reducer, preloadedState, enhancer) => {
        const store = createStore(reducer, preloadedState, enhancer)
        let dispatch = store.dispatch
        let chain = []

        const middlewareAPI = {
          getState: store.getState,
          dispatch: (...args) => dispatch(...args)
        }
        // 遍历 middleware 传入 API
        chain = middlewares.map(middleware => middleware(middlewareAPI))
        // 执行 middleware 并传入 dispatch
        dispatch = compose(...chain)(store.dispatch)

        return {
          ...store,
          dispatch
        }
    }
}
```
可以看出，redux 的作者很喜欢函数式编程，全程都是函数的链式调用。