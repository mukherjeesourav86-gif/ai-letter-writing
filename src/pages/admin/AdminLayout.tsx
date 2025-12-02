import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useLetterContext } from '../../context/LetterContext';

const AdminLayout: React.FC = () => {
    const { currentUser } = useLetterContext();

    if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to="/account" replace />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div className="md:col-span-1">
                    <AdminSidebar />
                </div>
                <div className="md:col-span-3 lg:col-span-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
