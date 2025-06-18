let isMount = true;  // 是否为首次渲染
let workInProgressHook = null;  // 用于指向 hook 的指针

const fiber = {
    stateNode: App,
    memorizedState: null,  // 保存 hooks 的数据，是个链表结构；如果是 class 组件则是保存 state 数据
}

function useState(initState) {
    let hook;
    if (isMount) {  // mount 的时候会初始化 memorizedState
        // useState, useEffect, useRef 这些 hooks 都是创建一个 hook 对象，然后用 memorizedState 存储 hook 的数据
        hook = {
            memorizedState: initState,  // 当前 hook 数据
            next: null,  // 指向下一个 hook 的指针
            queue: {  // 一个 useState 生成了一个 setState，这个 setState 可以多次调用，queue 就存储多次调用传入的回调函数
                pending: null  // pending 为 null，说明当前的 hook 还没有需要触发的更新操作
            }
        }
        if (!fiber.memorizedState) {
            fiber.memorizedState = hook;  // 不存在则是第一调用 useState，将 fiber.memorizedState 指向这第一个 hook
        } else {  // 存在则是多次调用 useState
            workInProgressHook.next = hook;  // 上一个 hook 的 next 指向当前 hook
        }
        workInProgressHook = hook;  // 存储当前 hook 用于下次使用
    } else {  // update 的时候 memorizedState 已经有了
        // workInProgressHook 是从第一个 hook 开始的，因为更新是通过调用 schedule 来更新的，而 schedule 中对 workInProgressHook 进行了复位操作
        hook = workInProgressHook;
        // workInProgressHook 指向下一个 hook
        workInProgressHook = hook.next;
    }

    // 计算新的 state 需要根据当前 state 来进行计算
    let baseState = hook.memorizedState;
    if (hook.queue.pending) {
        let update = hook.queue.pending.next;  // 获取存储 action 的 update
        // 需要循环是因为可能多次调用一个 useState 生成的 setState。如下面的 setNumber 多次调用
        do {
            const action = update.action;  // 获取 action
            baseState = action(baseState);  // 调用 action 并返回新的值作为 baseState
            update = update.next;  // 将下一个 update 赋值给 update
        } while (update !== hook.queue.pending.next)  // update 不等于第一个 update 的就一直循环，等于就说明都循环完了，结束循环
    }

    hook.memorizedState = baseState;  // 将最新的值赋值给 memorizedState

    // bind 传入的参数在调用的时候会作为第一个参数传入
    return [baseState, dispatchAction.bind(null, hook.queue)]
}

/**
 * setState 的时候调用 dispatchAction
 *
 * @param {object} queue  当前 hook 的 queue
 * @param {func} action  setState 传入的回调
 */
function dispatchAction(queue, action) {
    const update = {  // update 是条环状链表，因为在 react 中不同事件触发的 setState 优先级不同，所以设计为环状链表
        action,
        next: null
    }
    if (queue.pending === null) {  // 首次执行 setState
        // u0 -> u0 -> u0
        update.next = update;  // 自己指向自己，形成环
    } else {
        // u1 -> u0 -> u1
        update.next = queue.pending.next;  // 当前 update.next 指向上一个 update
        queue.pending.next = update;  // queue.pending.next 赋值为当前 update
    }
    queue.pending = update;

    schedule();  // 触发一次更新
}

// 调度器，这里就用来模拟重新渲染
function schedule() {
    workInProgressHook = fiber.memorizedState;  // 复位指针
    const app = fiber.stateNode();  // 模拟页面渲染
    isMount = false;
    return app;
}

function App() {
    const [num, setNumber] = useState();

    // 简化，直接返回一个对象而不是 JSX
    return {
        onClick() {
            setNumber(num => num + 1)
        }
    }
}

window.app = schedule();
app.onClick();