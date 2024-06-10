import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table } from "flowbite-react";
import Spinner from "../assests/spinner/Spinner";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { ImWarning } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";




const AllUsers = () => {

    const { user } = useSelector((state) => state.userSliceApp);
    const { theme } = useSelector((state) => state.themeSliceApp);
    const [loader, setLoader] = useState(false);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [getAllUsers, setAllUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState("");
    const [startPage, setStartPage] = useState(3);




    // Fetch user :
    useEffect(() => {
        if (user.isAdmin) {
            const getUsers = async () => {
                try {
                    const userInfo = await axios.get(
                        `http://localhost:8000/api/user/getusers`,
                        {
                            headers: {
                                Authorization: user.token,
                            },
                        }
                    );
                    const response = userInfo.data.user;
                    setAllUsers(response);
                    if (response.length > 8) {
                        setShowMoreButton(true)
                    }

                } catch (error) {
                    console.log(error.message);
                }
            };
            getUsers();
        }
    }, []);


    const deleteUserHandle = (id) => {
        setShowModal(true);
        setUserId(id);
    };

    const cancelHandle = () => {
        setShowModal(false);
    };


    //   Delete user Api :
    const deleteUser = async () => {

        try {
            setShowModal(false)

            const userDelete = await axios.delete(`http://localhost:8000/api/user/deleteuser/${userId}`, {

                data: {
                    user: user
                },
                headers: {
                    Authorization: user.token
                }
            })
            if (userDelete.status === 200) {
                setAllUsers((users) => users.filter(users => users._id !== userId));
                toast.success('User has been deleted successfully');
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }

    }


    const showMoreUserButton = async () => {

        setStartPage(startPage + 1);

        try {
            const showMoreUser = await axios.get(`http://localhost:8000/api/user/getusers?page=${startPage}`, {
                headers: {
                    Authorization: user.token
                }
            })
            if (showMoreUser.status === 200) {
                console.log(showMoreUser.data.user);

                if (showMoreUser.data.user.length > 0) {
                    setStartPage((prevPage) => prevPage + 1)
                    setAllUsers([...prevUsers, ...showMoreUser.data.user]);
                } else {
                    setShowMoreButton(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };




    return (
        <>
            {getAllUsers.length > 0 && (
                <div className="min-h-screen w-full md:mx-10 table-auto overflow-x-scroll scrollbar">
                    <Table hoverable className={`my-5`}>
                        <Table.Head
                            className={` text-base   ${theme === "dark" ? "text-gray-100" : "text-gray-700"
                                } `}
                        >
                            <Table.HeadCell
                                className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"
                                    } px-10 md:px-0`}
                            >
                                Updated on
                            </Table.HeadCell>

                            <Table.HeadCell
                                className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"
                                    } px-10 md:px-0`}
                            >
                                profilePicture
                            </Table.HeadCell>

                            <Table.HeadCell
                                className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"
                                    } px-10 md:px-0`}
                            >
                                Username
                            </Table.HeadCell>

                            <Table.HeadCell
                                className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"
                                    } px-10 md:px-0`}
                            >
                                <span>Email</span>
                            </Table.HeadCell>

                            <Table.HeadCell
                                className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"
                                    } px-10 md:px-0`}
                            >
                                Admin
                            </Table.HeadCell>

                            <Table.HeadCell
                                className={`font-semibold text-sm md:text-base border-b ${theme === "dark" && "border-gray-500"
                                    } px-10 md:px-0`}
                            >
                                Delete
                            </Table.HeadCell>
                        </Table.Head>
                        {loader ? (
                            <Spinner />
                        ) : (
                            <>
                                {getAllUsers.map((user) => {
                                    return (
                                        <Table.Body key={user._id} className="">
                                            <Table.Row
                                                key={user._id}
                                                className={` text-xs md:text-sm  transition-all rounded-md  ${theme === "dark"
                                                    ? "hover:bg-slate-700"
                                                    : "hover:bg-slate-200"
                                                    }`}
                                            >
                                                <Table.Cell className=" text-xs md:text-sm">
                                                    {new Date(user.updatedAt).toLocaleDateString()}
                                                </Table.Cell>

                                                <Table.Cell className="flex justify-center ">
                                                    <NavLink className="text-center" to={`/blog`}>
                                                        <img
                                                            src={user.profilePicture}
                                                            alt="couldn't load image"
                                                            className="w-10 text-center rounded-full h-10 md:rounded-full "
                                                        />
                                                    </NavLink>
                                                </Table.Cell>

                                                <Table.Cell
                                                    className={`border-l border-r px-20 md:pl-10 text-xs text-justify md:text-sm ${theme === "dark" && "text-gray-300 border-gray-700"
                                                        }`}
                                                >
                                                    {user.username}
                                                </Table.Cell>

                                                <Table.Cell className="">
                                                    <span className="pl-10">{user.email}</span>
                                                </Table.Cell>

                                                <Table.Cell className="text-xs md:text-sm text-justify pl-12 md:pl-4">
                                                    {user.isAdmin ? (
                                                        <TiTick color="green" size={25} />
                                                    ) : (
                                                        <RxCross2 size={23} color="red" />
                                                    )}
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <button
                                                        className="text-red-500 hover:underline pl-10 md:pl-2"
                                                        onClick={() => {
                                                            deleteUserHandle(user._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    );
                                })}
                            </>
                        )}
                    </Table>
                    {showMoreButton && (
                        <div className="text-center my-5">
                            <button
                                onClick={showMoreUserButton}
                                className={`transition-all active:scale-95 hover:bg-blue-900 py-2 font-semibold text-sm px-2 border-2 rounded-md  ${theme === "dark"
                                    ? "bg-gray-700 active:bg-gray-800 text-gray-200 border-gray-400"
                                    : "active:bg-gray-600 active:text-white hover:text-white bg-gray-300 text-gray-800 border-gray-500"
                                    }`}
                            >
                                Show more..
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Showing Modal before deleting the user */}
            {showModal && (
                <div className="fixed inset-0  transition-all backdrop-blur-sm bg-opacity-30 flex justify-center items-center">
                    <div
                        className={`flex flex-col gap-7  shadow-md w-80 md:w-96 bg- rounded-md  px-3 justify-center items-center py-5   ${theme === "dark"
                            ? "bg-zinc-800 text-gray-200"
                            : "bg-white text-gray-900"
                            }`}
                    >
                        <button
                            className="place-self-end transition-all"
                            onClick={cancelHandle}
                        >
                            <IoClose
                                size={25}
                                className=" active:animate-ping transition-all"
                            />
                        </button>

                        <div className="">
                            <ImWarning size={40} />
                        </div>

                        <div className="">
                            <p className="text-base text-center">
                                Are you sure you want to delete this user ?
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                className={`text-sm  rounded-md transition-all active:bg-red-800 font-semibold py-2 px-2 active:scale-95  ${theme === "dark" ? "bg-red-700" : "bg-red-400"
                                    }`}
                                onClick={deleteUser}
                            >
                                Yes,I'm sure.
                            </button>

                            <button
                                className=" border text-sm font-semibold  active:scale-95 transition-all bg-transparent rounded-md py-2 px-3 active:bg-gray-600"
                                onClick={cancelHandle}
                            >
                                No, cancel.
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
        </>
    );
};

export default AllUsers;
