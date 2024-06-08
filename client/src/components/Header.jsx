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

            const signOutUser = await axios.post(`http://localhost:8000/api/user/signoutuser`)

            if (signOutUser.data.success === true) {
                dispatch(signOutSuccess());
            }

        } catch (error) {
            signOutUserFailure(error);
        }


    }



    return (
        <>



            <nav className={` shadow-sm md:px-10 px-2 py-4 ${theme === 'dark' && 'shadow-lg border-b border-gray-700'}`}>

                {/* For larger screen devices : */}

                <div className='md:flex hidden justify-between z-10'>


                    <NavLink className="flex items-center gap-1 cursor-pointer" to={'/'}>
                        <h1 className='text-lg font-bold'>RKP.</h1>
                        <span className='text-xl font-semibold py-1 px-4 text-white rounded-md bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-pink-500 hover:to-yellow-500'>DEV</span>
                    </NavLink>

                    <div className="flex gap-5 font-semibold">



                        <div className="flex items-center">
                            <span><CgUserlane size={20} className={`${location.pathname === '/about' && 'text-blue-600'}`} /></span>
                            <NavLink className={`${location.pathname === '/about' && 'border-b-2 border-blue-600 text-blue-600'}`} to={'/about'}>About</NavLink>
                        </div>

                        <div className="flex items-center">
                            <span><MdOutlineContactMail size={18} className={`${location.pathname === '/contact' && 'text-blue-600'}`} /></span>
                            <NavLink className={`${location.pathname === '/contact' && 'border-b-2 border-blue-600 text-blue-600'}`} to={'/contact'}>Contact</NavLink>
                        </div>
                    </div>

                    <div className="flex items-center relative">

                        <input type="text" name='' placeholder='Search...' className={`transition-all focus:bg-blue-50 py-2 px-4 outline-none rounded-md border border-gray-500  ${theme === 'dark' && ' transition-all focus:bg-gray-600  bg-gray-700'}`} />
                        <IoMdSearch size={19} color='gray' className='absolute right-2' />
                    </div>

                    <div className="flex items-center cursor-pointer rounded-full px-2   border-2 border-blue-400" onClick={themeToggle}>

                        <span className=''>
                            {
                                toggleTheme
                                    ?
                                    <HiMoon size={22} className='active:animate-spin' />
                                    : <LuSunMedium size={22} className='active:animate-spin' />
                            }
                        </span>
                    </div>

                    {
                        user ?
                            <div className=" cursor-pointer relative" onClick={() => setDropDown(!dropDown)}>
                                <img src={user && user.profilePicture} alt="img" className='w-10 h-10 border-2 border-blue-500 rounded-full' />

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

                <div className="md:hidden flex items-center justify-around ">

                    <div className="">
                        <NavLink className="flex items-center gap-1 cursor-pointer" to={'/'}>
                            <h1 className='text-base font-bold'>RKP.</h1>
                            <span className='text-xl font-semibold py-1 px-2 text-white rounded-md bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-pink-500 hover:to-yellow-500'>DEV</span>
                        </NavLink>
                    </div>


                    <button className="flex items-center">
                        <IoMdSearch size={25} className='active:scale-90 active:text-blue-600 transition-all' />
                    </button>

                    <div className="flex items-center cursor-pointer rounded-full py-1 px-1 border border-blue-400" onClick={themeToggle}>

                        <span >{toggleTheme ? <HiMoon size={22} className='active:animate-spin' /> : <LuSunMedium size={22} className='active:animate-spin' />}</span>
                    </div>


                    <div className=' cursor-pointer transition-all'>
                        <span className=" h-6 flex items-center active:animate-spin transition-all" onClick={() => setToggleNavBtn(!toggleNavBtn)}>
                            {
                                toggleNavBtn ? <AiOutlineClose size={20} className='active:animate-spin' /> : <RxHamburgerMenu size={20} className='active:animate-spin' />
                            }
                        </span>
                    </div>

                </div>

                {
                    toggleNavBtn &&

                    <div className=" md:hidden flex flex-col justify-center w-full items-center py-10 gap-5">

                        <div className="flex items-center gap-1">
                            <span><CgUserlane size={20} className={`${location.pathname === '/about' && 'text-blue-600'}`} /></span>
                            <NavLink to={'/about'} className={location.pathname === '/about' && 'border-b-2 border-blue-600 text-blue-600'} onClick={() => setToggleNavBtn(!toggleNavBtn)}>About</NavLink>
                        </div>

                        <div className="flex items-center gap-1">
                            <span><MdOutlineContactMail size={18} className={`${location.pathname === '/contact' && 'text-blue-600'}`} /></span>
                            <NavLink to={'/contact'} className={location.pathname === '/contact' && 'border-b-2 border-blue-600 text-blue-600'} onClick={() => setToggleNavBtn(!toggleNavBtn)}>Contact</NavLink>
                        </div>

                        <div className="flex items-center gap-1 border-blue-600 border rounded-md px-3 hover:bg-blue-200 cursor-pointer py-2">
                            <NavLink onClick={() => setToggleNavBtn(!toggleNavBtn)} to={'/login'}>Login</NavLink>
                            <span><IoIosArrowDropright /></span>
                        </div>

                        <div className="flex items-center gap-1 bg-blue-600 text-white rounded-md px-2 py-2 cursor-pointer">
                            <NavLink onClick={() => setToggleNavBtn(!toggleNavBtn)} to={'/register'}>Register</NavLink>
                            <span><FaRegUserCircle /></span>
                        </div>
                    </div>
                }

            </nav>




        </>
    )
}
export default Header