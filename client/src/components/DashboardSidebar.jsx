import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";



const DashboardSidebar = () => {


    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const ulrParams = new URLSearchParams(location.search);
        const urlInfo = ulrParams.get('tab');
        setTab(urlInfo);
    }, [location.search]);

    return (
        <>
            <div className="">
                <Sidebar className='w-full md:w-56'>
                    <Sidebar.Items className='min-h-screen'>
                        <Sidebar.ItemGroup >

                            <NavLink to={'/dashboard?tab=profile'}>
                                <Sidebar.Item label={'user'} active={tab === 'profile'} className='border cursor-pointer' labelColor='dark'>
                                    <div className="flex items-center gap-3">
                                        <span><FaRegUserCircle /></span>
                                        <span>Profile</span>
                                    </div>
                                </Sidebar.Item>
                            </NavLink>

                            <Sidebar.Item className='cursor-pointer border'>
                                <div className="flex items-center  gap-3">
                                    <span><VscSignOut /></span>
                                    <span>Sign out</span>
                                </div>
                            </Sidebar.Item>

                        </Sidebar.ItemGroup>

                    </Sidebar.Items>
                </Sidebar>
            </div>
        </>
    )
}

export default DashboardSidebar