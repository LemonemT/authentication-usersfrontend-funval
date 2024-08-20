import axios from 'axios';

export const loginUser = async ({ usernameOrEmail, password }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      usernameOrEmail,
      password,
    });
    console.log('Respuesta del login:', response.data); // Verifica la respuesta
    return response.data;
  } catch (error) {
    console.error('Error en loginUser:', error.response || error);
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users', data);
    return response.data;
  } catch (error) {
    console.error('Error en registerUser:', error.response || error);
    throw error;
  }
};

export const getMe = async () => {
  const token = localStorage.getItem('tokenLogin');
  try {
    const response = await axios.get('http://localhost:3000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 3000,
    });
    console.log('Datos del usuario:', response.data); // Verifica los datos
    return response.data;
  } catch (error) {
    console.error('Error en getMe:', error.response || error);
    throw error;
  }
};

// Nueva función para actualizar los datos del usuario
export const updateUser = async (userData) => {
  const token = localStorage.getItem('tokenLogin');
  try {
    const response = await axios.put('http://localhost:3000/api/users/update', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Respuesta de actualización del usuario:', response.data); // Verifica la respuesta
    return response.data;
  } catch (error) {
    console.error('Error en updateUser:', error.response || error);
    throw error;
  }
};
