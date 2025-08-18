import React from 'react';
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import SideBar from './UserDashboard/SideBar';

const Layout2 = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex'>
                <div className='w-1/5'>
                    <SideBar></SideBar>
                </div>
                <div className='ml-10 w-4/5'>
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    );
};

export default Layout2;
<Navbar></Navbar>