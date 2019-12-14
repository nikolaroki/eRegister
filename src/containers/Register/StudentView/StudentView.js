import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom';
import Layout from '../../Layout/Layout'
import StudentProfil from './StudentProfil/StudentProfil';
import Subject from './Subject/Subject'
import classes from './StudentView.module.css'
import Spiner from '../../../component/UI/Spiner/Spiner'
import Modal from '../../../component/UI/Modal/Modal';
import Mark from '../../../component/Mark/Mark'



class StudentView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isError: false,
            marks: [],
            schedules: [],
            marksLoaded: false
        }
    }

    async componentDidMount() {
        
        const response = await fetch('http://localhost:8080/eregister/schedule/student/' + this.props.loggedInUserID, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const schedules = await response.json();
            this.setState({
                schedules: schedules,
                isLoading: false
            })
        } else {
            console.log("Greska " + response)
        }
    }

    subjectSelectedHandler = (id) => {
        this.setState({ isLoading: true, marksLoaded: false })
        this.fetchMarksHandler(id);

    }


    async fetchMarksHandler(id) {

        const response = await fetch('http://localhost:8080/eregister/register/student/subject/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const marks = await response.json();
            this.setState({
                marks: marks,
                isLoading: false,
                marksLoaded: true
            })
        } else {
            console.log("Greska " + response)
        }
    }


    showMarksCancelHandler = () => {
        this.setState({ marksLoaded: false })
    }

    outputMark = (x) => {
        if (x === "VALUE_NEOCENJEN") {
            return "NEOCENJEN"
        }
        if (x === "VALUE_NEDOVOLJAN") {
            return "1-Nedovoljan"
        }
        if (x === "VALUE_DOVOLJAN") {
            return "2-Dovoljan"
        }
        if (x === "VALUE_DOBAR") {
            return "3-Dobar"
        }
        if (x === "VALUE_VRLODOBAR") {
            return "4-Vrlo Dobar"
        }
        if (x === "VALUE_ODLICAN") {
            return "5-Odličan"
        }


    }


    render() {
        const caption = <div className="shadow-lg mb-5 bg-white rounded display-4">Dobro dosli na vasu stranicu {this.props.username}!</div>
        let schedules = <h1>SOMETHING WENT WRONG</h1>;
        schedules = this.state.schedules.map(schedule => {
            let subject = schedule.subject;
            let teacher = schedule.teacher;
            return (
                <Subject
                    key={subject.id}
                    name={subject.name}
                    classesPerWeek={subject.classesPerWeek}
                    teacherName={teacher.name}
                    teacherSurname={teacher.surname}
                    clicked={() => this.subjectSelectedHandler(subject.id)}
                />
            )
        }
        )

        let showMark = null;
        if (this.state.marks.length === 0 && this.state.marksLoaded) {
            showMark = <h1>Ucenik nije ocenjen iz ovog predmeta</h1>

        }
        if (this.state.marksLoaded && this.state.marks.length > 0) {
            let firstMark = this.state.marks.map(mark => {
                if (mark.semester === "SEMESTER_1" && mark.markDefinition != "DESCRIPTION_ZAKLJUCNA_POLUGODISTE"
                    && mark.markDefinition != "DESCRIPTION_ZAKLJUCNA_KRAJ")
                    return (
                        <Mark
                            key={mark.id}
                            markDefinition={mark.markDefinition}
                            markValue={this.outputMark(mark.markValue)}
                            markDate={mark.registerEntryDate}
                        />
                    )
            }
            )
            let secondMark = this.state.marks.map(mark => {
                if (mark.semester === "SEMESTER_2" && mark.markDefinition != "DESCRIPTION_ZAKLJUCNA_POLUGODISTE"
                    && mark.markDefinition != "DESCRIPTION_ZAKLJUCNA_KRAJ")
                    return (
                        <Mark
                            key={mark.id}
                            markDefinition={mark.markDefinition}
                            markValue={this.outputMark(mark.markValue)}
                            markDate={mark.registerEntryDate}
                        />
                    )
            }
            )
            console.log("secondMark", secondMark)
            let finalFirstMark = this.state.marks.map(mark => {
                if (mark.markDefinition === "DESCRIPTION_ZAKLJUCNA_POLUGODISTE")
                    return this.outputMark(mark.markValue)
            }
            )
            
            let finalSecondMark = this.state.marks.map(mark => {
                if (mark.markDefinition === "DESCRIPTION_ZAKLJUCNA_KRAJ") {
                    console.log("mark.markDefinition", mark.markDefinition)
                    return this.outputMark(mark.markValue)
                }
            }
            )
            

            showMark = <table>
                <tbody>
                    <tr><td><strong>Prvo polugodiste</strong></td><td><strong>Drugo polugodiste</strong></td></tr>
                    <tr><td><h3 className={classes.TableFinalMark}>Zakljucna: {finalFirstMark}</h3></td><td><h3 className={classes.TableFinalMark}>Zakljucna: {finalSecondMark}</h3></td></tr>
                    <tr><td>{firstMark}</td><td>{secondMark}</td></tr>
                </tbody>
            </table>



        }





        return (
            <Layout role={this.props.userRole} logout={this.props.logut}>

                <Route path={this.props.match.path} exact render={() => <div>
                    {caption}
                    <section className={classes.StudentList}>
                        {schedules}
                    </section> </div>}
                />

                <Modal show={this.state.marksLoaded} modalClosed={this.showMarksCancelHandler}>
                    <section className={classes.MarkList}>{showMark}</section>
                </Modal>
                <Route path={this.props.match.path + "/profil"} render={() => <StudentProfil {...this.state.student} {...this.props} />} />
            </Layout>


        )
    }
}
export default withRouter(StudentView)