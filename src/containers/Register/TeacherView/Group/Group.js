import React from 'react';
import classes from './Group.module.css';


const subject = (props) => (
    <div className="shadow-lg p-3 mb-5 rounded">
        <article className={classes.Subject} onClick={props.clicked}>
            <h1>{props.outputGroup}</h1>
        </article>
    </div>
);

export default subject;


