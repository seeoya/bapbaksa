import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {

    return (
        <nav>            
            <div id="main-category-wrap" className="category-wrap">
                <div className="header-category">            
                    <div className="recipe">
                        <Link to="/recipe/list" className="link">레시피</Link>
                        <Link to="/styleguide" className="link">StyleGuide</Link>
                    </div>
                    <div className="market">
                        <Link to="/market" className="link">Market&nbsp;&nbsp;가기</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Nav;