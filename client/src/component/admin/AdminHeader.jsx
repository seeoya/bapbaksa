import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminHeader = () => {
    const url = useLocation().pathname;
    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        initActiveTab();
    }, [url]);

    const initActiveTab = () => {
        let active = url.replace("/admin", "");
        setActiveTab(active);

        switch (active) {
            case "/user":
            case "/user/":
                setActiveTab(0)
                break;
            case "/market":
            case "/market/":
                setActiveTab(1)
                break;
            case "/market/refund":
                setActiveTab(2)
                break;
            default:
                break;
        }
    }

    return (
        <header>
            <Link to={"/admin"} className='logo'>
                <img src="/imgs/logo/logo.png" alt="밥박사 로고" />
                <div className=''>밥박사</div>
            </Link>

            <nav>
                <div className='admin-link'>회원 관리</div>
                <Link to={"/admin/user"} className={activeTab === 0 ? "admin-link active" : 'admin-link'}>회원목록</Link>
                <Link to={"/admin/user/question"} className={activeTab === 0 ? "admin-link active" : 'admin-link'}>1:1 문의 답변</Link>
                <div className='admin-link'>마켓 관리</div>
                <Link to={"/admin/market"} className={activeTab === 1 ? "admin-link active" : 'admin-link'}>구매 내역</Link>
                <Link to={"/admin/market/refund"} className={activeTab === 2 ? "admin-link active" : 'admin-link'}>환불 관리</Link>
            </nav>
        </header>
    );
};

export default AdminHeader;