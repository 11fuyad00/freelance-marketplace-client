import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Home from './pages/Home/Home';
import RootLayout from './layout/RootLayout';
import AllJobs from './pages/AllJobs/AllJobs';
import AddAJob from './pages/addAJob/AddAJob';
import MyTask from './pages/myTask/MyTask';
import Login from './pages/Login/Login';
import Register from './pages/Home/Register/Register';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/profile/Profile';
import PrivateRoute from './Route/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/allJobs',
        element: <AllJobs></AllJobs>,
      },
      {
        path: '/addAJob',
        element: (
          <PrivateRoute>
            <AddAJob></AddAJob>
          </PrivateRoute>
        ),
      },
      {
        path: '/myTask',
        element: (
          <PrivateRoute>
            <MyTask></MyTask>
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </StrictMode>
);
