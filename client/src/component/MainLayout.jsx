import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './include/Footer';
import Header from './include/Header';
import Nav from './include/Nav';
import ScrollMoveBtn from './include/ScrollMoveBtn';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Nav />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
            <ScrollMoveBtn />
        </>

    );
}

export default MainLayout;