import './App.css';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Register from './pages/register/register';
import { BrowserRouter as Router, Route, Switch , Redirect } from "react-router-dom";
import { Routes} from "react-router";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import Messenger from './pages/messenger/messenger';

function App() {
        const {user}=useContext(AuthContext);
        //console.log(user);
        /*const [user, setUser]=useState();
        useEffect(async()=>{
                const res = localStorage.getItem("user");
                setUser(res);
        },[user]);*/
return(<div>
    
        <Router>
        <Switch>
        <Route exact path="/">{user?<Home/>:<Register/>}</Route>
        <Route path="/login">{user?<Redirect to="/"/> :<Login/>}</Route>
        <Route path="/register">{user?<Redirect to="/"/> :<Register/>}</Route>
        <Route path="/messenger">{!user?<Redirect to="/"/>:<Messenger/>}</Route>
        <Route path="/profile/:username"><Profile/></Route>
        </Switch>
        
    
        </Router>

        
       
        </div>);
}

export default App;