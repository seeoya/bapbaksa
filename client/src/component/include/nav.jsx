import React from "react";
import { Link } from "react-router-dom";
import StyleGuide from './../StyleGuide';

const Nav = () => {
    
    return (
        <nav>            
          <div className="header-category">               
                        <Link to="/recipe/list" className="link">레시피</Link>
                        <Link to="/styleguide" className="link">StyleGuide</Link>                
                        <Link to="/market" className="link_market">Market 가기</Link>               
          </div>
        </nav>

    );
};

export default Nav;