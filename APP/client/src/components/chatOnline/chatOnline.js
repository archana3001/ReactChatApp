import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './chatOnline.css';

export default function ChatOnline({onlineUsers, currentId, setCurrentchat}) {
    const [friends, setfriends]=useState([]);
    const [onlinefriends, setonlinefriends]=useState([]);
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    
    useEffect(()=>{
        const getFriends=async ()=>{
            const res = await axios.get("/user/friends/"+currentId);
            setfriends(res.data);

        }
        getFriends();
    },[currentId]);

    useState(()=>{
        setonlinefriends(friends.filter((f)=> onlineUsers.includes(f._id)));
        console.log(onlinefriends);

    },[friends,onlineUsers]);
    //console.log(onlineUsers);
    return (
        <>
            <div className='chatOnline'>
            {onlinefriends.map((o) => (
                <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img src={o?.profilePicture? PF+o.profilePicture : PF+'noProfile.jpg'} className='chatOnlineImg' alt=""/>
                    <div className='chatOnlineBadge'></div>
                </div>
                <span className='chatOnlineName'>{o?.username}</span>
            </div>
            ))}
            
            </div>
        </>
        
    )
}
