import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute() {
  const token = localStorage.getItem('tokenLogin');
  const { isLoading, isError } = useContext(AuthContext);

  if (isLoading) {
    return <div>CARGANDO...</div>;
  }

  if (isError || !token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
