import { createBrowserRouter, Navigate } from 'react-router-dom';
import { CreateTask, TaskDetails, TasksList } from './features/tasks';

export const routes = createBrowserRouter([
  {
    path: '/tasks',
    element: <TasksList />,
  },
  {
    path: '/tasks/:id',
    element: <TaskDetails />,
  },
  {
    path: '/tasks/create',
    element: <CreateTask />,
  },
  {
    path: '*',
    element: <Navigate to="/tasks" replace />,
  },
]);
