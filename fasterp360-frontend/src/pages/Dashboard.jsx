import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to fasterp360</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Your all-in-one ERP solution for streamlined operations.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Overview</h3>
          <p className="text-gray-600 dark:text-gray-300">Manage your stock efficiently.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Employee Management</h3>
          <p className="text-gray-600 dark:text-gray-300">Track and manage your workforce.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reports</h3>
          <p className="text-gray-600 dark:text-gray-300">Generate insights and analytics.</p>
        </div>
      </div>
    </div>
  );
}