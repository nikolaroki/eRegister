import React, { Component } from 'react';
import StudentView from './StudentView';
import ParentView from './ParentView';
import AdminView from './AdminView';
import TeacherView from './TeacherView';
import Login from './Login';
import Spiner from '../component/UI/Spiner'

class Dnevnik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: '',
            username: '',
            password: '',
            loggedInUserID:'',
            isLoggedIn: false,
            isLoading:false
        }
    }

 

    handleLoginChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginSubmit = (e) => {
        this.loginHandler();
        this.setState({ isLoggedIn: true })
        e.preventDefault()
    }

    async loginHandler() {
        this.setState({isLoading})
        const response = await fetch('http://localhost:8080/eregister/login', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.state.username + ":" + this.state.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if( response.ok ) {
            const user = await response.json();
            const loggedInUserID = user.id;
            const userRole = user.role.name;

            this.setState({ loggedInUserID, userRole, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
        }
    }

    render() {
        if(isLoading){
            return <Spiner/>
        }
        return this.state.isLoggedIn ? (
            <div>
                <select onChange={this.handleUserChange}>
                    <option value='ROLE_STUDENT'>Student</option>
                    <option value='ROLE_TEACHER'>Teacher</option>
                    <option value='ROLE_PARENT'>Parent</option>
                    <option value='ROLE_ADMIN'>Admin</option>
                </select>
                <div>
                    {this.state.userRole === 'ROLE_STUDENT' && <StudentView username={this.state.username} password={this.state.password}/>}
                    {this.state.userRole === 'ROLE_TEACHER' && <TeacherView username={this.state.username} password={this.state.password}/>}
                    {this.state.userRole === 'ROLE_PARENT' && <ParentView username={this.state.username} password={this.state.password}/>}
                    {this.state.userRole === 'ROLE_ADMIN' && <AdminView username={this.state.username} password={this.state.password} />}
                </div>
            </div>
        ) : (
                <Login
                    username={this.state.username}
                    password={this.state.password}
                    changed={this.handleLoginChange}
                    onLoginSubmit={(event)=>this.handleLoginSubmit(event)}
                />
            )

       
    }
}

export default Dnevnik;