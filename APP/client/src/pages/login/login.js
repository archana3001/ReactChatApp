import React, { useContext, useRef } from 'react'
import './login.css';
import { Favorite } from '@material-ui/icons';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from "@material-ui/core";

export default function Login() {
    const email= useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick=(e)=>{
        e.preventDefault();
        /*authenticationService.login({email: email.current.value, password: password.current.value}, dispatch).then( user=>{
            console.log(user);
        }
        );*/
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
        console.log(user);
    }
    

    return (
        <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Facebook <Favorite className="loginLogoheart"/></h3>
                <span className="loginDesc"> Connect to your loved ones</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="email" type="email"  className="loginInput" ref={email} required/>
                    <input placeholder="password" type="password" ref={password} minLength="6" className="loginInput" required/>
                    <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress  size='20px'/> : "Log In"}</button>
                    <span className="loginForgot"> Forgot Password ?</span>
                    <button className="loginRegisterButton"> {isFetching ? (<CircularProgress  size='20px'/>) :( "Create a New Account")} </button>
                </form>
            </div>
        </div>
            
        </div>
    )
}
