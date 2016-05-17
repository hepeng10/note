npm安装react：
npm install --save react react-dom babel-preset-react

在使用的时候通常这两个都需要引入，由于通过npm安装的，所以在require的时候不用指定相对路径也能找到
var React=require('react')
var ReactDom=require('react-dom')

0.14发布后，react package拆分为了react和react-dom两个package，详情：http://www.oschina.net/news/66873/react-0-14

注意事项：
1、HTML元素名以小写字母开头，react类名以大写字母开头
2、style属性的值是一个对象，而不是字符串
3、非DOM属性：dangerouslySetInnerHTML、ref、key。http://www.jikexueyuan.com/course/969_3.html?ss=1
   dangerouslySetInnerHTML:在JS中直接插入HTML代码。var rawHTML={__html:'<h1>hello</h1>'}，需要是一个对象，并且属性名为__html
   ref:reference，父组件引用子组件。子组件中设置ref属性，父组件可以通过this.refs.xxx来获取到这个子组件
   key:提高渲染性能（React diff算法：节点名是否相同->是否为自定义节点->比较属性），key用在节点上，React会根据key属性是否相同，来判断这个节点是否需要重新渲染。组件内部的元素不应该出现相同的key



组件生命周期：
组件本质上是状态机，输入确定，输出一定确定。状态发生转换时会触发不同的钩子函数，从而让开发者有机会做出响应。

挂载： 组件被插入到DOM中。
更新： 组件被重新渲染，查明DOM是否应该刷新。
移除： 组件从DOM中移除。

挂载（初始化）：
getDefaultProps()：获取实例的默认属性。只会在组件第一次初始化实例的时候调用（只调用一次，运行到这个组件的React.creatClass时就会调用，而不用等到组件渲染到页面。也就是即使没在页面渲染这个组件也会调用）
getInitialState(): object在组件被挂载之前调用。状态化的组件应该实现这个方法，返回初始的state数据。
componentWillMount()：在挂载发生之前立即被调用。render之前最后一次修改状态的机会
render()：生成虚拟的DOM节点（这个函数并不会挂在真是的DOM节点，所以这里没法操作DOM）。只能访问this.props和this.state；只能有一个顶层组件（类似XML，最外层只能是一对节点，不能是几对兄弟节点）；不允许修改状态和DOM输出（如果修改了，则作为服务端渲染会出问题）
componentDidMount()：在挂载结束之后马上被调用。（这时真正的DOM已被react渲染到页面中，这里可以操作DOM节点）。可通过React.findDOMNode(this)获取到这个组件的DOM对象

更新（运行中）：
componentWillReceiveProps(object nextProps)当一个挂载的组件接收到新的props的时候被调用。该方法应该用于比较this.props和nextProps，然后使用this.setState()来改变state。（比如父组件修改了子组件的属性，在子组件改变之前就会触发）
shouldComponentUpdate(object nextProps, object nextState): boolean当组件做出是否要更新DOM的决定的时候被调用。实现该函数，优化this.props和nextProps，以及this.state和nextState的比较，如果不需要React更新DOM，则返回false。（比如只需要更新一些数据，而不用更新显示的内容，就可以返回false。大部分情况下不需要使用）
componentWillUpdate(object nextProps, object nextState)在更新发生之前被调用。你可以在这里调用this.setState()。（不能修改属性和状态）
render()：同初始化
componentDidUpdate(object prevProps, object prevState)在更新发生之后调用。（可以修改DOM）

移除（销毁）：
componentWillUnmount()在组件移除和销毁之前被调用。清理工作应该放在这里。（比如清理定时器、事件监听等）。可通过React.unmountComponentAtNode()来取消组件的挂载，或在父组件中通过状态来确定子组件是否渲染，修改状态值可将子组件的渲染状态从有到无



属性：与生俱来，由父组件传入，不可通过组件自身更改，只能通过父组件等来修改
<HelloWorld name=属性值 />
属性值可以是："字符串"，{123}，{[1,2,3]}，{var}，{fn()}。{}里面的内容会当做JS来执行
var props={name:'Tirion',age:25};
<HelloWorld {...props} />  /使用解构的方法一次性设置多个属性。这种方式，修改了props中的属性值，传给组件的属性也会跟着改变

状态：通过this.state使用，是组件自身的私有属性，可通过自身进行修改、变化
getInitialState：初始化每个实例的状态。类似vue的data
setState：更新组件状态。setState->diff算法->更新DOM(diff算法结果是组件发生了变化才更新DOM，没变化就不会更新DOM)

属性和状态相似点：1、都是JS对象。2、都会触发render更新。3、都具有确定性（相同的属性或状态，组件生成的内容相同）。组件在运行时需要修改的数据就应该设置为状态，而不是通过属性传入



事件对象：
handleChange:function(e){  //react中的自定义方法和生命周期放在在同一层。事件对象e并不是原生的DOM事件对象，而是react进行封装过的
  // 通用事件属性
  var domE=e.nativeEvent;  //得到原生的事件对象
  var domT=e.target;  //得到触发事件的DOM对象
  其它事件属性和原生事件对象相同
}


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
            // 标签（JSX）中注释需要使用{/*...*/}这种格式。但是这上面的注释不能这样，因为这里还没有遇到标签，也就没有开始调用React.createElement()
            <div 
              className="commentBox"  //这里是节点注释
            >
              {/*这里是文本注释*/}
                这里是commentBox
            </div>  //
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
