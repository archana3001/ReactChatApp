import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './chatting.css';

export default function Chatting({conversation, currentUser}) {
    const [user, setUser]=useState(null);
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        console.log(typeof(currentUser._id));
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async ()=>{
            console.log(friendId);
            try{
                const res = await axios.get("/user?userId="+friendId);
                console.log(res);
                setUser(res.data);
            
            }catch(err){
                console.log(err);
            }
            
        }
        getUser();
    },[currentUser, conversation]);

    return (
            <div className="conversation"> 
            <img src={user?.profilePicture ? PF+user?.profilePicture : PF+'noProfile.jpg'} className="conversationImg" alt=""/>
            <span className="conversationName">{user?.username} name </span>
                        </div>
        
    );
}
