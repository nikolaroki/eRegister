import AdminPage from './pages/AdminPage'
import StudentPage from './pages/StudentPage'
import ErrorPage from './pages/ErrorPage'
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class HomePage extends Component {
     
    render(){
        if (this.props.error){
            
        }

        return (
            <Router>
            <div>
              <h2>eDNEVNIK</h2>
            
              
                <Link to={'/admin'} >admin  </Link>
                <Link to={'/student'} >student</Link>
             
             
              <hr />
              <Switch>
                  <Route path='/admin' component={AdminPage}/>
                  <Route path='/student' component={StudentPage}/>
              </Switch>
            </div>
          </Router>
        )
    }
  
}

export default HomePage