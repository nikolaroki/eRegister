import React from 'react';
import classes from './TeacherEl.module.css';


const teacherEl = (props) => (
    <div className="shadow-lg p-3 mb-5 rounded">
        <article className={classes.Subject}>
            <h1 >{props.teacherName} {props.teacherSurname}</h1>
            <button type="button" className="btn btn-info m-1" onClick={props.addTeacher}>Izaberi za staresinu</button>
        </article>
    </div>
);

export default teacherEl;