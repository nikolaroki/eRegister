import React from 'react';
import classes from './GroupEl.module.css';


const groupEl = (props) => (
    <div className="shadow-lg p-3 mb-5 rounded">
        <article className={classes.Subject} onClick={props.clicked}>
            <h1 className={classes.AAA}>{props.outputGroup}</h1>
            <h6 className="card-subtitle mb-2 text-muted">Generacija: {props.generation}</h6>
            <p className="card-text"><strong>Skola</strong> : {props.schoolName}</p>
            <p className="card-text"><strong>Staresina</strong> : {props.homeRoomTeacherName} {props.homeRoomTeacherSurname}</p>
            {props.homeRoomTeacherName===null  ||   props.homeRoomTeacherName==="" ? <button type="button" className="btn btn-info m-1" onClick={props.addTeacher}>Dodaj Odeljenskog statesinu</button>:null}
            <button type="button" className="btn btn-info m-1" onClick={props.increade}>Povecaj Razred Odeljenju</button>
            <button type="button" className="btn btn-danger m-1" onClick={props.delete}>Obrisi</button>
        </article>
    </div>
);

export default groupEl;