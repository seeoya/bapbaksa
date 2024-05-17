import React from 'react';
import { Outlet } from 'react-router-dom';
import "../css/admin.css";
import AdminHeader from './admin/AdminHeader';
import ScrollMoveBtn from './include/ScrollMoveBtn';

const AdminLayout = () => {
    return (
        <div id='admin'>
            <AdminHeader />

            <div className='container'>
                <Outlet />
            </div>

            <ScrollMoveBtn />
        </div>
    );
};

export default AdminLayout;