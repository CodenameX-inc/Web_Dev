import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
// import {Login, Signup, Home} from './App.jsx';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';

import { PORT } from "../../config";

const index = () => {
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:${PORT}/`);
    }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 shadow-lg">
        <div className="container flex items-center justify-between h-14 px-4 sm:px-6">
          <Link className="flex items-center space-x-2 text-gray-50" href="#">
            <TerminalIcon className="h-6 w-6" />
            <span className="font-semibold">sharpen</span>
          </Link>
          <nav className="hidden space-x-4 lg:flex">
            <Link
              className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100"
              href="#"
            >
              Practice
            </Link>
            <Link
              className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100"
              to="/tasks/all-tasks"
            >
              Tasks
            </Link>
            <Link
              className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100"
              to="/tasks/leaderboard"
            >
              Leaderboard
            </Link>
            <Link
              className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100"
              href="#"
            >
              Help
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100"
              to="/login"
            >
              <UserIcon className="h-4 w-4 mr-1.5" />
              Login
            </Link>
            <Link
              className="flex items-center text-sm font-medium transition-colors text-gray-50 hover:text-gray-100"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
          <button className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </header>
      <main className="flex-1">
        <section className="flex flex-col items-center justify-center py-12 text-center">
          <div className="container space-y-2 text-center grid gap-6 px-4 sm:gap-8 sm:px-6 lg:gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                Solve problems. Sharpen skills.
              </h1>
              <div className="flex items-center justify-center">
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-500">
                Practice coding problems, track your progress, and compete with
                friends.
              </p>
              </div>
              
            </div>
            <div className="flex items-center justify-center">
            <img
              alt="Main image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="450"
              src="https://mist.ac.bd/storage/photos/cse/Front%20Page%20Pics/labs.jpg"
              width="800"
            />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Link
              className="bg-white text- px-8 py-2 rounded-md border border-gray-200 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-300"
              to="/signup"
            >
              Create an Account
            </Link>
            <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="/signup"
            >
              Tour the Platform
            </Link>
          </div>
        </section>
        <section className="bg-gray-100 py-12 lg:py-16 dark:bg-gray-800">
          <div className="container grid items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px]">
            <img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="340"
              src="https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/337850788_2159336244267141_5703344120419083987_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7hYmrWbGTssAX9TL6Og&_nc_ht=scontent.fdac138-2.fna&oh=00_AfDv_NT1XiPeOaG0aJxGmHMA4ws-yHBYOv8k-zfSzGuuCg&oe=660598EE"
              width="600"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Practice coding problems
                </h2>
                <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed xl:text-base/relaxed dark:text-gray-400">
                  "ABEH! CP karle, wasehi job market me waat lagi hein, aur dusri tara AI bhi Aa gaya.. CP karega to aage badhne ka chance milega"
                </p>
                <p className="max-w-[400px] text-gray-500 md:text-xl/relaxed xl:text-base/relaxed dark:text-gray-400">
                    - (probably) someone among these genius trio
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="/tasks/all-tasks"
              >
                Start Practicing
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
                <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed xl:text-base/relaxed dark:text-gray-400">
                  Our TODO list app helps you manage your tasks effectively. You
                  can create multiple lists, set deadlines, and track your
                  progress. Whether you're preparing for a contest or managing
                  your daily chores, we've got you covered.
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="tasks/all-tasks"
              >
                View Tasks
              </Link>
            </div>
            <img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="340"
              src="https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/431625717_762554969303544_3371984695160884386_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-loa8ZjZpjIAX9_Syv-&_nc_ht=scontent.fdac138-1.fna&oh=00_AfA0Ookyzi0t6SvOBDRp3uUBGftkQX8gxN3xLKNdRcn4tA&oe=6605EAC2"
              width="600"
            />
          </div>
        </section>
        <section className="py-12 lg:py-16">
          <div className="container grid items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px]">
            <img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="340"
              src="https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/355108226_617141880511521_1397543077072907474_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LmnIilROJ2kAX-PcOG2&_nc_ht=scontent.fdac138-2.fna&oh=00_AfDMGIR72DhbS1FUZzEH619B2y9Muv5_IJ9hsgAavrKHTw&oe=6605B23C"
              width="600"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Compete with friends
                </h2>
                <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed xl:text-base/relaxed dark:text-gray-400">
                  Join contests, earn points, and climb the leaderboard. Our
                  platform allows you to create custom contests or participate
                  in community-driven events. Let the coding battles begin!
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="/tasks/leaderboard"
              >
                Join the Competition
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
              src="https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/415039858_723123913246650_7338065053124469650_n.jpg?stp=dst-jpg_p843x403&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=NkKBZCCXNqQAX8kLuRR&_nc_ht=scontent.fdac138-1.fna&oh=00_AfDNY-RYcI-Q6ggGk-OpcXCclsms2w0-SO1q4YUA953eGA&oe=6606A5B1"
              width="600"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Learn and improve
                </h2>
                <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed xl:text-base/relaxed dark:text-gray-400">
                  Access editorial solutions, practice problems with hints, and
                  learn from the best. Our platform provides valuable resources
                  to help you master data structures, algorithms, and
                  problem-solving techniques.
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 lg:py-16">
          <div className="container grid items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Connect with the community
                </h2>
                <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed xl:text-base/relaxed dark:text-gray-400">
                  Discuss problems, share tips, and make friends. Our platform
                  features a social hub where you can interact with other users,
                  form study groups, and participate in knowledge exchange.
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Join the Community
              </Link>
            </div>
            <img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="340"
              src="https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/400358246_694299476129094_5764177843900813093_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MgyG92Iyj3IAX8O0r70&_nc_ht=scontent.fdac138-1.fna&oh=00_AfDYKtXOr6cE44TIrXylNTX_XOdO6TpWtmoJx3j9AqfQDg&oe=66068756"
              width="600"
            />
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50 dark:bg-gray-950 border-gray-200/40 dark:border-gray-800/40">
        <div className="container grid md:grid-cols-3 items-center gap-4 px-4 py-4 text-sm sm:gap-6 sm:px-6 lg:gap-8 lg:px-8">
          <Link
            className="flex items-center space-x-2 text-gray-900 font-semibold"
            href="#"
          >
            <TerminalIcon className="h-4 w-4" />
            <span>sharpen</span>
          </Link>
          <nav className="flex items-center justify-center space-x-4 text-gray-500 md:justify-end md:text-right lg:order-3 lg:space-x-2 lg:text-gray-400">
            <Link className="font-medium underline" href="mailto:iftekharulislam1594@gmail.com">
              Contact
            </Link>
            <Link className="font-medium underline" href="#">
              Terms
            </Link>
            <Link className="font-medium underline" href="#">
              Privacy
            </Link>
          </nav>
          <p className="flex items-center justify-center text-center text-gray-500 md:order-3 lg:order-2 lg:text-gray-400">
            © 2024 Codename-X Inc. All rights reserved.
          </p>
        </div>
      </footer>
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
