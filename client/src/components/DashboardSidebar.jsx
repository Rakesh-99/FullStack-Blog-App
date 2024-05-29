import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { signOutSuccess, signOutUserFailure } from '../features/userSlice';
import axios from 'axios';
import { MdPostAdd } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { IoCloseCircle } from "react-icons/io5";

const DashboardSidebar = () => {

    const { theme } = useSelector((state) => state.themeSliceApp);
    const { user } = useSelector((state) => state.userSliceApp);
    const dispatch = useDispatch();

    const location = useLocation();
    const [tab, setTab] = useState('');








    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const getTab = urlParams.get('tab');
        setTab(getTab);
    }, [location.search]);



    // SignOut User POST API :
    const signOutHandle = async () => {

        try {
            const signOutUser = await axios.post(`http://localhost:8000/api/user/signoutuser`);

            if (signOutUser.data.success === true) {
                dispatch(signOutSuccess());
            }

        } catch (error) {
            dispatch(signOutUserFailure(error));
        }
    }






    return (
        <>
            <div className={`transition-all border w-full py-4 border-r   md:w-60  md:min-h-screen ${theme === 'dark' ? 'border-slate-700' : 'border-gray-300'}`} >




                <NavLink to={'?tab=profile'} className={`flex mb-4 items-center justify-center gap-2 cursor-pointer transition-all ${tab === 'profile' && 'bg-gray-600 mx-3 text-white rounded-md py-2 '}`} >



                    <span><CgProfile size={25} /></span>
                    <div className='flex gap-2 items-center'>
                        <p>Profile</p>
                        <span className='bg-gray-900 py-1 px-1 rounded-md text-blue-300 text-xs'>
                            {user.isAdmin ? 'Admin' : 'User'}
                        </span>
                    </div>
                </NavLink>


                {/* Conditionally rendering for admin access only  */}
                {
                    user && user.isAdmin
                    &&
                    <NavLink to={'?tab=blogs'} className={`flex  justify-center gap-2 items-center my-4 ${tab === 'blogs' && 'bg-gray-600 mx-3 text-white rounded-md py-2 '}`}>
                        <span><MdPostAdd size={25} /></span>
                        <span>All Blogs</span>
                    </NavLink>
                }


                <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={signOutHandle}>
                    <span><CiLogout size={22} /></span>
                    <span>Sign out</span>
                </div>

            </div>
        </>
    )
}
export default DashboardSidebar