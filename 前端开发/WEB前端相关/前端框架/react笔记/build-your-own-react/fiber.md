在 build-your-own-react 中，我们知道了在 render 的时候，不能一次性将整个 dom 树进行渲染，而需要进行分块再一块一块的渲染，渲染过程中还能交回给浏览器执行更高优先级的任务。这时就有了 fiber 的概念。

**为了把所有任务单元组织起来我们需要一个数据结构： fiber 树。每一个 element 都是一个 fiber，每一个 fiber 都是一个任务单元，每次渲染至少渲染一个 fiber。**

我们要渲染如下 dom 树：
```jsx
mReact.render(
  <div>
    <h1>
      <p />
      <a />
    </h1>
    <h2 />
  </div>,
  container
)
```
fiber 树的数据结构为：
![](assets/16345283649166.jpg)

每个 fiber 节点完成下述三件事：
1. 把 element 添加到 DOM 上
2. 为该 fiber 节点的子节点新建 fiber
3. 挑出下一个任务单元

挑出下一个任务单元的逻辑为：
1. 优先查找 child 子节点。root -> div -> h1 -> p
2. 没有 child 子节点则查找 sibling 兄弟节点。p -> a
3. 没有兄弟节点和子节点则查找 "uncle" 节点，即 parent 的 sibling。a -> h2
4. 都没有则继续往上找，直到根节点。则完成了整棵树的渲染。


# react 的核心功能
### scheduler
调度器，requestIdleCallback 的实现。用于在浏览器空闲的时候才去调用 performUnitOfWork 构建 fiber。一次构建一个 fiber，可以中断/继续。
### reconciler
协调器，在 performUnitOfWork 构建 fiber 的时候调用，对新旧虚拟 dom 进行对比，标记出需要进行哪类更新。
### renderer
渲染器，当 fiber 构建完成后根据标记的更新类型一次性渲染 dom。
