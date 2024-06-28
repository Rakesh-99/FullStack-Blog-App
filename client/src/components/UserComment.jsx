import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { AiFillLike } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";








const UserComment = ({ comments, likeTheComment, deleteComment }) => {


    const [user, setUser] = useState(null);
    const { theme } = useSelector((state) => state.themeSliceApp);

    const currentUser = useSelector((state) => state.userSliceApp.user);












    useEffect(() => {

        const getUserComments = async () => {

            try {
                const getUser = await axios.get(`/api/user/get-user-comment/${comments.userId}`);
                if (getUser.status === 200) {

                    setUser(getUser.data)

                }
            } catch (error) {

                console.log(error.message);
            }
        }

        getUserComments();

    }, [comments])



    return (
        <>
            <div className={`flex border-b flex-col gap-1 transition-all px-2  my-4 py-2 ${theme === 'dark' ? ' border-zinc-700' : ' border-zinc-200'}`}>
                <div className='flex gap-1'>
                    <img src={user && user.profilePicture} className='w-6 h-6 rounded-full' />
                    <div className="flex gap-4 items-center">
                        <span className='text-sm truncate'>@{user && user.username}</span>
                        <span className={` text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{moment(comments && comments.createdAt).fromNow()}</span>
                    </div>

                </div >


                <p className={`text-sm ml-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>- {comments && comments.comment}</p>

                <div className="flex items-center gap-7 ml-6 mt-2" >

                    <div className="flex  justify-center  items-center gap-1">

                        <button type='button' className={`flex items-center transition-all gap-2 cursor-pointer active:animate-spin ${user && comments.likes.includes(currentUser._id) && '!text-blue-500'}`}><AiFillLike size={18} onClick={() => likeTheComment(comments && comments._id)} /> </button>

                        <p className=''>
                            {
                                comments.numberOfLikes > 0 &&
                                comments.numberOfLikes + " " + (comments.numberOfLikes === 1 ? 'like' : 'likes')
                            }
                        </p>
                    </div>

                    <button type='button' className=' transition-all cursor-pointer active:scale-50'>
                        {
                            currentUser._id === comments.userId && <RiEdit2Fill size={18} />
                        }
                    </button>

                    <button type='button' className=' transition-all cursor-pointer active:scale-50' onClick={() => deleteComment(comments && comments)}>
                        {
                            currentUser._id === comments.userId && <MdDeleteForever size={18} />
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserComment