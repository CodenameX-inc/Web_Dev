import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import axios from "axios";
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import * as conf from "../../config.js";
import { SocialIcon } from 'react-social-icons';
// import {Login, Signup, Home} from './App.jsx';
import { BiSolidHome } from 'react-icons/bi'
// import navbar from './navbar.jsx'

import { PORT } from "../../config";

const Signup = () => {
    const [usr, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    // var [confirmpass, setCPass] = useState('');
    // const [passwordsMatch, setPasswordsMatch] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    const SubmitLoginForm = (e)=>{
      // setLoading(true);
        // if(pass===confirmpass)
        // {
          // setPasswordsMatch(true);
          e.preventDefault();
        axios.post(`http://localhost:${PORT}/signup`,{
          username:usr,
          email:email,  
          password:pass
        })
        .then(() => {
          // alert('Signup successful');
          console.log('PROMPTED');
        enqueueSnackbar('User Registered successfully', { variant: 'success' });
        enqueueSnackbar('Now Login to Continue', { variant: 'info' });
        window.location.href('/login');
        })
        .catch((error) => {
          // alert('Signup failed: ' + error.message);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error Registering user', { variant: 'error' });
        console.log(error);
        });
          // }?
        
        // else{
          // setPasswordsMatch(false);
        // }
      }
    //   // useEffect(() => {
    //     if (pass === confirmpass) {
    //         setPasswordsMatch(true);
    //     } else {
    //         setPasswordsMatch(false);
    //     }
    // }, [pass, confirmpass]);
  return (
    <div className="flex items-center justify-center">
      <div id="card" className="flex items-center justify-center py-2 md:py-5 lg:py-0 lg:m-8">
        <Card className="w-full max-w-sm overflow-hidden mt-20 bg-slate-700">
          <div className="flex flex-col items-center justify-center h-[200px]">
            <img
              alt="Image"
              className="object-cover"
              height="200"
              src= {conf.loginImage}
              style={{
                aspectRatio: "400/200",
                objectFit: "cover",
              }}
              width="400"
            />
          </div>
          <label>LOGIN USING :</label>
          <div className="flex items-center justify-center p-6">
            <div className='flex justify-center items-center m-2'>
                <Button outline gradientDuoTone="purpleToBlue">
                <SocialIcon url='google.com' />
                <p>Google</p>
                </Button>
            </div>
            <div className='flex justify-center items-center m-2'>
                <Button outline gradientDuoTone="pinkToOrange">
                <SocialIcon url='github.com' />
                <p>GitHub</p>
                </Button>
            </div>
        </div>
        </Card>
      </div>
      <div id="login-form" className="flex items-center justify-center py-8 lg:m-8 md:py-20 lg:py-0">
      <Card className="w-[500px] max-w-sm overflow-hidden mt-20 bg-slate-700">
        <div className="mx-auto max-w-sm space-y-6 h-fit">
          <form onSubmit={(e)=>SubmitLoginForm(e)}>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold px-8 m-4">Signup using Email</h1>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  required
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={usr}
                  onChange={(e) => setUser(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="email"
                
                  placeholder="youremail@abc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  required
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="w-fit px-10 py-2 btn glass bg-green-300 btn-success"
                  onClick={(e)=>SubmitLoginForm(e)}
                >
                  Signup
                </button>
              </div>
              <Link className="w-full inline-block text-sm underline" to="/login">
                Login instead
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
    </div>
  );
  
}


function ChromeIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}


function GithubIcon(props) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export default Signup;