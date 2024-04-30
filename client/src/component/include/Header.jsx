import React from "react";
import { Link } from "react-router-dom";


const Header = () => {

    return (
        <header>
            <div className="header-wrap">
                <div className="header-menu">
                    <div className="logo">
                        <Link to="/" className="link">
                            <img src="/imgs/logo/logo.png" alt="밥박사" />
                        </Link>
                    </div>

                    <div className="search">
                        <form action="" name="search_form" method="get">
                            <input type="search" name="search" className="input" placeholder="검색어를 입력하세요." />
                            <button type="submit" className="btn main">검색</button>
                        </form>
                    </div>
                </div>

                <div className="user-menu">
                    <div className="nav">
                        <Link to="/admin/qna" className="link">고객문의</Link>

                        <Link to="/user/signup" className="link">회원가입</Link>
                        <Link to="/user/signin" className="link">로그인</Link>

                        <Link to="/user/modify" className="link">정보수정</Link>
                        <Link to="/user/signout" className="link">로그아웃</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
