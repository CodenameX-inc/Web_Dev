import React, {useState} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import axios from 'axios';
// import Spinner from '../components/Spinner.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PORT } from '../../../config.js';


const UpdateTaskModal = ({ task, onClose }) => {

  const [taskName, setName] = useState('');
  const [taskURL, setURL] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

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
    <div className='fixed bg-black bg-opacity-60 top-30 left-0 right-0 bottom-0 z-50 flex justify-center items-center'>
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
      // style={{ maxHeight: '60vh' }} // Limiting the height to 80% of the viewport height
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <button className='w-fit px-2 py-1 rounded-lg p-2 bg-green-300 m-2 text-black size-60' onClick={handleUpdateTask}>
          Save
        </button>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-blue-500 text-2xl' />
          <h2 className='my-1'>Update Task Name</h2>
          <p className='ml-auto'>from: {task.taskName}</p>
        </div>
        <input
            type='text'
            value={taskName}
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
            onChange={(e) => setURL(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        <div className='flex justify-start items-center my-4'>
          <h2 className='text-xl mr-4 text-gray-500'>Status</h2>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          >
          <option value='Pending'>Pending</option>
          <option value='Attempted'>Attempted</option>
          <option value='Solved/Done'>Solved/Done</option>
          <option value='Revisit'>Revisit</option>
          </select>
        </div>
        <div className='my-2'>
        <p className='mt-4'>Update notes</p>
          
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
