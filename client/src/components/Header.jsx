import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { TbHome } from "react-icons/tb";
import { MdOutlineContactMail } from "react-icons/md";
import { CgUserlane } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDropright } from "react-icons/io";
import { LuSunMedium } from "react-icons/lu";
import { HiMoon } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../features/themeSlice';
import { signOutSuccess, signOutUserFailure } from '../features/userSlice';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { PiSignOutDuotone } from "react-icons/pi";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { motion } from 'framer-motion';






const Header = () => {

    const location = useLocation();
    const [toggleTheme, setToggleTheme] = useState(false);
    const [toggleNavBtn, setToggleNavBtn] = useState(false);
    const { user } = useSelector((state) => state.userSliceApp);
    const [dropDown, setDropDown] = useState(false);
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.themeSliceApp);








    const themeToggle = () => {
        setToggleTheme(!toggleTheme);
        dispatch(changeTheme());
    }


    // SignOut user Api : 

    const signOutHandle = async () => {

        try {

            const signOutUser = await axios.post(`/api/user/signoutuser`)

            if (signOutUser.data.success === true) {
                dispatch(signOutSuccess());
            }

        } catch (error) {
            signOutUserFailure(error);
        }


    }



    return (

        <>
            <nav className={` shadow-sm md:px-10 px-2 py-2 ${theme === 'dark' && 'shadow-lg border-b border-gray-700'}`}>

                {/* For larger screen devices : */}

                <div className='md:flex hidden justify-between z-10'>


                    <NavLink className="flex items-center cursor-pointer" to={'/'}>
                        <motion.h1 className='text-lg font-bold'
                            initial={{ y1: 1000 }}
                            animate={{ y: [-20, 0] }}
                            transition={{
                                duration: 1,
                                delay: 0
                            }}
                        >RKP.</motion.h1>
                        <motion.h1 className='text-xl font-semibold px-2  text-white rounded-md bg-gradient-to-r from-blue-400 via-blue-500 to-blue-000 '
                        >DEV</motion.h1>
                    </NavLink>

                    <div className="flex gap-5 font-semibold">



                        <div className="flex gap-1 text-sm items-center">
                            <span><CgUserlane size={20} className={`${location.pathname === '/about' && 'text-blue-00'}`} /></span>
                            <NavLink className={` ${location.pathname === '/about' && 'border-b-2 border-blue-600 text-blue-400'}`} to={'/about'}>
                                <motion.p
                                    initial={{ y1: 1000 }}
                                    animate={{ y: [-20, 0] }}
                                    transition={{
                                        duration: 1,
                                        delay: 0
                                    }}>About me
                                </motion.p>
                            </NavLink>
                        </div>
                    </div>

                    <div className="flex items-center relative">

                        <input type="text" name='' placeholder='Search...' className={`transition-all focus:bg-blue-50 py-2 px-4 outline-none rounded-md border border-gray-500  ${theme === 'dark' && ' transition-all focus:bg-gray-600  bg-gray-700'}`} />
                        <IoMdSearch size={19} color='gray' className='absolute right-2' />
                    </div>

                    <div className="flex items-center cursor-pointer rounded-full px-2" onClick={themeToggle}>

                        <span className=''>
                            {
                                toggleTheme
                                    ?
                                    <HiMoon size={28} className='active:animate-spin active:bg-gray-300 transition-all rounded-full py-1 px-1' />
                                    : <LuSunMedium size={28} className='active:animate-spin ' />
                            }
                        </span>
                    </div>

                    {
                        user ?
                            <div className=" cursor-pointer relative" onClick={() => setDropDown(!dropDown)}>
                                <img src={user && user.profilePicture} className='md:w-11 md:h-11 rounded-full' />

                                {/* Dropdown Menu  */}

                                {
                                    dropDown &&

                                    <div className={`absolute border  z-10 flex transition-all flex-col gap-2 w-28 text-center  rounded-md px-4 py-4 right-5 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-white border-2'}`}>



                                        <div className="flex gap-2">

                                            <CgProfile size={20} />

                                            <NavLink to={'/dashboard?tab=profile'} className='hover:text-blue-500 text-sm  font-semibold'>Profile</NavLink>
                                        </div>

                                        <hr />

                                        <div className="flex gap-2">
                                            <PiSignOutDuotone size={20} />
                                            <button className='hover:text-blue-500 text-sm font-semibold' onClick={() => signOutHandle()}>SignOut</button>
                                        </div>


                                    </div>
                                }

                            </div>



                            :
                            <div className="">
                                {location.pathname === `/login` || location.pathname === `/register` ? <></> :
                                    <NavLink to={'/login'} className='active:scale-95 transition-all flex items-center gap-1 bg-blue-600 font-semibold rounded-md px-2 py-2 text-white hover:bg-blue-700 active:bg-blue-800'>
                                        <span>Get started</span>
                                        <span><MdOutlineKeyboardDoubleArrowRight size={20} /></span>
                                    </NavLink>
                                }
                            </div>
                    }
                </div>


                {/* For smaller screen devices : */}

                <div className="md:hidden py-1 flex items-center justify-around ">

                    <div className="">
                        <NavLink className="flex items-center  cursor-pointer" to={'/'}>
                            <motion.h1 className='text-base font-bold'

                                initial={{ y1: 1000 }}
                                animate={{ y: [-20, 0] }}
                                transition={{
                                    duration: 1,
                                    delay: 0
                                }}>


                                RKP.</motion.h1>
                            <span className='text-xl font-semibold  px-2 text-white rounded-md bg-gradient-to-r from-blue-400 via-blue-600 to-blue-000 hover:from-pink-500 hover:to-yellow-500'>DEV</span>
                        </NavLink>
                    </div>


                    <button className="flex items-center">
                        <IoMdSearch size={25} className='active:scale-90 active:text-blue-600 transition-all' />
                    </button>

                    <div className="flex items-center cursor-pointer rounded-full " onClick={themeToggle}>

                        <span >{toggleTheme ? <HiMoon size={26} className='active:animate-spin' /> : <LuSunMedium size={26} className='active:animate-spin' />}</span>
                    </div>


                    {
                        user &&
                        <div className=" cursor-pointer relative" onClick={() => setDropDown(!dropDown)}>
                            <img src={user && user.profilePicture} className='w-9 h-9 rounded-full' />

                            {/* Dropdown Menu  */}

                            {
                                dropDown &&

                                <div className={`absolute border  z-10 flex transition-all flex-col w-36 gap-1 text-center  rounded-md px-4 py-4 right-0 top-14 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-200 border border-gray-400'}`}>



                                    <div className={`flex gap-2 py-2 items-center transition-all  px-2 rounded-md ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-400 hover:text-white'}`}>

                                        <CgProfile size={20} />

                                        <NavLink className={`transition-all `} to={'/dashboard?tab=profile'}>Profile</NavLink>
                                    </div>

                                    <hr />

                                    <div className={`flex gap-2 py-2 px-2 items-center transition-all rounded-md ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-400 hover:text-white'}`}>
                                        <PiSignOutDuotone size={20} />
                                        <button className='text-sm transition-all ' onClick={() => signOutHandle()}>SignOut</button>
                                    </div>


                                </div>
                            }

                        </div>
                    }

                    <div className=' cursor-pointer transition-all'>
                        <span className=" h-6 flex items-center  transition-all" onClick={() => setToggleNavBtn(!toggleNavBtn)}>
                            {
                                toggleNavBtn ? <AiOutlineClose size={20} className='active:animate-ping transition-all' /> : <RxHamburgerMenu size={20} className='active:animate-ping transition-all' />
                            }
                        </span>
                    </div>



                </div>

                {
                    toggleNavBtn &&

                    <div className=" md:hidden flex flex-col justify-center w-full items-center py-10 gap-5">

                        <div className="flex items-center gap-1">
                            <span><CgUserlane size={20} className={`${location.pathname === '/about' && 'text-blue-600'}`} /></span>
                            <NavLink to={'/about'} className={`${location.pathname === '/about' && 'border-b-2 border-blue-600 text-blue-600'}`} onClick={() => setToggleNavBtn(!toggleNavBtn)}>About me</NavLink>
                        </div>

                        {!user &&

                            <div className="flex items-center justify-center" onClick={() => setToggleNavBtn(!toggleNavBtn)}>
                                {location.pathname === `/login` || location.pathname === `/register` ? <></> :
                                    <NavLink to={'/login'} className='active:scale-95 transition-all flex items-center gap-1 bg-blue-600 font-semibold rounded-md px-2 py-2 text-white hover:bg-blue-700 active:bg-blue-800'>
                                        <span>Get started</span>
                                        <span><MdOutlineKeyboardDoubleArrowRight size={20} /></span>
                                    </NavLink>
                                }
                            </div>
                        }


                    </div>
                }

            </nav>




        </>
    )
}
export default Header