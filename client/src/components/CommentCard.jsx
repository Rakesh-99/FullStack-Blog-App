
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { AiOutlineComment } from "react-icons/ai";
import feedbackImg from '../assests/typingImg.png'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


const CommentCard = () => {

    const { user } = useSelector((state) => state.userSliceApp);
    const { theme } = useSelector((state) => state.themeSliceApp);

    const [commentData, setCommentData] = useState('');


    const commentSubmitHandle = (e) => {
        e.preventDefault()
        formValidate(commentData)
    }

    const textAreaChange = (e) => {
        const { value } = e.target;
        setCommentData(value)
    }


    const postUserComment = async () => {

        try {
            const postComment = await axios.post(`/comment-post`)
        } catch (error) {

        }
    }

    const formValidate = (commentText) => {
        if (!commentText) {
            toast.error('Comment is empty!')
            return false;
        } else if (commentText.length < 4) {
            toast.error('Atleast four characters required!')
            return false;
        } else {
            postUserComment();
        }
    }




    return (
        <div className='md:mt-10 mt-5'>

            {
                user ?

                    <div className="">

                        <p className='flex items-center text-sm gap-3 justify-center '>Sign in as :<Link to={'/dashboard?tab=profile'} className='flex font-semibold text-sm text-teal-500 hover:underline cursor-pointer items-center'> <img src={user.profilePicture} className='w-7 h-7 rounded-full' /> @{user.username}</Link></p>
                    </div>

                    :
                    <div className="">
                        <span className='flex gap-2 text-xs md:text-sm text-teal-500 font-semibold'>Login to access more features and engage with users of this blog.
                            <Link className='text-blue-400 hover:underline' to={'/login'}>Login</Link>
                        </span>
                    </div>
            }

            {
                user &&
                <div className="w-full md:flex-row flex flex-col justify-center md:gap-10 items-center">

                    {/* Left Content  */}
                    <div className="flex justify-center items-center">
                        <img src={feedbackImg} alt="" className='w-72 md:96' />
                    </div>

                    {/* Right Content  */}
                    <div className={` py-2  px-5 rounded-md ${theme === 'dark' ? 'border border-gray-600 ' : 'border border-gray-300'}`}>
                        <div className="flex gap-2 py-2 items-center">
                            <h1 className={`text-sm font-semibold ${commentData.length === 50 && 'text-red-500'}`}>Share your feedback</h1>
                            <AiOutlineComment size={30} className={`${commentData.length === 50 && 'text-red-500'}`} />
                        </div>

                        <form className={`py-2  flex shadow-md flex-col  w-full px-1 md:px-5  rounded-md ${theme === 'dark' ? 'border border-gray-600 ' : 'border border-gray-300'}}`} onSubmit={commentSubmitHandle}>

                            <textarea value={commentData} onChange={textAreaChange} placeholder='Type here...' name="textarea" className={` transition-all outline-none  w-80 rounded-md  py-3 px-2 ${theme === 'dark' ? 'bg-zinc-600 focus:bg-zinc-700' : 'bg-zinc-200 focus:bg-zinc-300'}`} maxLength={50}>

                            </textarea>
                            <span className={`text-xs md:text-sm  transition-all font-semibold ${commentData.length === 50 ? 'text-red-500 ' : 'text-green-500'}`}>{50 - commentData.length} characters left</span>
                            <button type='submit' className='py-1 my-3 bg-gradient-to-r from-yellow-400 to-green-700 hover:from-pink-500 hover:to-yellow-500 w-full font-semibold'>Submit </button>

                        </form>

                    </div>
                    <Toaster />
                </div >
            }

        </div>
    )
}

export default CommentCard;