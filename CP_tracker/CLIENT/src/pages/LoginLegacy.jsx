import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import * as conf from "../../config.js";
// import {Login, Signup, Home} from './App.jsx';
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

import { PORT } from "../../config.js";
const LoginPage = () => {
  return (
    <div className="flex h-screen bg-[#6c63ff]">
      <div className="m-auto bg-white rounded-lg shadow-lg w-[750px]">
        <div className="flex">
          <div className="w-1/2 p-8 bg-[#3f3d56] text-white rounded-l-lg">
            <div className="flex items-center mb-6">
              <FlagIcon className="h-8 w-8" />
              <span className="ml-2 text-lg font-semibold">TOP HTML</span>
            </div>
            <p className="mb-6">Login using social media to get quick access</p>
            <button className="mb-4 bg-[#3b5998] text-white w-full">facebook</button>
            <button className="mb-4 bg-[#1da1f2] text-white w-full">twitter</button>
            <button className="bg-[#db4437] text-white w-full"> google</button>
          </div>
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-2">Login to your account</h2>
            <p className="mb-8 text-sm">
              Don't have an account?
              <Link className="text-[#6c63ff]" href="#">
                Sign Up Free!
              </Link>
            </p>
            <form>
              <div className="mb-4">
                <input placeholder="Email address" type="email" />
              </div>
              <div className="mb-4">
                <input placeholder="Password" type="password" />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input type="checkbox" class="appearance-none checked:bg-blue-500 ..." />
                  <label className="ml-2 text-sm" htmlFor="remember-me">
                    Remember me
                  </label>
                </div>
                <Link className="text-sm" href="#">
                  Forgot password?
                </Link>
              </div>
              <button className=" btn glass bg-[#6c63ff] ">Login with email</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function FlagIcon(props) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}

export default LoginPage;