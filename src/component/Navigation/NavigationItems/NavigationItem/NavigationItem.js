import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink, withRouter } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {props.show ? <NavLink
            activeClassName={classes.active}
            exact
            to={props.link}
            onClick={props.logout}
        >{props.children}
        </NavLink> : null}
    </li>
);

export default withRouter(navigationItem)