import React, { useEffect, useState, useContext } from 'react'
import "./rightbar.css";
import {Cake, Add, Remove} from '@material-ui/icons';
import Users  from '../../User';
import Online from '../online/online';
import axios from 'axios';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends]= useState([]);
  const {user: currentUser, dispatch} =  useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.following.includes(user?._id));

  useEffect(()=>{
    //console.log(currentUser)
    setFollowed(currentUser.following.includes(user?._id));
    console.log(followed)
  },[currentUser , user]);

  useEffect(()=>{

    const getFriends= async () => {
      try{

        const friendList  = await axios.get(`/user/friends/${user?._id}`);
        setFriends(friendList.data);
        //console.log(friendList.data);
    }catch(err){
      console.log(err);
    }
  }
    getFriends();  
  },[user]);

  const handleClick=async ()=>{
      try{
        if(followed){
          await axios.put(`/user/${user._id}/unfollow`, {userId: currentUser._id});
          dispatch({type: "UNFOLLOW", payload: currentUser._id});
        }
        else{
          await axios.put(`/user/${user._id}/follow`, {userId: currentUser._id});
          dispatch({type: "FOLLOW", payload: currentUser._id});
        }
        setFollowed(!followed);
      }catch(err){
        console.log(err);
      }
      
  }

  const HomeRightbar=()=>{
    return(
    <> <div className="birthdayContainer">
    <Cake className="birthdayImg" /><span className="birthdayText"> <b>Pola</b> and <b>3 other </b> have birthday Today</span>
    </div>
    <div className="rightbarAd"> <img src=  {PF+`ad1.jpg`} alt="" className="rightbarAdImg" />
     <img src="/assests/ad2.jpg" alt="" className="rightbarAdImg" /></div>
     <div className="rightbarTitle">Online Friends</div>
     <ul className="rightbarFriendList">
      {friends.map((u) => (
        <Online key={u.id} user={u}/>
      ))}
      </ul></>
    )
  }

  const ProfileRightbar=()=>{
    return (
      <>
      {user.username !== currentUser.username  && (
        <button className="rightbarFollowButton" onClick={handleClick}>
        {followed? "Unfollow" : "Follow"}
        {followed? <Remove/>: <Add/>}
          
        </button>
      )}
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">City : </span>
        <span className="rightbarInfoValue">{user.city}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">From : </span>
        <span className="rightbarInfoValue">{user.from}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey"> Relationship : </span>
        <span className="rightbarInfoValue">{user.relationship}</span>
      </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      {friends.map(friend=>(
      <Link to={`/profile/${friend.username}`} style={{textDecoration: "none"}} >
      <div className="rightbarFollowings">
      
        <div className="rightbarFollowing">
          <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"noProfile.jpg"} alt="" className="rightbarFollowingImg"/>
          <span className="rightbarFollowingName">{friend.username}</span>
        </div>
      </div>  
      </Link>
      ))}
      
      </>
    );
  }
    return (
        <div className="rightbar">
          <div className="rightbarWrapper">
         { user ? <ProfileRightbar/> : <HomeRightbar/>}
          </div> 
        </div>
    )
}
