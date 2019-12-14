import React, { Component } from 'react';
import Register from './containers/Register/Register';
import StudentView from './containers/Register/StudentView/StudentView';
import AdminView from './containers/Register/AdminView/AdminView'
import ParentView from './containers/Register/ParentView/ParentView';
import TeacherView from './containers/Register/TeacherView/TeacherView'
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './containers/Layout/Layout';

class App extends Component {

  render() {
    return (
      <div>
        <Register/>
      </div>
    );
  }
}

export default withRouter(App);
