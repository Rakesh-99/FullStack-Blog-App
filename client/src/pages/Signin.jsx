import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Spinner from '../components/spinner/Spinner';
import { RiErrorWarningFill } from "react-icons/ri";
import OAth from '../components/OAth';




const Signin = () => {

    const { loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [signInInfo, setSignInInfo] = useState({

        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setSignInInfo({ ...signInInfo, [name]: value });

    };

    const submitHandle = (e) => {
        e.preventDefault();
        formValidation(signInInfo);
    }

    // Form validation : 

    const formValidation = async (signInInfo) => {

        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!signInInfo.email) {
            toast.error('Email can not be empty!');
            return false;
        } else if (!regEx.test(signInInfo.email)) {
            toast.error('Please enter a valid email!');
            return false;
        } else if (!signInInfo.password) {
            toast.error('Password can not empty!');
            return false;
        } else if (signInInfo.password.length < 6) {
            toast.error('Password can not be less than 6 char!');
            return false;
        } else if (signInInfo.password.length > 25) {
            toast.error('Password can not exceed 25 char!');
            return false;
        } else {

            try {

                dispatch(signInStart());

                const signInReq = await axios.post('http://localhost:8000/api/user/signin', signInInfo);

                if (signInReq.status === 200) {
                    dispatch(signInSuccess(signInReq.data.user));
                    navigate('/');
                }
            } catch (error) {
                dispatch(signInFailure(error.response.data.message));
            }
        }
    }

    return (
        <>
            <div className="md:flex justify-center items-center w-full md:gap-5  min-h-screen pt-20 md:pt-0">
                {/* Left content  */}


                <div className="flex flex-col items-center md:items-start justify-center">

                    <div className="pb-3">
                        <span className='bg-gradient-to-r from-green-400 via-green-700 to-green-400 py-1 px-2 rounded-md font-bold md:text-xl text-lg text-white'>Rakesh's</span>
                        <span className='font-bold text-xl'>Blog</span>
                    </div>

                    <div className="text-xs md:text-sm  flex flex-col gap-1">
                        <p className=' '>Click on the "Sign in" button to begin your journey.</p>
                        <p className=''>You can sign in with email and password or with google.</p>
                    </div>

                </div>

                {/* Right Content  */}

                <div className="items-center justify-center md:pt-0 pt-10 flex">

                    <form className=' flex flex-col gap-2 w-full px-5 md:w-96' onSubmit={submitHandle}>

                        <div className="flex flex-col">
                            <label className='text-sm'>Your email</label>
                            <input type="email" placeholder='Youremail@gmail.com' className='outline-none rounded-md py-1 px-3 border' onChange={changeHandler} name='email' value={signInInfo.email} />
                        </div>

                        <div className="flex flex-col ">
                            <label className='text-sm'>Your password</label>
                            <input type="password" placeholder='Password' className='outline-none rounded-md py-1 px-3 border' onChange={changeHandler} name='password' value={signInInfo.password} />

                            <button type='submit' className='bg-gradient-to-r from-green-400 via-green-700 to-green-400 py-1 px-2 mt-3 rounded-md font-semibold text-white active:scale-95 transition-all'>{loading === true ? <Spinner color='white' /> : <p className='transition-all'>Sign In</p>}</button>

                            <div className="">
                                <p className='text-sm pt-2'>Forgot password ? <NavLink className='text-blue-500 hover:underline text-sm'>Click here</NavLink></p>
                            </div>

                            <OAth />

                            <p className='text-xs md:text-sm pt-5'>Don't have an account ?<NavLink to={'/signup'} className='text-blue-500 hover:underline hover:cursor-pointer'>Signup</NavLink></p>

                            {
                                error && <span className='bg-red-500 flex justify-center items-center gap-x-2 text-white text-center rounded-sm py-1 mt-3 text-sm'> <span><RiErrorWarningFill size={20} /></span>{error}</span>
                            }
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin;