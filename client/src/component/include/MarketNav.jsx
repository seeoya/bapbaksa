import React from 'react';
import { Link } from "react-router-dom";

const MarketNav = () => {
  return (
    <nav>            
            <div id="market-category-wrap" className="category-wrap">
                <div className="header-category">            
                    <div className="market">
                        <Link to="/market/list" className="link">Market Nav</Link>                       
                    </div>
                    <div className="recipe">
                        <Link to="/" className="link">레시피&nbsp;&nbsp;가기</Link>
                    </div>
                </div>
            </div>
        </nav>
  );
};

export default MarketNav;