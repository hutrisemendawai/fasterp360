import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Register        from './pages/Register';
import Login           from './pages/Login';
import Dashboard       from './pages/Dashboard';
import InventoryList   from './pages/Inventory/List';
import EmployeesList   from './pages/hr/EmployeesList';
import EmployeeForm    from './pages/hr/EmployeeForm';
import EmployeeDetail  from './pages/hr/EmployeeDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login    />} />

        {/* protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Outlet/></Layout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard/>}/>
          <Route path="inventory" element={<InventoryList/>}/>

          <Route path="hr">
            <Route path="employees"       element={<EmployeesList/>}/>
            <Route path="employees/new"   element={<EmployeeForm/>}/>
            <Route path="employees/:id"   element={<EmployeeForm/>}/>
            <Route path="employees/:id/view" element={<EmployeeDetail/>}/>
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
