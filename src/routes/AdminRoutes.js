import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/system" element={<AdminDashboard />} />
        </Routes>
    );
};

export default AdminRoutes; 