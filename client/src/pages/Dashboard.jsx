import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardProfile from '../components/DashboardProfile';



const Dashboard = () => {

    const location = useLocation();

    const [tab, setTab] = useState('');

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const paramsInfo = urlParams.get('tab');
        setTab(paramsInfo);
    }, [location.search])




    return (
        <>
            <div className="min-h-screen flex-col md:flex-row flex">

                {/* Dashboard Sidebar  */}
                <div className="">
                    <DashboardSidebar />
                </div>

                {/* Dashboard Profile  */}
                <div className="">
                    {tab === 'profile' && <DashboardProfile />}
                </div>

            </div>
        </>
    )
}

export default Dashboard