import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

export default function EmployeesList() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    api.get('/hr/employees')
       .then(res => setEmployees(res.data))
       .catch(console.error)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Employees</h1>
      <Link
        to="new"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        + New Employee
      </Link>

      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            {['Name','Email','Dept.','Position','Actions'].map(h => (
              <th key={h} className="px-4 py-2 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="px-4 py-2">{emp.firstName} {emp.lastName}</td>
              <td className="px-4 py-2">{emp.email}</td>
              <td className="px-4 py-2">{emp.department}</td>
              <td className="px-4 py-2">{emp.position}</td>
              <td className="px-4 py-2 space-x-2">
                <Link to={`${emp.id}`} className="text-blue-600">Edit</Link>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this employee?')) {
                      api.delete(`/hr/employees/${emp.id}`)
                         .then(() => setEmployees(e => e.filter(x => x.id !== emp.id)))
                         .catch(console.error)
                    }
                  }}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
