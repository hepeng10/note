[React源码揭秘3 Diff算法详解](https://juejin.cn/post/6844904167472005134)

完整的 diff 算法时间复杂度为 $O(n^3)$，这性能当然不能接受，所以 react 根据实际情况做了优化，将时间复杂度控制在 $O(n^2)$。

**为了降低算法复杂度，React的diff会预设三个限制：**

1. 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。
2. 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。
3. 开发者可以通过 key 属性来暗示哪些子元素在不同的渲染下能保持稳定。

```js
// 更新前
<div>
    <p key="ka">ka</p>
    <h3 key="song">song</h3>
</div>

// 更新后
<div>
    <h3 key="song">song</h3>
    <p key="ka">ka</p>
</div>
```
如果没有key，React 会认为 div 的第一个子节点由 p 变为 h3，第二个子节点由 h3 变为 p。这符合限制2的设定，会销毁并新建。
但是当我们用 key 指明了节点前后对应关系后，React 知道 key === "ka" 的 p 在更新后还存在，所以 DOM 节点可以复用，只是需要交换下顺序。
这就是React为了应对算法性能瓶颈做出的三条限制。

## Diff是如何实现的
首先判断新节点的类型：
* object 类型：说明是 REACT_ELEMENT_TYPE 或 REACT_PORTAL_TYPE，如 div, p ...。调用 reconcileSingleElement 处理。
* string | number 类型：文本节点，调用 reconcileSingleTextNode 处理。
* array 类型：调用 reconcileChildrenArray 处理。
* 都没命中：调用 deleteRemainingChildren 删除节点。

#### 不同类型的Diff是如何实现的
我们可以从同级的节点数量将 Diff 分为两类：
* 当新节点类型为 object、number、string，代表同级只有一个节点。
* 当新节点类型为 Array，同级有多个节点。
