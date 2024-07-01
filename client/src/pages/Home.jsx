import { useSelector } from 'react-redux';
import heroImg from '../assests/homeImg.png'
import { motion } from 'framer-motion';
import GithubCard from '../components/GithubCard';
import axios from 'axios'
import { useEffect, useState } from 'react';
import RecentBlog from '../components/RecentBlog';
import { Link } from 'react-router-dom';
const Home = () => {

  const { blogs } = useSelector((state) => state.blogSliceApp.blogs);

  const [recentBlogs, setRecentBlogs] = useState([]);

  const { theme } = useSelector((state) => state.themeSliceApp);




  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get(`/api/blog/get-all-blogs?limit=9`);

        if (response.status === 200) {
          setRecentBlogs(response.data.blogs)
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllBlogs();
  }, []);





















  return (
    <>
      <div className="">

        <div className="mt-32 flex justify-around flex-wrap gap-4">

          {/* left content  */}
          <div className="flex flex-col gap-5 w-10/12 md:w-1/2">

            <motion.h1 className='text-4xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-300'

              initial={{ x: -100 }}
              animate={{ x: 10 }}
              transition={{
                duration: 1,
                delay: 0,
              }}
            >
              Hey Folks, Welcome to my Blog.
            </motion.h1>



            <hr className='' />

            <motion.p className='text-sm text-justify  leading-8'

              initial={{ x: 200 }}
              animate={{ x: 10 }}
              transition={{
                duration: 1,
                delay: 0
              }}

            >
              Discover the latest insights in technology and programming through my compelling blogs. Covering Java, JavaScript, and more, I delve into various topics to keep you informed and engaged. Join and explore the ever-evolving landscape of digital innovation! Here you'll find a variety of articles  on topics such as web development, software engineering, and programming languages
            </motion.p>
          </div>
        </div>
        <GithubCard />



        <h1 className='text-2xl text-center my-5'>Recent Blogs</h1>

        <div className="flex flex-wrap px-5 w-full my-10 gap-4 justify-center">
          {
            recentBlogs && recentBlogs.map((value, index) => {
              return (
                <div key={index} className={`shadow-md border hover:scale-95 transition-all w-96 rounded-tl-xl rounded-br-xl pb-5 cursor-pointer ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                  <Link to={`/blog/${value.slug}`}>
                    <img src={value.blogImgFile} className='hover:scale-90 transition-all w-96 h-60 rounded-tl-xl rounded-br-xl' />

                    <div className="px-3">
                      <p className='text-lg md:text-xl'>{value.blogTitle}</p>
                      <span className='text-xs md:text-sm w-20 text-center border px-4 rounded-full'>{value.blogCategory}</span>
                    </div>
                  </Link>
                </div>
              )
            })
          }
        </div>

      </div>
    </>
  )
}
export default Home;