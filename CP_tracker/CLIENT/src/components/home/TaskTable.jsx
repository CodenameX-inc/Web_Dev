import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import TaskModal from './TaskModal';
import { BiBookContent } from 'react-icons/bi';
import getStatusColor from '../UI/CustomStatusColor';
import  {useAuth} from '../../structure/GlobalStateProvider'


//TODO: DONE
const TaskTable = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const { authState, setAuthState } = useAuth();
  // useEffect(()=>{
  //       // let token = (cookies.get('TOKEN'));
  //       if(!authState.isAuthenticated)
  //       {
  //         alert("User token not verified or not logged in... Retrying..");
  //         navigate("/login");
  //       }
        
  //     },[]);
  
  return (
    <div>
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-red-200 rounded-md'>Task Name</th>
          <th className='border border-blue-700 rounded-md max-md:hidden'>
            Task Link
          </th>
          <th className='border border-yellow-400 rounded-md max-md:hidden'>
            Status
          </th>
          <th className='border rounded-md bg-gradient-to-br'>Note</th>
          <th className='border border-yellow-600 rounded-md max-md:hidden'>Modification</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task, index) => (
          <tr key={task.uid} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center underline'>
              <a href={task.taskURL}>{task.taskName}</a>
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden w-fit'>
            <a href={task.taskURL}>{task.taskURL}</a>
            </td>
            <td className={`border ${getStatusColor(task.status)} rounded-md text-center max-md:hidden`}>
              {task.status}
            </td>
            <td className='border border-cyan-400 rounded-md text-center max-md:hidden content-center'>
            <BiBookContent onClick={() => setSelectedTask(task.uid)}>
              {
              //the function is set at the end of the table
              }
            </BiBookContent>
                
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/tasks/get-task/${task.uid}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={{
                  pathname: `/tasks/update-task/${task.uid}`,
                  state: { task: task }
                }}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/tasks/delete-task/${task.uid}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>

                
              </div>
            </td>
          </tr>
          
        ))}
      </tbody>
    </table>
    {/* Call the TaskModal based on the uid */}
    {selectedTask && (
        <TaskModal 
          task={tasks.find(task => task.uid === selectedTask)} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    
    </div>
  );
};

export default TaskTable;
