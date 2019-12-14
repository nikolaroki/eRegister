import React from 'react';
import classes from './Mark.module.css';


const mark = (props) => (






    <div>
        <div className={classes.Mark}>
            <p><strong>Ocena: </strong>{props.markValue}</p>
            <p><strong>Datum Unosa:</strong>{props.markDate}</p>
            
        </div>
    </div>
);

export default mark;