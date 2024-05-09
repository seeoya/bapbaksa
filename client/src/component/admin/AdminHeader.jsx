import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminHeader = () => {
    const url = useLocation().pathname;
    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        initActiveTab();
    }, [url]);

    const initActiveTab = () => {
        let active = url.replace("/admin", "").replace("/", "");
        setActiveTab(active);
    }

    return (
        <header>
            <div className='logo'>
                <img src="/imgs/logo/logo.png" alt="밥박사 로고" />
            </div>

            <nav>
                <Link to={"/admin"} className={activeTab === "" ? "admin-link active" : 'admin-link'}>MAIN</Link>
                <div className='admin-link'>회원 관리</div>
                <Link to={"/admin/user"} className={activeTab === "user" ? "admin-link active" : 'admin-link'}>회원목록</Link>
                <div className='admin-link'>마켓 관리</div>
                <Link to={"/admin/market"} className={activeTab === "market" ? "admin-link active" : 'admin-link'}>구매 내역</Link>
                <Link to={"/admin/market_refund"} className={activeTab === "market_refund" ? "admin-link active" : 'admin-link'}>환불 관리</Link>
            </nav>
        </header>
    );
};

export default AdminHeader;