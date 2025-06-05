import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer/Footer';
import SmoothFollower from '../Shared/Cursor/SmoothFollower';

const DashBoardLayout = () => {
    return (
        <div>
            <SmoothFollower></SmoothFollower>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DashBoardLayout;