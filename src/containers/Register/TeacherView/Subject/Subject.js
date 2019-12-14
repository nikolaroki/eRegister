import React from 'react';
import classes from './Subject.module.css';


const subject = (props) => (
    <div className="shadow-lg p-3 mb-5 rounded">
    <article className={classes.Subject} onClick={props.clicked}>
        <h1>{props.name}</h1>
        <div >
            <div>Časova Nedeljno: <strong> {props.classesPerWeek}</strong></div>
            
        </div>
    </article>
    </div>
);

export default subject;


