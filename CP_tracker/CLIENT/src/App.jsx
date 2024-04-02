import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateTasks from './pages/CreateTasks.jsx'
import ShowTask from './pages/ShowTask.jsx'
import DeleteTask from './pages/DeleteTask.jsx'
import UpdateTask from './pages/UpdateTask.jsx'
import Index from './pages/index.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Leaderboard from './pages/leaderboard.jsx'
import ProtectedRoutes from './pages/ProtectedRoutes.jsx'
import Profile from './pages/Profile.jsx'
import Practice from './pages/Practice.jsx'
import Resources from './pages/Resources.jsx'
const App = () => {
  return (
    // <ProtectedRoutes>
      <Routes>
        <Route ind element={<Index/>}/>
        <Route path='/' element={<Index/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        {/* <Route element={<ProtectedRoutes/>}> */}
          <Route path='/tasks/profile' element={<Profile/>}/>
          <Route path='/tasks/leaderboard' element={<Leaderboard/>}/>
          <Route path='/tasks/all-tasks' element={<Home/>}/>
          <Route path='/tasks/create-task' element={<CreateTasks/>}/>
          <Route path='/tasks/get-task/:id' element={<ShowTask/>}/>
          <Route path='/tasks/update-task/:id' element={<UpdateTask/>}/>
          <Route path='/tasks/delete-task/:task' element={<DeleteTask/>}/>
          <Route path='/tasks/practice' element={<Practice/>}/>
          <Route path='/tasks/resources' element={<Resources/>}/>
        {/* </Route> */}
        
      </Routes>
  )
}

export default App