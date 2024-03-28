import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import getStatusColor from '../UI/CustomStatusColor';

const TaskModal = ({ task, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center px-4'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative px-4'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className={`w-fit px-4 py-1 ${getStatusColor(task.status)} rounded-lg`}>
          {task.status}
        </h2>
        <h4 className='my-2 text-gray-500'>{task.uid}</h4>
        <div className={'flex justify-start items-center  gap-x-2'}>
          <PiBookOpenTextLight className='text-blue-400 text-2xl'/>
          <h2 className='my-1'>{task.taskName}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-green-400 text-2xl' />
          <h2 className='my-1'><a href={task.taskURL}>{task.taskURL}</a></h2>
        </div>
        <p className='mt-4'>Your saved notes about the task</p>
        <p className='my-2'>
          {task.note}
        </p>
      </div>
    </div>
  );
};

export default TaskModal;
