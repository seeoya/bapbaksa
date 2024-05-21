import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import "../css/admin.css";
import { adminCheck } from '../util/check';
import AdminHeader from './admin/AdminHeader';
import ScrollMoveBtn from './include/ScrollMoveBtn';

const AdminLayout = () => {
    const url = useLocation().pathname;
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        goToHome();
    }, [url]);

    const goToHome = async () => {
        let isAdmin = await adminCheck();

        if (!isAdmin || isAdmin < 0) {
            alert("관리자만 이용 가능합니다.");
            navigate("/");
        } else {
            setIsAdmin(true);
        }
    }

    return (
        <div id='admin'>
            {
                isAdmin ? <>
                    <AdminHeader />

                    <div className='container'>
                        <Outlet />
                    </div>

                    <ScrollMoveBtn />
                </>
                    : null
            }
        </div>
    );
};

export default AdminLayout;