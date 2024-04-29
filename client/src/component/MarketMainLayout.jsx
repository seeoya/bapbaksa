import React from 'react';
import { Outlet } from 'react-router-dom';
import MarketHeader from './include/MarketHeader';
import MarketNav from './include/MarketNav';
import Footer from './include/Footer';

const MarketLayout = () => {
  return (
        <>
          <MarketHeader />
          <MarketNav />     
        <div className="container">             
            <Outlet />
        </div>
          <Footer />
        </>
    
  );
};

export default MarketLayout;