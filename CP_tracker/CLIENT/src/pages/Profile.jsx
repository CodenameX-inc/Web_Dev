import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
// import { AvatarImage, AvatarFallback, } from "@/components/ui/avatar"
import { Button } from "flowbite-react"
import { Avatar } from "flowbite-react";
import {  Card } from "flowbite-react"
import {PORT } from '../../config'
import * as conf from '../../config'
import { useSnackbar } from 'notistack';
import  {useAuth} from '../structure/GlobalStateProvider.jsx'

// import {getAllData, deleteInfo} from "../../../../MCC/store.js"

const Profile = () => {
  const [userInfo, setUserInfo]= useState();
  const [tasksInfo, setTaskInfo] = useState();
  const [info, setInfo]= useState({
    "TOTAL":0,
    "DONE":0,
    "ATTEMPTED":0,
    "REVISIT":0,
    "PENDING":0
  });
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const { authState, setAuthState } = useAuth();

  
  function del(){
   
      setAuthState({
        token:null,
        isAuthenticated:false,
        user:null
      })
      console.log("logout successful");
      enqueueSnackbar('Logged out successfully', { variant: 'success' });
      navigate('/login');
    
  } 
  useEffect(()=>{
    // if(userEMAIL) 
    async function auth(){
    let res = authState.isAuthenticated;
    if(res){
      console.log("RES from client: ",res);
       enqueueSnackbar('User Found', { variant: 'info' });
       let newInfo = { "TOTAL": 0,"DONE": 0, "ATTEMPTED": 0, "REVISIT": 0, "PENDING": 0 };
      //  axios.defaults.withCredentials=true;
       axios.get(`http://localhost:${PORT}/tasks/profile`,{
        headers: {'Authorization':authState.token}
      })
       .then((result) => { 
         console.log('PROMPTED');
         const {userinfo,taskinfo}=result.data;
         console.log(userinfo, taskinfo);
         
         setUserInfo(userinfo[0]);
        // var tot=0;
        newInfo["TOTAL"]=taskinfo.length;
         taskinfo.map((item)=>{
          if(item.status){const key = item.status.toUpperCase();
            newInfo[key] += 1;
            // tot++;
            if(key === "SOLVED/DONE") newInfo["DONE"] += 1;  
          }
            /*switch(item.status){
              case "Done":{
                info[key] += 1;
              }
              case "Attempted":{
                info[] += 1;
                
              }
              case "Revisit":{
                
              }
              case "Pending":{
                
              }
            }*/
         });
         
         setInfo(newInfo);
        //  info["TOTAL"]=
         enqueueSnackbar('Welcome!', { variant: 'success' });
       })
       .catch((error) => {
        console.log("Failed loading data");
       enqueueSnackbar('Error fetching user data', { variant: 'error' });
       console.log(error.message);
       }); 
    }
  }
  auth();
    enqueueSnackbar("IF LOGIN DIALOG SHOWING, meeans YOU'RE LOGGED OUT", { variant: 'warning' });
    auth();
  },[])
  return (
    <section className="flex items-center justify-center h-screen max-w-screen gap-6 px-4 mx-auto lg:grid-cols-2 lg:gap-10 xl:gap-16">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">My Profile</h1>
          </div>
        </div>
        <Card>
          {/* <CardHeader className="p-4"> */}
            <div className="flex items-center space-x-10">
              <Avatar img={userInfo && (userInfo.IMAGE)?userInfo.IMAGE:conf.prof} />
              <div className="flex items-center justify-center gap-1.5 w-100">
                <h2 className="text-xl font-bold">{userInfo && userInfo.FULLNAME}</h2>
                {/* <Button size="sm" >Upload new avatar</Button> */}
              </div>
            </div>
          {/* </CardHeader> */}
          {/* <CardContent className="p-4"> */}
            <div className="grid gap-4">
              {/* <Avatar img={(pic)?pic:conf.prof} /> */}
              <div className="grid gap-1.5">
                <label htmlFor="username">Username</label>
                <div className="font-medium">{userInfo && userInfo.FULLNAME}</div>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="email">Email</label>
                <div className="font-medium">{userInfo && userInfo.EMAIL}</div>
              </div>
            </div>
          {/* </CardContent> */}
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          {/* <CardHeader className="p-4"> */}
            <h2 className="text-xl font-bold">Task Statistics</h2>
          {/* </CardHeader> */}
          {/* <CardContent className="p-4"> */}
            <div className="flex items-center space-x-4">
              <div className="grid gap-0.5">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total </div>
                <div className="text-2xl font-bold">{info.TOTAL}</div>
              </div>
              <div className="grid gap-0.5">
                <div className="text-sm text-gray-500 dark:text-gray-400">Completed </div>
                <div className="text-2xl font-bold">{info.DONE}</div>
              </div>
              <div className="h-8 border-r border-gray-200 dark:border-gray-800" />
              <div className="grid gap-0.5">
                <div className="text-sm text-gray-500 dark:text-gray-400">Pending </div>
                <div className="text-2xl font-bold">{info.PENDING}</div>
              </div>
              <div className="grid gap-0.5">
                <div className="text-sm text-gray-500 dark:text-gray-400">Attempted </div>
                <div className="text-2xl font-bold">{info.ATTEMPTED}</div>
              </div>
              <div className="grid gap-0.5">
                <div className="text-sm text-gray-500 dark:text-gray-400">Revisit </div>
                <div className="text-2xl font-bold">{info.REVISIT}</div>
              </div>
            </div>
          {/* </CardContent> */}
          <div>
          {
            authState.isAuthenticated ?
            <Button className="w-full m-2" gradientDuoTone="purpleToBlue" onClick={(e)=>{
              e.preventDefault();
              navigate('/tasks/all-tasks')
            }}>Go to Tasks</Button>
            : <Button className="w-full m-2" gradientDuoTone="purpleToBlue" onClick={(e)=>{
              e.preventDefault();
              navigate('/login');
            }}>Login to view All tasks</Button>
          }
          </div>
        </Card>
        <Card>
          {/* <CardHeader className="p-4"> */}
            <h2 className="text-xl font-bold">User Management</h2>
          {/* </CardHeader> */}
          {/* <CardContent className="p-4"> */}
          {/* <Link to="/login"> */}
          {
            authState.isAuthenticated ?
            <Button className="w-full m-2" gradientDuoTone="purpleToBlue" onClick={del}>Logout</Button>
            : <Button className="w-full m-2" gradientDuoTone="purpleToBlue" onClick={(e)=>{
              e.preventDefault();
              navigate('/login');
            }}>Login</Button>
          }
          {/* </Link> */}
            {/* <Button className="w-full m-2" gradientDuoTone="orangeToPink">Change Password</Button> */}
          {/* </CardContent> */}
        </Card>
      </div>
    </section>
  )
};

export default Profile;