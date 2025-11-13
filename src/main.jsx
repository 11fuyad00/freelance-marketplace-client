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
import Register from './pages/Register/Register';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/profile/Profile';
import PrivateRoute from './Route/PrivateRoute';
import Error from './pages/Error/Error';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewDetails from './pages/ViewDetails/ViewDetails';
import MyAddedJobs from './pages/MyAddedJobs/MyAddedJobs';
import UpdateJob from './pages/UpdateJob/UpdateJob';
import DeletePage from './pages/DeletePage/DeletePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

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
        path: '/allJobs/:id',
        element: (
          <PrivateRoute>
            <ViewDetails></ViewDetails>
          </PrivateRoute>
        ),
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
        path: '/myAddedJobs',
        element: (
          <PrivateRoute>
            <MyAddedJobs></MyAddedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: '/updateJob',
        element: (
          <PrivateRoute>
            <UpdateJob></UpdateJob>
          </PrivateRoute>
        ),
      },
      {
        path: '/deletePage',
        element: (
          <PrivateRoute>
            <DeletePage></DeletePage>
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
      {
        path: '/*',
        element: <Error></Error>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
