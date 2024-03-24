import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PORT } from '../../config.js';

const UpdateTask = () => {
  const [taskName, setName] = useState('');
  const [taskURL, setURL] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:${PORT}/tasks/update-task/${id}`)
    .then((response) => {
        setURL(response.data.taskURL)
        setStatus(response.data.status)
        setName(response.data.taskName)
        setNote(response.data.Note)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleUpdateTask = () => {
    const data = {
      taskName:taskName,
      taskURL:taskURL,
      status:status,
      note:note
    };
    setLoading(true);
    axios
      .put(`http://localhost:${PORT}/tasks/update-task/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Task Edited successfully', { variant: 'success' });
        navigate('/');
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
      <h1 className='text-3xl my-4'>Update Task</h1>
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
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Status</label>
          <input
            type='text'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Note</label>
          <input
            type='text'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleUpdateTask}>
          Save
        </button>
      </div>
    </div>
  )
}

export default UpdateTask