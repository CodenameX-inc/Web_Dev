import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import TaskSingleCard from './TaskSingleCard';

const TaskCard = ({ tasks }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4'>
      {tasks?.map((item) => (
        <TaskSingleCard key={item.uid} task={item} />
      ))}
    </div>
  );
};

export default TaskCard;
