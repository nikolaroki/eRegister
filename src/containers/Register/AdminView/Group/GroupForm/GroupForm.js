import React from 'react'

function GroupForm(props) {
    return (
        <div>
            <form onSubmit={props.submitNewGroup}>
                <h5> Unesite detalje za novo odeljenje:</h5>
                <div className="form-group">
                <label htmlFor="groupGrade">Razred</label>
                    <select defaultValue="1" className="custom-select" onChange={props.changed} name="groupGrade">
                 
                        <option value="1">Prvo</option>
                        <option value="2">Drugi</option>
                        <option value="3">Treci</option>
                        <option value="4">Cetvrti</option>
                        <option value="5">Peti</option>
                        <option value="6">Sesti</option>
                        <option value="7">Sedmi</option>
                        <option value="8">Osmi</option>
                    </select>

                    <label htmlFor="groupLabel">Obelezje odeljenja</label>
                    <select defaultValue="a" className="custom-select" onChange={props.changed} name="groupLabel">
                      
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="d">d</option>
                        <option value="e">e</option>
                    </select>

                    <label htmlFor="generationYear">Polugodiste</label>
                    <select defaultValue="2019" className="custom-select" onChange={props.changed} name="generationYear">
                        
                        <option value ="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value ="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value ="2021">2021</option>
                        <option value="2022">2022</option>

                    </select>
                </div>

                <button type="submitt" className="btn btn-success">Dodaj Odeljenje</button>
                <button type="button" className="btn btn-danger" onClick={props.cancel}>Otkazi</button>
            </form>

        </div>
    )
}

export default GroupForm
