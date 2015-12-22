npm安装react：
npm install react react-dom --save

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