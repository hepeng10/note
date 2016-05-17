import React from 'react';
import ReactDom from 'react-dom';

// 创建一个组件
var CommentBox=React.createClass({
    // getInitialState函数，用来初始化数据。在组件生命周期中只执行一次
    getInitialState(){
        return {data:[]};
    },
    // componentDidMount函数，当组件渲染完成后自动执行
    componentDidMount(){
        $.ajax({
            url:'json/comments.json',
            dataType:'json',
            cache:false,
            // success(){...}这种写法没箭头函数的作用，会改变this指向
            success:(data)=>{
                console.log(this)
                // 使用this.setState()来修改上面的data数据
                this.setState({data:data});
            }
        });
    },
    // 子组件通过this.props调用父组件定义的属性，父组件中再调用自定义的这个函数，完成子组件往父组件传递数据
    handleCommentSubmit(comment){
        // 通过ajax访问另一个json文件，模拟从数据库获得更新后的数据
        $.ajax({
            url:'json/updateComments.json',
            dataType:'json',
            data:comment,
            cache:false,
            success:(data)=>{
                console.log(this)
                this.setState({data:data});
            }
        });
    },
    // render函数，return返回HTML内容
    render(){
        return (
            //class在这里需要写成className
            <div className="commentBox">
                <h1>CommentBox</h1>
                {/*通过this.state获取自己的数据，而不是传下来的。这里就能获取getInitialState里返回的data*/}
                <CommentList data={this.state.data} />
                {/*这个onCommentSubmit是自定义的，在CommentForm组件里，通过this.props.onCommentSubmit()调用*/}
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
            );
    }
});

var CommentList=React.createClass({
    render(){
        // 遍历传入的data，返回JSX
        var commentNodes=this.props.data.map((comment)=>{
            return (
                // 遍历组件时，通常需要给一个key属性，并且值唯一。比如两条评论的author和text都一样，如果没有key这个唯一的属性，那么只会显示一条
                <Comment author={comment.author} key={comment.author}>{comment.text}</Comment>
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
    // 初始化数据
    getInitialState(){
        return {
            author:'',
            text:''
        };
    },
    // 自定义函数：和内置函数同级，而不像vue那样需要定义在methods里
    handleAuthorChange(e){
        // 修改组件数据
        this.setState({author:e.target.value});
    },
    handleTextChange(e){
        this.setState({text:e.target.value});
    },
    // 提交的时候阻止默认提交事件，并把数据置空
    handleSubmit(e){
        e.preventDefault();
        var author=this.state.author.trim();
        var text=this.state.text.trim();
        if(!author||!text){
            return;
        }
        // 通过this.props调用属性事件方法
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author:'',text:''});
    },
    render(){
        return (
            // 给form绑定onSubmit事件（原生JS就有onsubmit事件），处理提交操作
            <form className="commentForm" onSubmit={this.handleSubmit}>
                CommentForm
                <br/>
                {/*input框里修改了author的值，这里也会更新*/}
                author:{this.state.author}|text:{this.state.text}
                <br/>
                {/*通过onChange事件（JSX的事件使用驼峰式）调用自定义函数来修改数据（自定义函数直接通过this.xxx调用）。react不支持双向绑定，所以没有v-model这样的东西*/}
                <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} /><br/>
                <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} /><br/>
                <input type="submit" value="Post" />
            </form>
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

// 渲染组件
ReactDom.render(
    // 传入data
    <CommentBox />,
    // 渲染的位置
    document.getElementById('comment')
    );