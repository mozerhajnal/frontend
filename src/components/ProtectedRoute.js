import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export default function ProtectedRoute({ redirectPath = '/' }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
