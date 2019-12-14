import React, { Component } from 'react'
import SubjectEl from './SubjectEl/SubjectEl'
import Spiner from '../../../../component/UI/Spiner/Spiner'
import classes from './Subject.module.css'
import { withRouter, Route } from 'react-router-dom';
import Modal from '../../../../component/UI/Modal/Modal';
import SubjectForm from './SubjectForm/SubjectForm';




class Subject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            subjects: [],
            subjectsLoaded: false,
            subjectGrade: 1,
            creating: false,
            addingGrade: false,
            name: null,
            classesPerWeek: null,
            editing: false,
            selectedSubject: null,
            selectedGrade: null,
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/eregister/subject/', {
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
                isLoading: false,
                subjectLoaded: true
            })
            // this.props.history.push(this.props.match.path + "/all")
        } else {
            alert("something went wrong")
        }
    }

    operNewSubjectDialog = () => {
        this.setState({ creating: true })
    }

    creatingCancelHandler = () => {
        this.setState({
            isLoading: false,
            creating: false,
            editing: false,
            subjectGrade: 1,
        })
    }


    subjectAddingHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    subjectSubmitHandler = (e) => {

        this.setState({ isLoading: true });
        const utdSub = {
            name: this.state.name,
            classesPerWeek: this.state.classesPerWeek,
        }
        this.postNewSubject(utdSub)
        e.preventDefault();
    }

    async postNewSubject(utdSub) {

        const response = await fetch('http://localhost:8080/eregister/subject/', {
            method: 'POST',
            body: JSON.stringify(utdSub),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            const updateSubject = await response.json();
            const subjects = this.state.subjects;
            subjects.push(updateSubject);
            this.setState({
                isLoading: false,
                subjects: subjects,
                creating: false,
                name: null,
                classesPerWeek: null,
                selectedGrade: null



            })
            alert("Usepno dodat novi predmet")
        } else {
            const r = await response.json();
            if (r.code === 2 || r.code === 3 || r.code === 1) {
                alert(r.message)
            }
            else {
                alert("something went wrong")
            }

            this.setState({
                isLoading: false
            })
            console.log("Greska " + response)
        }
    }


    deleteSubjectHadler = (id) => {
        this.setState({ isLoading: true });
        this.SubjectDeleteFetchHandler(id)
        this.props.history.push(this.props.match.path)

    }

    async SubjectDeleteFetchHandler(id) {
        const response = await fetch('http://localhost:8080/eregister/subject/' + id, {
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
            alert("Usepno izbrisan predmet => refresujte stranicu da promene budu vidljive")
        } else {
            console.log("Greska " + response)
        }
    }

    editSubjectHadler = (id) => {
        this.setState({ editing: true, selectedSubject: id });

    }

    subjectEditSubmitHandler = (e) => {
        this.setState({ isLoading: true });
        const utdSub = {
            name: this.state.name,
            classesPerWeek: this.state.classesPerWeek,
        }
        this.editSubjectFetch(utdSub)
        e.preventDefault();
    }

    async editSubjectFetch(utdSub) {

        const response = await fetch('http://localhost:8080/eregister/subject/' + this.state.selectedSubject, {
            method: 'PUT',
            body: JSON.stringify(utdSub),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            this.setState({
                isLoading: false,
                editing: false,
                name: null,
                classesPerWeek: null,
            })
            alert("Usepno promenjen predmet - refresujte stranicu")
        } else {
            const r = await response.json();
            if (r.code === 2 || r.code === 4 || r.code === 1) {
                alert(r.message)
            }
            else {
                alert("something went wrong")
            }
        }
    }

    addSubjectToGrade = (e) => {
        this.setState({ isLoading: true });
        this.addSubjectToGradeFetch()
        e.preventDefault();
    }

    selectSubjectIdNew = (id) => {
        this.setState({selectedSubject:id})
    }

    
    async addSubjectToGradeFetch() {

        const response = await fetch('http://localhost:8080/eregister/subject/' + this.state.selectedSubject +'/addGrade/' + this.state.selectedGrade, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                'Content-Type': 'application/json; charset=UTF-8',
                'Origin': 'http://localhost:3000',
            }
        })
        if (response.ok) {
            this.setState({
                isLoading: false, 
            })
            alert("Usepno promenjen predmet - refresujte stranicu")
        } else {
            const r = await response.json();
            if (r.code === 11 || r.code === 12 || r.code === 13) {
                alert(r.message)
                this.setState({isLoading:false})
            }
            else {
                alert("something went wrong")
            }
        }
    }


    render() {

        if (this.state.isLoading) {
            return <Spiner />
        }

        let subjects = <h1>SOMETHING WENT WRONG</h1>;

        subjects = this.state.subjects.map(subject => {
            return (
                <SubjectEl
                    key={subject.id}
                    name={subject.name}
                    classesPerWeek={subject.classesPerWeek}
                    delete={() => this.deleteSubjectHadler(subject.id)}
                    edited={() => this.editSubjectHadler(subject.id)}
                    changed={(e) => this.subjectAddingHandler(e)}
                    addToGrade={(e)=> this.addSubjectToGrade(e)}
                    selectSubjectId={() => this.selectSubjectIdNew(subject.id)}
                />
            )
        }
        )




        return (
            <div>
                <Route path={this.props.match.path} render={() => <div>
                    <h2 className="shadow-sm mb-5 bg-white rounded display-7 mb-3">Svi Predmeti:</h2>
                    <Modal show={this.state.creating} modalClosed={this.creatingCancelHandler}>
                        <SubjectForm cancel={this.creatingCancelHandler}
                            changed={(e) => this.subjectAddingHandler(e)}
                            submitNewSubject={(e) => this.subjectSubmitHandler(e)} />
                    </Modal>
                    <Modal show={this.state.editing} modalClosed={this.creatingCancelHandler}>
                        <SubjectForm cancel={this.creatingCancelHandler}
                            changed={(e) => this.subjectAddingHandler(e)}
                            submitNewSubject={(e) => this.subjectEditSubmitHandler(e)} />
                    </Modal>
                    <button type="button" className="btn btn-primary btn-lg m-xl-5 " onClick={this.operNewSubjectDialog}>Dodaj Novi Predmet</button>
                    <section className={classes.StudentList}>
                        {subjects}
                    </section> </div>}
                />
            </div>
        )

    }
}

export default withRouter(Subject)
