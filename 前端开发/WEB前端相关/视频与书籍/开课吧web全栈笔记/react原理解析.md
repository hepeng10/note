### 为什么在写 react 组件的时候需要引入 react
```js
import React from 'react';

export default () => {
    return <p>Hello World<p>;
}
```
以上代码我们并没有使用到引入的 React，但是我们却必须引入它，不然就会报错，这是问什么呢？
是因为 webpack 在进行打包的时候，组件中的 jsx 部分是要编译成 React.createElement() 的，所以必须引入 React 才能使用 React.createElement。