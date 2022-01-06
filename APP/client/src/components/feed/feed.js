import {useState, useEffect, useContext} from 'react';
import "./feed.css";
import Share from '../share/share';
import Post from '../post/post';
import axios  from "axios";
import { AuthContext } from '../../context/AuthContext';

export default function Feed({username}) {
  const [posts, setPosts]=useState([]);
  const {user}=useContext(AuthContext);
  //const [user, setUser]=useState(JSON.parse(localStorage.getItem("user")));
  /*useEffect(()=>{
      setUser(JSON.parse(localStorage.getItem("user")));
   },[username]);
   console.log(user);*/
  useEffect(() => {
    const fetchPosts = async ()=>{
      const res= username ? await axios.get("/posts/profile/"+username): await axios.get(`posts/timeline/${user?._id}`);
      //console.log(res);
      setPosts(res.data.sort((p1, p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  },[username, user._id]);

    return (
        <div className="feed">
        <div className="feedWrapper">
        
        {(!username || username === user.username) && <Share/>}
          {
            posts.map((p)=>(
              <Post key={p._id} post={p}/>
            ))
          }
          </div>
        </div>
    )
}
