import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table, Toast } from "flowbite-react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BlogPopupModal from "./BlogPopupModal";
import BlogLoader from '../assests/blogSpinner/BlogLoader'
import { PiSmileySad } from "react-icons/pi";




const AllBlogs = () => {



    const { user } = useSelector((state) => state.userSliceApp);
    const { theme } = useSelector((state) => state.themeSliceApp);
    const [userBlogs, setUserBlogs] = useState([]);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [startPage, setStartPage] = useState(1);
    const [blogModal, setBlogModal] = useState(false);
    const [blogId, setBlogId] = useState('');
    const [loader, setLoader] = useState(false);


    // Get blogs fetch api : 
    useEffect(() => {

        if (user.isAdmin) {
            const getBlogs = async () => {
                setLoader(true);
                try {
                    const fetchBlogs = await axios.get(
                        `/api/blog/get-all-blogs?userId=${user._id}`
                    );

                    if (fetchBlogs.status === 200) {

                        setLoader(false)
                        setUserBlogs(fetchBlogs.data.blogs);

                        if (fetchBlogs.data.blogs) {

                            if (fetchBlogs.data.blogs.length > 5) {
                                setShowMoreButton(true);
                            } else {
                                setShowMoreButton(false);
                            }
                        }
                    }

                } catch (error) {
                    setLoader(false);
                    toast.error("An unexpected error occurred!");
                    console.log(error);
                }
            };
            getBlogs();
        }
    }, [user._id]);




    // Show More button api :
    const showMoreBlogsButton = async () => {

        try {
            const response = await axios.get(
                `/api/blog/get-all-blogs?userId=${user._id}&page=${startPage}`
            );
            if (response.status === 200) {
                if (response.data.blogs.length > 0) {
                    console.log(response.data.blogs);
                    setUserBlogs([...userBlogs, ...response.data.blogs]);

                }
                setStartPage((prevPage) => prevPage + 1);
            }
            if (response.data.blogs.length === 0) {
                toast.success("All blogs have been fetched");
                setShowMoreButton(false);
                return false;
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteBlogHandle = (id) => {
        setBlogId(id);
        setBlogModal(true)
    }





    return (
        <>
            {user && user.isAdmin ? (
                <div className="min-h-screen w-full md:mx-10 table-auto overflow-x-scroll scrollbar">
                    <Table hoverable className="my-5">
                        <Table.Head className={`text-base ${theme === "dark" ? "text-gray-100" : "text-gray-700"}`}>
                            <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"} px-10 md:px-0`}>
                                Updated on
                            </Table.HeadCell>
                            <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"} px-10 md:px-0`}>
                                Image
                            </Table.HeadCell>
                            <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"} px-10 md:px-0`}>
                                Blog Title
                            </Table.HeadCell>
                            <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"} px-10 md:px-0`}>
                                Category
                            </Table.HeadCell>
                            <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"} px-10 md:px-0`}>
                                <span>Edit</span>
                            </Table.HeadCell>
                            <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"} px-10 md:px-0`}>
                                Delete
                            </Table.HeadCell>
                        </Table.Head>
                        {
                            loader ? (
                                <Table.Body className="">
                                    <Table.Row>
                                        <Table.Cell className="text-center mt-40">
                                            <BlogLoader />
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ) : userBlogs.length === 0 ? (
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="6" className="text-center">
                                            No blogs found
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ) : (
                                userBlogs.map((data, index) => (
                                    <Table.Body key={index}>
                                        <Table.Row className={`text-center text-xs md:text-sm transition-all rounded-md ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200"}`}>
                                            <Table.Cell className="text-xs md:text-sm">
                                                {new Date(data.updatedAt).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell className="flex justify-center">
                                                <NavLink className="text-center" to={`/blog/${data.slug}`}>
                                                    <img src={data.blogImgFile} alt="blogImage" className="w-10 text-center rounded-full h-10 md:w-20 md:rounded-md" />
                                                </NavLink>
                                            </Table.Cell>
                                            <Table.Cell className={`border-l border-r px-20 md:pl-10 text-xs text-justify md:text-sm ${theme === "dark" && "text-gray-300 border-gray-700"}`}>
                                                {data.blogTitle}
                                            </Table.Cell>
                                            <Table.Cell className="text-xs md:text-sm text-justify pl-12">
                                                {data.blogCategory}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <NavLink to={`/update-blog/${data._id}`} className="text-green-500 hover:underline">
                                                    Edit
                                                </NavLink>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <button className="text-red-500 hover:underline" onClick={() => deleteBlogHandle(data._id)}>
                                                    Delete
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))
                            )
                        }
                    </Table>
                    {showMoreButton && (
                        <div className="text-center my-5">
                            <button onClick={showMoreBlogsButton} className={`transition-all active:scale-95 hover:bg-blue-900 py-2 font-semibold text-sm px-2 border-2 rounded-md ${theme === "dark" ? "bg-gray-700 active:bg-gray-800 text-gray-200 border-gray-400" : "active:bg-gray-600 active:text-white hover:text-white bg-gray-300 text-gray-800 border-gray-500"}`}>
                                Show more..
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="min-h-screen flex w-full justify-center items-center">
                    <span className="flex md:items-center absolute top-72 left-50 md:static md:justify-center">
                        <BlogLoader />
                    </span>
                </div>
            )}


            <Toaster />

            {/*  Conditionally rendering the popup modal :  */}
            {
                blogModal && (
                    <BlogPopupModal blogModal={blogModal} setBlogModal={setBlogModal} blogId={blogId} setUserBlogs={setUserBlogs} />
                )
            }
        </>
    );
};

export default AllBlogs;
