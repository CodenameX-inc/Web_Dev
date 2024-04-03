import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {PORT} from '../../config.js';
import  {useAuth} from '../structure/GlobalStateProvider.jsx'

// import Navbar from './navbar.jsx'

const CreateTasks = () => {
  const [taskName, setName] = useState('');
  const [taskURL, setURL] = useState('');
  const [note, setNote] = useState('');
  // const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { authState, setAuthState } = useAuth();
  
  const isValidUrl = urlString=> {
    try { 
      return Boolean(new URL(urlString)); 
    }
    catch(e){ 
      return false; 
    }
}

function addProtocol() {
  // Check if the URL starts with "http://" or "https://"
  if (!taskURL.startsWith("http://") && !taskURL.startsWith("https://")) {
    // If not, add "https://" to the beginning of the URL
    setURL("https://" + taskURL);
  }
  // return url;
}
  const handleSaveTask = async () => {
    if(!authState.isAuthenticated) {
      enqueueSnackbar("Login first", { variant: "error" });
      navigate('/login')
      return;
    }      
    enqueueSnackbar("Inserting data", { variant: "default" });
    setLoading(true);
    addProtocol();
    // if(!isValidUrl(taskURL)){
    //   enqueueSnackbar("INVALID URL (enter valid one)", { variant: "error" });
    // }
    const data = {
      taskName: taskName,
      taskURL: taskURL,
      note: note,
      status: status
      // publishYear,
    };
    console.log("from client: task to be inserted: ", data)
    axios
      .post(`http://localhost:${PORT}/tasks/add-task`, data,{
        headers: {'Authorization':authState.token}
      })
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
      {/* <BackButton /> */}
      {/* <Navbar/> */}
      <main>
      <h1 className='text-3xl my-4'>Create Task</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>Task Name</label>
          <input
            type='text'
            value={taskName}
            placeholder={taskName}
            onChange={(e) => setName(e.target.value)}
            className='grow border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label htmlFor='url' className='text-xl mr-4 text-gray-500'>Task URL</label>
          <input
            type='url'
            value={taskURL}
            placeholder={taskURL}
            onChange={(e) => setURL(e.target.value)}
            className='grow border-2 border-gray-500 px-4 py-2  w-full '
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
        <div className='my-4'>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Set Status</span>
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder={status}
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
        <button className='btn glass' onClick={handleSaveTask}>
          ADD
        </button>
      </div>
      </main>
    </div>
  );
}

export default CreateTasks