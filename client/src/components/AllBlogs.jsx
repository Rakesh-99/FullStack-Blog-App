import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";






const AllBlogs = () => {

    const { theme } = useSelector((state) => state.themeSliceApp);



    const [blogsInfo, setBlogInfo] = useState(null);


    const getAllBlogs = async () => {

        try {
            const getBlogsInfo = await axios.get('http://localhost:8000/api/blog/getallblogs');
            const { blogs } = getBlogsInfo.data;
            setBlogInfo(blogs);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBlogs();
    }, [])




    return (
        <div className={`min-h-screen w-full md:mx-5 mx-0 items-center py-5 ${theme === 'dark' ? 'border border-gray-700 shadow-md' : 'border border-gray-200 shadow-md'} `} >

            <div className={`flex justify-between bg-gray-600 py-3 px-4 text-gray-400 rounded-md`}>
                <div className="flex md:gap-32 gap-10 text-xs md:text-base ">
                    <span>Date updated</span>
                    <span>Blog image</span>
                    <span>Blog title</span>
                </div>
                <div className="flex text-xs items-center md:text-base gap-10">
                    <span>category </span>
                    <span>Delete</span>
                    <span>Edit</span>
                </div>
            </div>

            {
                blogsInfo && blogsInfo.map((data, index) => {
                    const formattedDate = new Date(data.updatedAt).toLocaleDateString();
                    return (
                        <div key={index} className="">
                            <div className="flex justify-between px-4 py-1 my-4 rounded-md  hover:bg-gray-400 transition-all">

                                <div className="flex md:gap-32 items-center gap-10 text-xs md:text-base">
                                    <p>{formattedDate}</p>
                                    <div className="md:w-24 w-11">
                                        <img src={data.blogImgFile} alt="" className="w-full h-12 object-cover rounded-md" />
                                    </div>
                                    <p>{data.blogTitle}</p>
                                </div>


                                <div className="flex text-xs md:text-base justify-center  items-center gap-10">
                                    <p>{data.blogCategory}</p>
                                    <button className="text-red-500 cursor-pointer">Delete</button>
                                    <button className="text-green-400 cursor-pointer">Edit</button>

                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div >
    )
}
export default AllBlogs;