import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

//TODO: DONE
const TaskTable = ({ tasks }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Task Name</th>
          {/* <th className='border border-slate-600 rounded-md max-md:hidden'>
            Task Link
          </th> */}
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Status
          </th>
          <th className='border border-slate-600 rounded-md'>Note</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task, index) => (
          <tr key={task.uid} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <a href={task.taskURL}>{task.taskName}</a>
            </td>
            {/* <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {task.taskURL}
            </td> */}
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {task.status}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {task.Note}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/tasks/get-task/${task.uid}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/tasks/add-task/${task.uid}`}>
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
  );
};

export default TaskTable;
