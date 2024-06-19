import React from 'react'
import GithubCalender from 'react-github-calendar';
import { BsEmojiSmile } from "react-icons/bs";

const GithubCalenderFunc = () => {
    return (
        <>
            <div className="flex flex-col w-72 md:w-full items-center">
                <div className="">

                    <p className='flex mb-5  justify-center font-semibold gap-2 text-xl'>Days I spend in coding
                        <span className='flex items-center text-green-500'>
                            <BsEmojiSmile size={22} />
                        </span>
                    </p>
                </div>

                <GithubCalender
                    username="Rakesh-99"
                    color="green"
                    fontSize={12}
                    blockSize={9}
                />
            </div>
        </>
    )
}

export default GithubCalenderFunc