import React from 'react';
import classes from './SubjectEl.module.css';


const subject = (props) => (
    <div className="shadow-lg p-3 mb-5 rounded">
        <article className={classes.Subject} onClick={props.clicked}>
            <h1>{props.name}</h1>
            <div >
                <div>Časova Nedeljno: <strong> {props.classesPerWeek}</strong></div>
            </div>
            <button type="button" className="btn btn-info " onClick={props.edited}>Promeni Detalje</button>
            <button type="button" className="btn btn-danger" onClick={props.delete}>Izbrisi</button>
            <form className="form-inline" onSubmit={props.addToGrade}>
                <label className="sr-only" htmlFor="selectedGrade"></label>
                <button type="submit" className="btn btn-info mt-2 mr-1" onClick={props.selectSubjectId}>Dodaj Na razred</button>
                <input onChange={props.changed} type="number" min="1" max="8" 
                className="form-control mt-2 mr-sm-2" name="selectedGrade" />
                
            </form>
            
        </article>
    </div>
);

export default subject;
