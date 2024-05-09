import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    return (
        <header>
            <div className='logo'>
                <img src="/imgs/logo/logo.png" alt="밥박사 로고" />
            </div>

            <nav>
                <Link to={"/admin"} className='admin-link'>MAIN</Link>
                <div className='admin-link'>회원 관리</div>
                <Link to={"/admin/user"} className='admin-link'>회원목록</Link>
                <div className='admin-link'>마켓 관리</div>
                <Link to={"/admin/market"} className='admin-link'>구매 내역</Link>
                <Link to={"/admin/market"} className='admin-link'>환불 관리</Link>
            </nav>
        </header>
    );
};

export default AdminHeader; 