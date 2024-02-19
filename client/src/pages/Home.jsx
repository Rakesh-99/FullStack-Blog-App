import React, { useState } from 'react';
import { useSelector } from 'react-redux';



const Home = () => {

  const { user } = useSelector((state) => state);
  // console.log(user.user);

  return (
    <>
      <h1>Home</h1>
    </>
  )
}
export default Home;