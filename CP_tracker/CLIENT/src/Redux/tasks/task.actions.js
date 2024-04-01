import axios from "axios"
import { useSelector } from "react-redux"
import { BASE_URL } from "../../../config"
import { store } from "../store"
import { LOGOUT } from "../users/user.types"
import { CREATE_TASK_ERROR, CREATE_TASK_LOADING, CREATE_TASK_SUCCESS, DELETE_TASK_ERROR, DELETE_TASK_LOADING, DELETE_TASK_SUCCESS, GET_TASK_ERROR, GET_TASK_LOADING, GET_TASK_SUCCESS, UPDATE_TASK_ERROR, UPDATE_TASK_LOADING, UPDATE_TASK_SUCCESS } from "./tasks.types"


export const getTasks=()=>async(dispatch)=>{
    const {token} = store.getState().userReducer

    dispatch({type:GET_TASK_LOADING})
    try {
        
        const res= await axios(BASE_URL+"/tasks/all-tasks",{
            method:"get",
            headers:{
                Authorization:token
            }
        })
        const {message,data,status} = res.data
        console.log(message)
        if(status==200){
            
        dispatch({type:GET_TASK_SUCCESS,payload:data})
        }else if(status==401){
            dispatch({type:LOGOUT})
        }else{
            dispatch({type:GET_TASK_ERROR})

        }

    } catch (error) {
        dispatch({type:GET_TASK_ERROR})

    }



}


export const createTasks=(obj)=>async(dispatch)=>{
    const {token} = store.getState().userReducer

    dispatch({type:CREATE_TASK_LOADING})
    try {
        
        const res= await axios(BASE_URL+"/tasks/add-task",{
            method:"post",
            data:obj,
            headers:{
                Authorization:token
            }
        })

        const {message,status} = res.data
        console.log(message)
        if(status==200){
        dispatch({type:CREATE_TASK_SUCCESS})
        dispatch(getTasks())
        }else if(status==400){
            dispatch({type:LOGOUT})
        }else{
            dispatch({type:CREATE_TASK_ERROR})
        }
    } catch (error) {
        dispatch({type:CREATE_TASK_ERROR})

    }
}



export const deleteTasks=(id)=>async(dispatch)=>{
    const {token} = store.getState().userReducer

    dispatch({type:DELETE_TASK_LOADING})
    try {
        
        const res= await axios(BASE_URL+"/tasks/",{
            method:"delete",
            headers:{
                Authorization:token,
                id:id
            }
        })

        const {status,message} = res.data
        console.log(message)
        if(status==1){
            
        dispatch({type:DELETE_TASK_SUCCESS})
        dispatch(getTasks())

        }else if(status==2){
            dispatch({type:LOGOUT})
        }else{
            dispatch({type:DELETE_TASK_ERROR})

        }

    } catch (error) {
        dispatch({type:DELETE_TASK_ERROR})

    }



}



export const updateTasks=(id,obj)=>async(dispatch)=>{
    const {token} = store.getState().userReducer

    dispatch({type:UPDATE_TASK_LOADING})
    try {
        
        const res= await axios(BASE_URL+"/tasks",{
            method:"put",
            data:obj,
            headers:{
                Authorization:token,
                id:id
            }
        })

        const {status,message} = res.data
        console.log(message)
        if(status==200){
            
        dispatch({type:UPDATE_TASK_SUCCESS})
        dispatch(getTasks())

        }else if(status==401){
            dispatch({type:LOGOUT})
        }else{
            dispatch({type:UPDATE_TASK_ERROR})

        }

    } catch (error) {
        dispatch({type:UPDATE_TASK_ERROR})

    }



}