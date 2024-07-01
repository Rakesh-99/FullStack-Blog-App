import React, { useState } from 'react'
import { Link } from 'react-router-dom';





const RecentBlog = ({ blogs }) => {

    const [recentBlogs, setLimitBlogs] = useState(blogs);



    return (
        <>
            <div className="border mx-5 md:mx-0 pb-5  hover:border-blue-400 rounded-md cursor-pointer hover:scale-95 transition-all">
                <Link to={`/blog/${recentBlogs.slug}`}>
                    <img src={recentBlogs && recentBlogs.blogImgFile} className='hover:scale-90 transition-all w-96 h-60 rounded-tl-md rounded-tr-md' />

                    <div className="flex flex-col gap-4 px-2 py-2">
                        <p className=' text-lg md:text-xl'>{recentBlogs && recentBlogs.blogTitle}</p>
                        <span className='text-xs md:text-sm w-20 text-center border-2 rounded-full
                    '>{recentBlogs && recentBlogs.blogCategory}</span>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default RecentBlog