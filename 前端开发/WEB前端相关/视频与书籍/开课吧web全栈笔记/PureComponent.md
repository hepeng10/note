# PureComponent 组件的使用 & React.memo
## PureComponent
PureComponent 组件的作用是用来优化 React 的性能，当组件的 state 或 props 变化的时候（值不一定实际改变，可能是 setState 了一个相同的值），PureComponent 组件就会比较值是否真的改变，如果没改变则不会执行 render 方法重新渲染这个组件。是用来替代 shouldComponentUpdate 的。

比如我们有个需求需要轮询请求数据，然后使用新的数据覆盖旧数据，但是每次轮询的时候新数据不一定就会发生变化，我们在代码中使用了 setState 来更新数据，如果是普通的组件，就会触发重绘，而使用 PureComponent 组件就可以避免这个问题，从而提升性能。

```jsx
class PureComp extends React.PureComponent {
    render() {
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>年龄：{this.props.age}</p>
            </div>
        );
    }
}
```

### PureComponent 的一个坑
PureComponent 只会浅比较，所以在通过 props 传递数据的时候，不能将多个数据作为一个对象传递，而应该使用展开语法让数据只有一层，如：
```jsx
const data = {
    name: 'tirion',
    age: '33'
};

// 错误案例：Comp 组件中需要使用 props.data.name 获取数据，这就有两层了，导致 PureComponent 功能失效
<PureComp data={data} />

// 正确案例：Comp 中通过 props.name 就能获取到数据
<PureComp {...data} />
```

所以在开发的时候需要将展示组件继承 PureComponent，并且接收 props 时不要使用一个对象来接收多个属性。

## React.memo
React.memo 是个高阶组件，用来包装函数组件实现 PureComponent 的特性。
```jsx
export default const PureComp = React.memo((props) => {
    return (
        <div>
            <p>姓名：{this.props.name}</p>
            <p>年龄：{this.props.age}</p>
        </div>
    );
});
```