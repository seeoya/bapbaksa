import React from 'react';
import { Link } from "react-router-dom";

const MarketNav = () => {
  return (
    <nav>            
            <div id="market-category-wrap" className="category-wrap">
                <div className="header-category">            
                    <div className="market">                        
                        <Link to="/market/list" className="link_market">리스트 가기</Link>
                        <Link to="/market/view/:no" className="link_market">제품 상세 페이지 가기</Link>
                        <Link to="/market/payment" className="link_market">결제 페이지 가기</Link>
                        <Link to="/market/cart" className="link_market">장바구니 가기</Link>
                        <Link to="/market/pay-history" className="link_market">결제 내역 가기</Link>
                    </div>
                    <div className="recipe">
                        <Link to="/" className="link">레시피&nbsp;&nbsp;가기</Link>
                    </div>
                </div>
            </div>
        </nav>
  );
};

export default MarketNav;