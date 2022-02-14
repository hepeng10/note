**useMemo 和 useCallback 都是进行性能优化的手段。**

**某大佬：性能优化总是会有成本的，而且并不总是带来好处。比起花的时间和代码可读性，一点点的性能优化显得微不足道，除了性能重灾区之外，都不值得这么去搞。**

### useMemo 的使用
```jsx
export default function WithMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    const expensive = useMemo(() => {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
 
    return <div>
        <h4>{count}-{expensive}</h4>
        {val}
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}
```
1. useMemo 可以作为 Vue 的 computed 来使用。
2. useMemo 主要用于性能优化，其中的计算比较复杂再使用。
3. useMemo 具有缓存作用，这里只修改 val，useMemo 返回的 expensive 的值会直接从缓存获取。只有修改 count 的时候才会重新执行得到新的 expensive 的值。


### useCallback 的使用
**useCallback 和 useMemo 类似，只是缓存的是一个函数。**

先来看一个错误的实例：
```jsx
function Form() {
  const [text, updateText] = useState('');

  const handleSubmit = useCallback(() => {
    console.log(text);
  }, [text]); // 每次 text 变化时 handleSubmit 都会变

  return (
    <>
      <input value={text} onChange={(e) => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} /> // 很重的组件，不优化会死的那种
    </>
  );
}
```
每次 input 输入框的改变都会导致 handleSubmit 改变，ExpensiveTree 组件就会重新渲染。

改成下面的方式：
```jsx
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useLayoutEffect(() => {  // 类似 didUpdate
    textRef.current = text; // 将 text 写入到 ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // 从 ref 中读取 text
    alert(currentText);
  }, [textRef]); // handleSubmit 只会依赖 textRef 的变化。不会在 text 改变时更新

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```
这里，我们修改 input 输入框会修改 textRef 的 current，但是 textRef 没有改变，所以 handleSubmit 也就不会改变。那么子组件 ExpensiveTree 也就不会接收到新的 handleSubmit，不会重新渲染了，性能得到了提升。

## 实例
最近做项目的时候发现了性能问题，由于需要监听滚动事件不断更新返回顶部按钮的显示和隐藏，而这个更新过程导致兄弟组件中的长列表更新，从而导致性能问题。最后通过 useMemo 和 useCallback 优化。所以在监听滚动这类触发频率很高的事件时需要多留意性能问题。
```tsx
const Index = ({ workTypeList }: props) => {
  const ScrollRef = useRef<ScrollRefData>(null);
  const [offsetHeight, setOffsetHeight] = useState<number>(0);

  const scroll = (e) => {
    const { scrollTop } = e.detail;
    setOffsetHeight(scrollTop);
  };

  // 缓存 ScrollBoxView 的 props，避免监听页面滚动事件导致重复渲染的性能问题
  const scrollFn = useCallback((e) => {
    scroll(e);
  }, []);
  const dataForm = useMemo<PropsVal['dataFrom']>(() => {
    return {
      type: 'serv',
      service: findJobList,
      params: listParams
    };
  }, [listParams]);
  const renderDom = useMemo<PropsVal['renderDom']>(() => {
    return { tag: listLine, top: TopItem };
  }, [TopItem]);

  return (
    <View className={styles.box}>
      <TitleBar type="job" goSearch={goSearch} />
      <View className={styles.wrapper}>
        <View className={styles.list}>
          {/* 老代码：当前组件重新渲染都会生成新的 props 导致 ScrollBoxView 组件重新渲染 */}
          <ScrollBoxView
            refresh
            ref={ScrollRef}
            dataFrom={{
              type: 'serv',
              service: findJobList,
              params: listParams
            }}
            renderDom={{ tag: listLine, top: TopItem }}
            onHandleScroll={(e) => scroll(e)}
          />
          {/* 新代码：props 都进行了缓存，避免无意义的重复渲染导致性能问题 */}
          <ScrollBoxView
            refresh
            ref={ScrollRef}
            dataFrom={dataForm}
            renderDom={renderDom}
            onHandleScroll={scrollFn}
          />
        </View>
      </View>
      <BackTop top={50} offsetHeight={offsetHeight} scrollTo={srollTopHandle} />
    </View>
  );
};
```