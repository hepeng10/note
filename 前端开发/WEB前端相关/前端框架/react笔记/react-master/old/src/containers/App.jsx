import React from 'react'
import GlobalNav from './GlobalNav'
import Layout from './Layout'

const App = React.createClass({
    getDefaultProps() {
        return {}
    },
    getInitialState() {
        return {
            userType: BFD.ENUM.UserType.ADMIN
        }
    },
    handleChange(value) {
        this.setState({ userType: value });
    },
    render() {
        return (<div>
            <GlobalNav onChange={this.handleChange}/>
            <div className='container' style={{width:'100%',paddingLeft:0,paddingRight:0}}>
                <Layout {...this.props} userType={this.state.userType}/>
            </div>
        </div>)
    }
})

module.exports = App
