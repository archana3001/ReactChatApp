import axios from "axios";

export const loginCall = async (userCredential, dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post("/auth/login", userCredential);
        //const token=res.data.token;
        //const _id=res.data._id;
        //const user=res.data.user;
        //localStorage.setItem("token", token);
        //localStorage.setItem("_id", _id);
        //localStorage.setItem("user", JSON.stringify(user));
        //console.log(res.data.user);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
};