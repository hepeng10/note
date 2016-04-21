npm安装react：
npm install --save react react-dom babel-preset-react

在使用的时候通常这两个都需要引入，由于通过npm安装的，所以在require的时候不用指定相对路径也能找到
var React=require('react')
var ReactDom=require('react-dom')

0.14发布后，react package拆分为了react和react-dom两个package，详情：http://www.oschina.net/news/66873/react-0-14

规则：
1、HTML元素名以小写字母开头，react类名以大写字母开头

实例：
// 这里的变量名不能使用-连接，只能用驼峰式
var React=require('react');  //引入react
var ReactDom=require('react-dom');  //引入react-dom，因为react native没有dom，所以将dom部分从react中分离出来了
// 使用React.createClass声明一个CommentBox组件
var CommentBox=React.createClass({
    // render方法返回一颗react组件树，这棵树最终将会渲染成HTML
    render:function(){
        return (
            // div标签并不是真正的DOM节点，是react div组件的实例，react内部来处理。不要把它当成HTML字符串
            // 这个div其实和自己创建的CommentBox类似，只不过是react内置的
            // 标签中注释需要使用{/*...*/}这种格式。但是这上面的注释不能这样，因为这里还没有遇到标签，也就没有开始调用React.createElement()
            <div className="commentBox">  {/*class需要使用className，这里也能看出这个div不是真正的DOM节点*/}
                这里是commentBox
            </div>
            )
    }
})
// ReactDOM.render() 实例化根组件，启动框架，把标记注入到第二个参数指定的原生的 DOM 元素中。
ReactDom.render(<CommentBox />,document.getElementById('content'))
注：在JS中写标签的时候，比如上面的div和BommentBox，JSX编译器会自动重写 HTML 标签为 React.createElement(tagName) 表达式

// JSX语法，这个是JSX编译后的源代码，上面直接写标签只是语法糖。效果和上面一样
var CommentBox = React.createClass({
  displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: "commentBox"},
        "这里是commentBox"
      )
    );
  }
});
ReactDOM.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);



this.props 是父组件向子组件传递数据的一种方式，只读
this.state 是组件数据
静态数据一般放在 this.props 中，从全局一级级传(?)，动态数据一般才放在 this.state 中

react的组件只能渲染一个根节点，如果是要渲染多个节点，可把它们包含在同一个节点里。类似XML，所以叫JSX呢——javascript xml

react的组件名必须大写，实际上react的JSX里约定分别使用首字母大、小写来区分本地组件的类和HTML标签

由于 JSX 就是 JavaScript，一些标识符像 class 和 for 不建议作为 XML 属性名。作为替代，React DOM 使用 className 和 htmlFor 来做对应的属性。

setState(data,callback)是合并(merge)data到this.state，并重新渲染组件。渲染完成后会调用callback


props默认值：当父级没有传入 props 时，getDefaultProps() 可以保证 this.props.value 有默认值
var ComponentWithDefaultProps = React.createClass({
  getDefaultProps: function() {
    return {
      value: 'default value'
    };
  }
  /* ... */
});


spread语法，简化props的书写
var CheckLink = React.createClass({
  render: function() {
    // 这样会把 CheckList 所有的 props 复制到 <a>
    return <a {...this.props}>{'√ '}{this.props.children}</a>;
  }
});
React.render(
  <CheckLink href="/checked.html" title="test">
    Click here!
  </CheckLink>,
  document.getElementById('example')
);


refs：React的JSX是虚拟DOM，所以，我们想要获取真实DOM，那么需要使用到refs。只能用在已被挂在的组件上，组件尚未被挂在，去获取，会报错。
通过 this.refs.myInput 获取支撑实例（ backing instance ）
通过 this.refs.myInput.getDOMNode() 直接获取到组件的 DOM 节点
ref属性不仅能加在“HTML元素”上，还能加在组件上，如<Typeahead ref="myTypeahead" />
var App = React.createClass({
  getInitialState: function() {
    return {userInput: ''};
  },
  handleChange: function(e) {
    this.setState({userInput: e.target.value});
  },
  clearAndFocusInput: function() {
    this.setState({userInput: ''}, function() {
      // 这里通过refs获取到了原生DOM节点
      this.refs.theInput.getDOMNode().focus();   // Boom! Focused!
    });
  },
  render: function() {
    return (
      <div>
        <div onClick={this.clearAndFocusInput}>
          Click to Focus and Reset
        </div>
        // 通过ref属性给组件设置refs
        <input
          ref="theInput"
          value={this.state.userInput}
          onChange={this.handleChange}
        />
      </div>
    );
  }
});


组件声明周期：
挂载： 组件被插入到DOM中。
更新： 组件被重新渲染，查明DOM是否应该刷新。
移除： 组件从DOM中移除。

挂载：
getInitialState(): object在组件被挂载之前调用。状态化的组件应该实现这个方法，返回初始的state数据。
componentWillMount()在挂载发生之前立即被调用。
componentDidMount()在挂载结束之后马上被调用。需要DOM节点的初始化操作应该放在这里。

更新
componentWillReceiveProps(object nextProps)当一个挂载的组件接收到新的props的时候被调用。该方法应该用于比较this.props和nextProps，然后使用this.setState()来改变state。
shouldComponentUpdate(object nextProps, object nextState): boolean当组件做出是否要更新DOM的决定的时候被调用。实现该函数，优化this.props和nextProps，以及this.state和nextState的比较，如果不需要React更新DOM，则返回false。
componentWillUpdate(object nextProps, object nextState)在更新发生之前被调用。你可以在这里调用this.setState()。
componentDidUpdate(object prevProps, object prevState)在更新发生之后调用。

移除
componentWillUnmount()在组件移除和销毁之前被调用。清理工作应该放在这里。