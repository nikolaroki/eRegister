import React, { Component } from 'react'
import Layout from '../../Layout/Layout'
import { withRouter, Route } from 'react-router-dom';
import AdminProfil from './AdminProfil/AdminProfil';
import Spiner from '../../../component/UI/Spiner/Spiner';
import classes from './AdminView.module.css';
import gear from '../../../assets/images/icons8-gear-100.png';
import Group from './Group/Group'
import Subject from './Subject/Subject'

export class AdminView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isError: false,

        }
    }

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    sGroupHandler = () => {
        this.props.history.push(this.props.match.path + "/school-group")
    }

    subjectHandler = () => {
        this.props.history.push(this.props.match.path + "/subject")
    }

    studentHandler = () => {
        this.props.history.push(this.props.match.path + "/student")
    }

    teacherHandler = () => {
        this.props.history.push(this.props.match.path + "/teacher")
    }

    parentHandler = () => {
        this.props.history.push(this.props.match.path + "/parent")
    }

    adminHandler = () => {
        this.props.history.push(this.props.match.path + "/admin")
    }





    render() {

        const sGroup = <div className="shadow-lg p-3 mb-5 rounded">
            <article className={classes.Child} onClick={this.sGroupHandler}>
                <h5>UREDJUJ ODELJENJA</h5>
                <h5>...pocnite ovde</h5>
                <div><img src={gear} alt="nista" /></div>
            </article>
        </div>

        const subject = <div className="shadow-lg p-3 mb-5 rounded ">
            <article className={classes.Child} onClick={this.subjectHandler}>
                <h5>UREDJUJ PREDMETE</h5>
                <h5>...pocnite ovde</h5>
                <div><img src={gear} alt="nista" /></div>
            </article>
        </div>

        const student = <div className="shadow-lg p-3 mb-5 rounded">
            <article className={classes.Child} onClick={this.studentHandler}>
                <h5>UREDJUJ UCENIKE</h5>
                <h5>...pocnite ovde</h5>
                <div><img src={gear} alt="nista" /></div>
            </article>
        </div>

        const teacher = <div className="shadow-lg p-3 mb-5 rounded">
            <article className={classes.Child} onClick={this.teacherHandler}>
                <h5>UREDJUJ NASTAVNIKE</h5>
                <h5>...pocnite ovde</h5>
                <div><img src={gear} alt="nista" /></div>
            </article>
        </div>

        const parent = <div className="shadow-lg p-3 mb-5 rounded">
            <article className={classes.Child} onClick={this.parentHandler}>
                <h5>UREDJUJ RODITELJE</h5>
                <h5>...pocnite ovde</h5>
                <div><img src={gear} alt="nista" /></div>
            </article>
        </div>

        const admin = <div className="shadow-lg p-3 mb-5 rounded">
            <article className={classes.Child} onClick={this.adminHandler}>
                <h5>UREDJUJ ADMINE</h5>
                <h5>...pocnite ovde</h5>
                <div><img src={gear} alt="nista" /></div>
            </article>
        </div>




        if (this.state.isLoading) {
            return <Spiner />
        }
        const caption = <div className="shadow-lg mb-5 bg-white rounded display-4">Dobro dosli na vasu stranicu {this.props.username}!</div>

        return (
            <Layout role={this.props.userRole} logout={this.props.logut}>

                <Route path={this.props.match.path} exact render={() => <div>
                    {caption}
                    <section className={classes.ParentList}>
                        {sGroup}{subject}{student}{teacher}{parent}{admin}
                    </section>
                </div>} />

                <Route path={this.props.match.path + "/school-group"} render={() => <Group
                    {...this.props} />} />

                <Route path={this.props.match.path + "/subject"} render={() => <Subject
                    {...this.props} />} />

                <Route path={this.props.match.path + "/profil"} render={() => <AdminProfil
                    {...this.props} />} />
            </Layout>
        )
    }
}

export default withRouter(AdminView)
