import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PORT } from '../../config.js';
import  {useAuth} from '../structure/GlobalStateProvider.jsx'


const UpdateTask = ({task}) => {
  const {id} = task.uid;
  var [taskName, setName] = useState('');
  var [taskURL, setURL] = useState('');
  var [status, setStatus] = useState('');
  var [note, setNote] = useState('');
  var [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { authState, setAuthState } = useAuth();

  useEffect(() => {
    setLoading(true);
    
    axios.get(`http://localhost:${PORT}/tasks/get-task/${id}`,{
      headers: {'Authorization':authState.token}
    })
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
      uid:task.uid,
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
      <h1 className='text-3xl my-4'>Update Task</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Task Name</label>
          <input
            type='text'
            placeholder={task.taskName}
            value={taskName}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Task URL</label>
          <input
            type='text'
            placeholder={task.taskURL}
            value={taskURL}
            onChange={(e) => setURL(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Set Status</span>
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder={task.status}
            className='select select-info w-full max-w-xs '
          >
          <option disabled defaultValue>Set Status</option>
          <option value='Pending'>Pending</option>
          <option value='Attempted'>Attempted</option>
          <option value='Done'>Solved/Done</option>
          <option value='Revisit'>Revisit</option>
          </select>
        </label>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Note</label>
          <input
            type='text'
            placeholder={task.note}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className='border-8 border-gray-500 px-4 py-2  w-full '
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