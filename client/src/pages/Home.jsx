import React, { useState } from 'react';
import { useSelector } from 'react-redux';



const Home = () => {

  const { user } = useSelector((state) => state);
  // console.log(user.user);

  return (
    <>
      <div className="min-h-screen px-10 ">
        <h1>Home</h1>
      </div>
    </>
  )
}
export default Home;