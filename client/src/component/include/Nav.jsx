import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../storage/loginedToken";

const Nav = () => {

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
            <div id="main-category-wrap" className="category-wrap">
                <div className="header-category">
                    <div className="recipe">
                        <Link to="/recipe/list" className="link">레시피 리스트</Link>
                        <Link to="/recipe/view/1" className="link">레시피 상세</Link>
                        <Link to="/mypage/myfridge" className="link">내 냉장고</Link>
                        <Link to="/styleguide" className="link">StyleGuide</Link>
                    </div>
                    <div className="market">
                        <Link to="/market" className="link link_market">마켓 가기</Link>
                    </div>
                    { loginedID !== '' ?
                    <>
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
                    </>
                    :
                    <>
                    </>

                    }
                </div>
            </div>
        </nav>
    );
};
export default Nav;