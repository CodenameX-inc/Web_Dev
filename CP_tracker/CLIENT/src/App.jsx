import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import ShowTask from './pages/ShowTask'
import DeleteTask from './pages/DeleteTask'
import UpdateTask from './pages/UpdateTask'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tasks/create' element={<CreateTask/>}/>
      <Route path='/tasks/show' element={<ShowTask/>}/>
      <Route path='/tasks/edit/:id' element={<UpdateTask/>}/>
      <Route path='/tasks/edit/:id' element={<DeleteTask/>}/>
    </Routes>
  )
}

export default App