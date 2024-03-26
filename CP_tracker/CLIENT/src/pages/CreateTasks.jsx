import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {PORT} from '../../config.js';

const CreateTasks = () => {
  const [taskName, setName] = useState('');
  const [taskURL, setURL] = useState('');
  // const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveTask = () => {
    const data = {
      taskName: taskName,
      taskURL: taskURL,
      // publishYear,
    };
    setLoading(true);
    axios
      .post(`http://localhost:${PORT}/tasks/add-task`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Task Created successfully', { variant: 'success' });
        navigate('/tasks/all-tasks');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Task</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Task Name</label>
          <input
            type='text'
            value={taskName}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Task URL</label>
          <input
            type='text'
            value={taskURL}
            onChange={(e) => setURL(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        {/* <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div> */}
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveTask}>
          ADD
        </button>
      </div>
    </div>
  );
}

export default CreateTasks