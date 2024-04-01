import { createContext, useContext, useState } from "react"
import { RenderHeader } from "./Header";
import { RenderMenu, RenderRoutes } from "./RenderNavigation";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {

     const [ user, setUser ] = useState({isAuthenticated: false})
     // const [ token, setToken ] = useState('')

     const login = () => {

          // Make a call to the authentication API to check the username
          
          return new Promise((resolve, reject) => {

               let auth = LOGIN_TOKEN;
               if (auth) {
                    setUser({isAuthenticated: true})
                    resolve("success")
               } else {
                    reject("Unauthorized")
               }
          })
          
          
     }
     const logout = () => {

          alterTOKEN(null);
          setUser({isAuthenticated: false})
     }


     return (
          
               <AuthContext.Provider value={{user, login, logout}}>
                    <>
                         <RenderHeader />
                         <RenderMenu />
                         //TODO: add <App/> here 
                         <RenderRoutes />
                    </>
                    
               </AuthContext.Provider>
          
     )

}