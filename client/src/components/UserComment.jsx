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
    const [editorOpen, setEditorOpen] = useState(false);
    const currentUser = useSelector((state) => state.userSliceApp.user);

    const [textAreaVal, setTextAreaVal] = useState([comments.comment]);
















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

        if (comments.userId) {
            getUserComments();
        }

    }, [comments.userId])




    const submitHandle = (e) => {
        e.preventDefault();
    }


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


                {/* If the editor is open  */}
                {
                    editorOpen && (currentUser._id === comments.userId || currentUser.isAdmin)
                        ?
                        <>{
                            editorOpen &&

                            <div className="">
                                <form action="" className='flex flex-col gap-1' onSubmit={submitHandle}>


                                    <textarea name="editcomment" placeholder='Edit comment ..' className={`transition-all border rounded-md px-2 outline-none py-1 w-72 ${theme === 'dark' ? 'bg-gray-700 border-gray-400 focus:bg-gray-800' : 'bg-gray-200 focus:bg-blue-100 border-gray-300'}`} maxLength={100} value={textAreaVal} onChange={(e) => setTextAreaVal(e.target.value)}></textarea>

                                    <span className={`text-xs font-semibold pl-2 ${textAreaVal.length === 100 ? 'text-red-500' : 'text-green-500'}`}>{100 - textAreaVal?.length} characters left</span>
                                    <div className="w-72 flex justify-end gap-2">

                                        {/* edit cancel button  */}
                                        <button type='submit' className='bg-blue-800 text-gray-300 py-1 w-16 font-semibold text-xs rounded-sm' onClick={() => setEditorOpen(false)}>Cancel</button>

                                        {/* edit save button  */}
                                        <button type='submit' className='bg-green-800 text-gray-300 rounded-sm text-xs w-16 py-1 font-semibold ' onClick={() => setEditorOpen(false)}>Save</button>

                                    </div>
                                </form>
                            </div>
                        }</>
                        :
                        <>
                            <>
                                <p className={`text-sm ml-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>- {comments && comments.comment}</p>

                                <div className="flex items-center gap-7 ml-6 mt-2" >


                                    {/* Comment like functionality */}
                                    <div className="flex  justify-center  items-center gap-1">

                                        {
                                            comments.likes &&

                                            <button type='button' className={`flex items-center transition-all gap-2 cursor-pointer  ${user && comments.likes.includes(currentUser && currentUser._id) && '!text-blue-500'}`}>

                                                <AiFillLike size={20} onClick={() => likeTheComment(comments && comments._id)} className='active:scale-50 transition-all' />

                                            </button>
                                        }


                                        <p className=''>
                                            {
                                                comments.numberOfLikes > 0 &&
                                                comments.numberOfLikes + " " + (comments.numberOfLikes === 1 ? 'like' : 'likes')
                                            }
                                        </p>
                                    </div>


                                    {currentUser && (currentUser._id === comments?.userId || currentUser.isAdmin) &&
                                        <>
                                            {/* edit button  */}
                                            <button type='button' >
                                                <RiEdit2Fill className='hover:text-green-400 active:scale-75 transition-all' size={20} onClick={() => setEditorOpen(true)} />
                                            </button>

                                            {/* delete button  */}
                                            <button type='button' >
                                                <MdDeleteForever className='hover:text-red-400 active:scale-75 transition-all' size={20} />
                                            </button>
                                        </>
                                    }
                                </div>
                            </>
                        </>
                }
            </div>
        </>
    )
}

export default UserComment