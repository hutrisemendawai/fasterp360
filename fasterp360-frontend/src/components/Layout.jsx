import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function Layout({ children }) {
  const nav = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    nav('/login', { replace: true });
  };

  const toggleSidebar = () => {
    console.log('Toggling sidebar, current state:', isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">fasterp360</h1>
          <button
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative w-8 h-8"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <span
              className={`absolute inset-0 flex flex-col justify-center items-center gap-1.5 transition-transform duration-300 ${
                isSidebarOpen ? 'rotate-45' : ''
              }`}
            >
              <span className={`w-6 h-0.5 bg-current transform ${isSidebarOpen ? 'rotate-90 translate-y-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current ${isSidebarOpen ? 'hidden' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current transform ${isSidebarOpen ? '-rotate-90 -translate-y-0' : ''}`}></span>
            </span>
          </button>
        </div>
      </header>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:h-auto z-10`}
        >
          <nav className="p-4 space-y-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 font-medium transition-colors ${
                  isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/inventory"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 font-medium transition-colors ${
                  isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              Inventory
            </NavLink>
            <NavLink
              to="/dashboard/hr/employees"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 font-medium transition-colors ${
                  isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              Employees
            </NavLink>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-6"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-64 max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}