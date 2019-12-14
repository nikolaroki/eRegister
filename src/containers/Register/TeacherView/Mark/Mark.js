import React from 'react';
import classes from './Mark.module.css';


const mark = (props) => (






    <div>
        <div className={classes.Mark}>
            <p><strong>Ocena: </strong>{props.markValue}</p>
            <p><strong>Datum Unosa:</strong>{props.markDate}</p>
            <button type="button" className="btn btn-danger" onClick={props.delete}>Obrisi</button>
        </div>
    </div>
);

export default mark;