import React from 'react';
import classes from './NavigationItems.module.css';
import {withRouter} from 'react-router-dom'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
       <NavigationItem link="/student" show={props.role==="ROLE_STUDENT"}>Moja Strana</NavigationItem>
       <NavigationItem link="/parent" show={props.role==="ROLE_PARENT"}>Moja Strana</NavigationItem>
       <NavigationItem link="/teacher" show={props.role==="ROLE_TEACHER"}>Moja Strana</NavigationItem>
       <NavigationItem link="/admin" show={props.role==="ROLE_ADMIN"}>Moja Strana</NavigationItem>
       <NavigationItem link={props.match.path +"/school-group" } show={props.role==="ROLE_ADMIN"}>Odeljenja</NavigationItem>
       <NavigationItem link={props.match.path +"/subject" } show={props.role==="ROLE_ADMIN"}>Predmeti</NavigationItem>
       <NavigationItem link={props.match.path +"/student" } show={props.role==="ROLE_ADMIN"}>Ucenici</NavigationItem>
       <NavigationItem link={props.match.path +"/teacher" } show={props.role==="ROLE_ADMIN"}>Nastavnici</NavigationItem>
       <NavigationItem link={props.match.path +"/parent" } show={props.role==="ROLE_ADMIN"}>Roditelji</NavigationItem>
       <NavigationItem link={props.match.path +"/admin" } show={props.role==="ROLE_ADMIN"}>Admini</NavigationItem>
       <NavigationItem link={props.match.path +"/profil" } show={true}>Profil</NavigationItem>
       <NavigationItem link={"/login"} show={true} logout={props.logout}>Odjavi se</NavigationItem>
       
    </ul>
);

export default withRouter(navigationItems)
