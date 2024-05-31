import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Table, Toast } from 'flowbite-react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';


const AllBlogs = () => {

    const { user } = useSelector((state) => state.userSliceApp);
    const { theme } = useSelector((state) => state.themeSliceApp);
    const [userBlogs, setUserBlogs] = useState([]);





    useEffect(() => {

        if (user.isAdmin) {
            const getBlogs = async () => {

                try {

                    const fetchBlogs = await axios.get(`http://localhost:8000/api/blog/getallblogs?${user._id}`);

                    const response = await fetchBlogs.data.blogs;
                    setUserBlogs(response);

                } catch (error) {
                    toast.error('An unexpected error occurred!');
                    console.log(error);
                }
            }
            getBlogs();
        }

    }, [user._id]);



    const deleteBlog = async (id) => {
        console.log(id);
    }






    return (
        < >
            {
                user && user.isAdmin && userBlogs.length > 0
                    ?
                    <div className='min-h-screen w-full md:mx-10 table-auto overflow-x-scroll scrollbar'>
                        <Table hoverable className='my-5 '>

                            <Table.Head className={` text-base  ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'} `}>

                                <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === 'dark' && 'border-gray-500'} px-10 md:px-0`}>Updated on</Table.HeadCell>

                                <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === 'dark' && 'border-gray-500'} px-10 md:px-0`}>Image</Table.HeadCell>

                                <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === 'dark' && 'border-gray-500'} px-10 md:px-0`}>Title</Table.HeadCell>

                                <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === 'dark' && 'border-gray-500'} px-10 md:px-0`}>Category</Table.HeadCell>

                                <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === 'dark' && 'border-gray-500'} px-10 md:px-0`}>
                                    <span>Edit</span>
                                </Table.HeadCell>

                                <Table.HeadCell className={`font-semibold text-sm md:text-base border-b ${theme === 'dark' && 'border-gray-500'} px-10 md:px-0`}>Delete</Table.HeadCell>
                            </Table.Head>

                            {
                                userBlogs.map((data) => {

                                    const modifiedDate = data.updatedAt.slice(0, 10).toString().split('-').reverse().join('-');

                                    return (

                                        <Table.Body key={data._id}>

                                            <Table.Row key={data._id} className={`text-center text-base md:text-lg  transition-all rounded-md  ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}>

                                                <Table.Cell className='text-sm md:text-base'>
                                                    {modifiedDate}
                                                </Table.Cell>

                                                <Table.Cell className='flex justify-center'>
                                                    <NavLink className='text-center' to={`/blog/${data.slug}`}>
                                                        <img src={data.blogImgFile} alt="blogImage" className='w-10 text-center rounded-full h-10 md:w-20 md:rounded-md ' />
                                                    </NavLink>
                                                </Table.Cell>

                                                <Table.Cell className={`text-sm md:text-base ${theme === 'dark' && 'text-gray-300'}`}>
                                                    {data.blogTitle}
                                                </Table.Cell>

                                                <Table.Cell className='text-sm md:text-base'>
                                                    {data.blogCategory}
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <NavLink className='text-green-500 hover:underline' to={`/editblog/${data._id}`}>
                                                        Edit
                                                    </NavLink>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <button className='text-red-500 hover:underline' onClick={() => { deleteBlog(data._id) }}>
                                                        Delete
                                                    </button>
                                                </Table.Cell>

                                            </Table.Row>

                                        </Table.Body>
                                    )
                                })
                            }

                        </Table>
                    </div>
                    :
                    <>
                        <p>No blogs found</p>
                    </>
            }
            <Toaster />
        </>
    )
}

export default AllBlogs