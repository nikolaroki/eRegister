import React, { Component } from 'react';
import classes from '../Layout/Layout.module.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawr:false
    }
    sideDrawerCloseHandler = ()=>{
        this.setState({showSideDrawr:false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return{showSideDrawr: !prevState.showSideDrawr}
        }
        );
    }
    

    render() {
        return (
            <div>
                <Toolbar drawerTogglerClicked = {this.sideDrawerToggleHandler} logout={this.props.logout} role={this.props.role}/>
                <SideDrawer closed = {this.sideDrawerCloseHandler} open = {this.state.showSideDrawr}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
            )
    }
};

export default Layout;