import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { isLoading, user, logout, updateUserMutation } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  if (isLoading) {
    return <div>CARGANDO...</div>;
  }

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserMutation.mutateAsync(formData); // Usa la mutación para actualizar el usuario
      setEditMode(false); // Cierra el modo de edición al guardar los cambios
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelClick = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      email: user?.email || '',
    });
    setEditMode(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex justify-between w-full px-8 py-4 bg-white shadow-sm">
        <img src="/logo.png" alt="devChallenges" className="mt-2 mb-2 w-44" />
        <div className="relative flex items-center space-x-2">
          <img
            src={`http://localhost:3000/api/users/image/${user?.image}`}
            alt={user?.name}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div className="absolute right-0 top-12 bg-white border border-gray-300 rounded-md shadow-lg p-4">
              <button onClick={logout} className="w-full text-red-500 text-s py-1 px-2 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center">
                <i className="fas fa-arrow-right-from-bracket mr-2"></i>
                Logout
              </button>
            </div>
          )}
          <span className="text-gray-700">{user?.name}</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mt-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <p className="text-gray-600">Some info may be visible to other people</p>
          </div>
          {editMode ? (
            <div>
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-4 border-t border-b">
            <span className="text-gray-500">PHOTO</span>
            <img
              src={`http://localhost:3000/api/users/image/${user?.image}`}
              alt={user?.name}
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">NAME</span>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-right border border-gray-300 rounded-md px-2 py-1"
              />
            ) : (
              <span>{formData.name}</span>
            )}
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">BIO</span>
            {editMode ? (
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="text-right border border-gray-300 rounded-md px-2 py-1"
              />
            ) : (
              <span className="text-right">{formData.bio || 'NO REGISTRADO'}</span>
            )}
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">PHONE</span>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="text-right border border-gray-300 rounded-md px-2 py-1"
              />
            ) : (
              <span className="text-right">{formData.phone || 'NO REGISTRADO'}</span>
            )}
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">EMAIL</span>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="text-right border border-gray-300 rounded-md px-2 py-1"
              />
            ) : (
              <span className="text-right">{formData.email}</span>
            )}
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">PASSWORD</span>
            <span className="text-right">************</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
