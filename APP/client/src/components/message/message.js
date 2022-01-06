import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import './message.css';
import axios from "axios";

export default function Message({message, own,otheruser,curruser}) {
    const [users, setUser]=useState(null);
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(()=>{
        const u= own===true? curruser: otheruser ;
        setUser(u);
    },[own, message]);
    
    return (
        
        <>
        
            <div className={own === true ? "message own": "message"}>
            <div className="messageTop">
            
                <img className="messageImg" src={users?.profilePicture ? PF+users?.profilePicture : PF+'noProfile.jpg'} alt="" />
                <span className="messageSender">{users?.username}</span>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
            </div>
        </>
        
    )
}
