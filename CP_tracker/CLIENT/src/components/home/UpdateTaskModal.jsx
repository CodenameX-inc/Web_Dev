import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import axios from 'axios';
// import Spinner from '../components/Spinner.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PORT } from '../../../config.js';


const UpdateTaskModal = ({ task, onClose, uid }) => {

  const [taskName, setName] = useState('');
  const [taskURL, setURL] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams(uid);
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateTask = () => {
    const data = {
      taskName: taskName,
      taskURL: taskURL,
      status: status,
      note: note
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
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
      // style={{ maxHeight: '60vh' }} // Limiting the height to 80% of the viewport height
    >
      <div
        onClick={(event) => event.stopPropagation()}
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
        <div className='pl-20 '><p >If facing error:</p>
        <Link to={`/tasks/update-task/${id}`}>
        <button className='btn glass btn-accent bg-green-200 ml-auto'>
          Enter Update menu
        </button>
        </Link>
        </div>
        
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
          <option disabled selected>Set Status</option>
          <option value='Pending'>Pending</option>
          <option value='Attempted'>Attempted</option>
          <option value='Solved/Done'>Solved/Done</option>
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
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        
        
      </div>
    </div>
    </div>
  );
};

export default UpdateTaskModal;
