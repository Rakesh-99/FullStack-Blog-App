import React from 'react'
import { useSelector } from 'react-redux';



const ThemeProvider = ({ children }) => {



    const { theme } = useSelector((state) => state.themeSliceApp);



    return (
        <div className={`${theme} ${theme === 'light' ? 'bg-blue-50 text-gray-900' : 'bg-zinc-900 text-gray-300'}`}>
            {children}
        </div>
    )
}
export default ThemeProvider;