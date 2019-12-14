import React from 'react';
import classes from './Student.module.css';


const student = (props) => (
    <div className="shadow-lg p-3 mb-5 rounded">
        <article className={classes.Child} onClick={props.clicked}>
            <h5>{props.name}</h5>
            <h5>{props.surname}</h5>
        </article>
    </div>
);

export default student;


