import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "@/reducers/userSlice";

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.user?.darkMode);

  useEffect(() => {
    // Check browser/system dark mode preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    dispatch(setDarkMode(darkModeMediaQuery.matches));

    // Load user preferences from storage
    const userDarkModePreference = localStorage.getItem('userDarkModePreference');
    if (userDarkModePreference !== null) {
      dispatch(setDarkMode(userDarkModePreference === 'true'));
    }
  }, [dispatch]);

  return <div className={isDarkMode ? "dark" : "light"}>{children}</div>;
};

export default ThemeProvider;
