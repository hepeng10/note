**hooks 是为了践行 代数效应，目的是把副作用从函数调用中剥离出去。**

比如，我们有一个通过两篇文章 id 获取评论总数的函数 getTotalCommentNum，里面调用 getCommentNum 方法获取每篇文章的评论数，如下代码所示。
```js
function getTotalCommentNum(id1, id2) {
    const num1 = getCommentNum(id1);
    const num2 = getCommentNum(id2);
    return num1 + num2;
}
```
现在有个问题，获取评论数理应是需要调用接口的，是个异步方法，那么上面的代码要想正确执行则需要改成 async await 函数才行，但是改成 async await 函数后，在一个其它函数 fn 中调用 getTotalCommentNum 函数，那么这个函数 fn 也要写成 async 才行，async await 是有传导性的。那有没有办法解决呢？目前是没有这样的语法的。。。
下面我们就先虚构一个新的语法来解决这个问题：
```js
function getCommentNum(id) {
    const num = perform id;
    return num;
}

try {
    getTotalCommentNum(1, 2);
} handle(id) {
    // 这里即可以执行异步操作，也可以执行同步操作，最终调用 resume 返回值并交回调用栈即可
    fetch(`xxxx/${id}`).then(res => res.json()).then((num) => {
        resume num;
    })
}
```
我们在编写 getCommentNum 的时候，使用了 perform 关键字，而在调用 getTotalCommentNum 的时候使用了 try handle 语法。在 try 中调用 getTotalCommentNum，然后执行到 const num1 = getCommentNum(id1)，代码进入 getCommentNum 中，遇到了 perform 关键字，此时就会跳转到 handle 中，并将 perform 后的值（这里即为 id）传入 handle，在 handle 中我们拿到这个 id，就可以进行异步操作，异步操作结束后使用 resume （类似 resolve）关键字返回值，流程就回到了 const num1 = getCommentNum(id1) 这里，num1 获取到了返回的值，继续往下执行。
如果有这样的语法我们就可以编写出 getTotalCommentNum 这样的没有 async await 的传导性，同步异步相同写法，不会有异步请求副作用的函数。

**这和 react 有什么关系呢？**
代码改动：
```js
// getTotalCommentNum 变成了 TotalCommentNum 就是一个函数式组件
function TotalCommentNum({id1, id2}) {
    const num1 = useCommentNum(id1);  // 这里改成了 useCommentNum hooks
    const num2 = useCommentNum(id2);
    return num1 + num2;
}
// 自定义 hooks
function useCommentNum(id) {
    const [num, setNum] = useState(0);
    useEffect(() => {
        fetch(`xxxx/${id}`).then(res => res.json()).then((num) => {
            setNum(num);
        })
    }, [id]);
    return num;
}
```
这里 TotalCommentNum 函数组件中将异步请求剥离到了 useCommentNum 中，而 useCommentNum 无论是异步还是同步的，并不会影响 TotalCommentNum 函数组件的写法。
所以说 hooks 是为了践行代数效应。