import React, { Component } from 'react'
import classes from './AdminProfil.module.css'
import Spiner from '../../../../component/UI/Spiner/Spiner'
import AdminProfilForma from './AdminProfilForma/AdminProfilForma'
import Modal from '../../../../component/UI/Modal/Modal'

export class AdminProfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            admin: null,
            isLoading: true,
            isError: false,
            editing: false,
            updatedAdmin: null
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/eregister/admin/' + this.props.loggedInUserID, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const admin = await response.json();
            console.log(admin)
            this.setState({
                admin: admin,
                updatedAdmin: admin,
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
        this.setState({ editing: false, updatedAdmin: this.state.admin })
    }


    handleProfilEditChange = (e, inputIdentifier) => {

        /* this.setState({
             [e.target.name]: e.target.value
         })*/
        const updatedAdmin = {
            ...this.state.updatedAdmin
        }
        updatedAdmin[e.target.name] = e.target.value
        this.setState({ updatedAdmin: updatedAdmin })
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
        let x = this.state.updatedAdmin.dateOfBirth;
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



        const putAdm = {
            name: this.state.updatedAdmin.name,
            surname: this.state.updatedAdmin.surname,
            dateOfBirth: x,
            email: this.state.updatedAdmin.email,
            jmbg: this.state.updatedAdmin.jmbg,
        }

        this.editHandler(putAdm);
        e.preventDefault()
    }

    async editHandler(putAdm) {
        const response = await fetch('http://localhost:8080/eregister/admin/' + this.props.loggedInUserID, {
            method: 'PUT',
            body: JSON.stringify(putAdm),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            const updatedAdmin = this.state.updatedAdmin;

            this.setState({
                isLoading: false, admin: updatedAdmin, editing: false
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

        const admin = this.state.updatedAdmin




        return (
            <div>
                <div >
                    <div className="shadow-lg  mb-5 bg-white rounded display-4 p-xl-3 "> <strong>ADMIN: </strong>{this.state.admin.name} {this.state.admin.surname}</div>
                    <div className="container shadow-lg  mb-5 bg-white rounded display-4 p-xl-3">

                        <div className="row">

                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Ime:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{admin.name}</h6>
                                </div>
                            </div>

                            <div className="card col-lg-6">
                                <div className="card-body ">
                                    <h4 className="card-title">Prezime:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{admin.surname}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card  col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Datum Rođenja:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{admin.dateOfBirth}</h6>
                                </div>
                            </div>
                            <div className="card  col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Email:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{admin.email}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Jmbg:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{admin.jmbg}</h6>
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
                    <AdminProfilForma
                        {...this.state.updatedAdmin}
                        cancel={() => this.editProfileCancelHandler()}
                        changed={(e) => this.handleProfilEditChange(e)}
                        submitEditProfile={(e) => this.handleProfilEditSubmit(e)}
                    />
                </Modal>

            </div >


        )
    }
}

export default AdminProfil




