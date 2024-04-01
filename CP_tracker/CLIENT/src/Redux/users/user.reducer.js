import { LOGIN_USER_ERROR, LOGIN_USER_LOADING, LOGIN_USER_SUCCESS } from "./user.type";

const initialState = {
    token: "",
    auth:false,
    loading:false,
    error:false
}

export default function userReducer(state=initialState, action){

    const {type, payload} = action;

    switch(type){

        case LOGIN_USER_ERROR: {
            return {
                ...state, error:true, loading:false
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state, error:false, loading:false, token:payload, auth:true
            }
        }
        case LOGIN_USER_LOADING: {
            return {
                ...state, loading:true
            }
        }
        default:{
            return state
        }



    }

}