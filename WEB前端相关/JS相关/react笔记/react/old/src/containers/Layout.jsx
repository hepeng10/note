import React from 'react'
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { Nav, NavItem } from 'bfd-ui/lib/nav'

// components


const Layout = React.createClass({
    getInitialState() {
        return {}
    },
    menuClick(event) {

    },
    /**
     * 渲染超级管理员下的左侧导航菜单
     * @return {[component]} [返回左侧的导航组件]
     */
    renderAdmin() {
        return (<Nav>
          <NavItem href="/main/sub1" icon="home" title="导航1"/>
          <NavItem href="/" icon="bold" title="导航2">
            <Nav>
                <NavItem href="/module1/sub1" title="子模块1" />
                <NavItem href="/module1/sub2" title="子模块2" />
                <NavItem href="/module1/sub3" title="子模块3"/>
            </Nav>
          </NavItem>
        </Nav>);
    },
    render() {
        let menu;
        window.BFD.userType = this.props.userType;
        switch (window.BFD.userType) {
        case BFD.ENUM.UserType.ADMIN: //超级管理员
            menu = this.renderAdmin();
            break;
        }
        return (
            <div className="ant-layout-topaside">
                <div className="ant-layout-wrapper">
                    <div className="ant-layout-container">

                        <aside className="ant-layout-sider">
                            {menu}
                        </aside>

                        <div className="ant-layout-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>)
    }
})

module.exports = Layout
