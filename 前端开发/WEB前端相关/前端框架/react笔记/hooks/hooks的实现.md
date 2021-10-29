源码请看 [hooks的实现.js](./hooks的实现.js)
这里记录一些关键点的理解。

**每个组件的 fiber 上都有个 memorizedState 属性用于存储这个组件的所有 hooks。hooks 中的每个 hook 也有个 memorizedState 用于存储这个 hook 的数据。而每个 hook 还有个 next 指向下一个 hook。**
这里我们用链表实现 hooks 的存储，也可以用数组实现，只要有顺序就行。
```js
// 数据结构示例
fiber = {
    // fiber 的 memorizedState 用于存储此组件的所有 hooks
    // 在链表的 hooks 实现中就是指向第一个 useXxx 生成的 hook；数组实现中就是一个数组，第一个 hook 存储在索引0中。
    memorizedState: hook1 {  // 第一个 useXxx 生成的 hook
        // useXxx 的数据
        memorizedState: data,
        // next 是个指针，指向下一个 useXxx 生成的 hook
        next: hook2 {
            // hook2 的数据
            memorizedState: data,
            // next 指向第三个 hook
            next: hook3
        }
    }
}
```

### mount 阶段创建 hook
在组件的 mount 阶段，当调用 useState, useEffect, useMemo 等 useXxx hooks 时都会创建一个 hook 对象，并用 memorizedState 属性保存数据，还有个 next 属性用于指向下一个 hook，不同的 hook 还有一些其它不同的属性，主要是这两个。然后这个 hook 会添加到当前组件的 fiber 上，即 fiber.memorizedState 中。多次调用 useXxx 的时候，每次都创建一个 hook，新的 hook 会与上一个 hook 的 next 建立连接。hook1.next 为 hook2，hook2.next 为 hook3。
```js
// 指向 hook 的指针
let workInProgressHook = null;
if (isMount) {
    // useState, useEffect, useRef 这些 hooks 都是创建一个 hook 对象，然后用 memorizedState 存储 hook 的数据
    hook = {
        memorizedState: initState,  // 当前 hook 数据
        next: null,  // 指向下一个 hook 的指针
    }
    if (!fiber.memorizedState) {
        fiber.memorizedState = hook;  // 不存在则是第一调用 useXxx，将 fiber.memorizedState 指向这第一个 hook
    } else {
        // fiber.memorizedState 存在则是多次调用 useXxx，将上个 hook 的 next 指向当前 hook
        workInProgressHook.next = hook;
    }
    workInProgressHook = hook;  // 存储当前 hook 用于下次使用
} else {
    hook = workInProgressHook;
    workInProgressHook = hook.next;
}
// 使用 hook 执行的其它逻辑...
```

### update 阶段更新 hook
而在组件更新的时候，比如函数组件也会按着代码流程依次执行，当遇到第一个 useXxx 的时候我们就可以从当前组件的 fiber.memorizedState 上取出第一个 hook，那么这个 hook 就是这个 useXxx 在 mount 阶段创建的 hook；遇到第二个 useXxx 就会从 fiber.memorizedState 上取出第二个 hook；以此类推，这是一一对应的关系。
```js
// update 阶段，每个 useXxx 被调用的时候都会走 else 逻辑
} else {
    // workInProgressHook 是从第一个 hook 开始的，因为更新是通过 scheduler 来更新的，
    // 而 scheduler 中对 workInProgressHook 进行了复位操作，即 workInProgressHook = fiber.memorizedState
    hook = workInProgressHook;
    // workInProgressHook 指向下一个 hook
    workInProgressHook = hook.next;
}
// 使用 hook 执行的其它逻辑...
```

> 明白了上面的逻辑我们就知道为什么不能将 useXxx 写在 if 等条件判断里了，因为这样就会导致 fiber.memorizedState 上存储的 hook 顺序错乱。