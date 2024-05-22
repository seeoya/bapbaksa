import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../storage/loginedToken";


const MarketNav = () => {

    const [loginedID, setLoginedID] = useState('');

    useEffect(() => {

        let loginedUId = getToken('loginedUId');
        console.log('loginedUIdString', loginedUId);

        if (loginedUId !== null) {
            setLoginedID(loginedUId);
        }

    }, [loginedID]);

    return (
        <nav id="market-nav">
            <div id="market-category-wrap" className="category-wrap">
                <div className="header-category">
                    <div className="main">
                        <Link to="/market/list" className="link">
                            <FontAwesomeIcon icon="fa-solid fa-store" />
                            <span>상품 모두보기</span></Link>
                        <Link to="/" className="link link_recipe">
                            <FontAwesomeIcon icon="fa-solid fa-bowl-food" />
                            <span>레시피 보러가기</span></Link>
                    </div>

                    <div className="sub">
                        <Link to="/market/cart" className="link">
                            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                            <span>장바구니</span></Link>
                        <Link to="/market/pay-history" className="link">
                            <FontAwesomeIcon icon="fa-solid fa-receipt" />
                            <span>구매 내역</span></Link>
                    </div>

                    {
                        loginedID !== '' ?
                            <>
                                <div className="user-mypage-link">
                                    <Link to="/mypage" className="link_mypage" title="마이페이지 바로가기">
                                        <div className="user-info">
                                            <span> {loginedID} </span>
                                            <span> 님 </span>
                                            {/* <img src="/imgs/logo/logo.png" alt="마이페이지" /> */}
                                            <img src={process.env.REACT_APP_SERVER_URL + `/home/ubuntu/user/upload/profile_imgs/${uId}/${uProfile}`} alt="" />
                                        </div>
                                    </Link>
                                </div>
                            </>
                            : null
                    }
                </div>
            </div>
        </nav>
    );
};

export default MarketNav;