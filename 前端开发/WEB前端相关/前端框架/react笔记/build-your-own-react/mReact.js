// 注：代码中的 dom 变量表示通过 document.createElement 等方法创建的真实 DOM；element 变量表示虚拟 DOM 对象；fiber 是对虚拟 DOM 的增强

/**
 * 
 * JSX 通过 babel 编译后就是调用 createElement
 *
 * @param {string} type 节点类型，如 div, p
 * @param {object} props 节点属性，如 id, class, width, height, style
 * @param {array} children 子节点，包括 元素节点、文本节点
 * @returns
 */
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                typeof child === 'object'
                    ? child
                    : createTextElement(child)
            })
        }
    };
}

// 创建文本节点。对于 sting, number 这样的基本类型
function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',  // 文本节点自定义 type 为 TEXT_ELEMENT
        props: {
            nodeValue: text,
            children: []
        }
    };
}

// fiber 就是一个增强的虚拟 dom 节点。这里通过 fiber 创建一个真实的 dom 节点
function createDom(fiber) {
    const dom =
        fiber.type == "TEXT_ELEMENT"
            ? document.createTextNode("")
            : document.createElement(fiber.type);

    // 获取 element.props 上的属性赋值给 dom。（排除 children 属性）
    const isProperty = key => key !== "children";
    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        });

    return dom;
}

// 更新 dom
const isEvent = key => key.startsWith("on")  // on 开头的为事件
const isProperty = key => key !== "children" && !isEvent(key)  // children 和 onXxx 不为属性
const isNew = (prev, next) => key => prev[key] !== next[key]  // 属性值不相等则为新属性
const isGone = (prev, next) => key => !(key in next)  // key 不在新属性中则该移除
function updateDom(dom, prevProps, nextProps) {
    // 对事件的处理
    // 旧的事件不在新属性中，或者同名事件的值不相等，则移除该事件
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.removeEventListener(
                eventType,
                prevProps[name]
            )
        })
    // 添加新事件
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.addEventListener(
                eventType,
                nextProps[name]
            )
        })

    // 对普通属性的处理
    // 旧属性不在新属性中，则移除
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            dom[name] = ""
        })

    // 旧属性的 key 值与新属性不同，则修改/添加
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = nextProps[name]
        })
}

// 将提交的修改更新到真实 dom。只会在 fiber 全部构建完成后才会提交，然后一次性把所有改动进行渲染
function commitRoot() {
    deletions.forEach(commitWork)  // 删除 dom 节点
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
}
function commitWork(fiber) {
    if (!fiber) {
        return
    }

    let hasDomParentFiber = fiber.parent
    // 父 fiber 是函数组件生成的 fiber 则没有 dom，需要一直往上找到有 dom 的 fiber 节点，
    // 再在这个父 fiber 的 dom 中对当前 fiber 进行更改操作
    while (!hasDomParentFiber.dom) {
        hasDomParentFiber = hasDomParentFiber.parent
    }
    const domParent = hasDomParentFiber.dom

    if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
        // 这里不是 appendChild 这么简单，appendChild 是添加到末尾，而添加可能是添加在中间，需要更多的算法处理
        // 如果是在非末尾添加元素，就会触发添加元素位置之后的所有元素的更新，这是很耗性能的，所有代码中应尽量少用条件来判断一个元素的显示隐藏，应该用 display 来控制
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
        updateDom(
            fiber.dom,
            fiber.alternate.props,
            fiber.props
        )
    } else if (fiber.effectTag === "DELETION") {
        commitDeletion(fiber, domParent)
    }

    commitWork(fiber.child)
    commitWork(fiber.sibling)
}
// 移除节点需要移除该 fiber 下第一个有 dom 节点的 fiber 节点。
// （添加节点调用 appendChild，即使没有 dom 也无所谓，可以不处理。更新节点是更新属性，也不需要真实的 dom 节点。当然按理也是需要处理的）
function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}

// 渲染页面
function render(element, container) {
    // 这里自己构造了一个 wipRoot，结构和 fiber 相同，可以看作是”根 fiber“
    wipRoot = {
        dom: container,  // dom 是 container
        props: {
            children: [element]  // 虚拟 DOM 是 children
        },
        alternate: currentRoot,  // 旧 fiber 节点的引用
    }
    deletions = [];
    nextUnitOfWork = wipRoot;  // 将”根 fiber“赋值给 nextUnitOfWork 准备调用
}


// 调度器的实现
// 一旦开始进行构建虚拟 dom 进行渲染，这过程中构建虚拟 dom 可能会耗费很多时间，出现性能问题。所以需要将构建任务分成一些小块（即 fiber），
// 每当完成其中一块任务后，就把控制权交给浏览器，让浏览器判断是否有更高优先级的任务需要完成。
let nextUnitOfWork = null  // 下一次构建的 fiber
let currentRoot = null  // 保存上次提交到 DOM 节点的 fiber 树的引用，用于对虚拟 DOM 进行比较
let wipRoot = null  // wipRoot（work in progress root）。一棵树用来记录对 DOM 节点的修改，用于一次性提交进行 DOM 的修改。
let deletions = []  // 需要移除的 fiber 数组
function workLoop(deadline) {
    let shouldYield = false;
    // 每次 while 循环构建一个 fiber，被中断后可以回来继续构建
    while (nextUnitOfWork && !shouldYield) {
        // 构建 fiber，返回下一个待构建的 fiber
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        // deadline.timeRemaining() 返回当前闲置周期的预估剩余毫秒数。小于1则说明没有时间了，停止 while 循环终止 fiber 的构建
        shouldYield = deadline.timeRemaining() < 1
    }

    // 当下一个 fiber 节点为 undefined 即所有 fiber 都构建完成，并且 DOM 修改记录树有的，则进行提交修改 DOM
    // fiber 没完全构建则等浏览器执行完其它任务后再回来，继续上面的 while 循环，从 nextUnitOfWork 继续构建
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }

    requestIdleCallback(workLoop)
}

/**
* requestIdleCallback 浏览器内置方法！！！有兼容问题，react 是自己实现的 scheduler，原理相通。
* 每帧为16.6ms，在 scheduler 中，最低会占用每帧的5ms来进行执行任务，这5ms中可能会构建多个 fiber（或是其它任务），
* 每个 fiber 构建完成时就会判断是否超过5ms，超过就会暂停构建等下一帧再继续。（使用 MessageChannel 或 setTimeout 实现）
*/
// requestIdleCallback 类似 setTimeout，只不过这次是浏览器来决定什么时候运行回调函数，而不是 setTimeout 里通过我们指定的一个时间。
// 浏览器会在主线程有空闲的时候运行回调函数。
// requestIdleCallback 会给我们一个 deadline 参数。我们可以通过它来判断离浏览器再次拿回控制权还有多少时间。
requestIdleCallback(workLoop)

// 构建 fiber，并返回下一个 fiber。
// 在构建 fiber 的时候至少会完成当前 fiber 的构建，所以我们返回下一个待构建的 fiber 存储下来，当中断的时候就可以继续从下一个 fiber 开始。
function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function;
    // 函数组件和基础组件不同，基础组件就是一个基本的 dom 元素，而函数组件需要通过运算后获得
    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }

    // 返回下一个待构建的 fiber 节点
    // 首先获取 child，没有 child 获取 sibling，没有 sibling 则获取 parent 然后获取 parent 的 sibling。直到所有元素都被遍历，返回 undefined。
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}
// 提供给 hooks 使用的变量
let wipFiber = null  // 当前执行的 fiber
let hookIndex = null  // 当前执行的 hook 索引
// 更新函数组件
function updateFunctionComponent(fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []  // useState 可以多次调用，需要使用一个数组来维护

    // fiber.type 获取到函数并执行，返回 return 的基础组件虚拟 dom（类组件则应该实例化后调用 render 方法）。fiber.props 是函数组件接收的属性。
    const element = fiber.type(fiber.props);
    const children = [element]
    reconcileChildren(fiber, children)
}
// ​更新基础组件，如 div, p, span...
function updateHostComponent(fiber) {
    // 基础组件直接和 dom 关联
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);  // 我们通过 fiber.dom 这个属性来维护创建的 DOM 节点。
    }
    // 为每个子节点创建对应的新的 fiber 节点
    const elements = fiber.props.children
    reconcileChildren(fiber, elements)
}

/**
 * useState 的实现
 * @param {any} initial 初始值，每次函数组件执行的时候，没旧 hook 则获取初始值；有旧 hook 则获取旧 hook 上的值
 * @returns 
 */
function useState(initial) {
    // 获取当前 fiber 对应的旧 fiber 上的旧 hook
    const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]
    const hook = {
        state: oldHook ? oldHook.state : initial,  // 旧 hook 存在，则将旧 hook 的值复制给新 hook，否则初始化值
        queue: []  // 存储 setState 调用时传入的函数。setState 可以连续多次调用，所以使用队列保存
    }

    // setState 被调用的时候并不会立即执行，而是将接收到的 action 保存在当前 hook 的 queue 中。待下次渲染的时候再执行
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
    // 当组件每次渲染的时候就会按流程执行 useState，然后会执行对应 hook 中的所有 action
    const actions = oldHook ? oldHook.queue : []
    actions.forEach(action => {
        hook.state = action(hook.state)
    })

    // 将 hook 添加到 wipFiber.hooks
    wipFiber.hooks.push(hook)
    // hook 索引加1，多次执行 useState 的时候就是对下一个索引进行操作
    // 函数组件执行的时候 useState 也是按顺序执行的，每个 useState 对应执行顺序的索引
    hookIndex++
    return [hook.state, setState]
}

/**
 * 协调器：比较新旧虚拟 DOM 构建 fiber 树
 * @param {object} wipFiber fiber 节点
 * @param {array} elements children 子元素
 */
function reconcileChildren(wipFiber, elements) {
    let index = 0
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child
    let prevSibling = null  // 上一个子节点

    while (index < elements.length || oldFiber != null) {
        const element = elements[index]

        // const newFiber = {  // 可以看出 fiber 相对于 mReact.createElement() 生成的数据结构有所不同
        //     type: oldFiber.type,  // 节点类型
        //     props: element.props,  // 节点属性
        //     parent: wipFiber,  // 每个子节点的 parent 指向当前 fiber
        //     dom: oldFiber.dom,  // 关联的 dom 元素
        //     alternate: oldFiber,  // 旧 fiber 节点的引用
        //     effectTag: 'UPDATE',  // DOM 修改类型
        // }
        let newFiber = null;

        const sameType = oldFiber && element && element.type == oldFiber.type

        // 对于新旧节点类型是相同的情况，我们可以复用旧的 DOM，仅修改上面的属性
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: "UPDATE",
            }
        }
        // 如果类型不同，意味着我们需要创建一个新的 DOM 节点
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: "PLACEMENT",
            }
        }
        // 如果类型不同，并且旧节点存在的话，需要把旧节点的 DOM 给移除
        if (oldFiber && !sameType) {
            oldFiber.effectTag = "DELETION"  // 不会创建新的 fiber，对旧 fiber 进行标记
            deletions.push(oldFiber)
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling  // oldFiber 指向下一个兄弟节点的 oldFiber，因为 while 循环的下一个循环就是下一个兄弟节点
        }


        if (index === 0) {  // 当前 fiber 的 child 指向子节点的第一个节点。当前 fiber 和子节点就是双向链表
            wipFiber.child = newFiber
        } else {  // 不是第一个节点，则将上一个节点的 sibling 指向此节点。同级节点就是一个单向链表
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber  // 当前子节点赋值给上一个子节点
        index++
    }
}


const mReact = {
    createElement,
    render,
    useState
}



// const element = (
//     <div id="foo">
//         <a>bar</a>
//         <b />
//     </div>
// )
const element = mReact.createElement(
    'div',
    { id: 'foo' },
    mReact.createElement("a", null, "bar"),
    mReact.createElement("b")
);


const container = document.getElementById("root")
mReact.render(element, container)



// 函数组件：1.函数组件的 fiber 没有 DOM 节点；2.子节点由函数运行得来而不是直接从 props 属性中获取
// function App(props) {
//     return <h1>Hi {props.name}</h1>
// }
// const element = <App name="foo" />
function App(props) {
    return mReact.createElement(
        "h1",
        null,
        "Hi ",
        props.name
    )
}
const element = mReact.createElement(App, {
    name: "foo",
})
const container = document.getElementById("root")
mReact.render(element, container)



// hooks
function Counter() {
    const [state, setState] = mReact.useState(1)
    return (
        <h1 onClick={() => setState(c => c + 1)}>
            Count: {state}
        </h1>
    )
}
const element = <Counter />
const container = document.getElementById("root")
mReact.render(element, container)