import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';

export default function Layout({ children }) {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    nav('/login', { replace: true });
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">fasterp360</h2>
        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              'block px-3 py-2 rounded ' +
              (isActive ? 'bg-gray-700' : 'hover:bg-gray-700')
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/inventory"
            className={({ isActive }) =>
              'block px-3 py-2 rounded ' +
              (isActive ? 'bg-gray-700' : 'hover:bg-gray-700')
            }
          >
            Inventory
          </NavLink>
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded mt-6"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
