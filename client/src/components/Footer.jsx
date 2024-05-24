import { useSelector } from 'react-redux';


const Footer = () => {


    const { theme } = useSelector((state) => state.themeSliceApp);

    return (
        <>
            <footer className={`${theme} ${theme === 'dark' ? 'border-t border-gray-700 py-6 flex justify-center items-center text-sm gap-4' : 'gap-4 text-sm border-t border-gray-100 py-6 flex justify-center items-center'}`}>

                <p>Made with love by <span className='text-blue-400 font-semibold'>Rakesh Kumar Parida</span></p>
                <p>@ Copyright All rights reserved</p>

            </footer>
        </>
    )
}
export default Footer