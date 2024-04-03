import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import LTA from '../components/UI/LoadingTasksAnimation.jsx'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import { PORT } from '../../config.js'
import TaskTable from '../components/home/TaskTable'
import TaskModal from '../components/home/TaskModal'
import TaskCard from '../components/home/TaskCard.jsx'
import { BiSolidHome } from 'react-icons/bi'
import  {useAuth} from '../structure/GlobalStateProvider.jsx'

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('card');
    const { authState, setAuthState } = useAuth();
    useEffect(() => {
      setLoading(true);
      async function loadData(){
        axios
        .get(`http://localhost:${PORT}/tasks/all-tasks/`,{
          headers: {'Authorization':authState.token}
        })
        .then((response) => {
          console.log("FROM SERVER to CLIENT: "+ response);
          setTasks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      }
      loadData(); 
    }, [authState.token]);
  
    return (
      <div className='p-4 h-screen w-screen overflow-auto'>
        <div className='flex justify-center items-center gap-x-4'>
          <button
            className='btn glass btn-primary bg-blue-500'
            onClick={() => setShowType('table')}
          >
            Table
          </button>
          <button
            className='btn glass btn-success bg-cyan-400'
            onClick={() => setShowType('card')}
          >
            Card
          </button>
          
        </div>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>All Problems/Tasks</h1>
          <Link to={`/tasks/create-task`}>
            
            <button className="btn glass btn-primary bg-green-400"><MdOutlineAddBox className='text-sky-800 text-4xl' />Add task</button>
          </Link>
        </div>
        {loading ? (
          // <Spinner />
          <LTA/>
        ) : showType === 'table' ? (
          <TaskTable tasks={tasks} />
        ) : (
          <TaskCard tasks={tasks} />
        )}
      </div>
    );
  };
  
  export default Home;
  