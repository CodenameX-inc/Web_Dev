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
  const [taskName, setName] = useState('');
  const [taskURL, setURL] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [legacyTask, setTaskL] = useState({
    'taskURL': '',
    'taskName': '',
    'note': '',
    'status': ''
  });
  const [loading, setLoading] = useState(false);
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
        setNote(response.data.note)
        setLoading(false);
        setTaskL({
          'taskURL': response.data.taskURL,
          'taskName': response.data.taskName,
          'note': response.data.note,
          'status': response.data.status
        })
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  
  const handleUpdateTask = () => {
    console.log(taskURL?taskURL: legacyTask.taskURL);
    const data = {
      uid:id,
      taskName:(taskName==='')?legacyTask.taskName:taskName,
      taskURL:(taskURL==='')?legacyTask.taskURL:taskURL,
      status:(status==='')? legacyTask.status:status,
      note:(note==='')?legacyTask.note:note
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
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'>
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-9/12 h-4/5'
      onClick={()=>{navigate('/tasks/all-tasks')}}
      // style={{ maxHeight: '60vh' }} // Limiting the height to 80% of the viewport height
    >
      <div
        onClick={() => {navigate('/tasks/all-tasks')}}
        className='w-[600px] max-w-full h-[500px] bg-white rounded-xl p-2 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <div className='flex items-center justify-start'>
        <button className='btn glass btn-primary bg-blue-400' onClick={handleUpdateTask}>
          Save
        </button>
        {/* <div className='pl-20 '><p >If facing error:</p>
          <Link to={{
              pathname: `/tasks/update-task/${task.uid}`,
              state: { task: task }}}
              className="text-xl text-blue-600">
              <AiOutlineEdit className='text-2xl text-blue-600' />
              Update Menu
          </Link>
        </div> */}
        
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-blue-500 text-2xl' />
          <h2 className='my-1'>Update Task Name</h2>
          <p className='ml-auto'>from: {task.taskName}</p>
        </div>
        <input
            type='text'
            value={taskName}
            placeholder={taskName}
            onChange={(e) => setName(e.target.value)}
            className='border-2 rounded-lg border-gray-500 px-4 py-2 w-full'
          />
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-blue-500 text-2xl' />
          <h2 className='my-1'>Update Task URL</h2>
          <p className='ml-auto'>from: {task.taskURL}</p>
        </div>
        <input
            type='text'
            value={taskURL}
            placeholder={taskURL}
            onChange={(e) => setURL(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Set Status</span>

            {/* <span className="label-text-alt">from: {status}</span> */}
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='select select-info w-full max-w-xs '
          >
          <option disabled defaultValue>Set Status</option>
          <option value='Pending'>Pending</option>
          <option value='Attempted'>Attempted</option>
          <option value='Done'>Solved/Done</option>
          <option value='Revisit'>Revisit</option>
          </select>
        </label>
        <div className='my-2'>
        <p className='mt-4 '>Update notes</p>
          
        </div>
        <input
            type='text'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full h-modal'
          />
      </div>
    </div>
    </div>

  )
}

export default UpdateTask