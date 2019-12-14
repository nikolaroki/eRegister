import React, { Component } from 'react'
import classes from './TeacherProfil.module.css'
import Spiner from '../../../../component/UI/Spiner/Spiner'
import TeacherProfilForma from './TeacherProfilForma/TeacherProfilForma'
import Modal from '../../../../component/UI/Modal/Modal'

export class TeacherProfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            teacher: null,
            isLoading: true,
            isError: false,
            editing: false,
            updatedTeacher: null
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/eregister/teacher/' + this.props.loggedInUserID, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const teacher = await response.json();
            this.setState({
                teacher: teacher,
                updatedTeacher: teacher,
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
        this.setState({ editing: false, updatedTeacher: this.state.teacher })
    }


    handleProfilEditChange = (e, inputIdentifier) => {

        /* this.setState({
             [e.target.name]: e.target.value
         })*/
        const updatedTeacher = {
            ...this.state.updatedTeacher
        }
        updatedTeacher[e.target.name] = e.target.value
        this.setState({ updatedTeacher: updatedTeacher })
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
        let x = this.state.updatedTeacher.dateOfBirth;
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

        console.log(x)

        const putTeacher = {
            name: this.state.updatedTeacher.name,
            surname: this.state.updatedTeacher.surname,
            dateOfBirth: x,
            email: this.state.updatedTeacher.email,
            jmbg: this.state.updatedTeacher.jmbg,
            title: this.state.updatedTeacher.title,
            pay:this.state.updatedTeacher.pay
        }

        this.editHandler(putTeacher);
        e.preventDefault()
    }

    async editHandler(putTeacher) {
        const response = await fetch('http://localhost:8080/eregister/teacher/' + this.props.loggedInUserID, {
            method: 'PUT',
            body: JSON.stringify(putTeacher),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            const updatedTeacher = this.state.updatedTeacher;

            this.setState({
                isLoading: false, teacher: updatedTeacher, editing: false
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

        const teacher = this.state.updatedTeacher




        return (
            <div>
                <div >
                    <div className="shadow-lg  mb-5 bg-white rounded display-4 p-xl-3 "> <strong>Nastavnik: </strong>{this.state.teacher.name} {this.state.teacher.surname}</div>
                    <div className="container shadow-lg  mb-5 bg-white rounded display-4 p-xl-3">

                        <div className="row">

                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Ime:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{teacher.name}</h6>
                                </div>
                            </div>

                            <div className="card col-lg-6">
                                <div className="card-body ">
                                    <h4 className="card-title">Prezime:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{teacher.surname}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card  col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Datum Rođenja:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{teacher.dateOfBirth}</h6>
                                </div>
                            </div>
                            <div className="card  col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Email:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{teacher.email}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Jmbg:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{teacher.jmbg}</h6>
                                </div>
                            </div>
                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Titula:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{teacher.title}</h6>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Plata:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{teacher.pay}</h6>
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
                    <TeacherProfilForma
                        {...this.state.updatedTeacher}
                        cancel={() => this.editProfileCancelHandler()}
                        changed={(e) => this.handleProfilEditChange(e)}
                        submitEditProfile={(e) => this.handleProfilEditSubmit(e)}
                    />
                </Modal>

            </div>
        )
    }
}

export default TeacherProfil




