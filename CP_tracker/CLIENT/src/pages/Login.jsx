import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { GoogleLogin } from '@react-oauth/google';

import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import * as conf from "../../config.js";
import { SocialIcon } from "react-social-icons";
import { PORT } from "../../config";
import { useAuth } from "../structure/GlobalStateProvider.jsx";

// import {store} from '../Redux/store.js';
// import { getUser } from "../Redux/users/user.actions.js";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "../Redux/users/user.actions.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { authState, setAuthState } = useAuth();
  const [loading, setLoading] = useState(false);

  // const dispatch = useDispatch()
  // const {auth, token, loading, err} = useSelector((state)=>{
  //   state.userReducer
  // })
  const SubmitLoginForm = async (e) => {
    e.preventDefault();
    // dispatch(getUser({email,pass}))
    //  Old verification method
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .post(`http://localhost:${PORT}/login`, {
        email: email,
        password: pass,
      })
      .then((result) => {
        setLoading(false);
        console.log("PROMPTED");
        const { msg, token, status, usr } = result.data;
        console.log("Token (Login): ", token);
        setAuthState({
          token: token,
          isAuthenticated: status === 1 ? true : false,
          user: usr,
        });
        // Navigate
        // console.log(result,result.user);
        // window.location.href = `/profile/${result.data.userid}`;
        enqueueSnackbar("Logged in", { variant: "success" });
        enqueueSnackbar("DON'T REFRESH, ELSE LOGIN DATA WILL BE LOST cause tokens arent stored in localStorage", { variant: "info", autoHideDuration:15000});
        enqueueSnackbar("Done purposefully to ensure OWASP Security Standards (see about CSRF & XSS ATTACKS", { variant: "info", autoHideDuration:15000 });
        enqueueSnackbar("We'll be storing the Auth token using httpOnly cookies during Deployment to store Login data", { variant: "success", autoHideDuration:15000  });
        // enqueueSnackbar("Salam --- ift", { variant: "default" });
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error logging in", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="flex min-h-screen items-center bg-gray-700 p-6 lg:justify-center">
      {loading? <Spinner/> : ''}
      <div className="max flex flex-col overflow-hidden rounded-md bg-slate-500 shadow-lg md:flex-1 md:flex-row lg:max-w-screen-md">
        <div className="bg-blue-600 p-4 py-6 text-white md:flex md:w-80 md:flex-shrink-0 md:flex-col md:items-center md:justify-evenly">
          <div className="my-4 text-center text-4xl font-bold tracking-wider">
            <a href="#">CP upsolve tracker</a>
          </div>
          <p className="mt-6 text-center font-normal text-gray-300 md:mt-0">
            Solve, upsolve & revisit exciting CP problems and keep track of them
          </p>
          <p className="mt-10 flex flex-col items-center justify-center text-center">
            <span>Don't have an account?</span>
            <Link to="/signup">
              <Button className="btn glass bg-slate-200 text-blue-700 hover:text-slate-100">Create an Account</Button>
              </Link>
          </p>
          <p className="mt-6 text-center text-sm text-gray-300">
            Read our{" "}
            <a href="#" className="underline">
              terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              conditions
            </a>
          </p>
        </div>
        <div className="bg-white p-5 md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form action="#" className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">
                Email address
              </label>
              <input
                type="email"
                id="email"
                autofocus
                className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                className="rounded border border-gray-300 px-4 py-2 transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                    
              />
            </div>
            {/* <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
              />
              <label htmlFor="remember" className="text-sm font-semibold text-gray-500">
                Remember me
              </label>
            </div> */}
            <div>
              <Button
                type="submit" className="w-fit px-10 py-2 btn glass bg-blue-700 hover:bg-blue-300"
                onClick={(e)=>SubmitLoginForm(e)}
              >
                Log in
              </Button>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px w-14 bg-gray-400"></span>
                <span className="font-normal text-gray-500"></span>
                <span className="h-px w-14 bg-gray-400"></span>
              </span>
              <div className="flex flex-col space-y-4">
                {/* Github */}
                {/* <a
                  href="#"
                  className="group flex items-center justify-center space-x-2 rounded-md border border-gray-800 px-4 py-2 transition-colors duration-300 hover:bg-gray-800 focus:outline-none"
                >
                  <span>
                    <svg
                      className="h-5 w-5 fill-current text-gray-800 group-hover:text-white"
                      viewBox="0 0 16 16"
                      version="1.1"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                    Github
                  </span>
                </a> */}
                {/* <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    // setAuthState({

                    // })
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />; */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
