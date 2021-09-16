import React from 'react';
import ReactDom from 'react-dom';

// 创建一个组件
var CommentBox=React.createClass({
    // render函数，return返回HTML内容
    render(){
        return (
            <div 
                className="commentBox"  //class在这里需要写成className（JSX标签注释写法）
            >
                <h1>CommentBox</h1>
                {/*组件嵌套（注意JSX内部文本注释写法）*/}
                <CommentList />
                <CommentForm />
            </div>
            );
    }
});
var CommentList=React.createClass({
    render(){
        return (
            <div className="commentList">
                CommentList
                {/*嵌套组件，并传入属性。在组件中通过this.props获取*/}
                <Comment author="HePeng">This is one comment</Comment>
                <Comment author="Tirion"><b>123</b>This is *anothor* comment</Comment>
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
                    {/*花括号在JSX里用，类似vue的{{}}*/}
                    {this.props.author}
                </h2>
                {/*通过this.props.children可以得到使用组件的位置的内部所有内容（innerHTML）*/}
                {this.props.children}
            </div>
            );
    }
});


// 渲染组件
ReactDom.render(
    // 组件名，一般使用单标签，双标签也可以
    <CommentBox />,
    // 渲染的位置
    document.getElementById('comment')
    );