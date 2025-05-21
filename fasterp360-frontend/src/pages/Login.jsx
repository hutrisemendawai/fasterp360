import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handle = e => {
    console.log('Input changed:', e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    console.log('Form submitted:', form);
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      nav('/dashboard', { replace: true });
    } catch (err) {
      console.log('Error:', err);
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={submit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Login</h2>
        {error && <div className="text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mb-4">{error}</div>}
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handle}
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handle}
          className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
        <p className="mt-3 text-center text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}