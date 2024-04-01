import { CREATE_TASK_ERROR, CREATE_TASK_LOADING, CREATE_TASK_SUCCESS, DELETE_TASK_ERROR, DELETE_TASK_LOADING, DELETE_TASK_SUCCESS, GET_TASK_ERROR, GET_TASK_LOADING, GET_TASK_SUCCESS, UPDATE_TASK_ERROR, UPDATE_TASK_LOADING, UPDATE_TASK_SUCCESS } from "./task.types"

let initialState = {
    loading:false,
    error:false,
    data:[],

}

export const taskReducer =(state=initialState,action)=>{

    const {type,payload} = action

    switch(type){
        case GET_TASK_LOADING:{

            return {
                ...state , loading:true
            }
        }

        case GET_TASK_SUCCESS:{
            return {
                ...state , loading:false ,error:false ,data:payload
            }
        }

        case GET_TASK_ERROR:{
         
            return {
                ...state , loading:false ,error:true 
            }
        }



        case CREATE_TASK_LOADING:{

            return {
                ...state , loading:true
            }
        }

        case CREATE_TASK_SUCCESS:{
            return {
                ...state , loading:false ,error:false 
            }
        }

        case CREATE_TASK_ERROR:{
         
            return {
                ...state , loading:false ,error:true 
            }
        }


        
        case UPDATE_TASK_LOADING:{

            return {
                ...state , loading:true
            }
        }

        case UPDATE_TASK_SUCCESS:{
            return {
                ...state , loading:false ,error:false 
            }
        }

        case UPDATE_TASK_ERROR:{
         
            return {
                ...state , loading:false ,error:true 
            }
        }

         
        case DELETE_TASK_LOADING:{

            return {
                ...state , loading:true
            }
        }

        case DELETE_TASK_SUCCESS:{
            return {
                ...state , loading:false ,error:false 
            }
        }

        case DELETE_TASK_ERROR:{
         
            return {
                ...state , loading:false ,error:true 
            }
        }

        default:{
            return state
        }


    }


}