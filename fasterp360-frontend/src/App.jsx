import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InventoryList from './pages/Inventory/List';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><Dashboard/></Layout>
          </ProtectedRoute>
        }/>

        <Route path="/dashboard/inventory" element={
          <ProtectedRoute>
            <Layout><InventoryList/></Layout>
          </ProtectedRoute>
        }/>

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
