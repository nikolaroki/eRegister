import React, { Component } from 'react'
import classes from './ParentProfil.module.css'
import Spiner from '../../../../component/UI/Spiner/Spiner'
import ParentProfilForma from './ParentProfilForma/ParentProfilForma'
import Modal from '../../../../component/UI/Modal/Modal'

export class ParentProfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parent: null,
            isLoading: true,
            isError: false,
            editing: false,
            updatedParent: null
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/eregister/parent/' + this.props.loggedInUserID, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const parent = await response.json();
            console.log(parent)
            this.setState({
                parent: parent,
                updatedParent: parent,
                isLoading: false
            })
        } else {
            console.log("Greska " + response)
        }
    }





    editProfileHandler = () => {
        this.setState({ editing: true })
    }

    editProfileCancelHandler = () => {
        this.setState({ editing: false, updatedParent: this.state.parent })
    }


    handleProfilEditChange = (e, inputIdentifier) => {

        /* this.setState({
             [e.target.name]: e.target.value
         })*/
        const updatedParent = {
            ...this.state.updatedParent
        }
        updatedParent[e.target.name] = e.target.value
        this.setState({ updatedParent: updatedParent })
    }


    handleProfilAddressEditChange = (e, inputIdentifier) => {

        /* this.setState({
             [e.target.name]: e.target.value
         })*/
        const updatedParent = {
            ...this.state.updatedParent
        }
        const updatedAddress = { ...updatedParent.parentAddress };
        updatedAddress[e.target.name] = e.target.value;
        updatedParent.parentAddress = updatedAddress;
        this.setState({ updatedParent: updatedParent })
    }

    /* updatedStudentHandler = () => {
         const updatedStudent = { ...this.state.student };
         updatedStudent.name = this.state.name;
         updatedStudent.surname = this.state.surname;
         updatedStudent.dateOfBirth = this.state.dateOfBirth;
         updatedStudent.email = this.state.email;
         updatedStudent.studentAddress.streetNumber = this.state.streetNumber;
         updatedStudent.studentAddress.street = this.state.street;
         updatedStudent.studentAddress.city = this.state.city;
         this.setState({ updatedStudent: updatedStudent });
         
     }*/






    handleProfilEditSubmit = (e) => {
        //this.updatedStudentHandler();
        this.setState({ isLoading: true });
        let x = this.state.updatedParent.dateOfBirth;
        x = { ...x };
        let y = [];
        y.push(x[8]);
        y.push(x[9]);
        y.push(x[7]);
        y.push(x[5]);
        y.push(x[6]);
        y.push(x[4]);
        y.push(x[0]);
        y.push(x[1]);
        y.push(x[2]);
        y.push(x[3]);
        x = y.join("")



        const putPar = {
            name: this.state.updatedParent.name,
            surname: this.state.updatedParent.surname,
            dateOfBirth: x,
            email: this.state.updatedParent.email,
            jmbg: this.state.updatedParent.jmbg,
            gender: this.state.updatedParent.gender,
            streetNumber: this.state.updatedParent.parentAddress.streetNumber,
            street: this.state.updatedParent.parentAddress.street,
            city: this.state.updatedParent.parentAddress.city,
        }

        this.editHandler(putPar);
        e.preventDefault()
    }

    async editHandler(putPar) {
        const response = await fetch('http://localhost:8080/eregister/parent/' + this.props.loggedInUserID, {
            method: 'PUT',
            body: JSON.stringify(putPar),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            const updatedParent = this.state.updatedParent;

            this.setState({
                isLoading: false, parent: updatedParent, editing: false
            })
            alert("Usepno promenjeno")
        } else {
            console.log("Greska " + response)
        }
    }


    render() {
        if (this.state.isLoading) {
            return <Spiner />
        }

        const parent = this.state.updatedParent
        const address = parent.parentAddress;




        return (
            <div>
                <div >
                    <div className="shadow-lg  mb-5 bg-white rounded display-4 p-xl-3 "> <strong>RODITELJ: </strong>{this.state.parent.name} {this.state.parent.surname}</div>
                    <div className="container shadow-lg  mb-5 bg-white rounded display-4 p-xl-3">

                        <div className="row">

                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Ime:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{parent.name}</h6>
                                </div>
                            </div>

                            <div className="card col-lg-6">
                                <div className="card-body ">
                                    <h4 className="card-title">Prezime:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{parent.surname}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card  col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Datum Rođenja:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{parent.dateOfBirth}</h6>
                                </div>
                            </div>
                            <div className="card  col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Email:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{parent.email}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Jmbg:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{parent.jmbg}</h6>
                                </div>
                            </div>

                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Adresa:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{address.streetNumber}</h6>
                                    <h6 className="card-subtitle mb-1 text-muted">{address.street}</h6>
                                    <h6 className="card-subtitle mb-1 text-muted">{address.city}</h6>
                                </div>
                            </div>
                        </div>



                        <div className="row">
                            <div className="card col-lg-6">
                                <div className="card-body">
                                </div>
                            </div>
                            <div className="card col-lg-6">
                                <div className="m-4">
                                    <button type="submitt" className="btn btn-info btn-lg btn-block" onClick={this.editProfileHandler}>Promeni Detalje</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <Modal show={this.state.editing} modalClosed={this.editProfileCancelHandler}>
                    <ParentProfilForma
                        {...this.state.updatedParent}
                        cancel={() => this.editProfileCancelHandler()}
                        changed={(e) => this.handleProfilEditChange(e)}
                        submitEditProfile={(e) => this.handleProfilEditSubmit(e)}
                        changedAddress={(e) => { this.handleProfilAddressEditChange(e) }} />
                </Modal>

            </div >


        )
    }
}

export default ParentProfil




