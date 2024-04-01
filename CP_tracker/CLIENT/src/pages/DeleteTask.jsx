import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {PORT} from '../../config.js';
import  {useAuth} from '../structure/GlobalStateProvider.jsx'


const DeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { task } = useParams();
  // var [task, setData]=useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { authState, setAuthState } = useAuth();


  // const getTask = async () => {
  // axios
  // .get(`http://localhost:${PORT}/tasks/get-task/${id}`)
  // .then((res) => {
  //   console.log("FROM SERVER to CLIENT: "+ res.data.taskName);
  //   setData({
  //     taskName: res.data.taskName,
  //     taskURL: res.data.taskURL,
  //     status: res.data.status,
  //     Note: res.data.note
  //   });
  //   setLoading(false);
  // })
  // .catch((error) => {
  //   console.log("Error fetching task"+error.message);
  //   setLoading(false);
  // });
  // }
  const handleDeleteTask = async () => {
    setLoading(true);
    axios
      .delete(`http://localhost:${PORT}/tasks/delete-task/${task.uid}`,{
        headers: {'Authorization':authState.token}
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Task Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error.message);
      });
  };


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Task</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this task with id {task.uid}?</h3>
        <p className='text-2xl'>{task.taskName}</p>
        <p className='text-2xl'>{task.taskURL}</p>
        <p className='text-2xl'>{task.status}</p>
        <p className='text-2xl'>{task.Note}</p>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteTask}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteTask;
