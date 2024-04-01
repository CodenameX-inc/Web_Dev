import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import  {useAuth} from '../structure/GlobalStateProvider.jsx'
import { Dropdown } from "flowbite-react";
import { Button } from "flowbite-react";

const nv = [
  [ "Tasks", "/tasks/all-tasks"],
  [ "Leaderboard", "/leaderboard"],
  [ "Practice", "/practice"]
];
const style="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/*function IsAuth({url, text, style}){
    if(LOGIN_TOKEN)
    {
        return(
          <Link to={url} className={style}>{text}</Link>
        )
    }
    else{
        return(
            //TODO: REDICRECT TO LOGIN
        // enqueueSnackbar('User Registered successfully', { variant: 'success' });
        <Link to='/login' className={style}>{text}</Link>
        )
    }
}*/

export default function Navbar() {
  const [usermail, setemail] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { authState, setAuthState } = useAuth();
  const logout = () => {
    // Perform logout logic here, e.g., invalidate the token on the server
    setAuthState({
        token: null,
        isAuthenticated: false,
        user: null
    });
    return <Navigate to="/login" />
    // Redirect to login page or perform other actions as needed
  };
  function Usr(){
      if(authState.isAuthenticated) {
          return (
          <div className="flex items-center space-x-4">
          <Link className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100" to="/tasks/profile" >
            <UserIcon className="h-4 w-4 mr-1.5" /> Profile
          </Link>
          <Button className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100" onClick={logout}>Logout</Button>
          </div>)
          }
        else{
          return (
              <div className="flex items-center space-x-4">
        <Link className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100" to="/login">
          <UserIcon className="h-4 w-4 mr-1.5" /> Login
        </Link>
        <Link className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100" to="/signup" >
          Sign Up
        </Link>
      </div>
          )
        }
      
  }

  return (
    <header className="bg-gray-900 shadow-lg">
        <div className="container flex items-center justify-between h-14 px-4 sm:px-6">
          <Link className="flex items-center space-x-2 text-gray-50" href="/">
            <TerminalIcon className="h-6 w-6" />
            <span className="font-semibold">sharpen</span>
          </Link>
          <nav className="hidden space-x-4 lg:flex">
             {nv.map((item,index)=>{
                
                 <Link to={item[1]} className={style}>{item[0]}</Link>
              
             })}
          </nav>
           <Usr />
          {/* <button className="lg:hidden"> */}
           
            <Dropdown label="Dropdown" placement="bottom">
            {/* <MenuIcon className="h-6 w-6" /> */}
              {nv.map((item, index) => (
                <Dropdown.Item key={index}>
                  {
                    (authState.isAuthenticated)?
                    <Link to={item[1]} className={`${style} bg-blue-100`}>{item[0]}</Link>
                    : <Link key={index} to={"/login"} className={style}></Link>
                  }
                  
                </Dropdown.Item>
              ))}
            </Dropdown>

          {/* </button> */}
        </div>
      </header>
  );
}
function MenuIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    );
  }
  
  function TerminalIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    );
  }
  
  function UserIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }

//   export default Navbar;