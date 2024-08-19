import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Login() {
  const { loginMutation } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    const data = {
      usernameOrEmail: e.target.usernameOrEmail.value,
      password: e.target.password.value,
    };

    console.log('Datos de inicio de sesión:', data); 

    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-40" />
            <h1 className="text-2xl font-bold">Login</h1>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative flex items-center">
              <i className="fas fa-envelope absolute left-3 text-gray-500"></i>
              <input
                type="text"
                name="usernameOrEmail"
                required
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
              />
            </div>
            <div className="relative flex items-center">
              <i className="fas fa-key absolute left-3 text-gray-500"></i>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">or continue with these social profiles</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="p-2 rounded-full border border-gray-300">
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full border border-gray-300">
                <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full border border-gray-300">
                <img src="/twitter-icon.svg" alt="Twitter" className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full border border-gray-300">
                <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-4 text-sm">
              Don’t have an account yet?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <footer className="text-center mt-4 text-sm text-gray-600">
        created by <span className="font-semibold">LeninT</span> - devChallenges.io
      </footer>
    </main>
  );
}

export default Login;
