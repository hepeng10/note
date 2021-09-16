import React from 'react'

const SubLayout = React.createClass({
    getInitialState() {
        return {
            showForm: false,
            formType: 'data'
        }
    },
    componentWillUnmount() {
        //    TODO:如何有添加事件，在这里移除
    },

    render() {
        return (<div className="authority-sp">
            <span>This is a Sub Main</span>
        </div>)
    }
})

export default SubLayout;
