import { type FC, useEffect, useState } from 'react';
import { Priority, Status, type Task } from '../types';
import { getAllTasks } from '../api';
import { Link } from 'react-router-dom';
import cn from 'classnames';

export const TasksList: FC = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [error, setError] = useState('');

  const getTasksData = async () => {
    try {
      const result = await getAllTasks();
      setTasks(
        result.slice().sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          if (dateB < dateA) return -1;
          if (dateB > dateA) return 1;
          return 0;
        }),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    getTasksData();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center">
        <p className="text-red-800 text-lg bg-red-50 w-fit p-4">
          There is an error while loading tasks list: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-150 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-3xl">Your tasks</h1>
          <Link
            to="/tasks/create"
            className="font-semibold bg-fuchsia-700 text-white px-4 py-2 rounded-2xl hover:bg-fuchsia-800"
          >
            Create new task
          </Link>
        </div>
        {tasks?.length ? (
          <ul id="tasks-list" className="space-y-4 mb-6">
            {tasks?.map((task) => (
              <li key={task.id}>
                <Link to={task.id}>
                  <div className="p-4 rounded-2xl border-2 border-gray-400 flex justify-between items-center hover:bg-fuchsia-50">
                    <div>
                      <p
                        className={cn('font-semibold text-xl', {
                          'line-through': task.status === Status.DONE,
                        })}
                      >
                        {task.title}
                      </p>
                      {!!task.description && <p className="text-gray-500">{task.description}</p>}
                    </div>
                    <p
                      className={cn('capitalize px-2 py-1 rounded-lg font-medium', {
                        'text-blue-800 bg-sky-50': task.priority === Priority.LOW,
                        'text-yellow-600 bg-yellow-50': task.priority === Priority.MEDIUM,
                        'text-red-700 bg-red-50': task.priority === Priority.HIGH,
                      })}
                    >
                      {task.priority}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full h-50 border-2 border-dashed border-gray-400 flex justify-center items-center rounded-2xl">
            <p className="font-semibold">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};
