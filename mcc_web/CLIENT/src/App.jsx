import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateTasks from './pages/CreateTasks'
import ShowTask from './pages/ShowTask'
import DeleteTask from './pages/DeleteTask'
import UpdateTask from './pages/UpdateTask'


const App = () => {
  return (
    <Routes>
      <Route path='/tasks/all-tasks' element={<Home/>}/>
      <Route path='/tasks/create-task' element={<CreateTasks/>}/>
      <Route path='/tasks/:id' element={<ShowTask/>}/>
      <Route path='/tasks/update-task/:id' element={<UpdateTask/>}/>
      <Route path='/tasks/delete-task/:id' element={<DeleteTask/>}/>
    </Routes>
  )
}

export default App