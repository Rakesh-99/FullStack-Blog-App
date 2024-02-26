import React from 'react'
import { useSelector } from 'react-redux';



const ThemeProvider = ({ children }) => {



    const { theme } = useSelector((state) => state.theme);


    return (
        <div className={theme}>
            <div className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                {children}
            </div>
        </div>
    )
}
export default ThemeProvider;