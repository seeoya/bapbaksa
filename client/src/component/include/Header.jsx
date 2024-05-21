import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchRecipe } from "../../redux/actions/recipe_action";
import { getToken } from "../../storage/loginedToken";



const Header = () => {
    const dispatch = useDispatch();

    const [isLogined, setIsLogined] = useState(false);

    useEffect(() => {

        let loginedUId = getToken('loginedUId');
        console.log('loginedUIdString', loginedUId);

        if (loginedUId !== null) {
            setIsLogined(true);
        }

    }, [isLogined]);

    const recipeSearchChangeEvent = (e) => {
        dispatch(searchRecipe(e.target.value))
    }

    const searchBtnClickEvent = (e) => {
        document.getElementById("recipe_search").value = ""
    }

    return (
        <header id="recipe-header">
            <div className="header-wrap">
                <div className="header-menu">
                    <div className="logo">
                        <Link to="/" className="link">
                            <img src="/imgs/logo/logo.png" alt="밥박사" />
                        </Link>
                    </div>

                    <div className="search">
                        <input type="search" id="recipe_search" className="input" placeholder="재료나 레시피로 검색하세요!" onChange={(e) => recipeSearchChangeEvent(e)} />
                        <Link to={"/recipe/list"} onClick={(e) => searchBtnClickEvent(e)} className="btn main">검색</Link>
                    </div>
                </div>

                <div className="user-menu">
                    <div className="nav">
                        {isLogined ? (
                            <>
                                <Link to="/question" className="link">고객문의</Link>
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
export default Header;
