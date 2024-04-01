import React, { useState, useEffect } from "react";

import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
// import Footer from './Footer.jsx'
// import {Login, Signup, Home} from './App.jsx';

import { PORT } from "../../config";

const navigation = [
  { name: "Profile", href: "/profile", current: true },
  { name: "Tasks", href: "/tasks/all-tasks", current: false },
  { name: "Leaderboard", href: "/leaderboard", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Last() {
  return (
    <footer className="border-t bg-slate-600 dark:bg-gray-950 border-gray-200/40 dark:border-gray-800/40">
        <div className="container grid md:grid-cols-3 items-center gap-4 px-4 py-4 text-sm sm:gap-6 sm:px-6 lg:gap-8 lg:px-8">
          <Link
            className="flex items-center space-x-2 text-gray-900 font-semibold"
            href="#"
          >
            <TerminalIcon className="h-4 w-4" />
            <span>sharpen</span>
          </Link>
          <nav className="flex items-center justify-center space-x-4 text-gray-500 md:justify-end md:text-right lg:order-3 lg:space-x-2 lg:text-gray-400">
            <Link
              className="font-medium underline"
              href="mailto:iftekharulislam1594@gmail.com"
            >
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