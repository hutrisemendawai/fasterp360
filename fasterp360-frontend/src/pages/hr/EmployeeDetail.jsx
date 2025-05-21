// src/pages/hr/EmployeeDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';

export default function EmployeeDetail() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    api.get(`/hr/employees/${id}`)
       .then(res => setEmp(res.data))
       .catch(console.error);
  }, [id]);

  if (!emp) return <p>Loading…</p>;

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">
        {emp.firstName} {emp.lastName}
      </h1>
      <p><strong>Email:</strong> {emp.email}</p>
      <p><strong>Department:</strong> {emp.department}</p>
      <p><strong>Position:</strong> {emp.position}</p>
      <p><strong>Hire Date:</strong> {emp.hireDate}</p>
      <p><strong>Status:</strong> {emp.status}</p>

      {/* Create account button */}
      <Link
        to={`/register?employeeId=${emp.id}`}
        className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Create Login Account
      </Link>

      {/* Edit record button */}
      <Link
        to={`/dashboard/hr/employees/${emp.id}`}
        className="inline-block ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Edit Employee
      </Link>
    </div>
  );
}
