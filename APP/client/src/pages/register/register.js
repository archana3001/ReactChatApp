import React, { useRef } from 'react';
import { Favorite } from '@material-ui/icons';
import './register.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Register() {
    const username=useRef();
    const email= useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history=useHistory();

    const handleClick= async (e)=>{

        e.preventDefault();
        //console.log(password.current.value);
        //console.log(passwordAgain.current.value);
        if(passwordAgain.current.value !== password.current.value){
            
            passwordAgain.current.setCustomValidity("Password don't match");
        }else{
            const user={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try{
                const res = await axios.post("/auth/register", user);
                history.push("/login");
            }
            catch(err){
                console.log(err);
            }
        }
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
                    <input placeholder="username" ref={username} className="loginInput" minLength="3" maxLength="20" required/>
                    <input placeholder="email" type="email" ref={email} className="loginInput" required/>
                    <input placeholder="password" type="password" ref={password} className="loginInput" minLength="6" required/>
                    <input placeholder="Re-type password" type="password" ref={passwordAgain} minLength="6"  className="loginInput" required/>
                    <button className="loginButton">Sign Up</button>
                    <button className="loginRegisterButton"> Log into your Account </button>
                </form>
            </div>
        </div>
            
        </div>
    )
}
