import { Leaderboard } from "../pages/leaderboard.jsx"
import { Profile } from "../pages/Profile.jsx"
import { Home } from "../pages/Home.jsx"
import { Index } from "../pages/index"
import { Login } from "../pages/Login.jsx"
// import { Private } from "../pages/Private"

export const nav = [
     { path: "/",                  name: "index",        element: <Index />,        isMenu: true,     isPrivate: false  },
     { path: "/leaderboard",       name: "Leaderboard",  element: <Leaderboard />,  isMenu: true,     isPrivate: false  },
     { path: "/login",             name: "Login",        element: <Login />,        isMenu: false,    isPrivate: false  },
     { path: "/tasks/all-tasks",   name: "Tasks",        element: <Home />,         isMenu: true,     isPrivate: true  },
     { path: "/profile",           name: "Profile",      element: <Profile />,      isMenu: true,     isPrivate: true  },
]