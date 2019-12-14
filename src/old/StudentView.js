import React, { Component } from 'react'

class StudentView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            isLoading: false,
            isError: false,
          
        }
    }
    

        
        async componentDidMount() {
            this.setState({ isLoading: true })
            const response = await fetch('http://localhost:8080/eregister/student', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    'Content-Type': 'application/json; charset=UTF-8', }
                },)
                console.log(response)
            if( response.ok ) {
                const students = await response.json();
                this.setState({ students, isLoading: false })
            } else {
                this.setState({ isLoading: false, isError: true })
            }
        }

    render() {
        const { students, isLoading, isError } = this.state
        if (isLoading) {
            return <div>Loading...</div>
        }
        if (isError) {
            return (<div class="alert alert-warning" role="alert">
            <strong>Warning!</strong> ODJEBI.
          </div>)
        }

        return students.length > 0
            ? (
                <div class="container">
                <h6 id='title'>LIST OF STUDENTS</h6>
                <table class = "table" id="students">
                    <tr><th>ID</th><th>Name</th><th>Last Name</th><th>Email</th><th>JMBG</th><th>Gender</th></tr>
                    {this.renderTableDataStudent()}
                    </table>

                </div>

            ) : null
            ;
    }
    renderTableDataStudent() {
        return this.state.students.map((student) => {
            return (
                <tr  key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.surname}</td>
                    <td>{student.email}</td>
                    <td>{student.jmbg}</td>
                    <td>{student.gender}</td>
                </tr>
                
            )
        })
    }





}






export default StudentView;