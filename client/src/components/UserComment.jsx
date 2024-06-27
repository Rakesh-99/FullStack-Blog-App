import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { AiFillLike } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";








const UserComment = ({ comments, likeTheComment }) => {


    const [user, setUser] = useState(null);
    const { theme } = useSelector((state) => state.themeSliceApp);







    useEffect(() => {

        const getUserComments = async () => {
            try {
                const getUser = await axios.get(`/api/user/get-user-comment/${comments.userId}`);

                if (getUser.status === 200) {
                    setUser(getUser.data)
                }
            } catch (error) {
                console.log(error);
            }
        }

        getUserComments();

    }, [comments])



    return (
        <>
            <div className={`flex border flex-col gap-1 transition-all px-2  my-4  py-2 rounded-md ${theme === 'dark' ? 'hover:bg-zinc-700 border-zinc-700' : 'hover:bg-gray-100 border-zinc-200'}`}>
                <div className='flex gap-1'>
                    <img src={user && user.profilePicture} className='w-6 h-6 rounded-full' />
                    <div className="flex gap-4 items-center">
                        <span className='text-sm truncate'>@{user && user.username}</span>
                        <span className={` text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{moment(comments && comments.createdAt).fromNow()}</span>
                    </div>

                </div >


                <p className={`text-sm ml-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>- {comments && comments.comment}</p>

                <div className="flex gap-7 ml-6 mt-2" >

                    <div className="flex justify-center items-center gap-1">
                        <button type='button' className={`flex items-center transition-all gap-2 cursor-pointer active:scale-90 ${user && comments.likes.includes(user._id) && '!text-blue-500'}`}><AiFillLike size={18} onClick={() => likeTheComment(comments && comments._id)} /> </button>

                        <span className='font-bold text-sm'>{comments.numberOfLikes}</span>
                    </div>

                    <span className=' transition-all cursor-pointer active:scale-90'><RiEdit2Fill size={18} /></span>

                    <span className=' transition-all cursor-pointer active:scale-90'><MdDeleteForever size={18} /></span>
                </div>
            </div>
        </>
    )
}

export default UserComment