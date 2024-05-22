import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../storage/loginedToken";

const Nav = () => {

    const [loginedID, setLoginedID] = useState('');    
    const [uProfile, setUProfile] = useState('');
    const [isProfile, setIsProfile] = useState(false);

    useEffect(() => {
        let loginedUId = getToken('loginedUId');
        let uProfile = getToken('uProfile');
        console.log('loginedUIdString', loginedUId);

        if (loginedUId !== null) {
            setLoginedID(loginedUId);
        } else if(uProfile !== null) {            
            setUProfile(uProfile);
            setIsProfile(true);
        }
    }, [loginedID, uProfile, isProfile]);


    return (
        <nav>
            <div id="main-category-wrap" className="category-wrap">
                <div className="header-category">
                    <div className="main">
                        <Link to="/recipe/list" className="link">
                            <FontAwesomeIcon icon="fa-solid fa-bowl-food" />
                            <span>레시피 모두보기</span>
                        </Link>
                        <Link to="/market" className="link link_market">
                            <FontAwesomeIcon icon="fa-solid fa-store" />
                            <span>마켓 보러가기</span>
                        </Link>
                    </div>

                    <div className="sub">
                        <Link to="/mypage/myfridge" className="link">
                            <FontAwesomeIcon icon="fa-solid fa-carrot" />
                            <span>내 냉장고</span></Link>
                        <Link to="/mypage/like" className="link">
                            <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                            <span>좋아하는 레시피</span></Link>
                    </div>
                    {loginedID !== '' ?
                        <>
                            <div className="user-mypage-link">
                                <Link to="/mypage" className="link_mypage" title="마이페이지 바로가기">
                                    <div className="user-info">
                                        <span> {loginedID} </span>
                                        <span> 님 </span>
                                        {isProfile ? <>                                       
                                        <img src={process.env.REACT_APP_SERVER_URL + `/home/ubuntu/user/upload/profile_imgs/${loginedID}/${uProfile}`} alt="profile" />
                                        </>
                                        :
                                        <>
                                        <img src="/imgs/logo/logo.png" alt="마이페이지" />
                                        </>}
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