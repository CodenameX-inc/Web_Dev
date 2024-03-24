import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home.jsx'
import CreateTasks from './CreateTasks.jsx'
import ShowTask from './ShowTask.jsx'
import DeleteTask from './DeleteTask.jsx'
import UpdateTask from './UpdateTask.jsx'


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