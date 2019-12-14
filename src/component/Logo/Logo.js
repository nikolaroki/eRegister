import React from 'react';
import schoolIcon from '../../assets/images/school-icon.jpg';
import classes from '../Logo/Logo.module.css'



const logo = (props) => (
    <div className={classes.Logo} >
        <img src={schoolIcon} alt="nista" />
    </div>
);

export default logo;

