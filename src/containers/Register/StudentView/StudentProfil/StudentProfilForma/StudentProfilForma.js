import React from 'react'

function StudentProfilForma(props) {
    return (
        <div>
            <form onSubmit={props.submitEditProfile}> 
                <h5> Unesite detalje koje zelite da promenite:</h5>
                <div className="form-group">
                    <label htmlFor="name">Ime</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        value={props.name}
                        onChange={props.changed}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Prezime</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="surname" 
                        value={props.surname}
                        onChange={props.changed}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Datum rođenja</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        name="dateOfBirth" 
                        value={props.dateOfBirth}
                        onChange={props.changed} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={props.email}
                        onChange={props.changed} />
                </div>
                <div className="form-group">
                    <label htmlFor="streetNumber"></label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="streetNumber" 
                        value={props.studentAddress.streetNumber} 
                        onChange={props.changedAddress} />
                </div>
                <div className="form-group">
                    <label htmlFor="street">Ulica</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="street" 
                        value={props.studentAddress.street}
                        onChange={props.changedAddress} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Grad</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="city" 
                        value={props.studentAddress.city} 
                        onChange={props.changedAddress}/>
                </div>

                <button type="submitt" className="btn btn-success">Promeni</button>
                <button type="button" className="btn btn-danger" onClick = {props.cancel}>Otkazi</button>
            </form>

        </div>
    )
}

export default StudentProfilForma
