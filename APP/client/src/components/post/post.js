import React, { useState, useEffect, useContext } from 'react'
import './post.css';
import {MoreVert, Favorite, ThumbUp, Comment} from  '@material-ui/icons';
import axios from "axios";
import { format } from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {
    const [like, setlike]=useState(post.likes.length);
    const [isliked, setisliked]=useState(false);
    const [user, setUser]=useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser}=useContext(AuthContext);
    //console.log(currentUser);
    //console.log(post._id);
    //const [currentUser, setcurrentUser]=useState(JSON.parse(localStorage.getItem("user")));
    //useEffect(()=>{
    //  setcurrentUser(JSON.parse(localStorage.getItem("user")))
    //},[])
    useEffect(() => {
        const fetchUsers = async ()=>{
          const res=await axios.get(`/user?userId=${post.userId}`);
          setUser(res.data);
        }
        fetchUsers();
      },[post.userId]);

      const likeHandler=()=>{
        try{
          //console.log(post._id)
          //console.log(currentUser._id);
        axios.put(`/posts/${post?._id}/like`,{userId: currentUser._id});
        }catch(err){
          console.log(err);
        }      
        }
    return (

        <div className="post">
             <div className="postWrapper">
             <div className="postTop">
             <div className="postTopLeft"><Link to={`profile/${user.username}`} style={{textDecoration: "none"}}>
             <img src={user.ProfilePicture?PF+user.ProfilePicture : PF+"noProfile.jpg"} alt="" className="postProfileImg"/>
             </Link>
             <span className="postUsername">{user.username} </span> 
             <span className="postDate"> {format(post?.createdAt)}</span></div>
             <div className="postTopRight"> <MoreVert/></div>
             </div>
             
             <div className="postCenter"><span className="postText"> {post?.desc} </span>
             <img src={PF+post.img} alt="" className="postImg"/>
             </div>

             <div className="postBottom">
             <div className="postBottomLeft"><Favorite htmlColor="tomato" className="likeIcon" onClick={likeHandler}/><ThumbUp htmlColor="purple" className="likeIcon" onClick={likeHandler}/><span className="postLikeCounter">{like} people liked it</span></div>
             <div className="postBottomRight"><Comment htmlColor="goldenrod" className="likeIcon"/><span className="postCommentText"># Comments</span></div>
             </div>
             </div>
             </div>
    )
}
