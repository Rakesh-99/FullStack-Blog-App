import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import BlogLoader from '../assests/blogSpinner/BlogLoader';
import { MdUpdate } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import GithubCard from '../components/GithubCard';
import CommentCard from '../components/CommentCard';

const ShowBlog = () => {

    const { theme } = useSelector((state) => state.themeSliceApp);

    const [slug, setSlug] = useState();
    const { blogSlug } = useParams();
    const [loader, setLoader] = useState(false);





    useEffect(() => {

        const fetchBlogSlug = async () => {
            try {
                setLoader(true);
                const fetchSlug = await axios.get(`/api/blog/get-all-blogs?slug=${blogSlug}`);
                const response = fetchSlug;
                setLoader(false)

                if (response.status === 200) {
                    const getSlug = response.data.blogs[0];
                    setSlug(getSlug);
                }
            } catch (error) {
                setLoader(false);
                console.log(error.message);
            }
        }
        fetchBlogSlug();
    }, [blogSlug]);


    return (
        <>
            <div className="min-h-screen">
                {loader
                    ?
                    <BlogLoader />
                    :
                    <>
                        {
                            slug &&

                            <div className="pt-10">

                                <h1 className='text-2xl md:text-4xl font-semibold text-center hover:-translate-y-1 hover:cursor-not-allowed transition-all peer-hover:'>{slug && slug.slug}</h1>

                                <div className='flex justify-center w-full my-10'>

                                    <p className={`${theme === 'dark' ? 'border-gray-600' : 'border-red-600'} border-2 cursor-not-allowed hover:scale-95 transition-all rounded-full py-1 flex text-orange-400 px-5 font-semibold text-sm md:text-xl items-center justify-center gap-3`}> <span><BiCategoryAlt size={20} /></span>{slug && slug.blogCategory}</p>
                                </div>

                                <div className=" flex justify-center text-center my-10">
                                    <img src={slug && slug.blogImgFile} className=' w-96 border-2 border-gray-600 md:border-none md:w-11/12 rounded-lg md:h-[35rem] object-cover' alt="" />
                                </div>

                                <div className="flex justify-center">
                                    <div className="w-1/2">
                                        <div className="border-b w-full flex justify-between">

                                            <div className='font-semibold flex items-center gap-1 md:gap-2'>
                                                <span><MdDateRange size={20} color='orange' /></span>
                                                <span className='text-xs md:text-lg'>{slug && new Date(slug.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="font-semibold flex items-center gap-1 md:gap-2">
                                                <span><MdUpdate size={20} color='orange' /></span>
                                                <span className='font-semibold text-xs md:text-lg'>{slug && (slug.blogBody.length / 1000).toFixed(0)}min read</span>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="flex w-full justify-center items-center flex-col my-10">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: slug && slug.blogBody }}
                                        className={`blog-content py-10  w-full max-w-[370px] text-justify md:max-w-3xl overflow-x-auto px-3 rounded-md `}>
                                    </div>


                                    {/* Github Card */}
                                    <div className="">
                                        <GithubCard />
                                    </div>

                                    {/* Comment Card  */}

                                    <div className="">
                                        <CommentCard />
                                    </div>

                                </div>
                            </div>
                        }
                    </>
                }
            </div >
        </>
    )
}

export default ShowBlog