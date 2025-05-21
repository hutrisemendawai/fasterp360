// src/pages/Register.jsx
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
    // 1. load all employees
    api.get('/hr/employees')
      .then(res => {
        setEmployees(res.data);

        // 2. once we have them, prefill employeeId from ?employeeId=xxx
        const params = new URLSearchParams(search);
        const empId  = params.get('employeeId');
        if (empId && res.data.some(e => String(e.id) === empId)) {
          setForm(f => ({ ...f, employeeId: empId }));
        }
      })
      .catch(() => setEmployees([]));
  }, [search]);

  const handle = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      nav('/login', { replace: true });
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={submit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handle}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handle}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handle}
          className="w-full mb-6 p-2 border rounded"
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
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
