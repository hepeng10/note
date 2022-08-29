[React中常见的TypeScript定义使用](https://juejin.cn/post/6844904175831089165)

# 类型的继承关系

### React 中类型的继承关系：
![图 2](assets/1639193468116.png)

### 原生 DOM 中类型的继承关系
![图 3](assets/1639193564557.png)

# 组件定义
### 函数组件
函数组件只需要定义 Props

```tsx
interface Props {
    className: string;
}
function Hello(props: Props) {
    return <h1>Hello World</h1>;
}
```

useState 的使用
```tsx
import React, { useState } from 'react';
interface Props {
    className: string;
}
type User = {
    id: string;
    name: string;
};
export default function Hello(props: Props) {
    // useState 是个泛型函数，指定接收类型为 User 类型数组
    const [userList, setUserList] = useState<User[]>([]);
    const addUser = () => {
        setUserList([
            {
                id: 123,  // User 类型中 id 为 string，赋值 number 会提示类型错误
                name: 'xxx',
            },
        ]);
    };
    return (
        <h1 onClick={addUser}>
            <span>Hello</span>
            {userList.map((item: User) => {
                return (
                    <span key={item.id}>
                        {item.id}
                        {item.name}
                    </span>
                );
            })}
        </h1>
    );
}
```

### 类组件
类组件需要定义 Props 和 State

```tsx
interface Props {
    className: string;
}
interface State: {
    id: string;
}
class Hello extends React.Component<Props, State> {
    state: {
        id: '123'
    };
    render() {
        return <h1>Hello World</h1>;
    }
}
```

# 事件
react 中的 jsx 事件的类型不是原生类型，而是 react 的类型。
如：
```jsx
// 这里事件 e 的类型是 React.ChangeEvent，而不是原生的 Event
const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
}

return (
    <TextArea onChange={onChange}></TextArea>
);
```

# 泛型组件
组件可以是一个能接收类型参数的泛型组件。

#### 定义泛型组件：
```ts
// <DayData> 是组件接收的泛型参数
function MainCalendar<DayData>(props: MainCalendarProps<DayData>, ref: React.Ref<CalendarRefFn>) {
  const calendarRef = useRef<CalendarRefFn>();

  useImperativeHandle(ref, () => ({
    swipePrev: calendarRef.current?.swipePrev!,
    swipeNext: calendarRef.current?.swipeNext!
  }));

  return (
    <SwiperCalendar
      ref={(ref) => (calendarRef.current = ref!)}
      className={props.className}
      date={props.date}
      overCurrent={false} // 不能滑过当前月
      dayFormatter={props.dayFormatter}
      onSwiperChange={props.onSwiperChange}
    />
  );
}

export default MainCalendar;
```

#### 使用泛型组件
```ts
return (
    // 在组件后使用 <Type> 来传递类型
    <MainCalendar<{ isWork: boolean; }>
        date="2022-7-1"
    />
);
```

#### React.forwardRef 与泛型组件
React.forwardRef 会导致泛型组件的泛型丢失，我们的组件使用 React.forwardRef 包裹后就没法再接收泛型了。解决方法是手动修改组件类型。
```ts
// forwardRef 会丢失组件的泛型参数，需要使用 as 手动修改类型
export default forwardRef(MainCalendar) as <T>(
    // 使用组件的 Props 接收这个泛型
    props: React.PropsWithChildren<MainCalendarProps<T>> & {
        // 定义 ref 的类型
        ref?: React.Ref<CalendarRefFn>;
    }
  ) => React.ReactElement;
// 上面的 Props 和 ref 两个类型其实在定义普通泛型组件的时候已经定义了，直接复制下来即可
// function MainCalendar<DayData>(props: MainCalendarProps<DayData>, ref: React.Ref<CalendarRefFn>) {
```