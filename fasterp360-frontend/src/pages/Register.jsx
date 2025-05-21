import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    employeeId: ''
  });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const nav = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    api.get('/hr/employees')
      .then(res => {
        setEmployees(res.data);
        const params = new URLSearchParams(search);
        const empId = params.get('employeeId');
        if (empId && res.data.some(e => String(e.id) === empId)) {
          setForm(f => ({ ...f, employeeId: empId }));
        }
      })
      .catch(() => setEmployees([]));
  }, [search]);

  const handle = e => {
    console.log('Input changed:', e.target.name, e.target.value);
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const submit = async e => {
    e.preventDefault();
    console.log('Form submitted:', form);
    try {
      await api.post('/auth/register', form);
      nav('/login', { replace: true });
    } catch (err) {
      console.log('Error:', err);
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={submit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Register</h2>
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
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          required
        />

        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handle}
          className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          required
        >
          <option value="">Select your employee record</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.firstName} {emp.lastName} (#{emp.id})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>

        <p className="mt-3 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}