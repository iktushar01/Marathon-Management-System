import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import SmoothFollower from '../Shared/Cursor/SmoothFollower';

const MainLayout = () => {
    return (
        <div>
            <SmoothFollower></SmoothFollower>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;