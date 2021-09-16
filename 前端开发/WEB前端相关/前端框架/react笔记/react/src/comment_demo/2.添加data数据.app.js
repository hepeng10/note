import React from 'react';
import ReactDom from 'react-dom';

// 创建一个组件
var CommentBox=React.createClass({
    // render函数，return返回HTML内容
    render(){
        return (
            //class在这里需要写成className
            <div className="commentBox">
                <h1>CommentBox</h1>
                {/*组件嵌套（注意JSX内部的注释写法）*/}
                <CommentList data={this.props.data} />
                <CommentForm />
            </div>
            );
    }
});
var CommentList=React.createClass({
    render(){
        // 遍历传入的data，返回JSX
        var commentNodes=this.props.data.map((comment)=>{
            return (
                <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
                );
        })
        return (
            <div className="commentList">
                CommentList
                {/*插入上面得到的JSX（JSX中花括号类似vue的{{}}）*/}
                {commentNodes}
            </div>
            );
    }
});
var CommentForm=React.createClass({
    render(){
        return (
            <div className="commentForm">
                CommentForm
            </div>
            );
    }
});
var Comment=React.createClass({
    render(){
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {/*通过this.props获取组件上传入的属性值*/}
                    {this.props.author}
                </h2>
                {/*通过this.props.children可以得到使用组件的位置的内部所有内容（innerHTML）*/}
                {this.props.children}
            </div>
            );
    }
});

// 这个JSON用来模拟后端数据
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

// 渲染组件
ReactDom.render(
    // 传入data
    <CommentBox data={data} />,
    // 渲染的位置
    document.getElementById('comment')
    );