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

export default function Navbar() {
  const [usermail, setemail] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { authState, setAuthState } = useAuth();

  
function IsVal(url){
  (authState.isAuthenticated)? url: '/login';
}
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
  
function HomeIcon(){
  return (
    <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
  </svg>
  )
}
function TaskIcon(){
  return (
    <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"/>
  </svg>

  )
}
function ProfileIcon(){
  return (
    <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.6" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
  </svg>
  )
}
function BoardIcon(){
  return (
    <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
  </svg>

  )
}
function PracticeIcon(){
  return (
    <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"/>
    </svg>
  )
}


  function MENU(){
    // if(authState.isAuthenticated) {
    return (
      <div className=" flex items-center space-x-4 mr-8">
      <Link className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100" to="/tasks/all-tasks" >
        <TaskIcon className="h-4 w-4 mr-1.5" /> Tasks
      </Link>
      <Link className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100" to="/tasks/leaderboard" >
        <BoardIcon className="h-4 w-4 mr-1.5" /> Leaderboard
      </Link>
      <Link className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100" to="/tasks/practice" >
        <PracticeIcon className="h-4 w-4 mr-1.5" /> Practice
      </Link>
      </div>
    )
    
  }
  
  function Usr(){
    if(authState.isAuthenticated) {
        return (
        <div className="flex items-center lg:gap-10 md:gap-6 sm:gap-3">
        <Link className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100" to="/tasks/profile" >
          <UserIcon className="h-4 w-4 mr-1.5" /> Profile
        </Link>
        <Button className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100" onClick={logout}>Logout</Button>
        </div>
        )
        }
      else{
        return (
            <div className="flex items-center lg:gap-10 md:gap-6 sm:gap-3">
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

// useEffect
  

  return (
    <header className="bg-gray-900 shadow-lg">
        <div className="container flex items-center justify-between h-14 px-4 sm:px-6">
          <Link className="flex items-center space-x-2 text-gray-50" href="/">
            <TerminalIcon className="h-6 w-6" />
            <span className="font-semibold">sharpen</span>
          </Link>
          <nav className="space-x-4 lg:flex">
          <div className="flex items-center space-x-4">
            <MENU/>
            <Usr />
            </div>
            
          </nav>
           
          {/* <button className="lg:hidden"> */}
           
            <Dropdown placement="bottom" >
            {/* <MenuIcon className="h-6 w-6" /> */}
              {nv.map((item, index) => (
                <Dropdown.Item key={index}>
                  {
                    (authState.isAuthenticated)?
                    <Link to={item[1]} className={`${style} bg-blue-100`}>{item[0]}</Link>
                    : <Link key={index} to={"/login"} className="flex items-center text-sm font-medium transition-colors text-grey-400 hover:text-black-100"></Link>
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