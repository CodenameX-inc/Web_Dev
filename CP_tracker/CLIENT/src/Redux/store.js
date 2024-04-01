import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import userReducer from "./users/user.reducer"
import {thunk} from "redux-thunk"

let rootReduer = combineReducers(
    {
        userReducer:userReducer
    }
)

export const store = legacy_createStore(rootReduer, applyMiddleware(thunk))