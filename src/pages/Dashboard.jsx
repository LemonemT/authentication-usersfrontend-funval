import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { isLoading, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  if (isLoading) {
    return <div>CARGANDO...</div>;
  }

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

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
          <span className="text-gray-700">{user?.name} {user?.l_name}</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mt-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <p className="text-gray-600">Some info may be visible to other people</p>
          </div>
          <button className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            Edit
          </button>
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
            <span>{user?.name} {user?.l_name}</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">BIO</span>
            <span className="text-right">{user?.bio ?? 'NO REGISTRADO'}</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">PHONE</span>
            <span className="text-right">{user?.phone ?? 'NO REGISTRADO'}</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">EMAIL</span>
            <span className="text-right">{user?.email}</span>
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
