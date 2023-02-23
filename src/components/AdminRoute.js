import { useContext } from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';


export default function AdminRoute({ redirectPath = '/unauthorized' }) {
  const { user } = useContext(AuthContext);

  if (!jwtDecode(user).isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
