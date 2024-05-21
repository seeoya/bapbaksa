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
            case "/user/question":
            case "/user/question/":
                setActiveTab(4)
                break;
            case "/market":
            case "/market/":
                setActiveTab(1)
                break;
            case "/market/refund":
                setActiveTab(2)
                break;
            case "/market/stock":
                setActiveTab(3)
                break;
            case "/market/chart":
                setActiveTab(5)
                break;
            default:
                break;
        }
    }

    return (
        <header>
            <Link to={"/admin"} className='logo'>
                <img src="/imgs/logo/logo.png" alt="밥박사 로고" />
                <div className='title'>
                    <span>밥박사</span>
                    <span className='desc'>관리자 페이지</span>
                </div>
            </Link>

            <div className='links'>
                <Link to={"/"}>홈으로</Link>
                <Link to={"/market"}>마켓으로</Link>
            </div>

            <nav>
                <div className='admin-link'>회원 관리</div>
                <Link to={"/admin/user"} className={activeTab === 0 ? "admin-link active" : 'admin-link'}>회원목록</Link>
                <Link to={"/admin/user/question"} className={activeTab === 4 ? "admin-link active" : 'admin-link'}>1:1 문의 답변</Link>
                <div className='admin-link'>마켓 관리</div>
                <Link to={"/admin/market"} className={activeTab === 1 ? "admin-link active" : 'admin-link'}>구매 내역</Link>
                <Link to={"/admin/market/refund"} className={activeTab === 2 ? "admin-link active" : 'admin-link'}>환불 관리</Link>
                <Link to={"/admin/market/stock"} className={activeTab === 3 ? "admin-link active" : 'admin-link'}>재고 관리</Link>
                <Link to={"/admin/market/chart"} className={activeTab === 5 ? "admin-link active" : 'admin-link'}>차트</Link>
            </nav>
        </header>
    );
};

export default AdminHeader;