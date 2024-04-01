import axios from "axios"
import { LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from "./user.type"

export const getUser=(obj) => async (dispatch) => {
    
    dispatch({LOGIN_USER_LOADING})
    try{
        let res = await axios("http://localhost:5000/login", {
            method: "post",
            data: obj
        })
        let {message, token, status} = res.data
        if(status==1){
            dispatch({type:LOGIN_USER_SUCCESS, payload:token})
        }else{
            console.log(message);
            dispatch({type:LOGIN_USER_ERROR})
        }
    }
    catch(err){
        dispatch({type:LOGIN_USER_ERROR})
    }


}