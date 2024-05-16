import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../storage/loginedToken";

const MarketHeader = () => {

    const [isLogined, setIsLogined] = useState(false);
    const [searchVal,setSearchVal] = useState('');
    useEffect(() => {
     
        let loginedUId = getToken('loginedUId');
        console.log('loginedUIdString', loginedUId);

        if(loginedUId !== null) {
            setIsLogined(true);
        }

    }, [isLogined]);

    const searchBtnClick = () => {
        console.log('서치 버튼 클릭');
        setSearchVal('');
    }


  return (
    <header>
    <div id="market-header-wrap" className="header-wrap">
        <div className="header-menu">
            <div className="logo">
                <Link to="/" className="link">
                    <img src="/imgs/logo/logo.png" alt="밥박사" />
                </Link>
            </div>

            <div className="search">
                <form action="" name="search_form" method="get">
                    <input type="search" name="search" className="input" placeholder="검색어를 입력하세요." value={searchVal} onChange={(e)=> setSearchVal(e.target.value)}/>
                    <Link to={`/market/list?search=${searchVal}`} state={{ searchVal: searchVal }}>
                        <button type="submit" className="btn sub" onClick={searchBtnClick}>검색</button>
                    </Link>
                </form>
            </div>
        </div>

        <div className="user-menu">
            <div className="nav">
            { isLogined ? (
                            <>
                            <Link to="/admin/qna" className="link">고객문의</Link>
                            <Link to="/user/modify" className="link">정보수정</Link>
                            <Link to="/user/signout" className="link">로그아웃</Link>
                            </>
                        )
                            :
                        (
                            <>
                            <Link to="/user/signup" className="link">회원가입</Link>
                            <Link to="/user/signin" className="link">로그인</Link>
                            </>
                        )
                        }
            </div>
        </div>
    </div>
</header>
);
};

export default MarketHeader;