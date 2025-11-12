import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import Loading from '../pages/Loading/Loading';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  console.log('PrivateRoute - Current location:', location.pathname);
  console.log('PrivateRoute - User:', user);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user.email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
