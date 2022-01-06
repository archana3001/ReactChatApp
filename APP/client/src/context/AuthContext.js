import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
    user: null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider=({children})=>{
    const [state, dispatch]=useReducer(AuthReducer, INITIAL_STATE, ()=>{
        const localData = localStorage.getItem("user");
        console.log(JSON.parse(localData))
        return (localData!==null)? { user: JSON.parse(localData)}: INITIAL_STATE;
    });
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user));
    // eslint-disable-next-line no-undef
    },[INITIAL_STATE.user, state.user]);
    return(
        <AuthContext.Provider 
        value={{user:state.user,
        isFetching: state.isFetching, 
        error: state.error, dispatch}}>
        {children}
        </AuthContext.Provider>
    );
};