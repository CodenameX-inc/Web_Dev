import React from "react";
import  {useAuth} from '../structure/GlobalStateProvider.jsx'
// import { Route, Redirect } from "react-router-dom";
import { useSnackbar } from 'notistack';

// const cookies = new Cookies();

import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoutes = () => {
  const { authState, setAuthState } = useAuth();
return (
     authState.isAuthenticated? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes;