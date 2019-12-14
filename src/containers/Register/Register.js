import React, { Component } from 'react';
import Login from '../../component/Login/Login'
import Spiner from '../../component/UI/Spiner/Spiner'
import StudentView from './StudentView/StudentView';
import AdminView from './AdminView/AdminView'
import ParentView from './ParentView/ParentView';
import TeacherView from './TeacherView/TeacherView';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';






class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userRole: '',
            username: '',
            password: '',
            loggedInUserID: '',
            isLoggedIn: false,
            isLoading: false,
            triedToLogin: false,

        }
    }


    handleLoginChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginSubmit = (e) => {
        this.loginHandler();
        e.preventDefault()
    }

    logoutHandler = () => {
        this.setState({ isLoggedIn: false, username: "", password: "" })
        alert("Hvala vam na koriscenju naspeg programa. Uspesno ste se izlogovali. Pritisnite ok da se vradite na pocetnu stranu")
    }

    componentDidMount() {
        if (!this.state.isLoggedIn) {
            this.props.history.push("/login")
        }
    }


    async loginHandler() {
        this.setState({ isLoading: true })
        const response = await fetch('http://localhost:8080/eregister/login', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.state.username + ":" + this.state.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const user = await response.json();
            const loggedInUserID = user.id;
            const userRole = user.role.name;
            this.setState({ loggedInUserID, userRole, isLoading: false, isLoggedIn: true })
            if (this.state.userRole === "ROLE_STUDENT") {
                this.props.history.push('/student')
            }
            if (this.state.userRole === "ROLE_PARENT") {
                this.props.history.push('/parent')
            }
            if (this.state.userRole === "ROLE_TEACHER") {
                this.props.history.push('/teacher')
            }
            if (this.state.userRole === "ROLE_ADMIN") {
                this.props.history.push('/admin')
            }



        } else {
            this.setState({ isLoading: false, isError: true, triedToLogin: true })
        }
    }




    render() {

        if (this.state.triedToLogin) {
            alert('Pogresni kredencijali')
            this.setState({ triedToLogin: false })
        }

        if (this.state.isLoading) {
            return <Spiner />
        }





        return (
            <Switch>

                {this.state.userRole === "ROLE_STUDENT" ? <Route path="/student" render={() => <StudentView
                    userRole={this.state.userRole}
                    username={this.state.username}
                    password={this.state.password}
                    loggedInUserID={this.state.loggedInUserID}
                    logut={() => this.logoutHandler()}
                />} /> : null}
                {this.state.userRole === "ROLE_TEACHER" ? <Route path="/teacher" render={() => <TeacherView
                    userRole={this.state.userRole}
                    username={this.state.username}
                    password={this.state.password}
                    loggedInUserID={this.state.loggedInUserID}
                    logut={() => this.logoutHandler()} />
                } /> : null}

                {this.state.userRole === "ROLE_ADMIN" ? <Route path="/admin" render={() => <AdminView
                    userRole={this.state.userRole}
                    username={this.state.username}
                    password={this.state.password}
                    loggedInUserID={this.state.loggedInUserID}
                    logut={() => this.logoutHandler()} />
                } /> : null}
               
                {this.state.userRole === "ROLE_PARENT" ? <Route path="/parent" render={() => <ParentView
                    userRole={this.state.userRole}
                    username={this.state.username}
                    password={this.state.password}
                    loggedInUserID={this.state.loggedInUserID}
                    logut={() => this.logoutHandler()} />
                } /> : null}
                {!this.state.isLoggedIn ? <Route path="/login" render={() => < Login
                    changed={this.handleLoginChange}
                    onLoginSubmit={this.handleLoginSubmit}
                />} /> : null}
                <Route path="" render={() => <h1>NEPOSTOJECA STRANICA 404</h1>} />
            </Switch>
        )





    }
}







export default withRouter(Register);