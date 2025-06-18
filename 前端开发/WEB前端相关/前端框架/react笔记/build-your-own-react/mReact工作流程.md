## 渲染流程
#### 1. 进入 mReact 应用
当进入 mReact 应用，scheduler 就开始执行，scheduler 会在浏览器的空闲时间调用 workLoop 检查是否有任务需要执行
```js
// 最外层的直接执行 scheduler
requestIdleCallback(workLoop)
```
**React 的 scheduler 使用小顶堆的数据结构实现，每个任务通过 expirationTime（过期时间）标记优先级。堆顶元素始终是优先级最高（即 expirationTime 最小）的任务，通过 peek()方法快速获取。添加任务时通过 push()自底向上调整堆结构；完成任务后通过 pop()自顶向下调整堆结构。**
#### 2. workLoop 的执行
执行 workLoop，函数中会检查是否有任务，有任务就会执行任务，没有任务就执行完成，并在最后调用 scheduler 让浏览器在下个空闲时间时再次执行 workLoop 检查是否有任务需要执行。
所以 scheduler 可以看做是一个高级定时任务，每隔一段时间就会检查是否有任务需要执行。
```js
function workLoop(deadline) {
    // 执行任务...
    /**
     * 任务完成或超过 5ms 则结束/中断任务
     * 调用 scheduler 在下个空闲时间继续
     */
    requestIdleCallback(workLoop)
}
```
#### 3. 开始第一个任务
```js
const element = mReact.createElement(
    'div',
    { id: 'foo' },
    mReact.createElement("a", null, "bar"),
    mReact.createElement("b")
);


const container = document.getElementById("root")
mReact.render(element, container)
```
mReact 调用 render 后，wipRoot 和 nextUnitOfWork 有了值便有了需要执行的任务。
render 方法是页面入口，在这里构建了一个根 fiber——wipRoot，并将 wipRoot 赋值给了 nextUnitOfWork，每次 scheduler 调度就从 nextUnitOfWork 开始。
#### 4. 执行第一个任务
等到了浏览器的空闲时间，下一次的 scheduler 开始执行，就执行到了 workLoop 中，这次 nextUnitOfWork 有了值，所以就开始进行任务调度，让 reconciler 将虚拟 DOM 构建 fiber 树。
```js
nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
```
在 performUnitOfWork 中有两种情况：
* 如果当前 fiber 节点有子节点，则会遍历当前 fiber 节点的所有子节点，将每个子节点的虚拟 DOM 构造为 fiber（增加 dom, alternate, effectTag 等）。然后将当前节点的 child 指向第一个子节点 fiber，子节点的 sibling 指向下个子节点，子节点的 parent 指向当前节点。
* 如果当前 fiber 节点没有子节点，则不用构建子节点。

最后 performUnitOfWork 会返回下一个用于构建的 fiber 节点（有子节点返回 child，没有则取 sibling，还是没有则通过 parent 回到父 fiber 节点获取 sibling 等等），都构建完了则会返回 undefined。

#### 5. 执行下一个任务
```js
while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 在 react 中就是判断执行时间是否超过5ms
    shouldYield = deadline.timeRemaining() < 1
}
```
在 workLoop 中是一个循环，每次构建完一个 fiber 后，判断空闲时间是否充足，如果还有空闲时间，则继续构建下一个 fiber；如果没有空闲时间，则 shouldYield 为 true，退出 while 循环。

#### 6. 提交修改 DOM
```js
if (!nextUnitOfWork && wipRoot) {
    commitRoot()
}

requestIdleCallback(workLoop)
```
* nextUnitOfWork 为空，则说明 fiber 节点都构建完了，调用 commitRoot 进行 DOM 操作更新页面。
* nextUnitOfWork 不为空，则不会提交更新 DOM。
然后会调用 scheduler 等下次空闲时间再执行任务（新任务/未执行完的任务）。

从上面的 commitRoot 判断逻辑可以看出：DOM 的更新是要等 fiber 树全部构建完成后才会提交一次性更新所有 DOM。

## 更新流程
通过调用 setState 是更新某个组件，而不是从根组件全量更新，这是如何实现的呢？
```jsx
function Counter() {
    const [state, setState] = mReact.useState(1)
    return (
        <h1 onClick={() => setState(c => c + 1)}>
            Count: {state}
        </h1>
    )
}
```
上面的 h1 点击后会调用 setState 只更新当前组件，setState 是 useState 返回的，所以需要看 useState 的实现。
```js
const setState = action => {
    hook.queue.push(action)
    // 修改 wipRoot 为当前组件，当调用 setState 的时候，执行页面的更新操作就会从当前组件开始，而不是从根组件
    wipRoot = {
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot,
    }
    nextUnitOfWork = wipRoot
    deletions = []
}
```
setState 的时候将 wipRoot 赋值为当前组件，等到下次 scheduler 的时候就会从当前组件开始更新了。
**注意**：mReact 里由于 currentRoot 是个全局变量，保存的就是根节点，所以还是从根节点更新的。只要将其实现为当前组件即可。


## 函数组件构建
函数组件的构建相对复杂，所以进行单独说明。
这是一个函数组件：
```jsx
function App(props) {
    return <h1>Hi {props.name}</h1>
}
```
通过 babel 将 JSX 转换为 createElement 得到：
```js
function App(props) {
    return mReact.createElement(
        "h1",
        null,
        "Hi ",
        props.name
    )
}
```
使用时是：
```jsx
<App name="foo" />
```
转换后为：
```js
mReact.createElement(App, {
    name: "foo",
})
```
createElement 返回的虚拟 DOM 结构为：
```js
{
    type: App,
    props: {
        name: "foo",
        children: []
    }
}
```
当它父级进行 reconciler 时，它构造成的 fiber 节点为：
```js
{
    type: element.type,
    props: element.props,
    dom: null,
    parent: wipFiber,
    alternate: null,
    effectTag: "PLACEMENT",
}
// 即
{
    type: App,
    props: {
        name: "foo",
        children: []
    },
    dom: null,
    parent: wipFiber, // 父级 fiber
    alternate: null,
    effectTag: "PLACEMENT",
}
```
然后当它自身被 scheduler 调度，进行 reconciler 时，在 performUnitOfWork 中发现它是个函数组件，调用 updateFunctionComponent，就会执行
```js
const element = fiber.type(fiber.props)
// 即
const element = App({ name: "foo", children: [] })
```
（所以函数组件每次渲染时就是要执行自身）
element 的值就为
```js
{ type: "h1", props: { children: ["Hi ", "foo"] } }
```
再把 element 作为数组元素传给 reconcileChildren 构造子节点的 fiber
```js
// children = [{ type: "h1", props: { children: ["Hi ", "foo"] } }]
const children = [element]
reconcileChildren(fiber, children)
```
这时就能将函数组件中的基础组件构造成 fiber 了。
所以，函数组件在 reconciler 时就会执行这个函数组件，返回这个函数组件 return 的原生组件/函数组件，再将返回的原生组件/函数组件构建成 fiber。