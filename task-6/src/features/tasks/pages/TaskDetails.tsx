import { type FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTaskById } from '../api';
import { Priority, Status, type Task } from '../types';
import { format } from 'date-fns';
import cn from 'classnames';

const statusesMap = {
  [Status.TODO]: 'to do',
  [Status.IN_PROGRESS]: 'in progress',
  [Status.DONE]: 'done',
};

export const TaskDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [task, setTask] = useState<Task>();
  const [error, setError] = useState('');

  const getTaskData = async () => {
    try {
      const result = await getTaskById(id!);
      setTask(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  if (!task) {
    return;
  }

  if (error) {
    return (
      <div className="flex justify-center">
        <p className="text-red-800 text-lg bg-red-50 w-fit p-4">
          There is an error while loading task details: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-150 w-full flex flex-col">
        <Link to="/tasks" className="text-green-700 hover:text-green-800 mb-2 py-2">
          &larr; Back to tasks list
        </Link>
        <div className="p-4 rounded-2xl flex flex-col gap-2 border-2 border-gray-400">
          <h1 className="font-semibold text-3xl mb-6">{task.title}</h1>
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-lg">Description: </span>
            <span>{task.description || '--'}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-lg">Status: </span>
            <span
              className={cn('uppercase px-2 py-1 rounded-lg font-semibold text-sm', {
                'text-blue-800 bg-sky-50': task.status === Status.IN_PROGRESS,
                'text-gray-800 bg-gray-100': task.status === Status.TODO,
                'text-green-800 bg-green-50': task.status === Status.DONE,
              })}
            >
              {statusesMap[task.status]}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-lg">Priority: </span>
            <span
              className={cn('capitalize px-2 py-1 rounded-lg font-medium', {
                'text-blue-800 bg-sky-50': task.priority === Priority.LOW,
                'text-yellow-600 bg-yellow-50': task.priority === Priority.MEDIUM,
                'text-red-700 bg-red-50': task.priority === Priority.HIGH,
              })}
            >
              {task.priority}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-lg">Deadline: </span>
            <span>{format(new Date(task.deadline), 'dd.MM.yyyy')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
