import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";


const Comment = ({ userComments }) => {


    const { theme } = useSelector((state) => state.themeSliceApp);
    const [user, setUser] = useState('');


    useEffect(() => {

        const getCommentUser = async () => {
            try {
                const getUser = await axios.get(`/api/user/get-user-comment/${userComments.userId}`)
                const response = getUser.data;
                setUser(response.user)

            } catch (error) {
                console.log(error);
            }
        }
        getCommentUser();

    }, [userComments]);




    return (
        <>
            <div className={`flex transition-all flex-col border  rounded-md my-4 py-2 px-5 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-700' : 'border-gray-200 hover:bg-gray-300'}`}>
                <div className="flex gap-2 items-center  my-2">
                    <img src={user && user.profilePicture} alt="" className='w-7 h-7 rounded-full' />
                    <p className='text-sm font-semibold'>{user && user.username}</p>
                    <p className='text-xs text-gray-500'>{moment(userComments && userComments.createdAt).fromNow()}</p>
                </div>

                <div className="ml-10 flex flex-col gap-3">
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{userComments.comment}</p>
                    <div className="flex flex-row gap-5">
                        <span className='cursor-pointer hover:text-blue-400 transition-all'><AiOutlineLike /></span>
                        <span className='cursor-pointer hover:text-blue-400 transition-all'><MdOutlineDeleteOutline /></span>
                        <span className='cursor-pointer hover:text-blue-400 transition-all'><FaRegEdit /></span>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Comment;