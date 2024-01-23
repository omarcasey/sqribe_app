import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';


const ThemeProvider = ({ children }) => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.user.data?.darkMode) || false;

    useEffect(() => {
        const savedDarkMode = Cookies.get('darkMode');
        if (savedDarkMode) {
            dispatch({ type: 'SET_DARK_MODE', payload: savedDarkMode === 'true' });
        }
    }, [dispatch]);

    useEffect(() => {
        Cookies.set('darkMode', isDarkMode);
    }, [isDarkMode]);

    return (
        <div className={isDarkMode ? 'dark' : 'light'}>
            {children}
        </div>
    );
};

export default ThemeProvider;
