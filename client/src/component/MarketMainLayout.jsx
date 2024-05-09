import React from 'react';
import { Outlet } from 'react-router-dom';
import "../css/style.css";
import Footer from './include/Footer';
import MarketHeader from './include/MarketHeader';
import MarketNav from './include/MarketNav';
import ScrollMoveBtn from './include/ScrollMoveBtn';

const MarketMainLayout = () => {
    return (
        <>
            <MarketHeader />
            <MarketNav />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
            <ScrollMoveBtn />
        </>

    );
};

export default MarketMainLayout;