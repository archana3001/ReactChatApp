import React, { useContext , useEffect, useState} from 'react'
import "./topbar.css";
import {Search,ExitToApp, Person,  Chat, Notifications} from '@material-ui/icons';
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function Topbar() {
    const {user}= useContext(AuthContext);
    //const [user, setUser]=useState(localStorage.getItem("user"));
    //useEffect(async()=>{
    //            const res = localStorage.getItem("user");
    //            setUser(res);
    //},[user]);
    const handleLogout=()=>{
    if(localStorage.getItem("user")!=null){
            localStorage.removeItem("token");
            localStorage.removeItem("_id");
            localStorage.removeItem("user");
            <Redirect to="/login" />
    }
}

    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
        <div className="topbarContainer">
            <div className="topbarLeft">
            <Link to="/" style={{textDecoration: "none"}}>
            <span className="logo">Facebook</span>
            </Link>
            
            </div>
            <div className="topbarCenter">
            <div className="searchbar">
            <Search className="searchIcon"/>
            <input placeholder="search for people and posts" className="searchInput"/>
            </div>
            </div>
            <div className="topbarRight">
            <div className="topbarIcons">
            <div className="topbarIconItem"><Person /><span className="topIconBadge">1</span></div>
            <div className="topbarIconItem"><Chat /><span className="topIconBadge">2</span></div>
            <div className="topbarIconItem"><Notifications /><span className="topIconBadge">1</span></div>
            <div className="topbarIconItem"><span className="topbarIconBadge"><ExitToApp onClick={handleLogout}/></span></div>
            </div>
            <Link to={`/profile/${user.username}`}>
            <img src={user.ProfilePicture? PF+user.ProfilePicture : PF+"noProfile.jpg"} alt="" className="topbarImg"/>
            </Link>
            </div>
        
        </div>
        </>
        
    
    );
}
