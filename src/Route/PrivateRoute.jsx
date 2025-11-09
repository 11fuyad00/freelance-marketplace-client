import { Navigate, useLocation } from 'react-router';

import { use } from 'react';
import Loading from '../pages/Loading/Loading';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  console.log(location);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
