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
    <nav>            
            <div id="market-category-wrap" className="category-wrap">
                <div className="header-category">            
                    <div className="market">                        
                        <Link to="/market/list" className="link">리스트 가기</Link>
                        <Link to="/market/cart" className="link">장바구니 가기</Link>
                        <Link to="/market/pay-history" className="link">결제 내역 가기</Link>
                    </div>
                    <div className="recipe">
                        <Link to="/" className="link_recipe">레시피&nbsp;&nbsp;가기</Link>
                    </div>
                    <div className="user-mypage-link">      
                    
                        <Link to="/mypage" className="link_mypage" title="마이페이지 바로가기">
                            <div className="user-info">
                                <span> {loginedID} </span>
                                <span> 님 </span>                        
                                <img src="/imgs/logo/logo.png" alt="마이페이지"/>
                                {/*<img src={process.env.REACT_APP_SERVER_URL + `/home/ubuntu/user/upload/profile_imgs/${uId}/${uProfile}`} alt="" />*/}
                            </div>            
                        </Link>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MarketNav;