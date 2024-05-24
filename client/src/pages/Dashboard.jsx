import DashboardSidebar from "../components/DashboardSidebar"
import DashboardProfile from "../components/DashboardProfile"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import AllBlogs from '../components/AllBlogs';


const Dashboard = () => {


    const location = useLocation();
    const [tab, setTab] = useState('');



    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const getTab = urlParams.get('tab');
        setTab(getTab)

    }, [location.search]);











    return (
        <>
            <div className="flex md:flex-row flex-col ">
                {/* Sidebar  */}
                <div>
                    <DashboardSidebar />
                </div>

                {/* Profile */}
                <div className={`${tab === 'profile' && 'flex justify-center w-full'}`}>
                    {tab === 'profile' && <DashboardProfile />}
                </div>

                <div className={`${tab === 'blogs' && 'flex justify-center w-full'}`}>
                    {tab === 'blogs' && <AllBlogs />}
                </div>
            </div>
        </>
    )
}
export default Dashboard