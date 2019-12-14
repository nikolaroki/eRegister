import React from 'react'
import classes from './Login.module.css'



const Login = (props) => {
        return (
            <div className={classes.Background}>
                
                <div className={classes.BackgroundJumbo}>
                    <div className={classes.CenterInBox}><h1 >eDnevnik 1.0</h1></div>
                </div>
                <div className={classes.UnderBacgound}></div>
                <div className={classes.FormContainer}>
                    <form onSubmit={props.onLoginSubmit}>
                        <div className="form-group" onChange={props.changed}>
                            <h6>Unesite vaše kredencijale</h6>
                            <label htmlFor="Username"></label>
                            <input
                                 type="text" 
                                 className="form-control" 
                                 onChange={props.changed}
                                 name="username"
                                 placeholder="Korisničko ime"
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"></label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                placeholder="Lozinka"
                                onChange={props.changed}/>
                                
                        </div>
                        <button type="submit" className="btn btn-primary">Idi dalje</button>

                    </form>


                </div>
            </div>


        )
    }



export default Login