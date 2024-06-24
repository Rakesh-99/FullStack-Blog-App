import axios from 'axios';
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';





const Comment = ({ commentInfo }) => {

    const { theme } = useSelector((state) => state.themeSliceApp);

    const [user, setuser] = useState([]);
    const [comments, setComments] = useState([]);





    const infoOfWhoComment = async () => {
        try {
            const getUserInfo = await axios.get(`/api/user/who-comment/${commentInfo.userId}`);

            if (getUserInfo.status === 200) {
                setuser([...user, getUserInfo.data.user])
            }


        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        infoOfWhoComment();
    }, [commentInfo])



    return (
        <>
            <div className="">
                {

                    user && user.map((value) => {
                        let currentDate = new Date().getMonth().toLocaleString();
                        return (
                            <div className={`border rounded-md my-2 px-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} key={value._id}>

                                <div className="flex items-center gap-2 my-2">
                                    <img src={value.profilePicture} className='w-8 h-8 rounded-full' />
                                    <p className='text-sm'>@{value.username}</p>
                                    <p className='text-xs'>{new Date(value.createdAt).getMonth().toLocaleString() - currentDate + 1} months ago</p>
                                </div>

                                <div className="flex justify-start items-center">
                                    {
                                        <p className='ml-10 md:text-sm text-xs py-1 '>~ {commentInfo.comment}</p>

                                    }
                                </div>

                            </div>

                        )
                    })
                }
            </div>
        </>
    )
}

export default Comment;