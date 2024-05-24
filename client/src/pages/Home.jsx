import { useSelector } from 'react-redux';
import heroImg from '../assests/HeroImage.png'





const Home = () => {

  const { blogs } = useSelector((state) => state.blogSliceApp);

  return (
    <>
      <div className="min-h-screen">

        <div className="mt-32 flex justify-around flex-wrap gap-4">

          {/* left content  */}
          <div className="flex flex-col gap-5 w-10/12 md:w-1/2">

            <h1 className='text-4xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-300'>Hey Folks, Welcome to my Blog.</h1>
            <hr className='' />

            <p className='text-sm text-justify  leading-8'>
              Discover the latest insights in technology and programming through my compelling blogs. Covering Java, JavaScript, and more, I delve into various topics to keep you informed and engaged. Join and explore the ever-evolving landscape of digital innovation! Here you'll find a variety of articles  on topics such as web development, software engineering, and programming languages
            </p>

            <button className='w-96 hover:border-blue-400 transition-all hover:text-blue-400 border-b py-3 border-yellow-300 '>View all posts</button>

          </div>



          {/* Right content  */}

          <div className="w-52 md:w-96 border-2 border-yellow-300 items-center flex justify-center py-2 px-2 rounded-full hover:animate-pulse cursor-pointer">
            <img src={heroImg} alt="" />
          </div>

        </div>

      </div>
    </>
  )
}
export default Home