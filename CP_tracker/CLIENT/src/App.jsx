import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateTasks from './pages/CreateTasks.jsx'
import ShowTask from './pages/ShowTask.jsx'
import DeleteTask from './pages/DeleteTask.jsx'
import UpdateTask from './pages/UpdateTask.jsx'


const App = () => {
  return (
    <Routes>
      <Route path='/tasks/all-tasks' element={<Home/>}/>
      <Route path='/tasks/create-task' element={<CreateTasks/>}/>
      <Route path='/tasks/get-task/:id' element={<ShowTask/>}/>
      <Route path='/tasks/update-task/:id' element={<UpdateTask/>}/>
      <Route path='/tasks/delete-task/:id' element={<DeleteTask/>}/>
    </Routes>
  )
}

export default App