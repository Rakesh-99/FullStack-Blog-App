import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";




const Header = () => {

    const [toggleHamMenu, setToggleHamMenu] = useState(false);
    const [themeToggle, setThemeToggle] = useState(false);


    const location = useLocation();


    const toggleHamBurger = () => {
        setToggleHamMenu(!toggleHamMenu);

    }

    const toggleTheme = () => {
        setThemeToggle(!themeToggle);
    }




    return (

        <>
            <nav className='px-3 py-3 border shadow-sm sticky top-0 left-0 '>

                {/* For larger screen devices  */}
                <div className='hidden md:flex items-center justify-around ' >

                    <NavLink className="flex gap-1 items-center" to={'/'}>
                        <span className='bg-gradient-to-r from-indigo-400 via-purple-600 to-indigo-400 py-1 px-2 rounded-md font-semibold text-white'>Rakesh's</span>
                        <span className='font-semibold'>Blog</span>
                    </NavLink>

                    <div className="relative items-center flex">
                        <input type="text" className='relative border py-1 px-2 rounded-sm w-52 outline-none text-black' placeholder='Search...' />

                        <IoSearch size={19} color='gray' className='absolute right-2 ' />
                    </div>

                    <div className="flex gap-5">

                        <NavLink to={'/'} className={`${location.pathname === '/' && 'border-b-2 border-green-600'}`}>Home</NavLink>

                        <NavLink to={'/about'} className={`${location.pathname === '/about' && 'border-b-2 border-green-500'}`}>About</NavLink>

                        <NavLink to={'/contact'} className={`${location.pathname === '/contact' && 'border-b-2 border-green-500'}`}>Contact</NavLink>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={toggleTheme}>{themeToggle ? <MdSunny size={23} /> : <IoIosMoon size={23} />}</button>
                        <NavLink to={'/signin'} className='border-2 px-2 text-sm py-1 text-black rounded-md border-green-600 hover:bg-gradient-to-r from-green-400 via-green-700 to-green-400 hover:text-white active:scale-90 transition-all '>Sign In</NavLink>
                    </div>
                </div>


                {/* For smaller screen devices  */}

                <div className='md:hidden flex justify-around'>

                    <div className="flex items-center gap-1">
                        <span className=' bg-gradient-to-r from-indigo-400 via-purple-600 to-indigo-400 py-1 px-2 rounded-md font-semibold text-white'>Rakesh's</span>
                        <span className='font-semibold'>Blog</span>
                    </div>


                    <div className="flex gap-5 items-center">

                        <button className='w-7 h-7 max-[400px]:w-6 max-[400px]:h-6  bg-white active:bg-gray-300 rounded-3xl px-1 flex items-center justify-center'>
                            <IoSearch color='black ' size={25} className='cursor-pointer' />
                        </button>
                    </div>


                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme}>
                            {
                                themeToggle ? <MdSunny size={20} /> : <IoIosMoon size={20} />
                            }
                        </button>

                        <button onClick={toggleHamBurger}>
                            {toggleHamMenu
                                ?
                                <IoCloseSharp size={23} className='active:animate-ping' />
                                : <IoMenu size={23} className='active:animate-ping' />
                            }
                        </button>
                    </div>
                </div>


                {
                    toggleHamMenu &&

                    <div className="md:hidden flex flex-col px-20 gap-5 py-10 ">

                        <NavLink to={'/'} className={`${location.pathname === '/' && 'border-b border-green-500'}`} onClick={toggleHamBurger}>Home</NavLink>

                        <NavLink to={'/about'} className={`${location.pathname === '/about' && 'border-b border-green-500'}`} onClick={toggleHamBurger}>About</NavLink>

                        <NavLink to={'/contact'} className={`${location.pathname === '/contact' && 'border-b border-green-500'}`} onClick={toggleHamBurger}>Contact</NavLink>

                        <button className='border-2 px-2 text-sm py-1 text-black rounded-md border-violet-600 hover:bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 hover:text-white active:scale-95 transition-all'>
                            Sign In
                        </button>

                        <div className="">
                            <span className='absolute bottom-0 left-1/2'><IoEllipsisHorizontalOutline size={40} onClick={toggleHamBurger} className='active:animate-spin active:text-green-400 cursor-pointer' /></span>
                        </div>

                    </div>
                }
            </nav>
        </>
    )
}

export default Header;