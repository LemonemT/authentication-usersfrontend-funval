import { useContext, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { registerMutation, logout } = useContext(AuthContext);

  const [imagePreview, setImagePreview] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef(null); // Crear un ref para el input de archivo

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    for (let [key, value] of data.entries()) {
      console.log(key, value); // Verifica el contenido del FormData
    }

    try {
      const response = await registerMutation.mutateAsync(data);
      if (response?.data?.token) {
        localStorage.setItem('tokenLogin', response.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file (png, jpg, jpeg)');
    }
  };

  const handleLogout = () => {
    logout(); // Función para cerrar sesión
    navigate('/'); // Redirige al Homepage
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Simula un clic en el input de archivo
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </Link>
        <div className="relative">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
          ) : (
            <img
              src="/default-profile.png"
              alt="Default Profile"
              className="w-10 h-10 mr-10 rounded-full cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
          )}
          {showMenu && (
            <div className="absolute right-0 mt-2 px-3  bg-white border border-gray-200 rounded shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full text-red-500 text-s py-1 px-2 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"><i className="fas fa-arrow-right-from-bracket mr-2"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-8">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <div className={`flex items-center space-x-4 mb-4 ${!imagePreview ? '' : ''}`}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-md"
            />
          )}
          <span
            className="text-gray-700 cursor-pointer"
            onClick={handleImageClick}
          >
            Change Photo
          </span>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
              <input
                type="text"
                name="name"
                placeholder="Enter your name..."
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
              <input
                type="text"
                name="bio"
                placeholder="Enter your bio..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input
                type="email"
                name="email"
                placeholder="Enter your email..."
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
              <input
                type="password"
                name="password"
                placeholder="Enter your password..."
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="text-sm hidden font-medium hover:bg-gray-100 text-gray-700 cursor-pointer px-2 py-3 rounded-md ">
              CHANGE PHOTO
              <input
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                ref={fileInputRef} // Asigna el ref al input de archivo
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="text-left">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Register;
