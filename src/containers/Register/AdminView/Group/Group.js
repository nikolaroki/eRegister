import React, { Component } from 'react'
import GroupEl from './GroupEl/GroupEl'
import Spiner from '../../../../component/UI/Spiner/Spiner'
import classes from './Group.module.css'
import { withRouter, Route } from 'react-router-dom';
import Modal from '../../../../component/UI/Modal/Modal';
import GroupForm from './GroupForm/GroupForm';
import TeacherEl from './TeacherEl/TeacherEl'



class Group extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            groups: [],
            groupLoaded: false,
            generationYear: 2019,
            groupLabel: "a",
            groupGrade: 1,
            creating: false,
            addingTeacher: false,
            selectedGroup: null,
            teachers: []
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/eregister/group/', {
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
            // this.props.history.push(this.props.match.path + "/all")
        } else {
            alert("something went wrong")
        }
    }

    operNewGroupDialog = () => {
        this.setState({ creating: true })
    }

    creatingCancelHandler = () => {
        this.setState({
            isLoading: false,
            creating: false,
            generationYear: 2019,
            groupLabel: "a",
            groupGrade: 1,
        })
    }


    groupAddingHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    groupSubmitHandler = (e) => {
        this.setState({ isLoading: true });
        const utdG = {
            generationYear: this.state.generationYear,
            groupLabel: this.state.groupLabel,
            groupGrade: this.state.groupGrade
        }
        this.postNewMark(utdG)
        e.preventDefault()
    }

    async postNewMark(utdG) {
        const response = await fetch('http://localhost:8080/eregister/group/grade/' + this.state.groupGrade + '/school/1', {
            method: 'POST',
            body: JSON.stringify(utdG),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            const updateGroup = await response.json();
            const groups = this.state.groups;
            groups.push(updateGroup);
            this.setState({
                isLoading: false,
                groups: groups,
                creating: false,
                generationYear: 2019,
                groupLabel: "a",
                groupGrade: 1,


            })
            alert("Usepno dodat novi razred")
        } else {
            alert("something went wrong")
        }
    }


    deleteGroupHadler = (id) => {
        this.setState({ isLoading: true });
        this.GroupDeleteFetchHandler(id)
        this.props.history.push(this.props.match.path)

    }

    async GroupDeleteFetchHandler(id) {
        const response = await fetch('http://localhost:8080/eregister/group/' + id, {
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
                creating: false


            })
            alert("Usepno izbrisano odeljenje => refresujte stranicu da promene budu vidljive")
        } else {
            console.log("Greska " + response)
        }
    }


    increaseGradeGroupHadler = (id) => {
        this.setState({ isLoading: true });
        this.increaseGradeGroupFetchHandler(id)


    }

    async increaseGradeGroupFetchHandler(id) {
        const response = await fetch('http://localhost:8080/eregister/group/increaseGrade/' + id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            this.setState({
                isLoading: false,
                creating: false


            })
            alert("Usepno povecan razred odeljenju => refresujte stranicu da promene budu vidljiv")
        } else {
            console.log("Greska " + response)
        }
    }

    addingTeacherStartHandler = (id) => {
        this.setState({ addingTeacher: true, selectedGroup: id })
        this.getTeachersHandler();
    }

    addingTeacherCancelHandler = () => {
        this.setState({
            isLoading: false,
            addingTeacher: false,
        })
    }

    connectGroupAndTeacher = (id) => {
        this.setState({
            isLoading: true,

        })
        this.connectGroupAndTeacherFetch(id);
    }

    async getTeachersHandler() {
        const response = await fetch('http://localhost:8080/eregister/teacher', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            const teachers = await response.json();
            this.setState({
                teachers: teachers,
                isLoading: false,
            })

        } else {
            console.log("Greska " + response)
        }
    }

    async connectGroupAndTeacherFetch(id) {
        const response = await fetch('http://localhost:8080/eregister/group/' + this.state.selectedGroup + '/teacher/' + id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            this.setState({
                isLoading: false,
                addingTeacher: false
            })
            alert("Uspesno dodat odeljencki staresina, refresujte stranicu")

        } else {
            console.log("Greska " + response)
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



    render() {

        if (this.state.isLoading) {
            return <Spiner />
        }

        let groups = <h1>SOMETHING WENT WRONG</h1>;

        groups = this.state.groups.map(group => {

            let outputGroup = this.outputGroupName(group, group.groupGrade)
            let schoolName = group.groupSchool.schoolName;
            let homeRoomTeacher = { ...group.homeRoomTeacher }



            return (
                <GroupEl
                    key={group.id}
                    outputGroup={outputGroup}
                    generation={group.generationYear}
                    homeRoomTeacherName={homeRoomTeacher.name}
                    homeRoomTeacherSurname={homeRoomTeacher.surname}
                    schoolName={schoolName}
                    delete={() => this.deleteGroupHadler(group.id)}
                    increade={() => this.increaseGradeGroupHadler(group.id)}
                    isThereATeacher={homeRoomTeacher}
                    addTeacher={() => this.addingTeacherStartHandler(group.id)}

                />
            )
        }
        )

        let teachers = <h1>SOMETHING WENT WRONG</h1>;

        teachers = this.state.teachers.map(teacher => {
            return (
                <TeacherEl
                    key={teacher.id}
                    teacherName={teacher.name}
                    teacherSurname={teacher.surname}
                    addTeacher={() => this.connectGroupAndTeacher(teacher.id)}

                />
            )
        }
        )


        return (
            <div>
                <Route path={this.props.match.path} render={() => <div>
                    <h2 className="shadow-sm mb-5 bg-white rounded display-7 mb-3">Sva odeljenja:</h2>
                    <Modal show={this.state.creating} modalClosed={this.creatingCancelHandler}>
                        <GroupForm cancel={this.creatingCancelHandler}
                            changed={(e) => this.groupAddingHandler(e)}
                            submitNewGroup={(e) => this.groupSubmitHandler(e)} />
                    </Modal>
                    <Modal show={this.state.addingTeacher} modalClosed={this.addingTeacherCancelHandler}>
                        <section className={classes.StudentList}>
                            {teachers}
                        </section>
                    </Modal>
                    <button type="button" className="btn btn-primary btn-lg m-xl-5 " onClick={this.operNewGroupDialog}>Dodaj Novo Odeljenje</button>
                    <section className={classes.StudentList}>
                        {groups}
                    </section> </div>}
                />
            </div>
        )

    }
}

export default withRouter(Group)
