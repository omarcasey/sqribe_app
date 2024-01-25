import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.user.data?.darkMode) || null;

  useEffect(() => {
    const savedDarkMode = Cookies.get("darkMode");
    if (savedDarkMode) {
      dispatch({ type: "SET_DARK_MODE", payload: savedDarkMode === "true" });
    }
  }, [dispatch]);

  useEffect(() => {
    // Check if dark mode preference is available in local storage
    const savedMode = localStorage.getItem('darkMode');

    // If dark mode preference is available, set the state accordingly
    if (savedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []); // Empty array ensures that effect is only run on mount

  useEffect(() => {
    Cookies.set("darkMode", isDarkMode);
  }, [isDarkMode]);

  return <div className={isDarkMode ? "dark" : "light"}>{children}</div>;
};

export default ThemeProvider;
