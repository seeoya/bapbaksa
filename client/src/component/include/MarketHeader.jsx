import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../storage/loginedToken";
import { useDispatch } from "react-redux";
import { searchMarket } from "../../redux/actions/market"

const MarketHeader = () => {

    const [isLogined, setIsLogined] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        let loginedUId = getToken('loginedUId');
        console.log('loginedUIdString', loginedUId);

        if (loginedUId !== null) {
            setIsLogined(true);
        }

    }, [isLogined]);

    const searchBtnClickEvent = (e) => {
        document.getElementById("market_search").value = ""
    }

    const marketSearchChangeEvent = (e) => {
        dispatch(searchMarket(e.target.value))
    }

    return (
    <header id="market-header">
    <div id="market-header-wrap" className="header-wrap">
        <div className="header-menu">
            <div className="logo">
                <Link to="/" className="link">
                    <img src="/imgs/logo/logo.png" alt="밥박사" />
                </Link>
            </div>

                    <div className="search">
                        <input id="market_search" type="search" name="search" className="input" placeholder="검색어를 입력하세요." onChange={(e) => marketSearchChangeEvent(e)} />
                        <Link to={`/market/list`} state={{ searchVal: searchVal }} onClick={searchBtnClickEvent} className="btn sub">
                            검색
                        </Link>
                    </div>
                </div>

                <div className="user-menu">
                    <div className="nav">
                        {isLogined ? (
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