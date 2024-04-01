
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import React, { useState } from 'react';
import TaskModal from './TaskModal';
import getStatusColor from '../UI/CustomStatusColor';
import UpdateTaskModal from './UpdateTaskModal';

const TaskSingleCard = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div className='container border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h2 className={`absolute top-1 right-2 px-4 py-1 rounded-lg ${getStatusColor(task.status)}`}>
        {task.status}
      </h2>
      <h4 className='my-2 text-gray-500'>{task.uid}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{task.taskName}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1 truncate'>{task.taskURL}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/tasks/${task.uid}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        {/* <Link to={`/tasks/update-task/${task.uid}`}> */}
        <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black'
          onClick={()=> setShowUpdateModal(true, task.uid)}  
        />
        {/* </Link> */}
        <Link to={`/tasks/delete-task/${task}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <TaskModal task={task} onClose={() => setShowModal(false)} />
      )}
      {showUpdateModal && (
        <UpdateTaskModal 
        task={task} 
        uid={task.uid}
        onClose={() => setShowUpdateModal(false)} 
        />
      )}
    </div>
  );
};

export default TaskSingleCard;
