import React from 'react'
import { Link } from 'react-router'

const GlobalNav = React.createClass({
    getDefaultProps: function () {
        return {
            user: {
                id: 1,
                name: 'Jupiter'
            }
        }
    },
    render() {
        const { user } = this.props

        return (<div className='wrapper'>
        <div style={{ float: 'right' }}>
            <Link className='link' to="/profile">{user.name}</Link>
        </div>
      </div>)
    }
})

export default GlobalNav
