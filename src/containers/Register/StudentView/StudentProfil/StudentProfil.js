import React, { Component } from 'react'
import classes from './StudentProfil.module.css'
import Spiner from '../../../../component/UI/Spiner/Spiner'
import StudentProfilForma from './StudentProfilForma/StudentProfilForma'
import Modal from '../../../../component/UI/Modal/Modal'

export class StudentProfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            student: null,
            isLoading: true,
            isError: false,
            editing: false,
            updatedStudent: null
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/eregister/student/' + this.props.loggedInUserID, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const student = await response.json();
            this.setState({
                student: student,
                updatedStudent: student,
                isLoading: false
            })
        } else {
            console.log("Greska " + response)
        }
    }



    outputGroupName = (schoolGroup, groupGrade) => {
        let razred = null;
        if (groupGrade.id === 1) {
            razred = "I"
        }
        if (groupGrade.id === 2) {
            razred = "II"
        }
        if (groupGrade.id === 3) {
            razred = "III"
        }
        if (groupGrade.id === 4) {
            razred = "IV"
        }
        if (groupGrade.id === 5) {
            razred = "V"
        }
        if (groupGrade.id === 6) {
            razred = "VI"
        }
        if (groupGrade.id === 7) {
            razred = "VII"
        }
        if (groupGrade.id === 8) {
            razred = "VIII"
        }
        return razred + schoolGroup.groupLabel
    }

    editProfileHandler = () => {
        this.setState({ editing: true })
    }

    editProfileCancelHandler = () => {
        this.setState({ editing: false, updatedStudent: this.state.student })
    }


    handleProfilEditChange = (e, inputIdentifier) => {

        /* this.setState({
             [e.target.name]: e.target.value
         })*/
        const updatedStudent = {
            ...this.state.updatedStudent
        }
        updatedStudent[e.target.name] = e.target.value
        this.setState({ updatedStudent: updatedStudent })
    }


    handleProfilAddressEditChange = (e, inputIdentifier) => {

        /* this.setState({
             [e.target.name]: e.target.value
         })*/
        const updatedStudent = {
            ...this.state.updatedStudent
        }
        const updatedAddress = { ...updatedStudent.studentAddress };
        updatedAddress[e.target.name] = e.target.value;
        updatedStudent.studentAddress = updatedAddress;
        this.setState({ updatedStudent: updatedStudent })
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
        let x = this.state.updatedStudent.dateOfBirth;
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

        const putStud = {
            name: this.state.updatedStudent.name,
            surname: this.state.updatedStudent.surname,
            dateOfBirth: x,
            email: this.state.updatedStudent.email,
            jmbg: this.state.updatedStudent.jmbg,
            gender: this.state.updatedStudent.gender,
            streetNumber: this.state.updatedStudent.studentAddress.streetNumber,
            street: this.state.updatedStudent.studentAddress.street,
            city: this.state.updatedStudent.studentAddress.city,
        }

        this.editHandler(putStud);
        e.preventDefault()
    }

    async editHandler(putStud) {
        const response = await fetch('http://localhost:8080/eregister/student/' + this.props.loggedInUserID, {
            method: 'PUT',
            body: JSON.stringify(putStud),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            const updatedStudent = this.state.updatedStudent;

            this.setState({
                isLoading: false, student: updatedStudent, editing: false
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

        const student = this.state.updatedStudent
        const address = student.studentAddress;
        const schoolGroup = student.schoolGroup;
        const groupGrade = schoolGroup.groupGrade;
        const homeRoomTeacher = schoolGroup.homeRoomTeacher;



        return (
            <div>
                <div >
                    <div className="shadow-lg  mb-5 bg-white rounded display-4 p-xl-3 "> <strong>UČENIK: </strong>{this.state.student.name} {this.state.student.surname} | <strong>ODELJENJE: </strong>{this.outputGroupName(schoolGroup, groupGrade)}</div>
                    <div className="container shadow-lg  mb-5 bg-white rounded display-4 p-xl-3">

                        <div className="row">

                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Ime:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{student.name}</h6>
                                </div>
                            </div>

                            <div className="card col-lg-6">
                                <div className="card-body ">
                                    <h4 className="card-title">Prezime:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{student.surname}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card  col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Datum Rođenja:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{student.dateOfBirth}</h6>
                                </div>
                            </div>
                            <div className="card  col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Email:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{student.email}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card col-lg-6">
                                <div className="card-body">
                                    <h4 className="card-title">Jmbg:</h4>
                                    <h6 className="card-subtitle mb-1 text-muted">{student.jmbg}</h6>
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
                                    {homeRoomTeacher===null ? null: <div><h4 className="card-title">Razredni:</h4>
                                        <h6 className="card-subtitle mb-1 text-muted">{homeRoomTeacher.name} {homeRoomTeacher.surname}</h6></div>}
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
                    <StudentProfilForma
                        {...this.state.updatedStudent}
                        cancel={() => this.editProfileCancelHandler()}
                        changed={(e) => this.handleProfilEditChange(e)}
                        submitEditProfile={(e) => this.handleProfilEditSubmit(e)}
                        changedAddress={(e) => { this.handleProfilAddressEditChange(e) }} />
                </Modal>

            </div>
        )
    }
}

export default StudentProfil




