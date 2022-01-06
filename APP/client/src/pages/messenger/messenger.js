import React, { useContext, useEffect, useRef, useState } from 'react'
import Topbar from '../../components/topbar/topbar'
import './messenger.css';
import { Search } from '@material-ui/icons';
import Chatting from '../../components/chatting/chatting';
import Message from '../../components/message/message';
import ChatOnline from '../../components/chatOnline/chatOnline';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {io} from "socket.io-client";

export default function Messenger() {
    const {user}=useContext(AuthContext);
    const [conversations, setConversations]=useState([]);
    const [currentChat, setcurrentChat]=useState(null);
    const [messages, setmessages]=useState([]);
    const [newMessage, setnewMessage]=useState("");
    const scrollRef = useRef();
    const [other, setOther]=useState(null);
    const socket=useRef(io("ws://localhost:8900"));
    const [arrivalMessage, setarrivalMessage]=useState(null)
    const [onlineusers, setonlineuser]=useState([]);

    useEffect(()=>{
        socket.current=io("ws://localhost:8900");
        socket.current.on("getMessage", data=>{
            setarrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    },[]);

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setmessages((prev) => [...prev, arrivalMessage]); 
    }, [arrivalMessage, currentChat]);

    useEffect(()=>{
       socket.current.emit("addUser", user._id);
       socket.current.on("getUsers", (users)=>{
           setonlineuser(user.following.filter((f)=> users.some((u) => u.userId === f)));
       });
    },[user]);

    //console.log(user);
    useEffect(()=>{
        const getConversation=async ()=>{
            try{
                //console.log(user._id);
                const res=await axios.get(`/conversation/${user._id}`);
                //console.log(res.data);
                setConversations(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getConversation();
    },[user._id]);

    useEffect(()=>{
        const getMessages = async() =>{
            try{
                const res= await axios.get(`/messages/${currentChat?._id}`);
                setmessages(res.data);
            }catch(err){
                console.log(err);
            }
            
        };
        getMessages();
    },[currentChat]);
    //console.log(messages);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const message={
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        const receiverId= currentChat.members.find(member=> member!==user._id);
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        })
        try{
            scrollRef.current.scrollIntoView({behavior: "smooth"});
            const res= await axios.post(`/messages`, message);
            setmessages([...messages, res.data]);
        }catch(err){
            console.log(err);
        }
    }
    

    const chatHandler=async (c)=>{
        try{
            //console.log("here conversation" ,c);
            
            const m1=c.members[0];
            const m2=c.members[1];
            const res=m1 === user._id ?  await axios.get("/user?userId="+m2) : await axios.get("/user?userId="+m1);
            //console.log(res);
            setOther(res.data);
            setcurrentChat(c);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenu"><div className="chatMenuWrapper">
               <Search/> <input placeholder="Search for friends" className="chatMenuInput" />
               {conversations.map( (c)=>{
                   return(
                    <>
                   <div onClick={()=>{chatHandler(c)}}>
                   <Chatting conversation={c} currentUser={user}/>
                   </div>
                
                   </>
                   );
                  
               })}
               
            </div></div>
            <div className="chatBox">
            <div className="chatBoxWrapper">
            { currentChat ?<>
            <div className="chatBoxTop">
            { messages.map((m)=>(
                <>
                <div ref={scrollRef}>
                <Message message={m}  own={m.sender===user._id } otheruser={other} curruser={user} />
                </div>
                
                </>
            ))}
            </div>
            <div className="chatBoxBottom">
            <textarea className="chatMessageInput" placeholder="Enter you message ?"  onChange={(e)=>setnewMessage(e.target.value)} value={newMessage}  />
            <button className="chatSubmitButton" onClick={handleSubmit}>Submit</button>
            </div>
            </> : <span className='noConversation'>Open a Conversation to start a chat.</span>}
            </div></div>
            <div className="chatOnline"><div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineusers} currentId={user._id} setCurrentChat={setcurrentChat} />
            </div></div>
        </div>
        </>
        
    )
}
