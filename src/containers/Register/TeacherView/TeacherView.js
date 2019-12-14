import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom';
import Layout from '../../Layout/Layout'
//import ParentProfil from './ParentProfil/ParentProfil';
import Student from './Student/Student'
import classes from './TeacherView.module.css'
import Spiner from '../../../component/UI/Spiner/Spiner'
import Modal from '../../../component/UI/Modal/Modal';
import Subject from './Subject/Subject'
import Group from './Group/Group';
import Mark from './Mark/Mark'
import MarkForma from '../../../component/Mark/MarkForm/MarkForma';
import TeacherProfil from './TeacherProfil/TeacherProfil'

class TeacherView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isError: false,
            marks: [],
            subjects: [],
            groups: [],
            marksLoaded: false,
            students: [],
            groupLoaded: false,
            selectedStudent: null,
            studentsLoade: false,
            selectedSubject: null,
            selectedGroup: null,
            markSelected: null,
            givingMark: false,
            markDefinition: "DESCRIPTION_KONTROLNI",
            markValue: "VALUE_NEDOVOLJAN",
            semester: "SEMESTER_1",
        }
    }


    async componentDidMount() {

        const response = await fetch('http://localhost:8080/eregister/schedule/subject/teacher/' + this.props.loggedInUserID, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const subjects = await response.json();
            console.log(subjects)
            this.setState({
                subjects: subjects,
                isLoading: false
            })
        } else {
            const r = await response.json();
            if (r.code === 6)
                alert("NASTAVNIK NEMA PREDETE")
            this.setState({
                isLoading: false
            })
            console.log("Greska " + response)
        }
    }

    subjectSelectedHandler = (id) => {
        this.setState({ isLoading: true, marksLoaded: false, selectedSubject: id })
        this.fetchGroupHandler(id);

    }

    groupSelectedHandler = (id) => {
        this.setState({ isLoading: true, marksLoaded: false, selectedGroup: id })
        this.fetchGroupStudentsHandler(id);

    }

    studentSelectedHandler = (id) => {
        this.setState({ isLoading: true, marksLoaded: true, selectedStudent: id })
        this.fetchMarksHandler(id)
    }

    markSubmitHandler = (e) => {
        this.setState({ isLoading: true });
        const mark = {
            markDefinition: this.state.markDefinition,
            markValue: this.state.markValue,
            semester: this.state.semester
        }
        this.markPostingHandler(mark)
        e.preventDefault()
    }

    deleteMarkHadler = (id) => {
        this.setState({ isLoading: true, markSelected: id });
        this.markDeleteFetchHandler(id)

    }

    async markDeleteFetchHandler(id) {
        const response = await fetch('http://localhost:8080/eregister/register/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            this.setState({
                isLoading: false,
                marksLoaded: false


            })
            alert("Usepno ocenjeno")
        } else {
            console.log("Greska " + response)
        }
    }

    async markPostingHandler(mark) {

        const response = await fetch('http://localhost:8080/eregister/register/student/' + this.state.selectedStudent + '/subject/' + this.state.selectedSubject, {
            method: 'POST',
            body: JSON.stringify(mark),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            const updateMark = await response.json();
            const marks = this.state.marks;
            marks.push(updateMark);
            this.setState({
                isLoading: false,
                marks: marks,
                givingMark: false,
                markDefinition: "DESCRIPTION_KONTROLNI",
                markValue: "VALUE_NEDOVOLJAN",
                semester: "SEMESTER_1",


            })
            alert("Usepno ocenjeno")
        } else {
            console.log("Greska " + response)
        }
    }


    async fetchGroupHandler(id) {
        const response = await fetch('http://localhost:8080/eregister/schedule/subject/' + id + '/teacher/' + this.props.loggedInUserID, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const groups = await response.json();
            console.log(groups)
            this.setState({
                groups: groups,
                isLoading: false,
                groupLoaded: true
            })
            this.props.history.push(this.props.match.path + "/groups")

        } else {
            console.log("Greska " + response)
        }
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

    async fetchGroupStudentsHandler(id) {
        const response = await fetch('http://localhost:8080/eregister/student/byGroup/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        if (response.ok) {
            const students = await response.json();
            console.log(students)
            this.setState({
                students: students,
                isLoading: false,
                studentsLoade: true
            })
            this.props.history.push(this.props.match.path + "/students")

        } else {
            const r = await response.json();
            alert(r.message)
            this.setState({ isLoading: false })
        }
    }

    async fetchMarksHandler(id) {
        const response = await fetch('http://localhost:8080/eregister/register/student/' + id + '/subject/' + this.state.selectedSubject, {
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
            const r = await response.json();
            console.log(r.message)
            this.setState({ isLoading: false })
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


    showMarksCancelHandler = () => {
        this.setState({
            marksLoaded: false,
            markDefinition: "DESCRIPTION_KONTROLNI",
            markValue: "VALUE_NEDOVOLJAN",
            semester: "SEMESTER_1",
            givingMark: false

        })
    }

    giveMarkHandler = () => {
        this.setState({ givingMark: true })
    }

    handleMarkAddingChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }




    render() {
        if (this.state.isLoading) {
            return <Spiner />
        }
        const caption = <div className="shadow-lg mb-5 bg-white rounded display-4">Dobro dosli na vasu stranicu {this.props.username}!</div>
        let subjects = <h1>SOMETHING WENT WRONG</h1>;

        subjects = this.state.subjects.map(subject => {
            return (
                <Subject
                    key={subject.id}
                    name={subject.name}
                    classesPerWeek={subject.classesPerWeek}
                    clicked={() => this.subjectSelectedHandler(subject.id)}
                />
            )
        }
        )


        let groups = <h1>SOMETHING WENT WRONG</h1>;

        groups = this.state.groups.map(group => {

            let outputGroup = this.outputGroupName(group, group.groupGrade)

            return (
                <Group
                    key={group.id}
                    outputGroup={outputGroup}
                    clicked={() => this.groupSelectedHandler(group.id)}
                />
            )
        }
        )

        let students = <h1>SOMETHING WENT WRONG</h1>;

        students = this.state.students.map(student => {

            return (
                <Student
                    key={student.id}
                    name={student.name}
                    surname={student.surname}
                    clicked={() => this.studentSelectedHandler(student.id)}
                />
            )
        }
        )

        let showMark = null;
        if (this.state.marks.length === 0 && this.state.marksLoaded) {
            showMark = <h1 className="m-6" >Ucenik nije ocenjen iz ovog predmeta</h1>

        }
        if (this.state.marksLoaded && this.state.marks.length > 0) {
            let firstMark = this.state.marks.map(mark => {
                if (mark.semester === "SEMESTER_1" && mark.markDefinition !== "DESCRIPTION_ZAKLJUCNA_POLUGODISTE"
                    && mark.markDefinition !== "DESCRIPTION_ZAKLJUCNA_KRAJ")
                    return (
                        <Mark
                            key={mark.id}
                            markDefinition={mark.markDefinition}
                            markValue={this.outputMark(mark.markValue)}
                            markDate={mark.registerEntryDate}
                            delete={() => this.deleteMarkHadler(mark.id)}
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
                            delete={() => this.deleteMarkHadler(mark.id)}
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


            showMark = <table className="mb-3" >
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
                    <h4 className="shadow-sm mb-5 bg-white rounded display-7">Predmeti koje drzite:</h4>
                    <section className={classes.ParentList}>
                        {subjects}
                    </section> </div>}
                />
                <Modal show={this.state.marksLoaded} modalClosed={this.showMarksCancelHandler}>
                    {!this.state.givingMark ? <div>
                        <section className={classes.MarkList}>{showMark}</section>
                        <button onClick={this.giveMarkHandler} type="button" className="btn btn-primary btn-lg btn-block">DAJ OCENU</button>
                    </div> : <MarkForma cancel={this.showMarksCancelHandler}
                        changed={(e) => this.handleMarkAddingChange(e)}
                        submitNewMark={(e) => this.markSubmitHandler(e)} />}
                </Modal>
                {this.state.groupLoaded ? <Route path={this.props.match.path + "/groups"} exact render={() => <div>
                    {caption}
                    <h4 className="shadow-sm mb-5 bg-white rounded display-7">Izabrani predmet predajete na:</h4>
                    <section className={classes.StudentList}>
                        {groups}
                    </section> </div>}
                /> : null}

                {this.state.studentsLoade ? <Route path={this.props.match.path + "/students"} exact render={() => <div>
                    {caption}
                    <h4 className="shadow-sm mb-5 bg-white rounded display-7">Ucenici u izabranom odeljenju:</h4>
                    <section className={classes.StudentList}>
                        {students}
                    </section> </div>}
                /> : null}

<Route path={this.props.match.path + "/profil"} render={() => <TeacherProfil {...this.state.teacher} {...this.props} />} />

            </Layout>

        )
    }
}

export default withRouter(TeacherView)
