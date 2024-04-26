import React from "react";
import { Link } from "react-router-dom";


const Header = () => {

    return (
        <header>
            <div className="header-wrap">
                <div className="header-menu">
                    <div className="logo">
                        <Link to="/" className="link">
                            <img src="/imgs/logo/logo_bapbaksa.jpg" alt="밥박사" />
                        </Link>
                    </div>

                    <div className="search">
                        <form action="" name="search_form" method="get">
                            <input type="search" name="search" class="input" placeholder="검색어를 입력하세요." />
                            <button type="submit" class="btn main">검색</button>
                        </form>
                    </div>
                </div>

                <div className="member-menu">
                    <nav>
                        <Link to="/admin/qna" className="link">고객문의</Link>

                        <Link to="/member/signup" className="link">회원가입</Link>
                        <Link to="/member/signin" className="link">로그인</Link>

                        <Link to="/member/modify_form" className="link">정보수정</Link>
                        <Link to="/member/signout" className="link">로그아웃</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};
export default Header;
