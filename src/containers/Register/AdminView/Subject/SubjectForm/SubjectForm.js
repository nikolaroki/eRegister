import React from 'react'

function SubjectForma(props) {
    return (
        <div>
            <form onSubmit={props.submitNewSubject}>
                <h5> Unesite detalje za novi predmet:</h5>
                <div className="form-group">
                    <label htmlFor="name">Ime Predmeta</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={props.name}
                        onChange={props.changed}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="classesPerWeek">Casova Nedeljno</label>
                    <input
                        type="number"
                        className="form-control"
                        name="classesPerWeek"
                        value={props.classesPerWeek}
                        onChange={props.changed}
                    />
                </div>

                <button type="submit" className="btn btn-success" >Dodaj Premet</button>
                <button type="button" className="btn btn-danger" onClick={props.cancel}>Otkazi</button>
                
                </form>

        </div>
            )
        }
        
        export default SubjectForma
