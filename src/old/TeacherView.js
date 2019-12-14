import React, { Component } from 'react'

class TeacherView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false,
            isError: false
        }
    }
    

        
        async componentDidMount() {
            this.setState({ isLoading: true })
            const response = await fetch('http://localhost:8080/eregister/teacher', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    'Content-Type': 'application/json; charset=UTF-8', }
                },)
            if( response.ok ) {
                const users = await response.json();
                this.setState({ users, isLoading: false })
            } else {
                this.setState({ isLoading: false, isError: true })
            }
        }

    render() {
        const { users, isLoading, isError } = this.state
        if (isLoading) {
            return <div>Loading...</div>
        }
        if (isError) {
            return <div>Error</div>
        }

        return users.length > 0
            ? (
                <div class="container">
                <h6 id='title'>LIST OF TEACHER</h6>
                <table class = "table" id="users">
                    <tr><th>ID</th><th>Name</th><th>Last Name</th><th>Email</th><th>JMBG</th><th>Gender</th></tr>
                    {this.renderTableDataUser()}
                    </table>

                </div>

            ) : null
            ;
    }
    renderTableDataUser() {
        return this.state.users.map((user) => {
            return (
                <tr  key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>{user.jmbg}</td>
                    <td>{user.gender}</td>
                </tr>
                
            )
        })
    }





}






export default TeacherView;