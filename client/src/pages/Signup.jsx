import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/spinner/Spinner';
import OAth from '../components/OAth';




const Signup = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [signupInfo, setSignupInfo] = useState({

        username: '',
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });

    };

    const submitHandle = (e) => {
        e.preventDefault();
        formValidation(signupInfo);
    }

    // Form validation : 

    const formValidation = async (signupInfo) => {

        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!signupInfo.username) {
            toast.error('Username can not be blanked!');
            return false;
        } else if (signupInfo.username.length < 4) {
            toast.error('Username can not be less than 4 char!');
            return false;
        } else if (signupInfo.username.length > 30) {
            toast.error('Username can not exceed 15 char!');
            return false;
        } else if (!signupInfo.email) {
            toast.error('Email can not be empty!');
            return false;
        } else if (!regEx.test(signupInfo.email)) {
            toast.error('Please enter a valid email!');
            return false;
        } else if (!signupInfo.password) {
            toast.error('Password can not empty!');
            return false;
        } else if (signupInfo.password.length < 6) {
            toast.error('Password can not be less than 6 char!');
            return false;
        } else if (signupInfo.password.length > 25) {
            toast.error('Password can not exceed 25 char!');
            return false;
        } else {
            try {
                setLoading(true);
                const response = await axios.post(`http://localhost:8000/api/user/signup`, signupInfo);
                setLoading(false);
                if (response.status === 200) {
                    toast.success('User has been registered')

                    setSignupInfo({
                        username: '',
                        email: '',
                        password: ''
                    })
                    navigate('/signin');
                    return true;
                }
                return response.data;
            } catch (error) {
                setLoading(false);
                if (error.response.status === 400) {
                    toast.error('User is already registered!');
                    setSignupInfo({
                        username: '',
                        email: '',
                        password: ''
                    })
                    return false;
                } else if (error.response.status === 500) {
                    toast.error('Internal Server Error!');
                    setLoading(false);
                    return false;
                }
            }
        }
    }




    return (
        <>
            <div className="md:flex justify-center items-center w-full md:gap-5  pt-20">
                {/* Left content  */}
                <div className="flex flex-col items-center md:items-start justify-center">

                    <div className="pb-3">
                        <span className='bg-gradient-to-r from-red-500 via-orange-400 to-red-500 py-1 px-2 rounded-md font-bold md:text-xl text-lg text-white'>Rakesh's</span>
                        <span className='font-bold text-xl'>Blog</span>
                    </div>

                    <div className="text-xs md:text-sm text-gray-800 flex flex-col gap-1">
                        <p className=' '>Click on the "Sign Up" button to begin your journey.</p>
                        <p className=''>You can signup with email and password or with google.</p>
                    </div>

                </div>

                {/* Right Content  */}

                <div className="items-center justify-center md:pt-0 pt-10 flex">

                    <form className=' flex flex-col gap-2 w-full px-5 md:w-96' onSubmit={submitHandle}>

                        <div className="flex flex-col">
                            <label className='text-sm'>Your username</label>
                            <input type='text' placeholder='Your user name' className='outline-none rounded-md py-1 px-3 border' onChange={changeHandler} name='username' value={signupInfo.username} />
                        </div>

                        <div className="flex flex-col">
                            <label className='text-sm'>Your email</label>
                            <input type="email" placeholder='Youremail@gmail.com' className='outline-none rounded-md py-1 px-3 border' onChange={changeHandler} name='email' value={signupInfo.email} />
                        </div>

                        <div className="flex flex-col ">
                            <label className='text-sm'>Your password</label>
                            <input type="password" placeholder='Password' className='outline-none rounded-md py-1 px-3 border' onChange={changeHandler} name='password' value={signupInfo.password} />

                            <button type='submit' disabled={loading} className='bg-gradient-to-r from-red-500 via-orange-400 to-red-500 py-1 px-2 mt-3 rounded-md font-semibold text-white active:scale-95 transition-all'>{loading === true ? <Spinner color='white' /> : <p className='transition-all'>Sign Up</p>}</button>

                            <OAth />

                            <p className='text-xs md:text-sm pt-5'>Already have an account ? <NavLink to={'/signin'} className='text-blue-500 hover:underline hover:cursor-pointer'>SignIn</NavLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;