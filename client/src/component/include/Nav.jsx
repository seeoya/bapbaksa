import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {

    return (
        <nav>
            <div className="header-category">
                <Link to="/recipe/list" className="link">레시피</Link>
                <Link to="/styleguide" className="link">StyleGuide</Link>
                <Link to="/market" className="link_market">Market 가기</Link>
                <Link to="/market/list" className="link_market">리스트 가기</Link>
                <Link to="/market/view/:no" className="link_market">제품 상세 페이지 가기</Link>
                <Link to="/market/payment" className="link_market">결제 페이지 가기</Link>
                <Link to="/market/cart" className="link_market">장바구니 가기</Link>
                <Link to="/market/pay-history" className="link_market">결제 내역 가기</Link>
            </div>
        </nav>

    );
};

export default Nav;