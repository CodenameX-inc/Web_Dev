import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import { PORT } from '../../config.js'
import TaskTable from '../components/home/TaskTable'
import TaskModal from '../components/home/TaskModal'
import TaskCard from '../components/home/TaskCard.jsx'


const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('card');
    useEffect(() => {
      setLoading(true);
      axios
        .get(`http://localhost:${PORT}/tasks/all-tasks`)
        .then((response) => {
          console.log("FROM SERVER to CLIENT: "+ response);
          setTasks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);
  
    return (
      <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('table')}
          >
            Table
          </button>
          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('card')}
          >
            Card
          </button>
        </div>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Add Problems/Tasks</h1>
          <Link to='/tasks/update-task/:tasks.uid'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <TaskTable tasks={tasks} />
        ) : (
          <TaskCard tasks={tasks} />
        )}
      </div>
    );
  };
  
  export default Home;
  