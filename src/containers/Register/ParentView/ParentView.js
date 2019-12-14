import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom';
import Layout from '../../Layout/Layout'
import ParentProfil from './ParentProfil/ParentProfil';
import Child from './Child/Child'
import classes from './ParentView.module.css'
import Spiner from '../../../component/UI/Spiner/Spiner'
import Modal from '../../../component/UI/Modal/Modal';
import Mark from '../../../component/Mark/Mark'
import Subject from '../../Register/StudentView/Subject/Subject'



class ParentView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isError: false,
            marks: [],
            schedules: [],
            marksLoaded: false,
            children: [],
            subjectLoaded: false,
            childId: null

        }
    }

    async componentDidMount() {

        const response = await fetch('http://localhost:8080/eregister/student/children/' + this.props.loggedInUserID, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const children = await response.json();
            this.setState({
                children: children,
                isLoading: false
            })
        } else {
            console.log("Greska " + response)
        }
    }
    async getChildsSubject(id) {

        const response = await fetch('http://localhost:8080/eregister/schedule/student/' + id, {
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
                isLoading: false,
                subjectLoaded: true
            })
            this.props.history.push(this.props.match.path + "/childs-subject")
        } else {
            const r = await response.json();
            alert(r.message)
            this.setState({isLoading:false})
        }
    }

    subjectSelectedHandler = (id) => {
        this.setState({ isLoading: true, marksLoaded: false })
        this.fetchMarksHandler(id);

    }

    childSelectedHandler = (id) => {
        this.setState({ isLoading: true, childrenLoaded: false, childId: id })
        this.getChildsSubject(id);

    }


    async fetchMarksHandler(id) {
        const response = await fetch('http://localhost:8080/eregister/register/student/' + this.state.childId + '/subject/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const marks = await response.json();
            console.log(marks)
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

    showChildCancelHandler = () => {
        this.setState({ childrenLoaded: false })
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

        if (this.state.isLoading) {
            return <Spiner />
        }
        const caption = <div className="shadow-lg mb-5 bg-white rounded display-4">Dobro dosli na vasu stranicu {this.props.username}!</div>
        let children = <h1>SOMETHING WENT WRONG</h1>;
        children = this.state.children.map(child => {
            return (
                <Child
                    key={child.id}
                    name={child.name}
                    surname={child.surname}
                    clicked={() => this.childSelectedHandler(child.id)}
                />
            )
        }
        )



        let schedules = this.state.schedules.map(schedule => {
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
                    <h4 className="shadow-sm mb-5 bg-white rounded display-7">Vasa deca:</h4>
                    <section className={classes.ParentList}>
                        {children}
                    </section> </div>}
                />
                <Modal show={this.state.marksLoaded} modalClosed={this.showMarksCancelHandler}>
                    <section className={classes.MarkList}>{showMark}</section>
                </Modal>
                {this.state.subjectLoaded ? <Route path={this.props.match.path + "/childs-subject"} exact render={() => <div>
                    {caption}
                    <h4 className="shadow-sm mb-5 bg-white rounded display-7">Detetovi predmeti:</h4>
                    <section className={classes.StudentList}>
                        {schedules}
                    </section> </div>}
                /> : null}

                <Route path={this.props.match.path + "/profil"} render={() => <ParentProfil {...this.state.student} {...this.props} />} />


            </Layout>


        )
    }
}
export default withRouter(ParentView)