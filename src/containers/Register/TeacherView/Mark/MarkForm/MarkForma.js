import React from 'react'

function MarkForma(props) {
    return (
        <div>
            <form onSubmit={props.submitNewMark}>
                <h5> Unesite Vrstu Ocene:</h5>
                <div className="form-group">
                <label htmlFor="markDefinition">Vrsta Ocene</label>
                    <select defaultValue="DESCRIPTION_KONTROLNI" className="custom-select" onChange={props.changed} name="markDefinition">
                    
                        <option value="DESCRIPTION_KONTROLNI">Kontrolni</option>
                        <option value="DESCRIPTION_PISMENI">Pismeni</option>
                        <option value="DESCRIPTION_AKTIVNOST">Aktivnost</option>
                        <option value="DESCRIPTION_ZAKLJUCNA_POLUGODISTE">Za Polugodiste</option>
                        <option value="DESCRIPTION_ZAKLJUCNA_KRAJ">Za kraj</option>
                    </select>

                    <label htmlFor="markValue">Vrednost Ocene</label>
                    <select defaultValue="VALUE_NEDOVOLJAN" className="custom-select" onChange={props.changed} name="markValue">
                      
                        <option value="VALUE_NEDOVOLJAN">1</option>
                        <option value="VALUE_DOVOLJAN">2</option>
                        <option value="VALUE_DOBAR">3</option>
                        <option value="VALUE_VRLODOBAR">4</option>
                        <option value="VALUE_ODLICAN">5</option>
                    </select>

                    <label htmlFor="semester">Polugodiste</label>
                    <select defaultValue="SEMESTER_1" className="custom-select" onChange={props.changed} name="semester">
                        
                        <option value ="SEMESTER_1">Prvo</option>
                        <option value="SEMESTER_2">Drugo</option>

                    </select>
                </div>

                <button type="submitt" className="btn btn-success">Dodaj Ocenu</button>
                <button type="button" className="btn btn-danger" onClick={props.cancel}>Otkazi</button>
            </form>

        </div>
    )
}

export default MarkForma
