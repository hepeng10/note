# mobx
### 老版本
在使用 mobx 的时候不需要使用文档中的 @tarojs/mobx，直接使用 mobx-react 即可。具体使用可参考记工记账小程序，主要步骤就是：
1. 创建 store 目录，在 index.ts 中使用 React.createContext 包装 mobx 创建的 store，并返回一个 storeContext。
2. 在 hooks 目录中创建 useStores.ts 使用 React.useContext(storeContext) 包装上面的 storeContext，并返回一个 useStores 自定义 hooks。
3. 在需要使用 store 的组件中使用 mobx-react 导出的 observer 方法包装组件，在组件中使用上面的 useStores 方法可以导出我们第一部中编写的各种 store。

### 新版本
新版本中使用 react-mobx-lite 库，只需要两部：
1. 创建 store 目录，使用 class 的方式编写 store 文件，注意每个 store 文件的 constructor 中使用 makeObservable(this) 才能触发页面更新。
2. 在组件文件中，使用 react-mobx-lite 的 observer 方法包装组件，就可以在这个组件中 import 各个 store 来使用了。

# mobx 的坑
1. 组件即便使用了 observer 进行包裹，但是如果在页面中使用 mobx 的 store，这些 store 数据只在条件判断中出现，而页面渲染时如果没走到对应的条件逻辑中，会导致 mobx 的依赖收集机制收集不到组件中使用的 store 的数据，从而导致修改 store 时组件不会重新渲染。
2. @computed 将依赖放在 if 条件中也会出现依赖更新，computed 的属性不更新的问题，应该先在外面取值再做条件判断。
```ts
  // fail
  @computed get isLogin() {
    if (getStorageSync('token') && this.userInfo?.uid) {
      return true;
    } else {
      return false;
    }
  }

  // ok
  @computed get isLogin() {
    const uid = this.userInfo?.uid;
    if (getStorageSync('token') && uid) {
      return true;
    } else {
      return false;
    }
  }
```