import { useSelector } from 'react-redux';
import heroImg from '../assests/HeroImage.png'
import { motion } from 'framer-motion';




const Home = () => {

  const { blogs } = useSelector((state) => state.blogSliceApp);

  return (
    <>
      <div className="min-h-screen">

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



          {/* Right content  */}

          <div className="w-96  flex-col items-center flex justify-center cursor-not-allowed">
            <img src={heroImg} className='w-full' />

          </div>
        </div>
      </div>
    </>
  )
}
export default Home;