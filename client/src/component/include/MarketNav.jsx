import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../storage/loginedToken";


const MarketNav = () => {

    const [loginedID, setLoginedID] = useState('');
    const [uProfile, setUProfile] = useState('');
    const [isProfile, setIsProfile] = useState(false);

    useEffect(() => {
        let loginedUId = getToken('loginedUId');
        let uProfile = getToken('uProfile');

        if (loginedUId !== null) {
            setLoginedID(loginedUId);
            if(uProfile !== null){
            setUProfile(uProfile);
            setIsProfile(true);
            }
        }

    }, [loginedID, uProfile, isProfile]);

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
                                            {isProfile ? <>
                                                <img src={`/imgs/upload/profile_imgs/${loginedID}/${uProfile}`} alt="profile" />
                                                </>
                                                :
                                                <>
                                                    <img src="/imgs/logo/market_logo.png" alt="마이페이지" />
                                                </>}
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