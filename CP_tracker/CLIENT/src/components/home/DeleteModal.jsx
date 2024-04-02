import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import axios from 'axios';
// import Spinner from '../components/Spinner.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PORT } from '../../../config.js';
import  {useAuth} from '../../structure/GlobalStateProvider.jsx'
export default function DeleteModal({ task,  uid, onClose}) {
  const [openModal, setOpenModal] = useState(false);
  const { authState, setAuthState } = useAuth();

  // const {id} = useParams(uid);
  // const task = useParams(task);
  // const onClose = useParams(onClose);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTask = async () => {
    setOpenModal(false);
    // setLoading(true);
    axios
      .delete(`http://localhost:${PORT}/tasks/delete-task/${task.uid}`, {
        headers: { Authorization: authState.token },
      })
      .then(() => {
        // setLoading(false);
        enqueueSnackbar("Task Deleted successfully", { variant: "success" });
        // navigate('/');
      })
      .catch((error) => {
        // setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error.message);
      });
  };
  return (
    <div className='fixed bg-black bg-opacity-60 top-10 left-0 right-0 bottom-0 z-50 flex justify-center items-center'>
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
        
        {/* <div className='pl-20 '><p >If facing error:</p>
          <Link to={{
              pathname: `/tasks/update-task/${task.uid}`,
              state: { task: task }}}
              className="text-xl text-blue-600">
              <AiOutlineEdit className='text-2xl text-blue-600' />
              Update Menu
          </Link>/
        </div> */}
        
        </div>
        <div className='flex justify-start items-center gap-x-2 mt-20'>
          <PiBookOpenTextLight className='text-blue-500 text-3xl' />
          <h2 className='my-1 text-2xl'>the Task Name: {task.taskName}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2 mt-10'>
          <BiUserCircle className='text-blue-500 text-3xl' />
          <h2 className='my-1 text-2xl'>Task URL: {task.taskURL}</h2>
        </div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text mt-10 text-2xl">Task Status: {task.status}</span>
          </div>
        </label>
        <button className='btn glass btn-error bg-red-400 mt-10' onClick={handleDeleteTask}>
          Delete
        </button>
        {/* <div className='my-2'>
        <p className='mt-4 '>saved note: </p>
        
        </div>
        <input
            type='text'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          /> */}
        
        
      </div>
      
    </div>
    </div>
  );
}
