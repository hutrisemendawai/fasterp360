import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';

export default function EmployeeForm() {
  const { id } = useParams();
  const isNew = !id;                 // undefined ⇒ new, otherwise edit
  const nav = useNavigate();

  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '',
    email: '', phone: '',
    department: '', position: '',
    hireDate: '', salary: '',
    managerId: '', status: 'ACTIVE'
  });
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    // load managers list
    api.get('/hr/employees')
       .then(res => setManagers(res.data))
       .catch(console.error);

    if (!isNew) {
      api.get(`/hr/employees/${id}`)
         .then(res => {
           const e = res.data;
           setForm({
             firstName:  e.firstName,
             middleName: e.middleName || '',
             lastName:   e.lastName,
             email:      e.email,
             phone:      e.phone || '',
             department: e.department || '',
             position:   e.position || '',
             hireDate:   e.hireDate,         // yyyy-MM-dd
             salary:     e.salary ?? '',
             managerId:  e.manager?.id || '',
             status:     e.status || 'ACTIVE',
           });
         })
         .catch(console.error);
    }
  }, [id, isNew]);

  const handle = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const submit = e => {
    e.preventDefault();
    const payload = {
      firstName:  form.firstName,
      middleName: form.middleName,
      lastName:   form.lastName,
      email:      form.email,
      phone:      form.phone,
      department: form.department,
      position:   form.position,
      hireDate:   form.hireDate,
      salary:     parseFloat(form.salary) || null,
      manager:    form.managerId
                    ? { id: parseInt(form.managerId, 10) }
                    : null,
      status:     form.status,
    };

    const call = isNew
      ? api.post('/hr/employees', payload)
      : api.put (`/hr/employees/${id}`, payload);

    call
      .then(() => nav('/dashboard/hr/employees'))
      .catch(err => {
        console.error(err);
        alert(err.response?.data || 'Save failed');
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl mb-6">{isNew ? 'New' : 'Edit'} Employee</h1>
      <form onSubmit={submit} className="space-y-4">
        {[
          { label: 'First Name', name: 'firstName', type: 'text', req: true },
          { label: 'Middle Name', name: 'middleName', type: 'text' },
          { label: 'Last Name', name: 'lastName', type: 'text', req: true },
          { label: 'Email',       name: 'email',    type: 'email', req: true },
          { label: 'Phone',       name: 'phone',    type: 'text' },
          { label: 'Department',  name: 'department', type: 'text' },
          { label: 'Position',    name: 'position', type: 'text' },
          { label: 'Hire Date',   name: 'hireDate', type: 'date', req: true },
          { label: 'Salary',      name: 'salary',   type: 'number' },
        ].map(({ label, name, type, req }) => (
          <div key={name}>
            <label className="block mb-1">
              {label}{req && <span className="text-red-500">*</span>}
            </label>
            <input
              name      ={name}
              type      ={type}
              value     ={form[name]}
              onChange  ={handle}
              required  ={req}
              className ="w-full p-2 border rounded"
            />
          </div>
        ))}

        <div>
          <label className="block mb-1">Manager</label>
          <select
            name="managerId"
            value={form.managerId}
            onChange={handle}
            className="w-full p-2 border rounded"
          >
            <option value="">— none —</option>
            {managers.map(m => (
              <option key={m.id} value={m.id}>
                {m.firstName} {m.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handle}
            className="w-full p-2 border rounded"
          >
            {['ACTIVE','INACTIVE','ON_LEAVE'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {isNew ? 'Create' : 'Save'}
        </button>
      </form>
    </div>
  );
}
