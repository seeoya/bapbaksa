import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './include/Header';
import Nav from './include/Nav';
import Footer from './include/Footer';


const MainLayout = () => {
  return (
        <>
            <Header />
            <Nav />       
            <div className="container">             
              <Outlet />
            </div>
            <Footer />         
        </>
      
  );
}

export default MainLayout;