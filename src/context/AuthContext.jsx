import { createContext, useEffect, useState } from 'react';
import { getMe, loginUser, registerUser, updateUser } from '../services/authService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const rutasIgnoradas = ['/', '/register'];

  const [user, setUser] = useState(null);

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onError: (error) => {
      console.error('Error de inicio de sesión:', error);
      alert(`Error al iniciar sesión. ${error.response?.data?.message || 'Verifica tus credenciales.'}`);
    },
    onSuccess: (data) => {
      console.log('Login exitoso:', data); // Verifica la respuesta del login
      localStorage.setItem('tokenLogin', data.token);
      setUser(data.user);
      navigate('/dashboard');
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: registerUser,
    onError: (error) => {
      console.error('Error de registro:', error);
      alert('Error al registrarse.');
    },
    onSuccess: (data) => {
      alert(data.message);
      navigate('/');
    },
  });

  const updateUserMutation = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updateUser,
    onError: (error) => {
      console.error('Error al actualizar el usuario:', error);
      alert('Error al actualizar el usuario.');
    },
    onSuccess: (data) => {
      console.log('Usuario actualizado:', data);
      setUser(data);
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    enabled: !rutasIgnoradas.includes(pathname),
  });

  const logout = () => {
    localStorage.removeItem('tokenLogin');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (data && !isLoading) {
      console.log('Usuario autenticado:', data); // Verifica los datos del usuario
      setUser(data);
    }
  }, [data, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginMutation,
        registerMutation,
        updateUserMutation,
        isLoading,
        logout,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
