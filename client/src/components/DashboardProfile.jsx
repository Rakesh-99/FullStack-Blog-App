import React, { useState } from 'react';
import userImg from '../assets/user.jpg';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';







const DashboardProfile = () => {

    const dispatch = useDispatch();
    const { username, password, email, profilePicture } = useSelector(state => state.user.user);

    const [imageFile, setImageFile] = useState('');



    const [formInfo, setFormInfo] = useState({
        username: username,
        email: email,
        password: password
    })


    const submitHandle = (e) => {
        e.preventDefault();
        validateForm(formInfo)
    };

    const inputChange = (e) => {

        const { name, value } = e.target;

        setFormInfo({
            ...formInfo,
            [name]: value
        })
    };


    const validateForm = async (formData) => {

        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        // Username Validation : 
        if (!formData.username) {
            toast.error('Username is required!');
            return false;
        } else if (formData.username.length < 4) {
            toast.error('Username can not be less than 4 char!');
            return false;
        } else if (formData.username.length > 30) {
            toast.error('Username can not exceed 30 char!');
        }

        // Email validation

        if (!formData.email) {
            toast.error('Email filed can not be empty!');
            return false;
        } else if (!regEx.test(formData.email)) {
            toast.error('Invalid email entered!');
            return false;
        }

        // Password validation :

        if (!formData.password) {
            toast.error('Password can not be empty!');
        } else if (formData.password.length < 6) {
            toast.error('Password can not be less than 6 char!');
        } else {

            const updateUserInfo = await axios.post('http://localhost:8000/user/api/updateuserinfo', formInfo);


        }
    }

    const imageChange = (e) => {
        console.log(e);
    }




    return (
        <>
            <div className="pt-10">
                <h1 className='text-xl text-center'>Profile</h1>

                <form action="" className='w-full flex justify-center items-center flex-col' onSubmit={submitHandle}>

                    <div className="w-20 py-3">
                        <input type="file" accept='images/*' name="img" onChange={imageChange} />
                        <img src={profilePicture} className='cursor-pointer w-full rounded-full' alt="userImage" />
                    </div>

                    <div className="flex flex-col w-96 gap-2 ">

                        <input type="text" placeholder='Username' className=' rounded-md py-1 px-3 ' onChange={inputChange} value={formInfo.username} name='username' />

                        <input type="email" placeholder='Email' className=' rounded-md py-1 px-3 ' onChange={inputChange} value={formInfo.email} name='email' />

                        <input type="password" placeholder='Password' className=' rounded-md py-1 px-3 ' onChange={inputChange} value={formInfo.password} name='password' />

                    </div>

                    <button className='border w-96 my-3 font-semibold rounded-md py-1 active:scale-95 transition-all active:bg-green-600 active:text-white  border-green-600 ' >Update</button>

                    <div className="text-red-400 flex w-96 justify-between ">
                        <span className='cursor-pointer'>Delete account</span>
                        <span className='cursor-pointer'>Sign out</span>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DashboardProfile