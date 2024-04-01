import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import * as conf from "../../config.js";
// import Navbar from './Nav.jsx'
// import Footer from './Footer.jsx'
// import {Login, Signup, Home} from './App.jsx';
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

import { PORT } from "../../config";

const index = () => {
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const captionTextDark = 'text-gray-200';
  const captionText = 'text-gray-400'

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:${PORT}/`);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar/> */}
      <main className="flex-1">
        <section className="flex flex-col items-center justify-center py-12 text-center">
          <div className="container space-y-2 text-center grid gap-6 px-4 sm:gap-8 sm:px-6 lg:gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                Solve problems. Sharpen skills.
              </h1>
              <div className="flex items-center justify-center">
                <p className={`max-w-[700px] text-gray-500 mx-10 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark: ${captionTextDark}`}>
                  Practice coding problems, track your progress, and compete
                  with friends.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-5">
            <img
              alt="Main image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="450"
              src={conf.ind_intro}
              width="800"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="mockup-code m-10 text-left" >
              <p className="bg-gray-700 text-gray-500 max-md:hidden"># Expectation:</p>
              <pre data-prefix="$">
                <code>brain install problem-solving</code>
              </pre>
              <pre data-prefix=">" className="text-warning">
                <code>installing...</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>Done!</code>
              </pre>
            </div>

            <div className="mockup-code m-10 text-left max-md:hidden">
              <p className="bg-gray-700 text-gray-500"># Reality:</p>
              <pre data-prefix="$">
                <code>brain install problem-solving</code>
              </pre>
              <pre data-prefix=">" className="text-error">
                <code>Error: brain feeels tired, practice more</code>
              </pre>
              <pre data-prefix="$" className="text-warning">
                <code>sudo su</code>
              </pre>
              <pre data-prefix=">" className="text-blue-300">
                <code>for i in {"1..10000"}; do</code>
                <pre data-prefix=">" className="text-cyan-400">
                  <code>  practice_{"$i"}.sh</code>
                </pre>
                <pre data-prefix=">" className="text-blue-300">
                  <code>done</code>{" "}
                </pre>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>brain: problem-solving unlocked! installing..</code>
              </pre>
            </div>
          </div>

          <div className="mt-6 space-y-4 m-2">
            <Link
              // className="bg-white text- px-8 py-2 rounded-md border border-gray-200 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-300"
              className="m-8 mt-8"
              to="/signup"
            >
              <button className="btn glass btn-info w-[300px] mt-8 min-w-96 bg-blue-500 text-black">
                Create an Account
              </button>
            </Link>
            <Link
              // className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              className="m-8"
              to="/login"
            >
              <button className="btn glass w-[300px] mt-8 min-w-96 bg-cyan-300 text-black btn-success">
                Login & practice
              </button>
            </Link>
          </div>
        </section>
        <section className="bg-gray-700 py-12 lg:py-16 dark:bg-gray-800">
          <div className="container grid items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px]">
            {/* TODO: drop a picture Arik's team here */}
            <img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="340"
              src={conf.ind_CPKoro}
              width="600"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Practice coding problems
                </h2>
                <p className={`max-w-[500px] ${captionText} md:text-xl/relaxed xl:text-base/relaxed dark:${captionTextDark}`}>
                  "ABEH! CP karle, wasehi job market me waat lagi hein, aur
                  dusri tara AI bhi Aa gaya.. CP karega to aage badhne ka chance
                  milega"
                </p>
                <p className={`max-w-[400px] ${captionText} md:text-xl/relaxed xl:text-base/relaxed dark:${captionTextDark}`}>
                  - (probably) someone among these genius trio
                </p>
              </div>
              <Link
                // className="inline-flex h-10 items-center justify-center rounded-md borderfont-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                to="/tasks/all-tasks"
              >
                <button className="btn glass btn-success w-[400px] min-w-96">
                  Start Practicing
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 lg:py-16">
          <div className="container grid items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Organize your tasks
                </h2>
                <p className={`max-w-[500px] ${captionText} md:text-xl/relaxed xl:text-base/relaxed dark: ${captionTextDark} `}>
                  Our TODO list app helps you manage your tasks effectively. You
                  can create multiple lists, set deadlines, and track your
                  progress. Whether you're preparing for a contest or managing
                  your daily chores, we've got you covered.
                </p>
              </div>
              <Link
                // className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="tasks/all-tasks"
              >
                <button className="btn glass btn-error h-10 min-w-96 w-[400px]">
                  View Tasks
                </button>
              </Link>
            </div>
            <img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="340"
              src={conf.ind_TODO}
              width="600"
            />
          </div>
        </section>
        <section className="py-12 lg:py-16 bg-gray-700">
          <div className="container grid items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px]">
            <img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="340"
              src={conf.ind_friends}
              width="600"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Compete with friends
                </h2>
                <p className={`max-w-[500px] ${captionText} md:text-xl/relaxed xl:text-base/relaxed dark:${captionTextDark}`}>
                  Join contests, earn points, and climb the leaderboard. Our
                  platform allows you to create custom contests or participate
                  in community-driven events. Let the coding battles begin!
                </p>
              </div>
              <Link
                // className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="/tasks/leaderboard"
              >
                <button className="btn glass btn-info w-[400px]">
                  Join the Competition
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 lg:py-16">
          <div className="container grid items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px]">
            <img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="340"
              src={conf.ind_learn}
              width="600"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Learn and improve
                </h2>
                <p className={`max-w-[500px] ${captionText} md:text-xl/relaxed xl:text-base/relaxed dark:${captionTextDark}`}>
                  Access editorial solutions, practice problems with hints, and
                  learn from the best. Our platform provides valuable resources
                  to help you master data structures, algorithms, and
                  problem-solving techniques.
                </p>
              </div>
              <Link
                // className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="/tasks/leaderboard"
              >
                <button className="btn glass btn-primary w-400px min-w-96">
                  Explore Resources
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 lg:py-16 bg-gray-700">
          <div className="container grid items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Connect with the community
                </h2>
                <p className={`max-w-[500px] ${captionText} md:text-xl/relaxed xl:text-base/relaxed dark:${captionTextDark}`}>
                  Discuss problems, share tips, and make friends. Our platform
                  features a social hub where you can interact with other users,
                  form study groups, and participate in knowledge exchange.
                </p>
              </div>
              <Link
                // className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="tasks/leaderboard"
              >
                <button className="btn glass btn-accent w-[300px] min-w-96">
                  Join the Community
                </button>
              </Link>
            </div>
            <img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="340"
              src={conf.ind_comm}
              width="600"
            />
          </div>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <label className="ml-5">Next ICPC in: </label>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 15 }}></span>
              </span>
              days
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 10 }}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 24 }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 47 }}></span>
              </span>
              sec
            </div>
          </div>
        </section>
      </main>
      {/* <Footer/> */}
    </div>
  );
};

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

export default index;
